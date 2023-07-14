// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// Imports:
// import userData from './data/users';
// import userHydrationData from './data/hydration'
import './css/styles.css'
import './images/turing-logo.png';

import { 
  displayRandomUser, 
  displayAverageSteps,
  displayDailyHydrationStats,
  displayFriendList,
  displayWeeklyHydrationStats,
} from './domUpdates';

import {
  getUserData,
  getAvgSteps,
  getAvgDailyOunces,
  getOzByDay,
  calculateWeeklyOunces,
  generateRandomUser
} from './dataModel';

import {
  fetchUserData,
  promises
  // getUserData,
} from './apiCalls'

// Query Selectors:
var userInfoContainer = document.querySelector('.user-info');
var welcomeHeading = document.querySelector('.welcome-heading');
var activityContainer = document.querySelector('.average-steps')
var friendList = document.querySelector('.friend-list')
var dailyHydrationStats = document.querySelector('.daily-hydration-stats')
var weeklyHydrationStats = document.querySelector('.weekly-hydration-stats')

// event listener:
window.addEventListener('load', () => {
  Promise.all(promises)
  .then(results => {
    displayRandomUser(results[0])
    displayAverageSteps(results[0])
    displayFriendList(results[0])
    displayDailyHydrationStats(results[1])
    displayWeeklyHydrationStats(results[1])
  })
  .catch(error => console.log('ERROR', error))
})

export {
  // query selectors:
  userInfoContainer,
  activityContainer,
  welcomeHeading,
  friendList,
  dailyHydrationStats,
  weeklyHydrationStats
}
