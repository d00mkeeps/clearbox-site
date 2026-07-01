// ─── Telemetry types ───────────────────────────────────────────────────────────

export type ErrorType = 'js_exception' | 'unhandled_rejection' | 'api_failure';

export interface TelemetryError {
  id: string;
  session_id: string;
  error_type: ErrorType;
  message: string;
  stack_trace: string | null;
  url: string | null;
  app_version: string;
  app_build: string;
  device_model: string;
  os_version: string;
  created_at: string;
  resolved: boolean;
  resolved_at: string | null;
}

export interface ErrorsResponse {
  total: number;
  errors: TelemetryError[];
}

export interface HealthResponse {
  db_connections: number;
  db_connection_limit: number;
  api_latency_ms: number;
  error_rate_5m: number;
  timestamp: string;
}

// ─── API fetch params ─────────────────────────────────────────────────────────

export interface FetchErrorsParams {
  limit?: number;
  offset?: number;
  resolved?: boolean;
  error_type?: ErrorType;
  from?: string;
  to?: string;
}
