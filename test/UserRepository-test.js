import { expect } from 'chai';

import { 
  getRandomIndex,
  getUserData, 
  getAvgSteps, 
  generateRandomUser,
  getAvgDailyOunces, 
  getOzByDay, 
  calculateWeeklyOunces, 
  calculateUserAvgDailyHoursSlept, 
  calculateUserAvgSleepQuality, 
  calculateDailyMilesWalked, 
  sleepAmountByDay, 
  sleepQualityByDay, 
  getWeeklySleepQualityStats, 
  checkIfStepGoalWasMade, 
  getTodaysDate, 
  getDailySteps,
  getActiveMinutes,
  getWeeklySleepHoursStats,
  getStatsByWeek
} from '../src/dataModel';

import { 
  sampleUserData, 
  sampleHydrationData, 
  sampleActivityData, 
  sampleSleepData 
} from '../src/data/sampleData';

////////////////////////////// HELPER ///////////////////////////////
describe('Helper Functions', () => {

  let todaysDate, hydrationClosure, sleepClosure, activityClosure, emptyUserDataList, userOne, userTwo, userThree, emptyDataList

  beforeEach(() => {
    userOne = 1
    userTwo = 2
    userThree = 3
    emptyUserDataList = {users: []}
    emptyDataList = {}
    todaysDate = getTodaysDate(1, sampleHydrationData)
    hydrationClosure = getStatsByWeek(1, sampleHydrationData, todaysDate.date)
    sleepClosure = getStatsByWeek(2, sampleSleepData, todaysDate.date)
    activityClosure = getStatsByWeek(1, sampleActivityData, todaysDate.date)
  })

  it('Should return a random index position in users array', () => {
    
    let randomUserIndex = getRandomIndex(sampleUserData)
    
    expect(randomUserIndex).to.be.a('number')
  })

  it('Should return 0 if no data exists', () => {

    let emptyDataListTest = getRandomIndex(emptyUserDataList)

    expect(emptyDataListTest).to.equal(0)
  })

  it('Should return an object that has the most recent date from any dataset', () => {

    let latestHydrationEntry = getTodaysDate(userOne, sampleHydrationData)
    let latestSleepEntry = getTodaysDate(userTwo, sampleSleepData)
    let latestActivityEntry = getTodaysDate(userOne, sampleActivityData)

    expect(latestHydrationEntry).to.be.an('object')
    expect(latestSleepEntry).to.be.an('object')
    expect(latestActivityEntry).to.be.an('object')
    expect(latestHydrationEntry.dataListType).to.equal('hydration')
    expect(latestSleepEntry.dataListType).to.equal('sleep')
    expect(latestActivityEntry.dataListType).to.equal('activity')
    expect(latestHydrationEntry.date).to.equal('2023/03/30')
    expect(latestSleepEntry.date).to.equal('2023/03/30')
    expect(latestActivityEntry.date).to.equal('2023/03/30')
  })

  it('Should return Invalid Argument if dataList is empty', () => {

    let emptyHydrationDataListTest = getTodaysDate(userOne, emptyDataList)

    expect(emptyHydrationDataListTest).to.equal('Invalid Argument')
  })

  it('Should return a function', () => {

    expect(hydrationClosure).to.be.a('function')
    expect(sleepClosure).to.be.a('function')
    expect(activityClosure).to.be.a('function')
  })

  it('Should return an entire week of data', () => {

    expect(hydrationClosure()).to.be.an('array')
    expect(sleepClosure()).to.be.an('array')
    expect(activityClosure()).to.be.an('array')
    expect(hydrationClosure()[0].numOunces).to.equal(74)
    expect(sleepClosure()[3].hoursSlept).to.equal(4.2)
    expect(activityClosure()[6].minutesActive).to.equal(168)
    expect(hydrationClosure().length).to.equal(7)
    expect(sleepClosure().length).to.equal(7)
    expect(activityClosure().length).to.equal(7)
  })

  it('Should return Invalid Argument if empty dataList is passed in', () => {

    let nullClosure = getStatsByWeek(1, emptyDataList, todaysDate.date)

    expect(nullClosure()).to.equal('Invalid Argument')
  })

})

////////////////////////////// USER ///////////////////////////////
describe('User Repository', () => {

  let currentUser, invalidDataList, invalidDataListTest

  beforeEach (() => {
    invalidDataList = {users: [{}]}
  })

  it('Should return user info by ID', function () {

    let userOne = getUserData(1, sampleUserData)
    let userTwo = getUserData(2, sampleUserData)

    expect(userOne).to.be.an('object')
    expect(userTwo).to.be.an('object')
    expect(userOne.name).to.equal("Trystan Gorczany")
    expect(userOne.strideLength).to.equal(4)
    expect(userTwo.name).to.equal("Tyreek VonRueden")
    expect(userTwo.dailyStepGoal).to.equal(9000)
  })

  it('Should return Invalid User if user does not exist', () => {

    let invalidUser = getUserData(6, sampleUserData)

    expect(invalidUser).to.equal('Invalid User')
  })

  it('Should return a random user and return user info', () => {

    currentUser = generateRandomUser(sampleUserData)

    expect(currentUser).to.be.an('object')
    expect(currentUser.friends).to.be.an('array')
    expect(currentUser.dailyStepGoal).to.be.a('number')
  })

  it('Should return an empty array if an empty dataList is passed in', () => {

    invalidDataListTest = generateRandomUser(invalidDataList)

    expect(invalidDataListTest).to.equal('No Users Found')
  })

  it('Should return average step goal amongst all users', function() {

    let averageStepGoalForAllUsers = getAvgSteps(sampleUserData)
    
    expect(averageStepGoalForAllUsers).to.be.a('number')
    expect(averageStepGoalForAllUsers).to.equal(6333)
  })

  it('Should return NaN if dataList is empty', () => {
    invalidDataListTest = getAvgSteps(invalidDataList)

    expect(invalidDataListTest).to.deep.equal(NaN)
  })

})  

////////////////////////////// HYDRATION ///////////////////////////////
describe('Hydration Repository', function () {

  let userOne, userTwo, userThree, invalidUserEntry

  beforeEach(() => {
    userOne = 1
    userTwo = 2
    userThree = 3
  })

  it('Should return average daily ounces for user', () => {

    let user1Avg = getAvgDailyOunces(userOne, sampleHydrationData)
    let user2Avg = getAvgDailyOunces(userTwo, sampleHydrationData)

    expect(user1Avg).to.be.a('number')
    expect(user2Avg).to.be.a('number')
    expect(user1Avg).to.equal(56)
    expect(user2Avg).to.equal(63)

  })

  it('Should return NaN if user does not exist', () => {

    invalidUserEntry = getAvgDailyOunces(userThree, sampleHydrationData)

    expect(invalidUserEntry).to.deep.equal(NaN)
  })

  it('Should return number of OZ for a specific day', () => {

    let userOneOz = getOzByDay(userOne, "2023/03/24", sampleHydrationData)
    let userTwoOz = getOzByDay(userOne, "2023/03/29", sampleHydrationData)
    let userThreeOz = getOzByDay(userTwo, "2023/03/24", sampleHydrationData)


    expect(userOneOz).to.be.a('number')
    expect(userTwoOz).to.be.a('number')
    expect(userThreeOz).to.be.a('number')
    expect(userOneOz).to.equal(47)
    expect(userTwoOz).to.equal(49)
    expect(userThreeOz).to.equal(81)

  })

  it('Should return Undefined if user does not exist', () => {
    invalidUserEntry = getOzByDay(userThree, "2023/03/24", sampleHydrationData)

    expect(invalidUserEntry).to.deep.equal(undefined)
  })

  it('Should return an object with users weekly hydration stats', () => {

    let userOneWeeklyOz = calculateWeeklyOunces(userOne, sampleHydrationData)
    let userTwoWeeklyOz = calculateWeeklyOunces(userTwo, sampleHydrationData)

    expect(userOneWeeklyOz).to.be.an('object')
    expect(userOneWeeklyOz.ounces).to.be.an('array')
    expect(userOneWeeklyOz.dates).to.be.an('array')
    expect(userOneWeeklyOz.ounces.length).to.equal(7)
    expect(userOneWeeklyOz.ounces[0]).to.equal(47)
    expect(userOneWeeklyOz.dates[0]).to.equal("2023/03/24")
    expect(userTwoWeeklyOz).to.be.an('object')
    expect(userTwoWeeklyOz.ounces).to.be.an('array')
    expect(userTwoWeeklyOz.dates).to.be.an('array')
    expect(userTwoWeeklyOz.ounces.length).to.equal(7)
    expect(userTwoWeeklyOz.ounces[0]).to.equal(81)
    expect(userTwoWeeklyOz.dates[0]).to.equal("2023/03/24")

  })

  it('Should return an empty object with empty keys if user does not exist', () => {

    invalidUserEntry = calculateWeeklyOunces(userThree, sampleHydrationData)
  
    expect(invalidUserEntry).to.be.an('object')
    expect(invalidUserEntry.ounces.length).to.equal(0)
    expect(invalidUserEntry.dates.length).to.equal(0)
  })

});

////////////////////////////// SLEEP ///////////////////////////////
describe('Sleep Repository', () => {

  let userOne, userTwo, userThree, invalidUserEntry, invalidDateEntry

  beforeEach(() => {
    userOne = 1
    userTwo = 2
    userThree = 3
  })

  it('Should return sleep hours for specific day', function () {

    let userOneSleepHours = sleepAmountByDay(userOne, '2023/03/21', sampleSleepData)
    let userTwoSleepHours = sleepAmountByDay(userTwo, '2023/03/22', sampleSleepData)

    expect(userOneSleepHours).to.be.a('number')
    expect(userTwoSleepHours).to.be.a('number')
    expect(userOneSleepHours).to.equal(9.9)
    expect(userTwoSleepHours).to.equal(4.2)
  })

  it('Should return undefined if user is not found', () => {
    
    invalidUserEntry = sleepAmountByDay(userThree, '2023/03/21', sampleSleepData)

    expect(invalidUserEntry).to.equal(undefined)
  })

  it('Should return sleep quality for specific day', function () {

    let userOneSleepQuality = sleepQualityByDay(userOne, '2023/03/21', sampleSleepData)
    let userTwoSleepQuality = sleepQualityByDay(userTwo, '2023/03/27', sampleSleepData)
    
    expect(userOneSleepQuality).to.be.a('number')
    expect(userTwoSleepQuality).to.be.a('number')
    expect(userOneSleepQuality).to.equal(4.7)
    expect(userTwoSleepQuality).to.equal(1.6)
  })

  it('Should return undefined if user is not found ', () => {
    
    invalidUserEntry = sleepQualityByDay(userThree, '2023/03/21', sampleSleepData)

    expect(invalidUserEntry).to.deep.equal(undefined)
  })

  it('Should return the average hours slept for all time', () => {

    let userOneSleepAverage = calculateUserAvgDailyHoursSlept(userOne, sampleSleepData)
    let userTwoSleepAverage = calculateUserAvgDailyHoursSlept(userTwo, sampleSleepData)

    expect(userOneSleepAverage).to.be.a('number')
    expect(userTwoSleepAverage).to.be.a('number')
    expect(userOneSleepAverage).to.equal(7.61)
    expect(userTwoSleepAverage).to.equal(6.13)
  })

  it('Should return NaN if user is not found', () => {

    invalidUserEntry = calculateUserAvgDailyHoursSlept(userThree, sampleSleepData)

    expect(invalidUserEntry).to.deep.equal(NaN)
  })

  it('Should return the average sleep quality for all time', () => {

    let userOneSleepQualityAverage = calculateUserAvgSleepQuality(userOne, sampleSleepData)
    let userTwoSleepQualityAverage = calculateUserAvgSleepQuality(userTwo, sampleSleepData)

    expect(userOneSleepQualityAverage).to.be.a('number')
    expect(userTwoSleepQualityAverage).to.be.a('number')
    expect(userOneSleepQualityAverage).to.equal(3.16)
    expect(userTwoSleepQualityAverage).to.equal(2.85)
  })

  it('Should return NaN if user is not found', () => {
    
    invalidUserEntry = calculateUserAvgSleepQuality(userThree, sampleSleepData) 

    expect(invalidUserEntry).to.deep.equal(NaN)
  })

  it('Should return sleep quality stats for a given week', () => {

    let userOneWeeklySleepQuality = getWeeklySleepQualityStats(userOne, sampleSleepData, '2023/03/22')
    let userTwoWeeklySleepQuality = getWeeklySleepQualityStats(userTwo, sampleSleepData, '2023/03/22')

    expect(userOneWeeklySleepQuality).to.be.an('object')
    expect(userTwoWeeklySleepQuality).to.be.an('object')
    expect(userOneWeeklySleepQuality.day.length).to.equal(7)
    expect(userTwoWeeklySleepQuality.day.length).to.equal(7)
    expect(userOneWeeklySleepQuality.sleepQuality[3]).to.equal(4.7)
    expect(userTwoWeeklySleepQuality.sleepQuality[2]).to.equal(3.5)
  })

  it('Should return an object with no data if date does not exist', () => {
    
    invalidUserEntry = getWeeklySleepQualityStats(userOne, sampleSleepData, '2024/03/22')

    expect(invalidUserEntry).to.deep.equal({ day: [], sleepQuality: [] })
  })

  it('Should return sleep hour stats for a given week', () => {

    let userOneWeeklySleepHours = getWeeklySleepHoursStats(userOne, sampleSleepData,'2023/03/22')
    let userTwoWeeklySleepHours = getWeeklySleepHoursStats(userTwo, sampleSleepData, '2023/03/23')

    expect(userOneWeeklySleepHours).to.be.an('object')
    expect(userTwoWeeklySleepHours).to.be.an('object')
    expect(userOneWeeklySleepHours.sleepHours.length).to.equal(7)
    expect(userTwoWeeklySleepHours.sleepHours.length).to.equal(7)
    expect(userOneWeeklySleepHours.sleepHours[2]).to.equal(9.6)
    expect(userTwoWeeklySleepHours.sleepHours[4]).to.equal(9.2)
  })
  
  it('Should return an object with no data if date does not exist', () => {
    
    invalidDateEntry = getWeeklySleepHoursStats(userOne, sampleSleepData, '2024/03/22')

    expect(invalidDateEntry).to.deep.equal({ day: [], sleepHours: [] })
  })

})

////////////////////////////// ACTIVITY ///////////////////////////////
describe('Activity Repository', () => {

  let userOne, userTwo, userThree, invalidUserEntry, invalidDateEntry

  beforeEach(() => {
    userOne = 1
    userTwo = 2
    userThree = 3
  })
  
  it('Should return daily step count for a given day', () => {
    
    let userOneStepCount = getDailySteps(userOne, '2023/03/28', sampleActivityData)
    let userTwoStepCount = getDailySteps(userTwo, '2023/03/20' , sampleActivityData)
    
    expect(userOneStepCount).to.be.a('number')
    expect(userTwoStepCount).to.be.a('number')
    expect(userOneStepCount).to.equal(3801)
    expect(userTwoStepCount).to.equal(11616)
  })

  it('Should return No Entry Found if user or date date does not exist ', () => {
    
    invalidUserEntry = getDailySteps(userThree, '2023/03/22', sampleActivityData)
    invalidDateEntry = getDailySteps(userOne, '2024/03/22', sampleActivityData)

    expect(invalidUserEntry).to.equal('No Entry Found')
    expect(invalidDateEntry).to.equal('No Entry Found')
  })

  it('Should return active minutes for a given day', () => {
  
    let userOneActiveMinutes = getActiveMinutes(userOne, '2023/03/20', sampleActivityData)
    let userTwoActiveMinutes = getActiveMinutes(userTwo, '2023/03/20' , sampleActivityData)
  
    expect(userOneActiveMinutes).to.be.a('number')
    expect(userTwoActiveMinutes).to.be.a('number')
    expect(userOneActiveMinutes).to.equal(261)
    expect(userTwoActiveMinutes).to.equal(56)
  })

  it('Should return No Entry Found if user or date does not exist ', () => {
    
    invalidUserEntry = getActiveMinutes(userThree, '2023/03/20' , sampleActivityData)
    invalidDateEntry = getActiveMinutes(userOne, '2024/03/20' , sampleActivityData)

    expect(invalidUserEntry).to.equal('No Entry Found')
    expect(invalidDateEntry).to.equal('No Entry Found')
  })

  it('Should return miles user walked in a day', () => {

    let userOneMilesWalked = calculateDailyMilesWalked(userTwo, '2023/03/28', sampleUserData, sampleActivityData)
    let userTwoMilesWalked = calculateDailyMilesWalked(userOne, '2023/03/20', sampleUserData, sampleActivityData)

    expect(userOneMilesWalked).to.be.a('number')
    expect(userTwoMilesWalked).to.be.a('number')
    expect(userOneMilesWalked).to.equal(12.55)
    expect(userTwoMilesWalked).to.equal(5.58)
  })

  it('Should return No Entry Found if user or date does not exist', () => {
    
    invalidUserEntry = calculateDailyMilesWalked(userThree, '2023/03/28', sampleUserData, sampleActivityData)
    invalidDateEntry = calculateDailyMilesWalked(userOne, '2024/03/20', sampleUserData, sampleActivityData)

    expect(invalidUserEntry).to.equal('No Entry Found')
    expect(invalidDateEntry).to.equal('No Entry Found')
  })

  it('Should return appropriate HTML if step goal was made for a given day', () => {

    let userOneStepGoalCheck = checkIfStepGoalWasMade(userOne, '2023/03/28', sampleUserData, sampleActivityData)
    let userTwoStepGoalCheck = checkIfStepGoalWasMade(userTwo, '2023/03/28', sampleUserData, sampleActivityData)

    expect(userOneStepGoalCheck).to.be.a('string')
    expect(userTwoStepGoalCheck).to.be.a('string')
    expect(userOneStepGoalCheck).to.equal(`<span role="img" aria-label="x" title="x">X</span>`)
    expect(userTwoStepGoalCheck).to.equal(`<span role="img" aria-label="check" title="check">✔</span>`)
    
  })

  it('Should return Invalid Argument when user or date does not exist', () => {
    
    invalidUserEntry = checkIfStepGoalWasMade(userThree, '2023/03/28', sampleUserData, sampleActivityData)
    invalidDateEntry = checkIfStepGoalWasMade(userTwo, '2024/03/28', sampleUserData, sampleActivityData)

    expect(invalidUserEntry).to.equal('Invalid Argument')
    expect(invalidDateEntry).to.equal('Invalid Argument')
  })

})
