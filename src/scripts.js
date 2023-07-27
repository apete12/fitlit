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
  displayWeeklyStepCountGoalReached,
  activityForm,
  activityButton
} from './domUpdates';

import {
  promises,
  postActivityData
} from './apiCalls'

let testData = {
  userID: 1,  
  date: '07/25/2023', 
  flightsOfStairs: 23, 
  minutesActive: 23, 
  numSteps: 23
  }

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
  postActivityData(testData)
})

// form.addEventListener("submit", () => {
  // e.preventDefault(); //prevent form from refreshing immediately
// 
  // const flightsOfStairs = document.getElementById("input-stairs").value
  // const minutesActive = document.getElementById("input-minutes").value
  // const numSteps = document.getElementById("input-steps").value
// 
  // let newActivityData = {
    // userID: id, //currentuser.id
    // date: day, //date.now()
    // flightsOfStairs: flightsOfStairs,
    // minutesActive: minutesActive,
    // numSteps: numSteps
  // }
// 
    //  fetch(`http://localhost:3001/api/v1/activity`, {
        // method: "POST",
        // body: JSON.stringify(newActivityData),
        // headers: {
            // "Content-Type": "application/json"
        // }
    // })
    // .then(response => response.json())
    // .then(data => console.log(data))
    // .catch(error => console.log('ERROR', error))
// 
  // fetchActivity() // might need to split up functions?
// })

activityButton.addEventListener('click', () => {
  activityForm()
})