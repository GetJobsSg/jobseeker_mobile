export enum Gender {
  MALE = 1,
  FEMALE = 2,
}

export enum IVerificationStatus {
  NOT_INITIATED = 1,
  PENDING_REVIEW = 2,
  REQUIRED_UPDATE = 3,
  APPROVED = 4,
}

export enum IInboxMessage {
  JOB_OFFER = 1,
  PROFILE_APPROVED = 4,
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
  REJECTED = 3,
  ACCEPTED = 4,
}

export enum TransactionType {
  SALARY = 1,
  WITHDRAWAL = 2,
  CREDIT = 3,
  DEDUCTION = 4,
}
