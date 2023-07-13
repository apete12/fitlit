// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// Imports:
import userData from './data/users';
import userHydrationData from './data/hydration'
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
  calculateWeeklyOunces
} from './dataModel';

import {
  fetchUserData,
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
  // displayRandomUser()
  // displayAverageSteps()
  // displayDailyHydrationStats()
  // displayFriendList()
  // displayWeeklyHydrationStats()
  fetchUserData().then(result => {
    displayRandomUser(result)
    // console.log(result)
    // displayAverageStep s(result),

  })
    // displayAverageSteps(results)
  })
// });

export {
  // query selectors:
  userInfoContainer,
  activityContainer,
  welcomeHeading,
  friendList,
  dailyHydrationStats,
  weeklyHydrationStats
}
