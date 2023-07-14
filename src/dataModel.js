var currentUser

const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.users.length)
}

const generateRandomUser = (array) =>{
  const randomUserIndex = getRandomIndex(array)
  const userDataInfo = getUserData(randomUserIndex, array)
  currentUser = userDataInfo
  return currentUser
}

const getUserData = ((userId, dataList) => {
  let filteredById = dataList.users.find(user => user.id === userId);
  return filteredById
});

const getAvgSteps = (dataList) => {
let sumOfSteps = dataList.users.reduce((sum, user) => {
  sum += user.dailyStepGoal
  return sum
  }, 0)
    return sumOfSteps / dataList.users.length
}

const getAvgDailyOunces = (id, dataList) => {
const usersDailyHydrationLog = dataList.hydrationData
let numOfEntries = []
const userHydrationStats = usersDailyHydrationLog.reduce((accum, userObj) => {
  if (userObj.userID === id) {
    numOfEntries.push(userObj.userID)
    accum += userObj.numOunces
  }
  return accum
}, 0)
return userHydrationStats / numOfEntries.length
}

const getOzByDay = (id, day, dataList) => {
  const usersDailyHydrationLog = dataList.hydrationData
  const usersDailyOz = usersDailyHydrationLog.find(log => log.userID === id && log.date === day)
  if(usersDailyOz) {
    return usersDailyOz.numOunces
    }
}

const calculateWeeklyOunces = (id, dataList) => {
  const usersDailyHydrationLog = dataList.hydrationData
  let userWaterEntries = usersDailyHydrationLog.filter((entry) => {
    return entry.userID === id
  })
  
  const lastSevenDays = userWaterEntries.slice(-7)

  const weeklyHydrationInfo = lastSevenDays.reduce ((accu, curr) => {
    accu.ounces.push(curr.numOunces)
    accu.dates.push(curr.date)
    return accu
  }, {ounces: [], dates: []})
  
  return weeklyHydrationInfo
}

const sleepAmountByDay = (id, day, dataList) => {
  const usersDailySleepLog = dataList.sleepData
  const usersDailySleepAmount = usersDailySleepLog.find(log => log.userID === id && log.date === day)
  if(usersDailySleepAmount) {
    return usersDailySleepAmount.hoursSlept
  }
}

const sleepQualityByDay = (id, day, dataList) => {
  const usersDailySleepLog = dataList.sleepData
  const usersDailySleepQuality = usersDailySleepLog.find(log => log.userID === id && log.date === day)
    if(usersDailySleepQuality) {
      return usersDailySleepQuality.sleepQuality
    }
}

  const calculateUserAvgDailyHoursSlept = (id, dataList) => {
    const usersDailySleepLog = dataList.sleepData
    let entries = []
    const userSleepStats = usersDailySleepLog.reduce((accum, userObj) => {
      if (userObj.userID === id) {
        entries.push(userObj.userID)
        accum += userObj.hoursSlept
      }
      return accum
    }, 0)
    return userSleepStats / entries.length
  }

  const calculateUserAvgSleepQuality = (id, dataList) => {
    const usersDailySleepQualityLog = dataList.sleepData
    let entries = []
    const userSleepQualityStats = usersDailySleepQualityLog.reduce((accum, userObj) => {
      if (userObj.userID === id) {
        entries.push(userObj.userID)
        accum += userObj.sleepQuality
      }
      return accum
    }, 0)
    return userSleepQualityStats / entries.length
  }

function breakDownToWeeklyStatsArray(id, dataList, startDate) {

  const  makeWeeklyArray = () => {
  let sleepDataByID = dataList.sleepData.filter((entry) => entry.userID === id)

  let startDateEntry = sleepDataByID.find((log) => log.date === startDate)
  let entryPosition = sleepDataByID.indexOf(startDateEntry)

  let weeklyUserData = sleepDataByID.slice(entryPosition, entryPosition + 7)
  return weeklyUserData
  }
  return makeWeeklyArray
}

const getWeeklySleepQualityStats = (id, dataList, startDate) => {
  const currentUserWeeklySleepData = breakDownToWeeklyStatsArray(id, dataList, startDate)
  const weeklyUserData = currentUserWeeklySleepData()

  let sleepQualityWeeklyStats = weeklyUserData.reduce((a, c) => {
      a.day.push(c.date)
      a.sleepQuality.push(c.sleepQuality)
    return a
  }, {day: [], sleepQuality: []})

  return sleepQualityWeeklyStats
}

  const getWeeklySleepStats = (id, dataList, startDate) => {
    const currentUserWeeklySleepData = breakDownToWeeklyStatsArray(id, dataList, startDate)
    const weeklyUserData = currentUserWeeklySleepData()
  
    let totalSleep = weeklyUserData.reduce((a, c) => {
      a += c.hoursSlept
      return a
    }, 0)
  
    return totalSleep/weeklyUserData.length
  }

const calculateDailyMilesWalked = (id, day, dataList1, dataList2) => {
  const userLog = dataList1.users
  const userStrideData = userLog.find(log => id === log.id)
  const userStride = userStrideData.strideLength

  const activityLog = dataList2.activityData
  const userStepData = activityLog.find(log => log.userID === id && log.date === day)
  const userDailyStep = userStepData.numSteps

  return (userStride * userDailyStep)/5280
}

const calculateMinutesActive = (id, day, dataList) => {
  const activityLog = dataList.activityData
  const activeMinutes = activityLog.find(log => log.userID === id && log.date === day)
  return activeMinutes.minutesActive
}

const checkIfStepGoalWasMade = (id, day, dataList1, dataList2) => {
  const userLog = dataList1.users
  const userData = userLog.find(log => id === log.id)
  const userStepGoal = userData.dailyStepGoal

  const activityLog = dataList2.activityData
  const userStepData = activityLog.find(log => log.userID === id && log.date === day)
  const userDailyStep = userStepData.numSteps
  
  if(userDailyStep >= userStepGoal) {
    return true
  }
}

export {
  getUserData,
  getAvgSteps,
  getAvgDailyOunces,
  getOzByDay,
  calculateWeeklyOunces,
  getRandomIndex,
  generateRandomUser,
  sleepAmountByDay, 
  sleepQualityByDay,
  calculateDailyMilesWalked,
  calculateUserAvgDailyHoursSlept,
  calculateUserAvgSleepQuality,
  getWeeklySleepStats,
  calculateMinutesActive,
  checkIfStepGoalWasMade,
  getWeeklySleepQualityStats
}