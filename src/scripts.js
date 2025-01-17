import './css/styles.css'
import './images/a-step-in-the-right-direction.jpg'
import './images/stretching-exercises.png'
import './images/run.png'
import './images/a-step-in-the-right-direction.png'

import { 
  renderPageLoad,
  renderActivityData,
  activityNotesButton,
  renderActivityNotes
} from './domUpdates'

import {
  promises,
  fetchUserData,
} from './apiCalls'

import { generateRandomUser } from './data-model/user-data'

var dailyStepsContainer = document.querySelector('.daily-steps-container')
var dailyActiveMinContainer = document.querySelector('.daily-active-min-container')
var dailyMilesContainer = document.querySelector('.daily-miles-container')
var activityNotesInputContainer = document.querySelector('.form-container')

var dataModel = {}

// Event listeners:
window.addEventListener('load', () => {
  Promise.all(promises)
  .then(results => {
    dataModel.user = results[0]
    dataModel.activity = results[3]
    dataModel.hydration = results[1]
    dataModel.sleep = results[2]
    dataModel.currentUser = generateRandomUser(dataModel.user)
  })
  .then(data => {
    renderPageLoad(dataModel)
    renderActivityData(dataModel)

    let localStorageKeys = Object.keys(localStorage)
    const currentUserNotesMatches = localStorageKeys.map((user) => {
      if (dataModel.currentUser.id === parseInt(user)) {
      renderActivityNotes()
      } 
    })
  })
  .catch(error => console.log('ERROR', error))
})

document.addEventListener('click', (e) => {
  e.preventDefault()
  const targetElement = e.target
  if (targetElement.id === 'activity-details-submit') {
    
    const flightsOfStairs = document.getElementById("daily-stairs-flights-input").value
    const minutesActive = document.getElementById("daily-active-mins-input").value
    const numSteps = document.getElementById("daily-steps-input").value
    
    let newActivityData = {
      userID: dataModel.currentUser.id,
      date: '2023/07/02',
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
  }
})

const postActivityData = (newActivityData) => {
  return fetch(`http://localhost:3001/api/v1/activity`, {
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
          renderActivityData(dataModel)
      })
  })
}

activityNotesButton.addEventListener('click', () => {
  let activityNotesType = document.getElementById('activity-notes-type-id').value
  let activityNotesDesc = document.getElementById('activity-notes-desc-id').value

  const storedLocalStorageData = JSON.parse(localStorage.getItem(dataModel.currentUser.id))
  
  let notesObject = {
    activityType: [],
    activityNotes: []
  }

  if (storedLocalStorageData) {
    storedLocalStorageData.activityType.push(activityNotesType)  
    storedLocalStorageData.activityNotes.push(activityNotesDesc)
    window.localStorage.setItem(dataModel.currentUser.id, JSON.stringify(storedLocalStorageData))
    renderActivityNotes()
  } else {
    notesObject.activityType.push(activityNotesType)  
    notesObject.activityNotes.push(activityNotesDesc)
    window.localStorage.setItem(dataModel.currentUser.id, JSON.stringify(notesObject))
    renderActivityNotes()
  }

  activityNotesInputContainer.innerHTML = ''
  activityNotesInputContainer.innerHTML = `
  <img class="replacement-form-image" src="images/run.png" alt="a step in the right direction logo">
  <img class="replacement-form-image" src="images/run.png" alt="a step in the right direction logo">
  <img class="replacement-form-image" src="images/run.png" alt="a step in the right direction logo">
  `
})

export { dataModel } 