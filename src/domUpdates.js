//NOTE: Your DOM manipulation will occur in this file
import { userData } from './data/users';
import { getUserData } from './scripts';
import { randomNum } from './helper-functions';

//Here are 2 example functions just to demonstrate one way you can export/import between the two js files. You'll want to delete these once you get your own code going.




// As a user, I should be able to view an info card with all of my info on the page
// window.addEventListener('load', displayRandomUser)

const displayRandomUser = () => {
  const userInfoContainer = document.querySelector('.user-info')
  const randomIndex = 5
  // console.log(userData)
  const rU = getUserData(randomIndex)
  
  userInfoContainer.innerText = rU[0].name
}
displayRandomUser()



// As a user, I should be able to see my first name somewhere prominently on the page to welcome me




// As a user, I should be able to see how my step goal compares to the average step goal amongst all users (this display should not be hard-coded)

export {
  displayRandomUser
}