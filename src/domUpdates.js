//NOTE: Your DOM manipulation will occur in this file

import userData from './data/users';

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

// generate random ID number
const getRandomIndex = () => {
  return Math.floor(Math.random() * userData.users.length)
}

// generate random user profile
const generateRandomUser = (array) =>{
  const randomUserIndex = getRandomIndex(array)
  const userData = getUserData(randomUserIndex)

  return userData
}

// display user information
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

// display user friend list (separate box)
const displayFriendList = () => {
  const friendsNames = currentUser.friends.map((id) => {
    const userFriendDetails = getUserData(id)
    return userFriendDetails.name
  }).join(', ') 
  
  friendList.innerHTML = `<div>Friend List: ${friendsNames}</div>`
 }

 // User should be able to see average step count
const displayAverageSteps = (array) => {
  const avgSteps = getAvgSteps(array)
  activityContainer.innerText = `${avgSteps}`
 }

const displayDailyHydrationStats = () => {
  const todaysDate = calculateWeeklyOunces(currentUser.id)
  const todaysOunces = getOzByDay(currentUser.id, todaysDate.dates[6])

  dailyHydrationStats.innerHTML = ` 
<div>Today, you've consumed: ${todaysOunces} ounces of water!</div>`
}

const displayWeeklyHydrationStats = () => {
 const weeklyOzArray = calculateWeeklyOunces(currentUser.id)
 
 weeklyHydrationStats.innerHTML = `<div> Day: ${weeklyOzArray.dates}, Oz: ${weeklyOzArray.ounces}`
}


export {
  displayRandomUser,
  displayAverageSteps,
  displayFriendList,
  displayDailyHydrationStats,
  displayWeeklyHydrationStats
}