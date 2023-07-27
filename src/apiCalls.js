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

export const postActivityData = (test) => {
    return fetch(`http://localhost:3001/api/v1/activity`, {
        method: "POST",
        body: JSON.stringify(test),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log('ERROR', error))
}
