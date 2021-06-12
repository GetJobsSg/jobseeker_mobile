import moment from 'moment';
import { DD_MMM } from '../constants/dateTime';

export const isSameDay = (date1: string, date2: string) => {
  const m1 = moment(date1);
  const m2 = moment(date2);
  return m1.isSame(m2, 'day');
};

// eg: 09:00:00 => 9:00am, 17:00:00 => 11am 17:00pm
export const convertTimeStringToAmPm = (time: string) => {
  if (!time) return '';
  const [hh, mm] = time.split(':');
  if (Number(hh) < 12) return `${hh}:${mm}am`;
  return `${hh}:${mm}pm`;
};

export const constructDateRange = (startDate: string, endDate: string) => {
  const formattedStartDate = moment(startDate).format(DD_MMM);
  const formattedEndDate = moment(endDate).format(DD_MMM);
  if (isSameDay(startDate, endDate)) return formattedStartDate;
  return `${formattedStartDate} - ${formattedEndDate}`;
};
