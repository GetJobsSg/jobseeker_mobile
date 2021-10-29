export interface InfoCardProps {
  title: string;
  companyName: string;
  location: string;
  onPress: () => void;
  applicationStatusId?: number;
  rate: string;
  date: string;
  time: string;
}
