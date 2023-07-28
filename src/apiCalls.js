// let dataModel = {}

export const fetchUserData = (dataType) => { 
   return fetch(`http://localhost:3001/api/v1/${dataType}`)
    .then(res => res.json())
};

// export const postActivityData = (newActivityData) => {
//     fetch(`http://localhost:3001/api/v1/activity`, {
//         method: "POST",
//         body: JSON.stringify(newActivityData),
//         headers: {
//             "Content-Type": "application/json"
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         fetchUserData('activity')
//         .then(data => {
//             dataModel.activity = data
//         })
//     })
// }

export const promises = [
    fetchUserData('users'),
    fetchUserData('hydration'),
    fetchUserData('sleep'),
    fetchUserData('activity'),
    // postActivityData()
]
