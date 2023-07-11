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
  const userHydrationStats = userHydrationData.hydrationData.filter((userEntry) => {
    userEntry.userID === id
  })

}
//   const avgFluidOunces = userHydrationData.hydrationData.reduce((sum, ounces) => {
//     if (userHydrationData.hydrationData.id === id) {
//       sum += userHydrationData.hydrationData.numOunces
//     }
//     return acc
//   },0)
//   return avgFluidOunces
// }


// event listener:
window.addEventListener('load', () => {
  displayRandomUser()
  displayAverageSteps()
});

export {
  // query selectors:
  userInfoContainer,
  activityContainer,
  welcomeHeading,
  // functions
  getUserData,
  getAvgSteps
}
