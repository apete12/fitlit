// Your fetch requests will live here!
// export function apiCall(url) {
//   return  fetch(url)
//     .then JSON
//     .then a
// }


export const fetchUserData = (dataType) => { 
   return fetch(`https://fitlit-api.herokuapp.com/api/v1/${dataType}`)
    .then(res => res.json())
};

export const promises = [
    fetchUserData('users'),
    fetchUserData('hydration'),
    fetchUserData('sleep'),
    fetchUserData('activity')
]

// export const fetchUserData = (dataType) => { 
    // fetch(`https://fitlit-api.herokuapp.com/api/v1/${dataType}`)
    // .then(res => res.json())
    // .then(data => {
        // console.log(data)
    // })
    // .catch(error => console.log("ERROR", error));
// };

// export const getUserData = () => {
    // // return Promise.all([fetchUserData('users'), fetchUserData('sleep'), fetchUserData('hydration'), fetchUserData('activity')])
// }

// const bigAssObject = {
    // userData: fetchUserData(userData),
    // hydrationData: fetchUserData(hydrationData),
    // sleepData: fetchUserData(sleepData),
    // activityData: fetchUserData(activityData)
// }
// 

// function dosomethingapi() {
//   //checkj out promise all
//   apiCall(url)
//   .then(data, () => {
//     getUserData(data)
//   }
// }