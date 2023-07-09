// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********


// An example of how you tell webpack to use a CSS file
// import './css/styles.css';


// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// // An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png';

// // An example of how you tell webpack to use a JS file
import userData from './data/users';
// console.log("User Data:", userData);

// Example of one way to import functions from the domUpdates file.  You will delete these examples.
// import { exampleFunction1, exampleFunction2 } from './domUpdates';

// return user data based on id
// need parameter to pass through 
// argument would be user id 
// search through array for user id
// return user data / object

export const getUserData = ((userId, userArray) => {
    const filteredById = userArray.filter(user => user.id === userId);
    return filteredById
    // returns array with user object in it
}); 

// exampleFunction1('Travis');
// exampleFunction2('Travis')



export const getAvgSteps = (allUsers) => {
  const sumOfSteps = allUsers.reduce((sum, user) => {
    sum += user.dailyStepGoal
    return sum
  }, 0)
  return sumOfSteps / allUsers.length
}
// console.log(getAvgSteps(sampleData))

// test