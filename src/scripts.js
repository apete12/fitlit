// Imports:
import './css/styles.css'
import './images/a-step-in-the-right-direction.jpg'
import './images/water-drops.png'

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
  displayDailyActiveMinutes,
  displayWeeklyStepCountGoalReached
} from './domUpdates';

import {
  promises
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
var weeklySleepStats = document.querySelector('.weekly-sleep-stats')
// var sleepStatsByDay = document.querySelector('.today-sleep-stats')
// var avgAllTimeSleepStats = document.querySelector('.all-time-sleep-stats')

// event listener:
window.addEventListener('load', () => {
  Promise.all(promises)
  .then(results => {
    // user
    displayRandomUser(results[0])
    displayFriendList(results[0])
    // activity
    displayAverageSteps(results[0])
    displayDailySteps(results[3])
    displayMilesWalkedByDay(results[0], results[3])
    displayDailyActiveMinutes(results[3])
    displayWeeklyStepCountGoalReached(results[0], results[3])
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
  dailyActiveMinutes,
  // dailyActiveMinutes,
  // gateInfo
}

