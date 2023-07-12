import userData from './data/users';
import userHydrationData from './data/hydration'

// import {apiCall} from 'lksadjf;lk'

// function dosomethingapi() {
//   //checkj out promise all
//   apiCall(url)
//   .then(data, () => {
//     getUserData(data)
//   }
// }

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
console.log('day: ', day)
if(usersDailyOz) {
  return usersDailyOz.numOunces
}
}

const calculateWeeklyOunces = (id) => {
  const usersDailyHydrationLog = userHydrationData.hydrationData
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




export {
  getUserData,
  getAvgSteps,
  getAvgDailyOunces,
  getOzByDay,
  calculateWeeklyOunces
}