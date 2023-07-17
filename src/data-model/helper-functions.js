const getRandomIndex = (dataList) => {
  return Math.floor(Math.random() * dataList.users.length);
}

const getTodaysDate = ((id, dataList) => {
  let today = {dataListType: '', date: null};
  
  if (dataList.hydrationData) {
    today.date = dataList.hydrationData.filter(log => log.userID === id);
    today.dataListType = 'hydration'
    
  } else if (dataList.sleepData) {
    today.date = dataList.sleepData.filter(log => log.userID === id);
    today.dataListType = 'sleep'
    
  } else if (dataList.activityData) {
    today.date = dataList.activityData.filter(log => log.userID === id);
    today.dataListType = 'activity'
  } else if (today.date === null) {
    return 'Invalid Argument'
  }
  
  today.date = today.date[today.date.length - 1].date
  
  return today
})

const getStatsByWeek = (id, dataList, startDate) => {

  const makeWeeklyArray = () => {
    let todaysDate = getTodaysDate(id, dataList);
    let dataTypeById
    
    if (todaysDate.dataListType === 'hydration') {
      dataTypeById = dataList.hydrationData.filter((entry) => entry.userID === id);
    } else if (todaysDate.dataListType === 'sleep') {
      dataTypeById = dataList.sleepData.filter((entry) => entry.userID === id)
    } else if (todaysDate.dataListType === 'activity') {
      dataTypeById = dataList.activityData.filter((entry) => entry.userID === id)
    } else {
      return 'Invalid Argument'
    }

    let startDateEntry = dataTypeById.find((log) => log.date === startDate && todaysDate.date !== startDate);
    let todaysDateEntry = dataTypeById.find((log) => log.date === startDate && todaysDate.date === startDate);
    
    if (startDateEntry) {
      let entryPosition = dataTypeById.indexOf(startDateEntry);
      let weeklyUserData = dataTypeById.slice(entryPosition, entryPosition + 7);
      return weeklyUserData;
    } else if (todaysDateEntry) {
      let entryPosition = dataTypeById.indexOf(todaysDateEntry);
      let weeklyUserData = dataTypeById.slice(entryPosition - 7, entryPosition);
      return weeklyUserData;
    }

    return [];
  }
  
  return makeWeeklyArray;
}

export {
    getStatsByWeek,
    getTodaysDate,
    getRandomIndex
}