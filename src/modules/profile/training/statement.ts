const yesNoOption = [
  { label: 'Yes', value: 1 },
  { label: 'No', value: 0 },
];

const underStoodCheck = [{ label: 'I understood', value: 1 }];

export enum QuestionId {
  DISABILITY = 1,
  TATOO = 2,
}

const statement = [
  {
    id: QuestionId.DISABILITY,
    statement:
      'Do you have any physical disabilities that will prevent you from performing the Job?\n(Example: Vision, Hearing, Communication, Walking and Carrying loads up to 10kg)',
    options: yesNoOption,
  },
  {
    id: QuestionId.TATOO,
    statement: 'Do you have any visible tattoo(s) that cannot be concealed with standard work attire?',
    options: yesNoOption,
  },
  {
    id: 3,
    statement: 'The standard work attire required is Plain black pants/Jeans and Plain black leather shoes/sneakers',
    options: underStoodCheck,
  },
  {
    id: 4,
    statement:
      'Grooming is important. Males must have neatly combed hairdo and shave off any facial hairs. Females with long hair must bun them up neatly and put on light make up.',
    options: underStoodCheck,
  },
  {
    id: 5,
    statement: 'You must report to your Employer at least 20 mins before your job commencement.',
    options: underStoodCheck,
  },
  {
    id: 6,
    statement:
      'You must scan in the respective QR codes for Clock in and Clock out for each job, otherwise you will not be able to get your pay.',
    options: underStoodCheck,
  },
  {
    id: 7,
    statement: 'You must follow the job directions given by your Supervisor on duty.',
    options: underStoodCheck,
  },
  {
    id: 8,
    statement: 'Being intoxicated and behaving in an unruly manner is strictly prohibited.',
    options: underStoodCheck,
  },
  {
    id: 9,
    statement: 'If you need to leave early for whatever reason, please inform your Supervisor and Clock out.',
    options: underStoodCheck,
  },
  {
    id: 10,
    statement: 'Remember to put on your best smile and work safe. ',
    options: underStoodCheck,
  },
];

export default statement;
