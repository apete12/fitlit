const getUserActivtyLog = (id, day, dataList) => {
  let activityLog = dataList.activityData 
  let userActivityEntry = activityLog.find(log => log.userID === id && log.date === day)
  return userActivityEntry
}


const getDailySteps = (id, day, dataList) => {
  let userActivityEntry = getUserActivtyLog(id, day, dataList)
  if (!userActivityEntry) {
    return 'No Entry Found'
  } else {
  return userActivityEntry.numSteps
  }
}

const getActiveMinutes = (id, day, dataList) => {
  let userActivityEntry = getUserActivtyLog(id, day, dataList)
  if (!userActivityEntry) {
    return 'No Entry Found'
  } else {
  return userActivityEntry.minutesActive
  }

}

const getDailyMilesWalked = (id, day, dataList1, dataList2) => {
  let userLog = dataList1.users
  let userStrideData = userLog.find(log => id === log.id)
  let userStride = userStrideData.strideLength
  let userActivityEntry = getUserActivtyLog(id, day, dataList2)

  if (!userActivityEntry) {
    return 'No Entry Found'
   } else {
   let userDailyStep = userActivityEntry.numSteps
   let walkedMiles = (userStride * userDailyStep)/5280
   return Number(walkedMiles.toFixed(2))
   }

}

const checkIfStepGoalWasMade = (id, day, dataList1, dataList2) => {
  let userLog = dataList1.users
  let userData = userLog.find(log => id === log.id)
  let userStepGoal = userData.dailyStepGoal

  let userActivityEntry = getUserActivtyLog(id, day, dataList2)
  if (!userActivityEntry) {
    return 'Invalid Argument'
  }
  let userDailyStep = userActivityEntry.numSteps
  if (userDailyStep >= userStepGoal) {
    return `<span role="img" aria-label="check" title="check">✔</span>`
  } else {
    return `<span role="img" aria-label="x" title="x">X</span>`
  }
}

export {
  checkIfStepGoalWasMade,
  getDailySteps,
  getActiveMinutes,
  getDailyMilesWalked,
  getUserActivtyLog,
}