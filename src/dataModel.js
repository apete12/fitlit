
// USER DATA
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

// HELPER FUNCTIONS

const getTodaysDate = ((id, dataList) => {
  let today = {dataListType: '', date: null};

  if (dataList.hydrationData) {
    today.date = dataList.hydrationData.filter(log => log.userID === id);
    today.dataListType = 'hydration'
    
  } else if (dataList.sleepData) {
    today.date = dataList.sleepData.filter(log => log.userID === id);
    today.dataListType = 'sleep'

  } else if(dataList.activityData) {
    today.date = dataList.activityData.filter(log => log.userID === id);
    today.dataListType = 'activity'
    
  }

  today.date = today.date[today.date.length - 1].date

  return today
});


const breakDownToWeeklyStatsArray = (id, dataList, startDate) => {
  const makeWeeklyArray = () => {
    const todaysDate = getTodaysDate(id, dataList);
    let dataTypeById

    if (todaysDate.dataListType === 'hydration') {
      dataTypeById = dataList.hydrationData.filter((entry) => entry.userID === id);
    } else if (todaysDate.dataListType === 'sleep') {
      dataTypeById = dataList.sleepData.filter((entry) => entry.userID === id)
    } else if (todaysDate.dataListType === 'activity') {
      dataTypeById = dataList.activityData.filter((entry) => entry.userID === id)
    }
    
    const startDateEntry = dataTypeById.find((log) => log.date === startDate && todaysDate.date !== startDate);

    if (startDateEntry) {
      const entryPosition = dataTypeById.indexOf(startDateEntry);
      const weeklyUserData = dataTypeById.slice(entryPosition, entryPosition + 7);
      
      return weeklyUserData;
    }

    const todaysDateEntry = dataTypeById.find((log) => log.date === startDate && todaysDate.date === startDate);
    if (todaysDateEntry) {
      const entryPosition = dataTypeById.indexOf(todaysDateEntry);
      const weeklyUserData = dataTypeById.slice(entryPosition - 7, entryPosition);
      return weeklyUserData;
    }

    return [];
  };

  return makeWeeklyArray;
};


// ACTIVITY DATA

const getAvgSteps = (dataList) => {
let sumOfSteps = dataList.users.reduce((sum, user) => {
  sum += user.dailyStepGoal
  return sum
  }, 0)
    return sumOfSteps / dataList.users.length
}

const getDailySteps = (id, day, dataList) => {
  const activityLog = dataList.activityData 
  const dailySteps = activityLog.find(log => log.userID === id && log.date === day)

  return dailySteps.numSteps
}

const getActiveMinutes = (id, day, dataList) => {
  const activityLog = dataList.activityData 
  const activeMinutes = activityLog.find(log => log.userID === id && log.
date === day)

  return activeMinutes.minutesActive
}

const calculateDailyMilesWalked = (id, day, dataList1, dataList2) => {
  const userLog = dataList1.users
  const userStrideData = userLog.find(log => id === log.id)
  const userStride = userStrideData.strideLength

  const activityLog = dataList2.activityData
  const userStepData = activityLog.find(log => log.userID === id && log.date === day)
  const userDailyStep = userStepData.numSteps
  const walkedMiles = (userStride * userDailyStep)/5280
  return walkedMiles.toFixed(2)
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
    return `<span role="img" aria-label="check" title="check">✔</span>`
  } else {
    return `<span role="img" aria-label="x" title="x">X</span>`
  }
}


// HYDRATION DATA

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


// SLEEP DATA

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
    let userAvgSleep = userSleepStats / entries.length
    return userAvgSleep.toFixed(2)
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
    let userAvgSleepQual = userSleepQualityStats / entries.length
    
    return userAvgSleepQual.toFixed(2)
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

const getWeeklySleepHoursStats = (id, dataList, startDate) => {
    let currentUserWeeklySleepData = breakDownToWeeklyStatsArray(id, dataList, startDate)
    let weeklyUserData = currentUserWeeklySleepData()
  
    let sleepHoursWeeklyStats = weeklyUserData.reduce((a, c) => {
      a.day.push(c.date)
      a.sleepHours.push(c.hoursSlept)
    return a
  }, {day: [], sleepHours: []})

  return sleepHoursWeeklyStats
  }


export {
  // USER DATA
  getUserData,
  generateRandomUser,

  // HELPER 
  breakDownToWeeklyStatsArray,
  getTodaysDate,
  getRandomIndex,

  // HYDRATION DATA
  getAvgDailyOunces,
  getOzByDay,
  calculateWeeklyOunces,

  // SLEEP DATA
  sleepAmountByDay, 
  sleepQualityByDay,
  calculateUserAvgDailyHoursSlept,
  calculateUserAvgSleepQuality,
  getWeeklySleepHoursStats,
  getWeeklySleepQualityStats,

  // ACTIVITY DATA
  getAvgSteps,
  calculateMinutesActive,
  checkIfStepGoalWasMade,
  getDailySteps,
  getActiveMinutes,
  calculateDailyMilesWalked,
}