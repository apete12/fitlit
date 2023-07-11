//NOTE: Your DOM manipulation will occur in this file

import userData from './data/users';
import { 
  // query selectors:
  userInfoContainer,
  activityContainer,
  welcomeHeading,
  // functions
  getUserData, 
  getAvgSteps,
} from './scripts';


// On load, a user should be chosen at random.
const getRandomUser = () => {
  return Math.floor(Math.random() * userData.users.length)
}

// Users should be able to view info card with all of info on the page
const displayRandomUser = (array) => {
  // var userInfoContainer = document.querySelector('.user-info');
  // var welcomeHeading = document.querySelector('.welcome-heading');

  const randomUserIndex = getRandomUser(array)
  const randomUser = getUserData(randomUserIndex)
  let wholeName = randomUser.name
  let firstNameOnly = wholeName.split(' ')

  welcomeHeading.innerText = `Welcome ${firstNameOnly[0]}!`

  const friendsNames = randomUser.friends.map((id) => {
    const userFriendDetails = getUserData(id)
    return userFriendDetails.name
  }).join(', ') 

  userInfoContainer.innerHTML = ` 

    <div>User ID: ${randomUser.id}</div>
    <div>Name: ${randomUser.name}</div>
    <div>Address: ${randomUser.address}</div>
    <div>Email: ${randomUser.email}</div>
    <div>Stride Length: ${randomUser.strideLength}</div>
    <div>Daily Step Goal: ${randomUser.dailyStepGoal}</div>
    <div>Friend List: ${friendsNames}</div>
  `
}

const displayAverageSteps = (array) => {
  // var activityContainer = document.querySelector('.activity')

  const avgSteps = getAvgSteps(array)
  activityContainer.innerText = `${avgSteps}`
 }


export {
  displayRandomUser,
  displayAverageSteps,
  // userInfoContainer,
  // activityContainer,
  // welcomeHeading,
}

// semantic inner html, add classes, css
{/* <section>User ID: ${randomUser.id}</section> */}
{/* <section>Name: ${randomUser.name}</section> */}
{/* <section>Address: ${randomUser.address}</section> */}
{/* <section>Email: ${randomUser.email}</section> */}
{/* <section>Stride Length: ${randomUser.strideLength}</section> */}
{/* <section>Daily Step Goal: ${randomUser.dailyStepGoal}</section> */}
{/* <section>Friend List: ${randomUser.friends}</section> */}