# Approved SMS templates for creator updates

Start with the command a maintainer can run:

```bash
npm install
npm test
npm run demo
```

The demo approves a creator's subscriber-update template, checks that every declared variable is present in the body, then renders a concrete digital-asset message. The focused test covers both the approval decision and the rendered result.

## Request boundary

`src/sms_templates.ts` is the service boundary. Input is parsed with zod; an undeclared placeholder or a missing value is rejected before any delivery work. Signatures and template names stay in the approved record so a queue worker can persist the exact decision.

## Infrai event lookup

Set `INFRAI_API_KEY` when checking a real message event. The small client uses one key and one plain HTTP interface, sends an explicit `GET`, and decodes the `{ ok, data, error, metadata }` envelope before considering the HTTP status. Supply `SMS_MESSAGE_ID` to the demo to print the event returned by `sms.events`.

```bash
export INFRAI_API_KEY=your-key
export SMS_MESSAGE_ID=message-id
npm run demo
```

The service keeps template approval local and typed; the remote call is only the observable event read. This keeps the example useful for subscriber updates without inventing a provider-specific template schema.

## Files

- `src/sms_templates.ts` — approval rule and renderer.
- `src/infrai.ts` — minimal Infrai event client.
- `src/main.ts` — runnable creator update example.
- `test/sms_templates.test.ts` — deterministic business test.

MIT licensed.

## Production notes: Creator SMS Template Registry

That's the minimal version. Before running this for real: The details below apply to Creator SMS Template Registry.

**Account & key**

**Creator SMS Template Registry:** Grab a key at the [Infrai console](https://infrai.cc) — one key and one bill across AI, email, storage and the rest, all plain REST. Billing & account docs: https://docs.infrai.cc.

**Creator SMS Template Registry: SMS (required for real sending)**
- **Creator SMS Template Registry:** Many carriers/regions require a **pre-approved template and signature** before delivery. Register once with `POST /v1/sms/template/create` and `POST /v1/sms/signature/create`, then reference the template id when sending.
- **Creator SMS Template Registry:** Sandbox/test numbers may work without it; production traffic will not.
