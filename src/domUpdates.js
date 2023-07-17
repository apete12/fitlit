const dayjs = require('dayjs')

import { 
  userInfoContainer,
  welcomeHeading,
  friendList,
  dailyHydrationStats,
  weeklyHydrationStats,
  sleepStatsByDay,
  avgAllTimeSleepStats,
  weeklySleepStats,
  usersStepGoal,
  milesWalkedByDay,
  dailyActiveMinutes,
  dailyStepCount,
  weeklyStepCountGoal
} from './scripts';

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
  getWeeklySleepHoursStats
} from '../src/data-model/sleep-data';

var currentUser

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
    <section class="data-last data">${weeklyOzArray.ounces[6]}oz</section>
 `
}



 // SLEEP INFO
const displayTodaysSleepData = (dataList) => {

  let todaysDate = getTodaysDate(currentUser.id, dataList);
  const todaysSleepQuantity = getSleepAmountByDay(currentUser.id, todaysDate.date, dataList);

  sleepStatsByDay.innerHTML = ` 
  <div>Today, you slept ${todaysSleepQuantity} hours!</div>`
}

const displayAllTimeAvgSleepHoursAndQuality = (dataList) => {
  let avgSleepQuality = getAvgSleepQuality(currentUser.id, dataList)
  let avgSleepHours = getAvgHoursSlept(currentUser.id, dataList)
  
  avgAllTimeSleepStats.innerHTML = `<div>All-Time Avg Sleep Quality: ${avgSleepQuality}</div>
  <div>All-Time Avg Hours Slept: ${avgSleepHours}</div>`
}

const displayWeeklySleepHoursAndQuality = (dataList) => {
  let todaysDate = getTodaysDate(currentUser.id, dataList);

  let weeklySleepQualStats = getWeeklySleepQualityStats(currentUser.id, dataList, todaysDate.date)
  let weeklySleepHoursStats = getWeeklySleepHoursStats(currentUser.id, dataList, todaysDate.date)

  let formattedDay = weeklySleepHoursStats.day.map((day) => {
    return dayjs(day).format('ddd D')
  })
  weeklySleepStats.innerHTML = `
 <div class="last-week"> ${formattedDay[0]}</div>
 <div class="last-week"> ${formattedDay[1]}</div>
 <div class="last-week"> ${formattedDay[2]}</div>
 <div class="last-week"> ${formattedDay[3]}</div>
 <div class="last-week"> ${formattedDay[4]}</div>
 <div class="last-week"> ${formattedDay[5]}</div>
 <div class="last-week-last"> ${formattedDay[6]}</div>

 <div class="oz">${weeklySleepHoursStats.sleepHours[0]} Hrs</div>
 <div class="oz">${weeklySleepHoursStats.sleepHours[1]} Hrs</div>
 <div class="oz">${weeklySleepHoursStats.sleepHours[2]} Hrs</div>
 <div class="oz">${weeklySleepHoursStats.sleepHours[3]} Hrs</div>
 <div class="oz">${weeklySleepHoursStats.sleepHours[4]} Hrs</div>
 <div class="oz">${weeklySleepHoursStats.sleepHours[5]} Hrs</div>
 <div class="oz-last">${weeklySleepHoursStats.sleepHours[6]} Hrs</div>

 <div class="oz">${weeklySleepQualStats.sleepQuality[0]} Qlty</div>
<div class="oz">${weeklySleepQualStats.sleepQuality[1]} Qlty</div>
<div class="oz">${weeklySleepQualStats.sleepQuality[2]} Qlty</div>
<div class="oz">${weeklySleepQualStats.sleepQuality[3]} Qlty</div>
<div class="oz">${weeklySleepQualStats.sleepQuality[4]} Qlty</div>
<div class="oz">${weeklySleepQualStats.sleepQuality[5]} Qlty</div>
<div class="oz-last">${weeklySleepQualStats.sleepQuality[6]} Qlty</div>
 
 `
}

// ACTIVITY INFO
const displayAverageSteps = (array) => {
  let avgSteps = getAvgSteps(array)
  usersStepGoal.innerHTML = `All users step goal: ${avgSteps}`
 }

const displayDailySteps = (dataList) => {
  let todaysDate = getTodaysDate(currentUser.id, dataList);
  let todaysStepCount = getDailySteps(currentUser.id, todaysDate.date, dataList);

  dailyStepCount.innerHTML = ` 
  <div>Today, you've walked ${todaysStepCount} steps!</div>
  `
}
const displayDailyActiveMinutes = (dataList) => {
  let todaysDate = getTodaysDate(currentUser.id, dataList);
  let todaysActiveMin = getActiveMinutes(currentUser.id, todaysDate.date, dataList);

  dailyActiveMinutes.innerHTML = `
  <div>Today, you have ${todaysActiveMin} active minutes!</div>
  `
}

const displayMilesWalkedByDay = (dataList1, dataList2) => {
  let todaysDate = getTodaysDate(currentUser.id, dataList2)
  let todaysMilesWalked = getDailyMilesWalked(currentUser.id, todaysDate.date, dataList1, dataList2)

  milesWalkedByDay.innerHTML = ` 
  <div>Today, you walked ${todaysMilesWalked} miles!</div>`
}


const displayWeeklyStepCountGoalReached = (dataList1, dataList2) => {
  let today = getTodaysDate(currentUser.id, dataList2)

  let currentUserWeeklySleepData = getStatsByWeek(currentUser.id, dataList2, today.date)
  let weeklyUserDatathisone = currentUserWeeklySleepData()


  ///////////////////////// needs to go in dataModel file//////////////////////
  weeklyUserDatathisone.forEach((v) => {
   v.goalReached = checkIfStepGoalWasMade(currentUser.id, v.date, dataList1, dataList2)

  })
  ////////////////////////////////////////////////////////////////////////////////

  let formattedDay = weeklyUserDatathisone.map((day) => {
    return dayjs(day.date).format('ddd D')
  })

  weeklyStepCountGoal.innerHTML = `
  <div class="last-week"> ${formattedDay[0]}</div>
  <div class="last-week"> ${formattedDay[1]}</div>
  <div class="last-week"> ${formattedDay[2]}</div>
  <div class="last-week"> ${formattedDay[3]}</div>
  <div class="last-week"> ${formattedDay[4]}</div>
  <div class="last-week"> ${formattedDay[5]}</div>
  <div class="last-week-last"> ${formattedDay[6]}</div>

  <div class="oz">${weeklyUserDatathisone[0].numSteps}</div>
  <div class="oz">${weeklyUserDatathisone[1].numSteps}</div>
  <div class="oz">${weeklyUserDatathisone[2].numSteps}</div>
  <div class="oz">${weeklyUserDatathisone[3].numSteps}</div>
  <div class="oz">${weeklyUserDatathisone[4].numSteps}</div>
  <div class="oz">${weeklyUserDatathisone[5].numSteps}</div>
  <div class="oz-last">${weeklyUserDatathisone[6].numSteps}</div>

  <div class="oz">${weeklyUserDatathisone[0].goalReached}</div>
  <div class="oz">${weeklyUserDatathisone[1].goalReached}</div>
  <div class="oz">${weeklyUserDatathisone[2].goalReached}</div>
  <div class="oz">${weeklyUserDatathisone[3].goalReached}</div>
  <div class="oz">${weeklyUserDatathisone[4].goalReached}</div>
  <div class="oz">${weeklyUserDatathisone[5].goalReached}</div>
  <div class="oz-last">${weeklyUserDatathisone[6].goalReached}</div>
  `
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
  displayWeeklyStepCountGoalReached
}