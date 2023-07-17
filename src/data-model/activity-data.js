//////////////////////// ACTIVITY ////////////////////////
const getDailySteps = (id, day, dataList) => {
  let activityLog = dataList.activityData 
  let dailySteps = activityLog.find(log => log.userID === id && log.date === day)
  if(!dailySteps) {
    return 'No Entry Found'
  } else {
  return dailySteps.numSteps
  }
}

const getActiveMinutes = (id, day, dataList) => {
  let activityLog = dataList.activityData 
  let activeMinutes = activityLog.find(log => log.userID === id && log.date === day)
  if(!activeMinutes) {
    return 'No Entry Found'
  } else {
  return activeMinutes.minutesActive
  }
}

const getDailyMilesWalked = (id, day, dataList1, dataList2) => {
  let userLog = dataList1.users
  let userStrideData = userLog.find(log => id === log.id)
  let userStride = userStrideData.strideLength
  let activityLog = dataList2.activityData
  let userStepData = activityLog.find(log => log.userID === id && log.date === day)
  
  if(!userStepData) {
    return 'No Entry Found'
  } else {
  let userDailyStep = userStepData.numSteps
  let walkedMiles = (userStride * userDailyStep)/5280
  return Number(walkedMiles.toFixed(2))
  }
}


const checkIfStepGoalWasMade = (id, day, dataList1, dataList2) => {
  let userLog = dataList1.users
  let userData = userLog.find(log => id === log.id)

  
  let userStepGoal = userData.dailyStepGoal
  
  let activityLog = dataList2.activityData
  let userStepData = activityLog.find(log => log.userID === id && log.date === day)
  if(!userStepData) {
    return 'Invalid Argument'
  }
  let userDailyStep = userStepData.numSteps

  if(userDailyStep >= userStepGoal) {
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
}