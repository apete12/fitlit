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
  activityButton,
  renderPageLoad
} from './domUpdates';

import {
  promises,
  fetchUserData,
  // postActivityData
} from './apiCalls'
import { generateRandomUser } from './data-model/user-data';



var dailyStepsContainer = document.querySelector('.daily-steps-container')
var dailyActiveMinContainer = document.querySelector('.daily-active-min-container')
var dailyMilesContainer = document.querySelector('.daily-miles-container')

let dataModel = {}

let testData = {
  userID: 1,
  date: '2023/07/02', 
  flightsOfStairs: 1, 
  minutesActive: 23, 
  numSteps: 23
}

// Event listener:
window.addEventListener('load', () => {
  Promise.all(promises)
  .then(results => {
    dataModel.user = results[0]
    dataModel.activity = results[3]
    dataModel.hydration = results[1]
    dataModel.sleep = results[2]
    dataModel.currentUser = generateRandomUser(dataModel.user)
    console.log('dataModel', dataModel)
    console.log('cu', dataModel.currentUser)
  })
  .then(data => {
    renderPageLoad(dataModel)
  })
  .catch(error => console.log('ERROR', error))
})

activityButton.addEventListener('click', () => {
  activityForm()
})


document.addEventListener('click', (e) => {
  e.preventDefault()
  const targetElement = e.target;
  if (targetElement.id === 'activity-details-submit') {
    
    const flightsOfStairs = document.getElementById("input-stairs").value
    const minutesActive = document.getElementById("input-minutes").value
    const numSteps = document.getElementById("input-steps").value
    
    let newActivityData = {
      userID: dataModel.currentUser.id,
      date: '3000/12/12',
      flightsOfStairs: flightsOfStairs,
      minutesActive: minutesActive,
      numSteps: numSteps
    }
    
    const submitform = document.getElementById('activity-form')
    
    dailyStepsContainer.classList.remove('hidden')
    dailyActiveMinContainer.classList.remove('hidden')
    dailyMilesContainer.classList.remove('hidden')
    submitform.classList.add('hidden')


    postActivityData(newActivityData)
    console.log('udm', dataModel)
  }
});

const postActivityData = (newActivityData) => {
  fetch(`http://localhost:3001/api/v1/activity`, {
      method: "POST",
      body: JSON.stringify(newActivityData),
      headers: {
          "Content-Type": "application/json"
      }
  })
  .then(response => response.json())
  .then(data => {
      fetchUserData('activity')
      .then(data => {
          dataModel.activity = data
      })
  })
}


