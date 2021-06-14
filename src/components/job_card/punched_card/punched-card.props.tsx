export interface PunchedCardProps {
  title: string;
  companyName: string;
  date: string;
  time: string;
  clockInTime: string;
  clockOutTime: string;
  onPress: () => void;
}
