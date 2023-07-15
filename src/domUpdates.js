const dayjs = require('dayjs')
//NOTE: Your DOM manipulation will occur in this file

// import userData from './data/users';
// import userHydrationData from './data/hydration'

import { 
  // query selectors:
  userInfoContainer,
  activityContainer,
  welcomeHeading,
  friendList,
  dailyHydrationStats,
  weeklyHydrationStats,
  sleepStatsByDay,
  dailyStepCount,
  usersStepGoal,
  weeklyStepCountGoal
} from './scripts';

import {
  calculateWeeklyOunces,
  getUserData, 
  getAvgSteps,
  getAvgOunces,
  getOzByDay,
  getRandomIndex,
  generateRandomUser,
  getTodaysDate,
  sleepAmountByDay,
  getDailySteps
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
 <div class="last-week-last"> ${formattedDay[5]}</div>
 <div class="oz">${weeklyOzArray.ounces[0]}oz</div>
 <div class="oz">${weeklyOzArray.ounces[1]}oz</div>
 <div class="oz">${weeklyOzArray.ounces[2]}oz</div>
 <div class="oz">${weeklyOzArray.ounces[3]}oz</div>
 <div class="oz">${weeklyOzArray.ounces[4]}oz</div>
 <div class="oz-last">${weeklyOzArray.ounces[5]}oz</div>
 `
}

const displayTodaysSleepData = (dataList) => {
  let todaysDate = getTodaysDate(currentUser.id, dataList);
  const todaysSleepQuantity = sleepAmountByDay(currentUser.id, todaysDate, dataList);

  sleepStatsByDay.innerHTML = ` 
  <div>Today, you slept ${todaysSleepQuantity} hours!</div>`
}

const displayAverageSteps = (array) => {
  const avgSteps = getAvgSteps(array)
  usersStepGoal.innerHTML = `All users step goal: ${avgSteps}`
 }

const displayDailySteps = (dataList) => {
  let todaysDate = getTodaysDate(currentUser.id, dataList);
  const todaysStepCount = getDailySteps(currentUser.id, todaysDate, dataList);

  dailyStepCount.innerHTML = ` 
  <div>Today, you've walked ${todaysStepCount} steps!</div>
  `
}

export {
  displayRandomUser,
  displayAverageSteps,
  displayFriendList,
  displayDailyHydrationStats,
  displayWeeklyHydrationStats,
  displayTodaysSleepData,
  displayDailySteps,
}