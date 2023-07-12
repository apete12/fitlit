import userData from './data/users';


const getUserData = ((userId) => {
  let filteredById = userData.users.find(user => user.id === userId);
  return filteredById
});

const getAvgSteps = () => {
let sumOfSteps = userData.users.reduce((sum, user) => {
  sum += user.dailyStepGoal
  return sum
}, 0)
return sumOfSteps / userData.users.length
}

const getAvgDailyOunces = (id) => {
const usersDailyHydrationLog = userHydrationData.hydrationData
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

///////////return specific day fluid ounces//////////////////
const getOzByDay = (id, day) => {
const usersDailyHydrationLog = userHydrationData.hydrationData
const usersDailyOz = usersDailyHydrationLog.find(log => log.userID === id && log.date === day)
if(usersDailyOz) {
  return console.log('look here', usersDailyOz.numOunces)
}
}


export {
  getUserData,
  getAvgSteps,
  getAvgDailyOunces,
  getOzByDay,
}