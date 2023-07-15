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
  displayTodaysSleepData,
  displayAllTimeAvgSleepHoursAndQuality,
  displayDailySteps,
  displayMilesWalkedByDay,
  displayWeeklySleepDayHours

} from './domUpdates';

import {
  getUserData,
  getAvgSteps,
  getAvgDailyOunces,
  getOzByDay,
  calculateWeeklyOunces,
  generateRandomUser,
} from './dataModel';

import {
  fetchUserData,
  promises
  // getUserData,
} from './apiCalls'

// Query Selectors:
var userInfoContainer = document.querySelector('.user-info');
var welcomeHeading = document.querySelector('.welcome-heading');
var usersStepGoal = document.querySelector('.all-users-step-goal')
var friendList = document.querySelector('.friend-list')
var dailyHydrationStats = document.querySelector('.daily-hydration-stats')
var weeklyHydrationStats = document.querySelector('.weekly-hydration-stats')
var sleepStatsByDay = document.querySelector('.sleep-stats')
var avgAllTimeSleepStats = document.querySelector('.avg-sleep-qual')
var dailyStepCount = document.querySelector('.daily-steps')
var weeklyStepCountGoal = document.querySelector('.weekly-step-count-goal')
var milesWalkedByDay = document.querySelector('.todays-miles-walked')
var weeklySleepStats = document.querySelector('.weekly-sleep')

// event listener:
window.addEventListener('load', () => {
  Promise.all(promises)
  .then(results => {
    console.log(results)
    displayRandomUser(results[0])
    displayAverageSteps(results[0])
    displayFriendList(results[0])
    displayDailyHydrationStats(results[1])
    displayWeeklyHydrationStats(results[1])
    displayTodaysSleepData(results[2])
    displayAllTimeAvgSleepHoursAndQuality(results[2])
    displayDailySteps(results[3])
    displayMilesWalkedByDay(results[0], results[3])
    displayWeeklySleepDayHours(results[2])
  })
  .catch(error => console.log('ERROR', error))
})

export {
  // query selectors:
  userInfoContainer,
  welcomeHeading,
  friendList,
  dailyHydrationStats,
  weeklyHydrationStats,
  sleepStatsByDay,
  avgAllTimeSleepStats,
  dailyStepCount,
  usersStepGoal,
  weeklyStepCountGoal,
  milesWalkedByDay,
  weeklySleepStats,
}

