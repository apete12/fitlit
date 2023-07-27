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
// sleep
var weeklySleepStats = document.querySelector('.weekly-sleep-stats')
var sleepStatsByDay = document.querySelector('.today-sleep-stats')
var avgAllTimeSleepStats = document.querySelector('.all-time-sleep-stats-container')
var activityStatsDiv = document.querySelector('.health-stats-activity-sentences')
var activityButton = document.querySelector('.new-activity-data')
var dailyStepsContainer = document.querySelector('.daily-steps-container')
var dailyActiveMinContainer = document.querySelector('.daily-active-min-container')
var dailyMilesContainer = document.querySelector('.daily-miles-container')

// USER INFO
const displayRandomUser = (array) => {
  currentUser = generateRandomUser(array)
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

const displayFriendList = (array) => {
  let friendsNames = currentUser.friends.map((id) => {
    let userFriendDetails = getUserData(id, array)
    return userFriendDetails.name
  }).join(', ') 
  
  friendList.innerHTML = `
    <section>${friendsNames}</section>
    `
}

// HYDRATION INFO
const displayDailyHydrationStats = (array) => {
  let todaysDate = getOuncesByWeek(currentUser.id, array)
  let todaysOunces = getOuncesByDay(currentUser.id, todaysDate.dates[6], array)
  
  dailyHydrationStats.innerHTML = ` 
    <section class="daily-water-sentences">Today, you've consumed ${todaysOunces} ounces of water!</section>
    `
}

const displayWeeklyHydrationStats = (array) => {
  let weeklyOzArray = getOuncesByWeek(currentUser.id, array)
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
const displayTodaysSleepData = (dataList) => {
  let todaysDate = getTodaysDate(currentUser.id, dataList)
  const todaysSleepQuantity = getSleepAmountByDay(currentUser.id, todaysDate.date, dataList)

  sleepStatsByDay.innerHTML = ` 
    <section>Today, you slept ${todaysSleepQuantity} hours!</section>
  `
}

const displayAllTimeAvgSleepHoursAndQuality = (dataList) => {
  let avgSleepQuality = getAvgSleepQuality(currentUser.id, dataList)
  let avgSleepHours = getAvgHoursSlept(currentUser.id, dataList)
  
  avgAllTimeSleepStats.innerHTML = `
    <div class="all-time-sleep-quality-container">
      <section>All-Time Avg Sleep Quality: ${avgSleepQuality}</section>
    </div>
    <div class="all-time-sleep-hours-container">
      <section>All-Time Avg Hours Slept: ${avgSleepHours}</section>
    </div>
  `
}

const displayWeeklySleepHoursAndQuality = (dataList) => {
  let todaysDate = getTodaysDate(currentUser.id, dataList);
  let weeklySleepQualStats = getWeeklySleepQualityStats(currentUser.id, dataList, todaysDate.date)
  let weeklySleepHoursStats = getWeeklySleepHoursStats(currentUser.id, dataList, todaysDate.date)
  
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
// activityButton.addEventListener('click', activityForm())



const displayAverageSteps = (array) => {
  let avgSteps = getAvgSteps(array)

  usersStepGoal.innerHTML = `
    All users step goal: ${avgSteps}
  `
 }

const displayDailySteps = (dataList) => {
  let todaysDate = getTodaysDate(currentUser.id, dataList)
  let todaysStepCount = getDailySteps(currentUser.id, todaysDate.date, dataList)

  dailyStepCount.innerHTML = ` 
    <section>you've walked ${todaysStepCount} steps!</section>
  `
}

const displayDailyActiveMinutes = (dataList) => {
  let todaysDate = getTodaysDate(currentUser.id, dataList)
  let todaysActiveMin = getActiveMinutes(currentUser.id, todaysDate.date, dataList)

  dailyActiveMinutes.innerHTML = `
    <section>you have ${todaysActiveMin} active minutes!</section>
  `
}

const displayMilesWalkedByDay = (dataList1, dataList2) => {
  let todaysDate = getTodaysDate(currentUser.id, dataList2)
  let todaysMilesWalked = getDailyMilesWalked(currentUser.id, todaysDate.date, dataList1, dataList2)

  milesWalkedByDay.innerHTML = ` 
    <section>you walked ${todaysMilesWalked} miles!</section>
  `
}

const displayWeeklyStepCountGoalReached = (dataList1, dataList2) => {
  let today = getTodaysDate(currentUser.id, dataList2)
  let currentUserWeeklySleepData = getStatsByWeek(currentUser.id, dataList2, today.date)
  let weeklyUserDatathisone = currentUserWeeklySleepData()

  weeklyUserDatathisone.forEach((v) => {
   v.goalReached = checkIfStepGoalWasMade(currentUser.id, v.date, dataList1, dataList2)
  })

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

// activityButton.addEventListener('click', activityForm())

const activityForm = () => {
  dailyStepsContainer.classList.add('hidden')
  dailyActiveMinContainer.classList.add('hidden')
  dailyMilesContainer.classList.add('hidden')
  activityStatsDiv.innerHTML = ''

  activityStatsDiv.innerHTML += `
  <form class="activity-form">
    <div class="daily-steps-self-input">
      <label for="daily-steps-input">Steps</label>
      <input type="number" name="daily-steps-input" value="0" min="0" max = "100000">
    </div>
    <div class="daily-active-mins-self-input">
      <label for="daily-active-mins-input">Minutes</label>
      <input type="number" name="daily-active-mins-input" value="0" min="0" max="300">
    </div>
    <div class="daily-stairs-flights-self-input"> 
      <label for="daily-stairs-flights-input">Flights</label>
      <input type="number" name="daily-stairs-flights-input" value="0" min="0" max="500">
    </div>
    <input class="submit-button" type="submit" value="Submit">
  </form>`
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
  activityForm,
  activityButton
}