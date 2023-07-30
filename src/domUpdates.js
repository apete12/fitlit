const dayjs = require('dayjs');

import { 
  getDailyMilesWalked, 
  checkIfStepGoalWasMade, 
  getDailySteps,
  getActiveMinutes,
} from './data-model/activity-data';

import {
  getTodaysDate,
  getStatsByWeek
} from '../src/data-model/helper-functions';

import {
  getUserData, 
  getAvgSteps, 
  generateRandomUser,
} from '../src/data-model/user-data';

import {
  getOuncesByDay,
  getOuncesByWeek,
} from '../src/data-model/hydration-data';

import {
  getAvgHoursSlept,
  getAvgSleepQuality,
  getSleepAmountByDay,
  getWeeklySleepQualityStats,
  getWeeklySleepHoursStats,
} from '../src/data-model/sleep-data';

import {
  dataModel
}from '../src/scripts';

var currentUser;

// Query Selectors:
// users
var userInfoContainer = document.querySelector('.user-info');
var welcomeHeading = document.querySelector('.welcome-heading');
var friendList = document.querySelector('.friend-list')
var gateInfo = document.querySelector('.gate-info')
// hydration
var dailyHydrationStats = document.querySelector('.daily-hydration-stats')
var weeklyHydrationStats = document.querySelector('.weekly-hydration-stats')
// activity
var usersStepGoal = document.querySelector('.all-users-step-goal')
var dailyStepCount = document.querySelector('.daily-steps')
var dailyActiveMinutes = document.querySelector('.daily-active-minutes')
var weeklyStepCountGoal = document.querySelector('.weekly-step-count-goal')
var milesWalkedByDay = document.querySelector('.todays-miles-walked')
var activityNotes = document.querySelector('.display-notes-container')

// sleep
var weeklySleepStats = document.querySelector('.weekly-sleep-stats')
var sleepStatsByDay = document.querySelector('.today-sleep-stats')
var avgAllTimeSleepStats = document.querySelector('.all-time-sleep-stats-container')
var activityButton = document.querySelector('.new-activity-data')
var activityNotesButton = document.getElementById('activity-notes-submit')

// USER INFO
const displayRandomUser = (currentUser) => {
  let wholeName = currentUser.name
  let firstNameOnly = wholeName.split(' ')

  welcomeHeading.innerText = `Welcome ${firstNameOnly[0]}!`

  userInfoContainer.innerHTML = ` 
    <section>User ID: ${currentUser.id}</section>
    <section>Name: ${currentUser.name}</section>
    <section>Address: ${currentUser.address}</section>
    <section>Email: ${currentUser.email}</section>
  `
  gateInfo.innerHTML = `
    <div class="stride-length-container">
      <section>Stride Length: ${currentUser.strideLength}</section>
    </div>
    <div class="daily-step-goal-container">
      <section>Daily Step Goal: ${currentUser.dailyStepGoal}</section>
    </div>
    `
}

const displayFriendList = (dataModel) => {
  let friendsNames = dataModel.currentUser.friends.map((id) => {
    let userFriendDetails = getUserData(id, dataModel.user)
    return userFriendDetails.name
  }).join(', ') 
  
  friendList.innerHTML = `
    <section>${friendsNames}</section>
    `
}

// HYDRATION INFO
const displayDailyHydrationStats = (dataModel) => {
  let todaysDate = getOuncesByWeek(dataModel.currentUser.id, dataModel.hydration)
  let todaysOunces = getOuncesByDay(dataModel.currentUser.id, todaysDate.dates[6], dataModel.hydration)
  
  dailyHydrationStats.innerHTML = ` 
    <section class="daily-water-sentences">Today, you've consumed ${todaysOunces} ounces of water!</section>
    `
}

const displayWeeklyHydrationStats = (dataModel) => {
  let weeklyOzArray = getOuncesByWeek(dataModel.currentUser.id, dataModel.hydration)
  let weeklyHydrationPerDay = weeklyOzArray.dates
  let formattedDay = weeklyHydrationPerDay.map((day) => {
    return dayjs(day).format('ddd D')
  }) 
  
  weeklyHydrationStats.innerHTML = `
    <section class="last-week date labels">Date</section>
    <section class="last-week date"> ${formattedDay[0]}</section>
    <section class="last-week date"> ${formattedDay[1]}</section>
    <section class="last-week date"> ${formattedDay[2]}</section>
    <section class="last-week date"> ${formattedDay[3]}</section>
    <section class="last-week date"> ${formattedDay[4]}</section>
    <section class="last-week date"> ${formattedDay[5]}</section>
    <section class="last-week-last date"> ${formattedDay[6]}</section>
    <section class="last-week date labels round">Oz.</section>
    <section class="data">${weeklyOzArray.ounces[0]}</section>
    <section class="data">${weeklyOzArray.ounces[1]}</section>
    <section class="data">${weeklyOzArray.ounces[2]}</section>
    <section class="data">${weeklyOzArray.ounces[3]}</section>
    <section class="data">${weeklyOzArray.ounces[4]}</section>
    <section class="data">${weeklyOzArray.ounces[5]}</section>
    <section class="data-last data">${weeklyOzArray.ounces[6]}</section>
 `
}

// SLEEP INFO
const displayTodaysSleepData = (dataModel, dataList) => {
  let todaysDate = getTodaysDate(dataModel.currentUser.id, dataModel.sleep)
  const todaysSleepQuantity = getSleepAmountByDay(dataModel.currentUser.id, todaysDate.date, dataModel.sleep)

  sleepStatsByDay.innerHTML = ` 
    <section>Today, you slept ${todaysSleepQuantity} hours!</section>
  `
}

const displayAllTimeAvgSleepHoursAndQuality = (dataModel) => {
  let avgSleepQuality = getAvgSleepQuality(dataModel.currentUser.id, dataModel.sleep)
  let avgSleepHours = getAvgHoursSlept(dataModel.currentUser.id, dataModel.sleep)
  
  avgAllTimeSleepStats.innerHTML = `
    <div class="all-time-sleep-quality-container">
      <section>All-Time Avg Sleep Quality: ${avgSleepQuality}</section>
    </div>
    <div class="all-time-sleep-hours-container">
      <section>All-Time Avg Hours Slept: ${avgSleepHours}</section>
    </div>
  `
}

const displayWeeklySleepHoursAndQuality = (dataModel) => {
  let todaysDate = getTodaysDate(dataModel.currentUser.id, dataModel.sleep);
  let weeklySleepQualStats = getWeeklySleepQualityStats(dataModel.currentUser.id, dataModel.sleep, todaysDate.date)
  let weeklySleepHoursStats = getWeeklySleepHoursStats(dataModel.currentUser.id, dataModel.sleep, todaysDate.date)
  
  let formattedDay = weeklySleepHoursStats.day.map((day) => {
    return dayjs(day).format('ddd D')
  })
  
  weeklySleepStats.innerHTML = `
    <section class="last-week date lables">Date</section>
    <section class="last-week date"> ${formattedDay[0]}</section>
    <section class="last-week date"> ${formattedDay[1]}</section>
    <section class="last-week date"> ${formattedDay[2]}</section>
    <section class="last-week date"> ${formattedDay[3]}</section>
    <section class="last-week date"> ${formattedDay[4]}</section>
    <section class="last-week date"> ${formattedDay[5]}</section>
    <section class="last-week-last date"> ${formattedDay[6]}</section>

    <section class="last-week date lables">Hours</section>
    <section class="data">${weeklySleepHoursStats.sleepHours[0]}</section>
    <section class="data">${weeklySleepHoursStats.sleepHours[1]}</section>
    <section class="data">${weeklySleepHoursStats.sleepHours[2]}</section>
    <section class="data">${weeklySleepHoursStats.sleepHours[3]}</section>
    <section class="data">${weeklySleepHoursStats.sleepHours[4]}</section>
    <section class="data">${weeklySleepHoursStats.sleepHours[5]}</section>
    <section class="data-last data">${weeklySleepHoursStats.sleepHours[6]}</section>

    <section class="last-week date lables">Quality Rating</section>
    <section class="data">${weeklySleepQualStats.sleepQuality[0]}</section>
    <section class="data">${weeklySleepQualStats.sleepQuality[1]}</section>
    <section class="data">${weeklySleepQualStats.sleepQuality[2]}</section>
    <section class="data">${weeklySleepQualStats.sleepQuality[3]}</section>
    <section class="data">${weeklySleepQualStats.sleepQuality[4]}</section>
    <section class="data">${weeklySleepQualStats.sleepQuality[5]}</section>
    <section class="data-last data">${weeklySleepQualStats.sleepQuality[6]}</section>
 `
}

// ACTIVITY INFO

const displayAverageSteps = (array) => {
  let avgSteps = getAvgSteps(array)

  usersStepGoal.innerHTML = `
    All users step goal: ${avgSteps}
  `
 }

const displayDailySteps = (dataModel) => {
  let todaysDate = getTodaysDate(dataModel.currentUser.id, dataModel.activity)
  let todaysStepCount = getDailySteps(dataModel.currentUser.id, todaysDate.date, dataModel.activity)
  dailyStepCount.innerHTML = ` 
    <section>you've walked ${todaysStepCount} steps!</section>
  `
}

const displayDailyActiveMinutes = (dataModel) => {
  let todaysDate = getTodaysDate(dataModel.currentUser.id, dataModel.activity)
  let todaysActiveMin = getActiveMinutes(dataModel.currentUser.id, todaysDate.date, dataModel.activity)
  dailyActiveMinutes.innerHTML = `
    <section>you have ${todaysActiveMin} active minutes!</section>
  `
}

const displayMilesWalkedByDay = (dataModel) => {
  let todaysDate = getTodaysDate(dataModel.currentUser.id, dataModel.activity)
  let todaysMilesWalked = getDailyMilesWalked(dataModel.currentUser.id, todaysDate.date, dataModel.user, dataModel.activity)
  milesWalkedByDay.innerHTML = ` 
    <section>you walked ${todaysMilesWalked} miles!</section>
  `
}

const displayWeeklyStepCountGoalReached = (dataModel) => {
  let today = getTodaysDate(dataModel.currentUser.id, dataModel.activity)
  let currentUserWeeklySleepData = getStatsByWeek(dataModel.currentUser.id, dataModel.activity, today.date)
  let weeklyUserDatathisone = currentUserWeeklySleepData()

  weeklyUserDatathisone.forEach((v) => {
   v.goalReached = checkIfStepGoalWasMade(dataModel.currentUser.id, v.date, dataModel.user, dataModel.activity)
  })

  console.log(weeklyUserDatathisone)

  let formattedDay = weeklyUserDatathisone.map((day) => {
    return dayjs(day.date).format('ddd D')
  })

  weeklyStepCountGoal.innerHTML = `
    <section class="last-week date lables">Date</section>
    <section class="last-week date"> ${formattedDay[0]}</section>
    <section class="last-week date"> ${formattedDay[1]}</section>
    <section class="last-week date"> ${formattedDay[2]}</section>
    <section class="last-week date"> ${formattedDay[3]}</section>
    <section class="last-week date"> ${formattedDay[4]}</section>
    <section class="last-week date"> ${formattedDay[5]}</section>
    <section class="last-week-last date"> ${formattedDay[6]}</section>

    <section class="last-week date lables"># Steps</section>
    <section class="data">${weeklyUserDatathisone[0].numSteps}</section>
    <section class="data">${weeklyUserDatathisone[1].numSteps}</section>
    <section class="data">${weeklyUserDatathisone[2].numSteps}</section>
    <section class="data">${weeklyUserDatathisone[3].numSteps}</section>
    <section class="data">${weeklyUserDatathisone[4].numSteps}</section>
    <section class="data">${weeklyUserDatathisone[5].numSteps}</section>
    <section class="data-last data">${weeklyUserDatathisone[6].numSteps}</section>

    <section class="last-week date lables">Step Goal Met?</section>
    <section class="data">${weeklyUserDatathisone[0].goalReached}</section>
    <section class="data">${weeklyUserDatathisone[1].goalReached}</section>
    <section class="data">${weeklyUserDatathisone[2].goalReached}</section>
    <section class="data">${weeklyUserDatathisone[3].goalReached}</section>
    <section class="data">${weeklyUserDatathisone[4].goalReached}</section>
    <section class="data">${weeklyUserDatathisone[5].goalReached}</section>
    <section class="data-last data">${weeklyUserDatathisone[6].goalReached}</section>
  `
}

const renderPageLoad = (dataModel) => {
displayRandomUser(dataModel.currentUser)
displayFriendList(dataModel)
displayDailyHydrationStats(dataModel)
displayWeeklyHydrationStats(dataModel)
displayTodaysSleepData(dataModel)
displayAllTimeAvgSleepHoursAndQuality(dataModel)
displayWeeklySleepHoursAndQuality(dataModel)
}

const renderActivityData = (dataModel) => {
  displayAverageSteps(dataModel.user)
  displayDailySteps(dataModel)
  displayMilesWalkedByDay(dataModel)
  displayDailyActiveMinutes(dataModel)
  displayWeeklyStepCountGoalReached(dataModel)
}

const renderActivityNotes = () => {
  const user = JSON.parse(localStorage.getItem(`${dataModel.currentUser.id}`))
  activityNotes.innerText = `Notes: \n ${user.activityType}: ${user.activityNotes}`
}

export {
  displayRandomUser,
  displayAverageSteps,
  displayFriendList,
  displayDailyHydrationStats,
  displayWeeklyHydrationStats,
  displayTodaysSleepData,
  displayAllTimeAvgSleepHoursAndQuality,
  displayDailySteps,
  displayMilesWalkedByDay,
  displayWeeklySleepHoursAndQuality,
  displayDailyActiveMinutes,
  displayWeeklyStepCountGoalReached,
  activityButton,
  renderPageLoad,
  renderActivityData,
  activityNotesButton, 
  renderActivityNotes
}