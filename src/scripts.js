// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// Imports:
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
  displayWeeklySleepHoursAndQuality,
  displayDailyActiveMinutes
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
// users
var userInfoContainer = document.querySelector('.user-info');
var welcomeHeading = document.querySelector('.welcome-heading');
var friendList = document.querySelector('.friend-list')
// hydration
var dailyHydrationStats = document.querySelector('.daily-hydration-stats')
var weeklyHydrationStats = document.querySelector('.weekly-hydration-stats')
// activity
var usersStepGoal = document.querySelector('.all-users-step-goal')
var dailyStepCount = document.querySelector('.daily-steps')
var dailyActiveMinutes = document.querySelector('.daily-active-minutes')
var weeklyStepCountGoal = document.querySelector('.weekly-step-count-goal')
var milesWalkedByDay = document.querySelector('.todays-miles-walked')
// sleep
var weeklySleepStats = document.querySelector('.weekly-sleep')
var sleepStatsByDay = document.querySelector('.sleep-stats')
var avgAllTimeSleepStats = document.querySelector('.avg-sleep-qual')

// event listener:
window.addEventListener('load', () => {
  Promise.all(promises)
  .then(results => {
    console.log(results)
    // user
    displayRandomUser(results[0])
    displayFriendList(results[0])
    // activity
    displayAverageSteps(results[0])
    displayDailySteps(results[3])
    displayMilesWalkedByDay(results[0], results[3])
    displayDailyActiveMinutes(results[3])
  //  hydration
    displayDailyHydrationStats(results[1])
    displayWeeklyHydrationStats(results[1])
    // sleep
    displayTodaysSleepData(results[2])
    displayAllTimeAvgSleepHoursAndQuality(results[2])
    displayWeeklySleepHoursAndQuality(results[2])
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
  dailyActiveMinutes
}

