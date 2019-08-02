const holidays = require('@date/holidays-us')
const { DateTime } = require('luxon')


//function for calcuating business days to be used in any application
//Requires initial date in UTC format and a delay in number format as an object
//outputs an object containing final date, total days, weekend days, and holiday days
const calculateDays = ({ delay, initialDate }) => {
  //error handling
  if (!delay || !initialDate) return 'Missing inputs'

  //initial setup for output
  let weekendDays = 0
  let holidayDays = 0
  let startDate = DateTime.fromISO(initialDate, { zone: 'utc' })
  let finalDate = startDate

  //checks each day during the period for holidays and weekends.
  while (delay > 0) {
    //weekend checks
    if (finalDate.weekday === 6 || finalDate.weekday === 7) {
      finalDate = finalDate.plus({ days: 1 })
      weekendDays++
      continue
      //holiday checks  
    } else if (holidays.isHoliday(new Date(finalDate.toISO()))) {
      finalDate = finalDate.plus({ days: 1 })
      holidayDays++
      continue
    }
    finalDate = finalDate.plus({ days: 1 })
    //reduce the delay counter if business day was tested
    delay--
  }


  let results = {
    businessDate: finalDate.minus({ days: 1 }).toISO(),
    totalDays: finalDate.diff(startDate, 'days').values.days,
    holidayDays,
    weekendDays,
  }

  return results
}

module.exports = calculateDays
