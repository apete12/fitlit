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
  fetchUserData('users').then(result => {
    displayRandomUser(result)
    displayAverageSteps(result)
    displayFriendList(result)
  })

  fetchUserData('hydration').then(result => {
    displayDailyHydrationStats(result)
    displayWeeklyHydrationStats(result)
  })

  // fetchUserData('sleep').then(result => {
  
  // })

  // fetchUserData('activity').then(result => {
  
  // })
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
