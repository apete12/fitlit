import {
    getRandomIndex,
} from '../data-model/helper-functions';

let currentUser;

const getUserData = ((userId, dataList) => {
  let filteredById = dataList.users.find(user => user.id === userId);
  
  if (!filteredById) {
    return 'Invalid User'
  }
  return filteredById
})
  
const generateRandomUser = (array) => {
  let randomUserIndex = getRandomIndex(array)
  let userDataInfo = getUserData(randomUserIndex + 1, array)
  currentUser = userDataInfo

  if (currentUser === "Invalid User") {
    return 'No Users Found'
  } else {
  return currentUser
  }
}
  
const getAvgSteps = (dataList) => {
  let sumOfSteps = dataList.users.reduce((sum, user) => {
    sum += user.dailyStepGoal
    return sum
  }, 0)

  let averageStepGoalForAllUsers = sumOfSteps / dataList.users.length
  
  return Number(averageStepGoalForAllUsers.toFixed(0))
}
  
export {
  getUserData,
  generateRandomUser,
  getAvgSteps
}