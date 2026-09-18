export interface DashboardOverview {
  total_users: number;
  total_doses: number;
  overall_adherence_pct: number;
  active_users_30d: number;
  last_updated: string;
  db_status: string;
}

export interface GrowthTimelinePoint {
  date: string;
  active_users: number;
  new_users: number;
  cumulative_users: number;
}

export interface CohortRetentionItem {
  cohort_week: string;
  user_count: number;
  retention: (number | null)[];
}

export interface RetentionData {
  kpis: {
    total_registered_users: number;
    active_users_30d: number;
    day_7_retention_percent: number;
    day_30_retention_percent: number;
  };
  growth_timeline: GrowthTimelinePoint[];
  cohort_retention: CohortRetentionItem[];
}

export interface DailyAdherencePoint {
  date: string;
  taken: number;
  skipped: number;
  adherence_rate: number;
}

export interface SlotDistributionItem {
  name: string;
  y: number;
  color?: string;
}

export interface TopMedicineItem {
  name: string;
  count: number;
  form?: string;
}

export interface AdherenceData {
  kpis: {
    overall_adherence_percent: number;
    total_doses_logged: number;
    avg_medicines_per_user: number;
    adherence_7d_percent: number;
  };
  daily_timeline: DailyAdherencePoint[];
  slot_distribution: SlotDistributionItem[];
  top_medicines: TopMedicineItem[];
}

export interface SystemData {
  kpis: {
    errors_24h: number;
    unresolved_errors: number;
    api_latency_ms: number;
  };
  error_type_distribution: { name: string; y: number }[];
  os_breakdown: { name: string; y: number }[];
}

export interface DashboardMetricsResponse {
  overview: DashboardOverview;
  retention: RetentionData;
  adherence: AdherenceData;
  system: SystemData;
}
