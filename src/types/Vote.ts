export interface Vote {
    participant_id: number;
    status: "AVAILABLE" | "NOT_AVAILABLE"
    day: string;
  }