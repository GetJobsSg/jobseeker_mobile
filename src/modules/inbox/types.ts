export interface IInboxDetailsResponse {
  data: {
    id: number;
    employee_id: number;
    job_id: number | null;
    title: string;
    body: string;
    seen: boolean;
    date_updated: string;
    date_created: string;
    inbox_message_type: {
      id: number;
      name: string;
      date_updated: string;
      date_created: string;
    };
  };
}
