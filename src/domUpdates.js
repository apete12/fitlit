const dayjs = require('dayjs')
//NOTE: Your DOM manipulation will occur in this file

import { 
  // query selectors:
  // users
  userInfoContainer,
  welcomeHeading,
  friendList,
  activityContainer,
  // hydration
  dailyHydrationStats,
  weeklyHydrationStats,
  // sleep
  sleepStatsByDay,
  avgAllTimeSleepStats,
  weeklySleepStats,
  // activity
  usersStepGoal,
  weeklyStepCountGoal,
  milesWalkedByDay,
  dailyActiveMinutes,
  dailyStepCount,
} from './scripts';

import {
  // users
  getRandomIndex,
  generateRandomUser,
  getTodaysDate,
  breakDownToWeeklyStatsArray,
  // hydration
  calculateWeeklyOunces,
  getAvgOunces,
  getOzByDay,
  // sleep
  sleepAmountByDay,
  calculateUserAvgSleepQuality,
  calculateUserAvgDailyHoursSlept,
  getWeeklySleepStats,
  // activity
  getUserData, 
  getAvgSteps,
  getDailySteps,
  calculateDailyMilesWalked,
  getActiveMinutes,
  getWeeklySleepQualityStats
} from './dataModel';

var currentUser

const displayRandomUser = (array) => {
  currentUser = generateRandomUser(array)
  let wholeName = currentUser.name
  let firstNameOnly = wholeName.split(' ')

  welcomeHeading.innerText = `Welcome ${firstNameOnly[0]}!`

  userInfoContainer.innerHTML = ` 
    <div>User ID: ${currentUser.id}</div>
    <div>Name: ${currentUser.name}</div>
    <div>Address: ${currentUser.address}</div>
    <div>Email: ${currentUser.email}</div>
    <div>Stride Length: ${currentUser.strideLength}</div>
    <div>Daily Step Goal: ${currentUser.dailyStepGoal}</div>
  `
}

const displayFriendList = (array) => {
  const friendsNames = currentUser.friends.map((id) => {
    const userFriendDetails = getUserData(id, array)
    return userFriendDetails.name
  }).join(', ') 
  
  friendList.innerHTML = `<div>Friend List: ${friendsNames}</div>`
 }

const displayDailyHydrationStats = (array) => {
  const todaysDate = calculateWeeklyOunces(currentUser.id, array)
  const todaysOunces = getOzByDay(currentUser.id, todaysDate.dates[6], array)

  dailyHydrationStats.innerHTML = ` 
<div>Today, you've consumed<br> ${todaysOunces} ounces of water!<br></div>`
}

const displayWeeklyHydrationStats = (array) => {
  const weeklyOzArray = calculateWeeklyOunces(currentUser.id, array)
  const weeklyHydrationPerDay = weeklyOzArray.dates
  const formattedDay = weeklyHydrationPerDay.map((day) => {
    return dayjs(day).format('ddd D')
  }) 
  
 weeklyHydrationStats.innerHTML = `
 <div class="last-week"> ${formattedDay[0]}</div>
 <div class="last-week"> ${formattedDay[1]}</div>
 <div class="last-week"> ${formattedDay[2]}</div>
 <div class="last-week"> ${formattedDay[3]}</div>
 <div class="last-week"> ${formattedDay[4]}</div>
 <div class="last-week"> ${formattedDay[5]}</div>
 <div class="last-week-last"> ${formattedDay[6]}</div>
 <div class="oz">${weeklyOzArray.ounces[0]}oz</div>
 <div class="oz">${weeklyOzArray.ounces[1]}oz</div>
 <div class="oz">${weeklyOzArray.ounces[2]}oz</div>
 <div class="oz">${weeklyOzArray.ounces[3]}oz</div>
 <div class="oz">${weeklyOzArray.ounces[4]}oz</div>
 <div class="oz">${weeklyOzArray.ounces[5]}oz</div>
 <div class="oz-last">${weeklyOzArray.ounces[6]}oz</div>
 `
}

const displayTodaysSleepData = (dataList) => {

  let todaysDate = getTodaysDate(currentUser.id, dataList);
  const todaysSleepQuantity = sleepAmountByDay(currentUser.id, todaysDate.date, dataList);

  sleepStatsByDay.innerHTML = ` 
  <div>Today, you slept ${todaysSleepQuantity} hours!</div>`
}


const displayAllTimeAvgSleepHoursAndQuality = (dataList) => {
  const avgSleepQuality = calculateUserAvgSleepQuality(currentUser.id, dataList)
  const avgSleepHours = calculateUserAvgDailyHoursSlept(currentUser.id, dataList)
  
  avgAllTimeSleepStats.innerHTML = `<div>All-Time Avg Sleep Quality: ${avgSleepQuality}</div>
  <div>All-Time Avg Hours Slept: ${avgSleepHours}</div>`
}

const displayAverageSteps = (array) => {
  const avgSteps = getAvgSteps(array)
  usersStepGoal.innerHTML = `All users step goal: ${avgSteps}`
 }

const displayDailySteps = (dataList) => {
  let todaysDate = getTodaysDate(currentUser.id, dataList);
  const todaysStepCount = getDailySteps(currentUser.id, todaysDate.date, dataList);

  dailyStepCount.innerHTML = ` 
  <div>Today, you've walked ${todaysStepCount} steps!</div>
  `
}
const displayDailyActiveMinutes = (dataList) => {
  let todaysDate = getTodaysDate(currentUser.id, dataList);
  const todaysActiveMin = getActiveMinutes(currentUser.id, todaysDate.date, dataList);

  dailyActiveMinutes.innerHTML = `
  <div>Today, you have ${todaysActiveMin} active minutes!</div>
  `
}

const displayMilesWalkedByDay = (dataList1, dataList2) => {
  let todaysDate = getTodaysDate(currentUser.id, dataList2)
  const todaysMilesWalked = calculateDailyMilesWalked(currentUser.id, todaysDate.date, dataList1, dataList2)

  milesWalkedByDay.innerHTML = ` 
  <div>Today, you walked ${todaysMilesWalked} miles!</div>`
}

const displayWeeklySleepHoursAndQuality = (dataList) => {
  let todaysDate = getTodaysDate(currentUser.id, dataList);

  const weeklySleepQualStats = getWeeklySleepQualityStats(currentUser.id, dataList, todaysDate.date)
  const weeklySleepHoursStats = getWeeklySleepStats(currentUser.id, dataList, todaysDate.date)

  const formattedDay = weeklySleepHoursStats.day.map((day) => {
    return dayjs(day).format('ddd D')
  })
  weeklySleepStats.innerHTML = `
 <div class="last-week"> ${formattedDay[0]}</div>
 <div class="last-week"> ${formattedDay[1]}</div>
 <div class="last-week"> ${formattedDay[2]}</div>
 <div class="last-week"> ${formattedDay[3]}</div>
 <div class="last-week"> ${formattedDay[4]}</div>
 <div class="last-week-last"> ${formattedDay[5]}</div>

 <div class="oz">${weeklySleepHoursStats.sleepHours[0]}oz</div>
 <div class="oz">${weeklySleepHoursStats.sleepHours[1]}oz</div>
 <div class="oz">${weeklySleepHoursStats.sleepHours[2]}oz</div>
 <div class="oz">${weeklySleepHoursStats.sleepHours[3]}oz</div>
 <div class="oz">${weeklySleepHoursStats.sleepHours[4]}oz</div>
 <div class="oz-last">${weeklySleepHoursStats.sleepHours[5]}oz</div>

 <div class="oz">${weeklySleepQualStats.sleepQuality[0]}oz</div>
<div class="oz">${weeklySleepQualStats.sleepQuality[1]}oz</div>
<div class="oz">${weeklySleepQualStats.sleepQuality[2]}oz</div>
<div class="oz">${weeklySleepQualStats.sleepQuality[3]}oz</div>
<div class="oz">${weeklySleepQualStats.sleepQuality[4]}oz</div>
<div class="oz-last">${weeklySleepQualStats.sleepQuality[5]}oz</div>
 
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
  displayDailyActiveMinutes
}