import { expect } from 'chai';

import { 
  getRandomIndex,
  getUserData, 
  getAvgSteps, 
  getAvgDailyOunces, 
  getOzByDay, 
  calculateWeeklyOunces, 
  calculateUserAvgDailyHoursSlept, 
  calculateUserAvgSleepQuality, 
  calculateDailyMilesWalked, 
  sleepAmountByDay, 
  sleepQualityByDay, 
  getWeeklySleepQualityStats, 
  calculateMinutesActive, 
  checkIfStepGoalWasMade, 
  getTodaysDate, 
  getDailySteps,
  getActiveMinutes,
  getWeeklySleepHoursStats,
  breakDownToWeeklyStatsArray
} from '../src/dataModel';

import { 
  sampleData, 
  sampleDataHydration, 
  // weeklyDataSample, 
  sampleActivityData, 
  sampleSleepData 
} from '../src/data/sampleData';

describe('User Repository', () => {

  it('Should return user name by id', function () {

    const userOne = getUserData(1, sampleData)
    const userTwo = getUserData(2, sampleData)

    expect(userOne).to.be.an('object')
    expect(userTwo).to.be.an('object')
    expect(userOne.name).to.equal("Trystan Gorczany")
    expect(userOne.strideLength).to.equal(4)
    expect(userTwo.name).to.equal("Tyreek VonRueden")
    expect(userTwo.dailyStepGoal).to.equal(9000)
  })

  it('Should return average step goal amongst all users', function() {

    expect(getAvgSteps(sampleData)).to.be.a('number')
    expect(getAvgSteps(sampleData)).to.equal(6333.333333333333)
  })
})  

describe('Hydration Repository', function () {
  it('Should return average daily ounces for user', () => {

    const user2Avg = getAvgDailyOunces(2, sampleDataHydration)
    const user1Avg = getAvgDailyOunces(1, sampleDataHydration)

    expect(user2Avg).to.equal('63')
    expect(user1Avg).to.equal('56')
  })

  it('Should return number of OZ for a specific day', () => {

    const userOneMarch24OZ = getOzByDay(1, "2023/03/24", sampleDataHydration)
    const userOneJune10OZ = getOzByDay(1, "2023/03/29", sampleDataHydration)
    const userTwoMarch24OZ = getOzByDay(2, "2023/03/24", sampleDataHydration)

    expect(userOneMarch24OZ).to.be.a('number')
    expect(userOneJune10OZ).to.be.a('number')
    expect(userTwoMarch24OZ).to.be.a('number')
    expect(userOneMarch24OZ).to.equal(47)
    expect(userOneJune10OZ).to.equal(49)
    expect(userTwoMarch24OZ).to.equal(81)
  })

  it('Should return an object with users weekly hydration stats', () => {

    const user1Sample = calculateWeeklyOunces(1, sampleDataHydration)

    expect(user1Sample).to.be.an('object')
    expect(user1Sample.ounces).to.be.an('array')
    expect(user1Sample.dates).to.be.an('array')
    expect(user1Sample.ounces.length).to.equal(7)
    expect(user1Sample.ounces[0]).to.equal(47)
    expect(user1Sample.dates[0]).to.equal("2023/03/24")
  })
});

describe('Sleep Repository', () => {

  it('should return amount of sleep for given day', function () {

    const userOneSleepHoursByDay = sleepAmountByDay(1, '2023/03/21', sampleSleepData)
    const userTwoSleepHoursByDay = sleepAmountByDay(2, '2023/03/22', sampleSleepData)

    expect(userOneSleepHoursByDay).to.be.a('number')
    expect(userOneSleepHoursByDay).to.equal(9.9)
    expect(userTwoSleepHoursByDay).to.equal(4.2)
  })

  it('should return sleep quality score for given day', function () {

    const userOneSleepQualityForDay = sleepQualityByDay(1, '2023/03/21', sampleSleepData)
    const userTwoSleepQualityForDay = sleepQualityByDay(2, '2023/03/30', sampleSleepData)
    
    expect(userOneSleepQualityForDay).to.be.a('number')
    expect(userOneSleepQualityForDay).to.equal(4.7)
    expect(userTwoSleepQualityForDay).to.equal(4.7)
  })

  it('Should be able to calculate the average daily hours of sleep', () => {

    expect(calculateUserAvgDailyHoursSlept(1, sampleSleepData)).to.equal('7.61')
    expect(calculateUserAvgDailyHoursSlept(2, sampleSleepData)).to.equal('6.13')
  })

  it('Should be able to calculate the average sleep quality per day over all time', () => {

    expect(calculateUserAvgSleepQuality(1, sampleSleepData)).to.equal('3.16')
    expect(calculateUserAvgSleepQuality(2, sampleSleepData)).to.equal('2.85')
  })

  it('should return average sleep for 7 days with a given date', () => {

    const user1SleepAverage = getWeeklySleepHoursStats(1, sampleSleepData,'2023/03/22')
    const user2SleepAverage = getWeeklySleepHoursStats(2, sampleSleepData, '2023/03/23')

    expect(user1SleepAverage).to.be.an('object')
    expect(user2SleepAverage.sleepHours).to.be.an('array')
    expect(user1SleepAverage.sleepHours[2]).to.equal(9.6)
  })

  it('should return an object of sleep quality for a week', () => {

    const userOneWeeklySleepQuality = getWeeklySleepQualityStats(2, sampleSleepData, '2023/03/22')

    expect(userOneWeeklySleepQuality).to.be.an('object')
    expect(userOneWeeklySleepQuality.day).to.be.an('array')
    expect(userOneWeeklySleepQuality.sleepQuality[2]).to.equal(3.5)
  })

})

describe('Activity Repository', () => {

  it('Should return miles user walked in a day', () => {

    const userOne = calculateDailyMilesWalked(2, '2023/03/28', sampleData, sampleActivityData)
    const userTwo = calculateDailyMilesWalked(1, '2023/03/20', sampleData, sampleActivityData)

    expect(userOne).to.be.a('string')
    expect(userOne).to.equal('12.55')
    expect(userTwo).to.equal('5.58')
  })

  it('Should return calculation of minutes active', () => {

    const userOne = calculateMinutesActive(2, '2023/03/28', sampleActivityData)

    expect(userOne).to.equal(279)
  })

  it('Should check if step goal was made', () => {

    const userOne = checkIfStepGoalWasMade(2, '2023/03/28', sampleData, sampleActivityData)

    expect(userOne).to.be.a('string')
    expect(userOne).to.equal(`<span role="img" aria-label="check" title="check">✔</span>`)
  })

  it('Should return daily step count for specific day', () => {

    const userOne = getDailySteps(1, '2023/03/28', sampleActivityData)
    const userTwo = getDailySteps(2, '2023/03/20' , sampleActivityData)

    expect(userOne).to.be.a('number')
    expect(userOne).to.equal(3801)
    expect(userTwo).to.equal(11616)
  })

  it('Should return active minutes for specific day', () => {

    const userOne = getActiveMinutes(1, '2023/03/20', sampleActivityData)
    const userTwo = getActiveMinutes(2, '2023/03/20' , sampleActivityData)

    expect(userOne).to.be.a('number')
    expect(userOne).to.equal(261)
    expect(userTwo).to.equal(56)
  })
})

describe('Helper Functions', () => {

  let todaysDate, hydrationClosure, sleepClosure, activityClosure

  beforeEach(() => {
    todaysDate = getTodaysDate(1, sampleDataHydration)
    hydrationClosure = breakDownToWeeklyStatsArray(1, sampleDataHydration, todaysDate.date)
    sleepClosure = breakDownToWeeklyStatsArray(2, sampleSleepData, todaysDate.date)
    activityClosure = breakDownToWeeklyStatsArray(1, sampleActivityData, todaysDate.date)
  })

  it('Should return a random index position in users array', () => {
    
    let randomUserIndex = getRandomIndex(sampleData)
    
    expect(randomUserIndex).to.be.a('number')
  })

  it('Should return an object that has the most recent date from any dataset', () => {

    let latestHydrationEntry = getTodaysDate(1, sampleDataHydration)
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