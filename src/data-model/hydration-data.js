//////////////////////// HYDRATION ////////////////////////

const getAvgDailyOunces = (id, dataList) => {
    let usersDailyHydrationLog = dataList.hydrationData
    let numOfEntries = []
    let userHydrationStats = usersDailyHydrationLog.reduce((accum, userObj) => {
      if (userObj.userID === id) {
        numOfEntries.push(userObj.userID)
        accum += userObj.numOunces
      }
      return accum
    }, 0)
    let average = userHydrationStats / numOfEntries.length
    
    return Number(average.toFixed(0))
    }
    
const getOuncesByDay = (id, day, dataList) => {
    let usersDailyHydrationLog = dataList.hydrationData
    let usersDailyOz = usersDailyHydrationLog.find(log => log.userID === id && log.date === day)
      if(usersDailyOz) {
        return usersDailyOz.numOunces
      }
    }
    
const getOuncesByWeek = (id, dataList) => {
    let usersDailyHydrationLog = dataList.hydrationData
    let userWaterEntries = usersDailyHydrationLog.filter((entry) => {
      return entry.userID === id
    })
      
    let lastSevenDays = userWaterEntries.slice(-7)
    
    let weeklyHydrationInfo = lastSevenDays.reduce ((accu, curr) => {
      accu.ounces.push(curr.numOunces)
      accu.dates.push(curr.date)
      return accu
    }, {ounces: [], dates: []})
      
    return weeklyHydrationInfo
}
    

export {
    getAvgDailyOunces,
    getOuncesByDay,
    getOuncesByWeek,
}