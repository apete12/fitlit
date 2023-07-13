//NOTE: Your DOM manipulation will occur in this file

import userData from './data/users';
import userHydrationData from './data/hydration'

import { 
  // query selectors:
  userInfoContainer,
  activityContainer,
  welcomeHeading,
  friendList,
  dailyHydrationStats,
  weeklyHydrationStats
} from './scripts';

import {
  calculateWeeklyOunces,
  getUserData, 
  getAvgSteps,
  getAvgOunces,
  getOzByDay,
} from './dataModel';


var currentUser;
const dayjs = require('dayjs')


const getRandomIndex = () => {
  return Math.floor(Math.random() * userData.users.length)
}

const generateRandomUser = (array) =>{
  const randomUserIndex = getRandomIndex(array)
  const userDataInfo = getUserData(randomUserIndex, userData)

  return userDataInfo
}

const displayRandomUser = (array) => {
  currentUser = generateRandomUser(userData)
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

const displayFriendList = () => {
  const friendsNames = currentUser.friends.map((id) => {
    const userFriendDetails = getUserData(id, userData)
    return userFriendDetails.name
  }).join(', ') 
  
  friendList.innerHTML = `<div>Friend List: ${friendsNames}</div>`
 }

const displayAverageSteps = () => {
  const avgSteps = getAvgSteps(userData)
  activityContainer.innerText = `${avgSteps}`
 }

const displayDailyHydrationStats = () => {
  const todaysDate = calculateWeeklyOunces(currentUser.id, userHydrationData)
  const todaysOunces = getOzByDay(currentUser.id, todaysDate.dates[6], userHydrationData)

  dailyHydrationStats.innerHTML = ` 
<div>Today, you've consumed<br> ${todaysOunces} ounces of water!<br></div>`
}

const displayWeeklyHydrationStats = () => {
  const weeklyOzArray = calculateWeeklyOunces(currentUser.id, userHydrationData)
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

export {
  displayRandomUser,
  displayAverageSteps,
  displayFriendList,
  displayDailyHydrationStats,
  displayWeeklyHydrationStats
}