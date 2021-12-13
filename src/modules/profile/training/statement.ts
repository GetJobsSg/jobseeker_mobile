const yesNoOption = [
  { label: 'Yes', value: 1 },
  { label: 'No', value: 0 },
];

const underStoodCheck = [{ label: 'I Acknowledge', value: 1 }];

export enum QuestionId {
  DISABILITY = 1,
  TATOO = 2,
}

const statement = [
  {
    id: QuestionId.DISABILITY,
    statement:
      'Do you have any physical disabilities that will prevent you from performing the Job? (Example: Vision, Hearing, Communication, Walking and Carrying loads up to 10kg) Please contact us if you have any such disabilities to proceed with your application.',
    options: yesNoOption,
  },
  {
    id: QuestionId.TATOO,
    statement:
      'Do you have any visible tattoo(s) that cannot be concealed with standard work attire? Please contact us if you have such tattoo(s) to proceed with your application?',
    options: yesNoOption,
  },
  {
    id: 3,
    statement:
      'Some jobs may require a specific dress code which will be stated in the job requirements. Else, if not stated, contact your employer for confirmation before attending the job.',
    options: underStoodCheck,
  },
  {
    id: 5,
    statement: 'You must report to your Employer at least 20 mins before the job commencement time',
    options: underStoodCheck,
  },
  {
    id: 6,
    statement:
      'Scan or enter the respective codes given by your employer for Clock in and Clock out for each job, otherwise you will not be able to get your pay.',
    options: underStoodCheck,
  },
  {
    id: 7,
    statement: 'Follow the job directions given by your Supervisor on duty.',
    options: underStoodCheck,
  },
  {
    id: 8,
    statement: 'Being intoxicated and behaving in an unruly manner is strictly prohibited.',
    options: underStoodCheck,
  },
  {
    id: 9,
    statement: 'If you need to leave early for any reason, please inform your Supervisor and Clock out.',
    options: underStoodCheck,
  },
  {
    id: 10,
    statement: 'Remember to put on your best smile and work safe.',
    options: underStoodCheck,
  },
];

export default statement;
