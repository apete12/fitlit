// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// Imports:
import userData from './data/users';
// importing the object that has 1 key-value pair of users: []

import userHydrationData from './data/hydration'

import './css/styles.css'
import './images/turing-logo.png';

import { 
  displayRandomUser, 
  displayAverageSteps,
} from './domUpdates';

// importing functionality from .domUpdates
// ./ is a relative path, the module is in the same directory as the current module file


// Query Selectors:
var userInfoContainer = document.querySelector('.user-info');
var welcomeHeading = document.querySelector('.welcome-heading');
var activityContainer = document.querySelector('.average-steps')

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

// event listener:
window.addEventListener('load', () => {
  displayRandomUser()
  displayAverageSteps()
  getAvgDailyOunces(1)
  getOzByDay(50, "2023/07/01")
});

export {
  // query selectors:
  userInfoContainer,
  activityContainer,
  welcomeHeading,
  // functions
  getUserData,
  getAvgSteps,
  getAvgDailyOunces,
  getOzByDay
}
