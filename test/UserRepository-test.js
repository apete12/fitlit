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
  breakDownToWeeklyStatsArray
} from '../src/dataModel';

import { 
  sampleUserData, 
  sampleHydrationData, 
  sampleActivityData, 
  sampleSleepData 
} from '../src/data/sampleData';

////////////////////////////// USER ///////////////////////////////
describe('User Repository', () => {

  let currentUser

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

  it('Should generate a random user and return user info', () => {

    currentUser = generateRandomUser(sampleUserData)

    expect(currentUser).to.be.an('object')
    expect(currentUser.friends).to.be.an('array')
    expect(currentUser.dailyStepGoal).to.be.a('number')
  })

  it('Should return average step goal amongst all users', function() {

    let averageStepGoalForAllUsers = getAvgSteps(sampleUserData)
    
    expect(averageStepGoalForAllUsers).to.be.a('number')
    expect(averageStepGoalForAllUsers).to.equal(6333)
  })
})  

////////////////////////////// HYDRATION ///////////////////////////////
describe('Hydration Repository', function () {

  let userOne, userTwo, userThree

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

  it('Should return number of OZ for a specific day', () => {

    let testOneUserOne = getOzByDay(userOne, "2023/03/24", sampleHydrationData)
    let testTwoUserOne = getOzByDay(userOne, "2023/03/29", sampleHydrationData)
    let testThreeUserTwo = getOzByDay(userTwo, "2023/03/24", sampleHydrationData)


    expect(testOneUserOne).to.be.a('number')
    expect(testTwoUserOne).to.be.a('number')
    expect(testThreeUserTwo).to.be.a('number')
    expect(testOneUserOne).to.equal(47)
    expect(testTwoUserOne).to.equal(49)
    expect(testThreeUserTwo).to.equal(81)

  })

  it('Should return an object with users weekly hydration stats', () => {

    let user1Sample = calculateWeeklyOunces(userOne, sampleHydrationData)
    let user2Sample = calculateWeeklyOunces(userTwo, sampleHydrationData)

    expect(user1Sample).to.be.an('object')
    expect(user1Sample.ounces).to.be.an('array')
    expect(user1Sample.dates).to.be.an('array')
    expect(user1Sample.ounces.length).to.equal(7)
    expect(user1Sample.ounces[0]).to.equal(47)
    expect(user1Sample.dates[0]).to.equal("2023/03/24")
    expect(user2Sample).to.be.an('object')
    expect(user2Sample.ounces).to.be.an('array')
    expect(user2Sample.dates).to.be.an('array')
    expect(user2Sample.ounces.length).to.equal(7)
    expect(user2Sample.ounces[0]).to.equal(81)
    expect(user2Sample.dates[0]).to.equal("2023/03/24")

  })

  // ---------------------SHOULD WE KEEP THESE??????---------------------------- //
  // SAD PATH?

  // it('Should return NaN, Undefined, or empty if user does not exist', () => {

  //   let testOne = getAvgDailyOunces(userThree, sampleHydrationData)
  //   let testTwo = getOzByDay(userThree, "2023/03/24", sampleHydrationData)
  //   let testThree = calculateWeeklyOunces(userThree, sampleHydrationData)

  //   expect(testOne).to.equal('NaN')
  //   expect(testTwo).to.equal(undefined)    
  //   expect(testThree.ounces.length).to.equal(0)
  //   expect(testThree.dates.length).to.equal(0)
  // })
//--------------------------------------------------------------------------------//


});

////////////////////////////// SLEEP ///////////////////////////////
describe('Sleep Repository', () => {

  let userOne, userTwo, userThree

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

  it('Should return sleep quality for specific day', function () {

    let userOneSleepQuality = sleepQualityByDay(userOne, '2023/03/21', sampleSleepData)
    let userTwoSleepQuality = sleepQualityByDay(userTwo, '2023/03/27', sampleSleepData)
    
    expect(userOneSleepQuality).to.be.a('number')
    expect(userTwoSleepQuality).to.be.a('number')
    expect(userOneSleepQuality).to.equal(4.7)
    expect(userTwoSleepQuality).to.equal(1.6)
  })

  it('Should be able to calculate the average hours slept for all time', () => {

    let userOneSleepAverage = calculateUserAvgDailyHoursSlept(userOne, sampleSleepData)
    let userTwoSleepAverage = calculateUserAvgDailyHoursSlept(userTwo, sampleSleepData)

    expect(userOneSleepAverage).to.be.a('number')
    expect(userTwoSleepAverage).to.be.a('number')
    expect(userOneSleepAverage).to.equal(7.61)
    expect(userTwoSleepAverage).to.equal(6.13)
  })

  it('Should be able to calculate the average sleep quality for all time', () => {

    let userOneSleepQualityAverage = calculateUserAvgSleepQuality(userOne, sampleSleepData)
    let userTwoSleepQualityAverage = calculateUserAvgSleepQuality(userTwo, sampleSleepData)

    expect(userOneSleepQualityAverage).to.be.a('number')
    expect(userTwoSleepQualityAverage).to.be.a('number')
    expect(userOneSleepQualityAverage).to.equal(3.16)
    expect(userTwoSleepQualityAverage).to.equal(2.85)
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

  
})

////////////////////////////// ACTIVITY ///////////////////////////////
describe('Activity Repository', () => {

  let userOne, userTwo, userThree

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

  it('Should return active minutes for a given day', () => {
  
    let userOneActiveMinutes = getActiveMinutes(userOne, '2023/03/20', sampleActivityData)
    let userTwoActiveMinutes = getActiveMinutes(userTwo, '2023/03/20' , sampleActivityData)
  
    expect(userOneActiveMinutes).to.be.a('number')
    expect(userTwoActiveMinutes).to.be.a('number')
    expect(userOneActiveMinutes).to.equal(261)
    expect(userTwoActiveMinutes).to.equal(56)
  })

  it('Should return miles user walked in a day', () => {

    let userOneMilesWalked = calculateDailyMilesWalked(userTwo, '2023/03/28', sampleUserData, sampleActivityData)
    let userTwoMilesWalked = calculateDailyMilesWalked(userOne, '2023/03/20', sampleUserData, sampleActivityData)

    expect(userOneMilesWalked).to.be.a('number')
    expect(userTwoMilesWalked).to.be.a('number')
    expect(userOneMilesWalked).to.equal(12.55)
    expect(userTwoMilesWalked).to.equal(5.58)
  })

  it('Should check if step goal was made for a given day', () => {

    let userOneStepGoalCheck = checkIfStepGoalWasMade(userOne, '2023/03/28', sampleUserData, sampleActivityData)
    let userTwoStepGoalCheck = checkIfStepGoalWasMade(userTwo, '2023/03/28', sampleUserData, sampleActivityData)

    expect(userOneStepGoalCheck).to.be.a('string')
    expect(userTwoStepGoalCheck).to.be.a('string')
    expect(userOneStepGoalCheck).to.equal(`<span role="img" aria-label="x" title="x">X</span>`)
    expect(userTwoStepGoalCheck).to.equal(`<span role="img" aria-label="check" title="check">✔</span>`)
    
  })


})

////////////////////////////// HELPER ///////////////////////////////
describe('Helper Functions', () => {

  let todaysDate, hydrationClosure, sleepClosure, activityClosure

  beforeEach(() => {
    todaysDate = getTodaysDate(1, sampleHydrationData)
    hydrationClosure = breakDownToWeeklyStatsArray(1, sampleHydrationData, todaysDate.date)
    sleepClosure = breakDownToWeeklyStatsArray(2, sampleSleepData, todaysDate.date)
    activityClosure = breakDownToWeeklyStatsArray(1, sampleActivityData, todaysDate.date)
  })

  it('Should return a random index position in users array', () => {
    
    let randomUserIndex = getRandomIndex(sampleUserData)
    
    expect(randomUserIndex).to.be.a('number')
  })

  it('Should return an object that has the most recent date from any dataset', () => {

    let latestHydrationEntry = getTodaysDate(1, sampleHydrationData)
    let latestSleepEntry = getTodaysDate(1, sampleSleepData)
    let latestActivityEntry = getTodaysDate(1, sampleActivityData)

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

})