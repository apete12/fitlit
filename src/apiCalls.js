export const fetchUserData = (dataType) => { 
   return fetch(`http://localhost:3001/api/v1/${dataType}`)
    .then(res => res.json())
};

export const promises = [
    fetchUserData('users'),
    fetchUserData('hydration'),
    fetchUserData('sleep'),
    fetchUserData('activity'),
]
