import assert from "node:assert/strict";
import { approveTemplate, renderTemplate } from "../src/sms_templates.js";

const approved = approveTemplate({
  templateName: "subscriber-update",
  signature: "Studio North",
  body: "Hi {{name}}, your file {{asset}} is ready.",
  variables: ["name", "asset"]
});

assert.equal(approved.status, "approved");
assert.equal(renderTemplate(approved, { name: "Jo", asset: "pack-7" }), "Hi Jo, your file pack-7 is ready.");
assert.throws(() => approveTemplate({ templateName: "bad", signature: "S", body: "Hi", variables: ["name"] }));
console.log("template approval and rendering passed");
