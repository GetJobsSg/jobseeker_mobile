export enum Gender {
  MALE = 1,
  FEMALE = 2,
}

export enum IVerificationStatus {
  NOT_INITIATED = 1,
  PENDING_REVIEW = 2,
  REQUIRED_UPDATE = 3,
}

export enum JobStatus {
  OPEN = 1,
  ONGOING = 2,
  COMPLETED = 3,
  CANCELLED = 4,
}

export enum ApplicationStatus {
  NONE = 0,
  PENDING = 1,
  OFFERED = 2,
  ACCEPTED = 3,
  REJECTED = 4,
}

export enum TransactionType {
  SALARY = 'Salary',
  WITHDRAWAL = 'Withdrawal',
  CREDIT = 'Credit',
  Deduction = 'Deduction',
}
