// On load, a user should be chosen at random.

import userData from './data/users';

const randomNum = () => {
    // console.log('look at me', userData)
    return Math.floor(Math.random() * userData.length)
  }

  export {
    randomNum
  }