import './css/styles.css'
import './images/a-step-in-the-right-direction.jpg'

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

// Event listener:
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