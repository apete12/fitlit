import {
  getStatsByWeek,
  } from '../data-model/helper-functions';

//////////////////////// SLEEP ////////////////////////

const getSleepAmountByDay = (id, day, dataList) => {
    let usersDailySleepLog = dataList.sleepData
    let usersDailySleepAmount = usersDailySleepLog.find(log => log.userID === id && log.date === day)
    if(usersDailySleepAmount) {
      return usersDailySleepAmount.hoursSlept
    }
}
  
const getSleepQualityByDay = (id, day, dataList) => {
    let usersDailySleepLog = dataList.sleepData
    let usersDailySleepQuality = usersDailySleepLog.find(log => log.userID === id && log.date === day)
      if(usersDailySleepQuality) {
        return usersDailySleepQuality.sleepQuality
      }
}
  
const getAvgHoursSlept = (id, dataList) => {
    let usersDailySleepLog = dataList.sleepData
    let entries = []
    let userSleepStats = usersDailySleepLog.reduce((accum, userObj) => {
      if (userObj.userID === id) {
        entries.push(userObj.userID)
        accum += userObj.hoursSlept
      }
      return accum
    }, 0)
    let userAvgSleepHours = userSleepStats / entries.length
    return Number(userAvgSleepHours.toFixed(2))
}
  
const getAvgSleepQuality = (id, dataList) => {
    let usersDailySleepQualityLog = dataList.sleepData
    let entries = []
    let userSleepQualityStats = usersDailySleepQualityLog.reduce((accum, userObj) => {
      if (userObj.userID === id) {
        entries.push(userObj.userID)
        accum += userObj.sleepQuality
      }
      return accum
    }, 0)
    let userAvgSleepQual = userSleepQualityStats / entries.length
      
    return Number(userAvgSleepQual.toFixed(2))
}
  
const getWeeklySleepQualityStats = (id, dataList, startDate) => {
    let currentUserWeeklySleepData = getStatsByWeek(id, dataList, startDate)
    let weeklyUserData = currentUserWeeklySleepData()
  
    let sleepQualityWeeklyStats = weeklyUserData.reduce((a, c) => {
      a.day.push(c.date)
      a.sleepQuality.push(c.sleepQuality)
      return a
    }, {day: [], sleepQuality: []})
  
    return sleepQualityWeeklyStats
}
  
const getWeeklySleepHoursStats = (id, dataList, startDate) => {
    let currentUserWeeklySleepData = getStatsByWeek(id, dataList, startDate)
    let weeklyUserData = currentUserWeeklySleepData()
    
    let sleepHoursWeeklyStats = weeklyUserData.reduce((a, c) => {
      a.day.push(c.date)
      a.sleepHours.push(c.hoursSlept)
      return a
    }, {day: [], sleepHours: []})
  
    return sleepHoursWeeklyStats
}

export {
    getSleepAmountByDay,
    getSleepQualityByDay,
    getAvgHoursSlept,
    getAvgSleepQuality,
    getWeeklySleepQualityStats,
    getWeeklySleepHoursStats
}