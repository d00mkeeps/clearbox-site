import type {
  TelemetryError,
  ErrorsResponse,
  HealthResponse,
  FetchErrorsParams,
} from '../types/telemetry';

const BASE =
  import.meta.env.VITE_API_URL ?? 'https://clearbox-api.mileshillary.com';

const CREDS_KEY = '***';

function loadCreds(): { username: string; password: string } | null {
  try {
    const raw = localStorage.getItem(CREDS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as { username: string; password: string };
  } catch {
    return null;
  }
}

function authHeaders(): Record<string, string> {
  const creds = loadCreds();
  if (!creds) return {};
  return { Authorization: 'Basic ' + btoa(`${creds.username}:${creds.password}`) };
}

// ─── Errors ───────────────────────────────────────────────────────────────────

export async function fetchErrors(params: FetchErrorsParams = {}): Promise<ErrorsResponse> {
  const qs = new URLSearchParams();
  if (params.limit !== undefined) qs.set('limit', String(params.limit));
  if (params.offset !== undefined) qs.set('offset', String(params.offset));
  if (params.resolved !== undefined) qs.set('resolved', String(params.resolved));
  if (params.error_type) qs.set('error_type', params.error_type);
  if (params.from) qs.set('from', params.from);
  if (params.to) qs.set('to', params.to);

  const res = await fetch(`${BASE}/api/telemetry/errors?${qs}`, {
    headers: { ...authHeaders() },
  });
  if (!res.ok) throw new Error(`fetchErrors ${res.status}`);
  return res.json() as Promise<ErrorsResponse>;
}

export async function resolveError(id: string): Promise<TelemetryError> {
  const res = await fetch(`${BASE}/api/telemetry/errors/${id}/resolve`, {
    method: 'PATCH',
    headers: { ...authHeaders() },
  });
  if (!res.ok) throw new Error(`resolveError ${res.status}`);
  return res.json() as Promise<TelemetryError>;
}

// ─── Health ───────────────────────────────────────────────────────────────────

export async function fetchHealth(): Promise<HealthResponse> {
  const res = await fetch(`${BASE}/api/health`);
  if (!res.ok) throw new Error(`fetchHealth ${res.status}`);
  return res.json() as Promise<HealthResponse>;
}

// ─── Telemetry POST (public — no auth) ───────────────────────────────────────

export async function postTelemetry(payload: object): Promise<{ id: string }> {
  const res = await fetch(`${BASE}/api/telemetry`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`postTelemetry ${res.status}`);
  return res.json() as Promise<{ id: string }>;
}