import moment from 'moment'


export function getMonthsBetweenDates() {
  const monthsData = [];
  const startAndEnd = {}

  const today = moment();
  const start = today.clone().subtract(180, 'days');

  const targetDate = start.clone()
  while (targetDate.isSameOrBefore(today, 'month')) {
    const currentMonthStart = targetDate.clone().startOf('month');
    const currentMonthEnd = targetDate.clone().endOf('month');

    const currentMonth = currentMonthStart.format('YYYY-MM')

    monthsData.push(currentMonth);

    startAndEnd[currentMonth] = {
      start: currentMonth === start.clone().format('YYYY-MM') ? start.clone().startOf('days').valueOf() : currentMonthStart.valueOf(),
      end: currentMonth === today.clone().format('YYYY-MM') ? today.clone().endOf('days').valueOf() : currentMonthEnd.valueOf(),
    };

    targetDate.add(1, 'month');
  }

  return {
    months: monthsData.reverse(),
    startAndEnd
  }
}

