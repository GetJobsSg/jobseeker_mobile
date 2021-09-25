export interface OTPVerificationProps {
  cellCount?: number;
  title?: string;
  subTitle?: string;
  onConfirm: (code: string) => void;
  errorText?: string;
}
