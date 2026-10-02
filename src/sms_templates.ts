import { z } from "zod";

export const templateRequest = z.object({
  templateName: z.string().min(1),
  signature: z.string().min(1),
  body: z.string().min(1),
  variables: z.array(z.string().min(1)).default([])
});

export type TemplateRequest = z.infer<typeof templateRequest>;

export type ApprovedTemplate = TemplateRequest & {
  status: "approved";
};

export function approveTemplate(input: unknown): ApprovedTemplate {
  const parsed = templateRequest.parse(input);
  const missing = parsed.variables.filter((name) => !parsed.body.includes(`{{${name}}}`));
  if (missing.length > 0) throw new Error(`variables absent from body: ${missing.join(", ")}`);
  return { ...parsed, status: "approved" };
}

export function renderTemplate(template: ApprovedTemplate, values: Record<string, string>): string {
  for (const variable of template.variables) {
    if (!(variable in values)) throw new Error(`missing value: ${variable}`);
  }
  return template.body.replace(/{{(.*?)}}/g, (_, name: string) => values[name.trim()] ?? "");
}
