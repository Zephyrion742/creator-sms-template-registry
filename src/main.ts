import { approveTemplate, renderTemplate } from "./sms_templates.js";
import { getSmsEvent } from "./infrai.js";

const template = approveTemplate({
  templateName: "new-release",
  signature: "Studio North",
  body: "New download for {{subscriber}}: {{asset}}",
  variables: ["subscriber", "asset"]
});

const message = renderTemplate(template, { subscriber: "Mina", asset: "issue-042" });
console.log(JSON.stringify({ template: template.templateName, signature: template.signature, message }));

const messageId = process.env.SMS_MESSAGE_ID;
if (messageId && process.env.INFRAI_API_KEY) {
  const event = await getSmsEvent(messageId);
  console.log(JSON.stringify({ messageId, event }));
}
