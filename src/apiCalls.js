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
