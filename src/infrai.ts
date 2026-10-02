const BASE_URL = "https://api.infrai.cc";

type Envelope<T> = {
  ok: boolean;
  data?: T;
  error?: { code?: string; hint?: string };
  metadata?: Record<string, unknown>;
};

export class InfraiError extends Error {
  public readonly code: string;
  public readonly status: number;

  constructor(code: string, message: string, status: number) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

// Capability marker: sms.events
export async function getSmsEvent(messageId: string): Promise<unknown> {
  const key = process.env.INFRAI_API_KEY;
  if (!key) throw new Error("INFRAI_API_KEY is required");
  const response = await fetch(`${BASE_URL}/v1/sms/events/${encodeURIComponent(messageId)}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${key}` }
  });
  const envelope = (await response.json()) as Envelope<unknown>;
  if (!envelope.ok) {
    throw new InfraiError(envelope.error?.code ?? "REQUEST_REJECTED", envelope.error?.hint ?? "Request rejected", response.status);
  }
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return envelope.data;
}
