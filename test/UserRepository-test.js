import { expect } from 'chai';

import { getUserData, getAvgSteps, getAvgDailyOunces, getOzByDay, calculateWeeklyOunces, calculateUserAvgDailyHoursSlept, calculateUserAvgSleepQuality, calculateDailyMilesWalked, sleepAmountByDay, sleepQualityByDay} from '../src/dataModel';
import { sampleData, sampleDataHydration, weeklyDataSample, sampleActivityData, sampleSleepData } from '../src/data/sampleData';

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

  it('Should return average daily ounces for user', () => {

    const user2Avg = getAvgDailyOunces(2, sampleDataHydration)
    const user1Avg = getAvgDailyOunces(1, sampleDataHydration)
    const user3Avg = getAvgDailyOunces(3, sampleDataHydration)

    expect(user3Avg).to.be.a('number')
    expect(user2Avg).to.equal(41)
    expect(user1Avg).to.equal(51)
    expect(user3Avg).to.equal(95)
})

  it('Should return number of OZ for a specific day', () => {

    const userOneMarch24OZ = getOzByDay(1, "2023/03/24", sampleDataHydration)
    const userOneJune10OZ = getOzByDay(1, "2023/06/10", sampleDataHydration)
    const userTwoMarch24OZ = getOzByDay(1, "2023/03/24", sampleDataHydration)

    expect(userOneMarch24OZ).to.equal(28)
    expect(userOneJune10OZ).to.equal(74)
    expect(userTwoMarch24OZ).to.be.a('number')
})

  it('Should return an object with users weekly hydration stats', () => {

    const user1Sample = calculateWeeklyOunces(1, weeklyDataSample)

    expect(user1Sample).to.be.an('object')
    expect(user1Sample.ounces).to.be.an('array')
    expect(user1Sample.dates).to.be.an('array')
    expect(user1Sample.ounces.length).to.equal(7)
    expect(user1Sample.ounces[0]).to.equal(47)
    expect(user1Sample.dates[0]).to.equal("2023/03/24")
})

});

describe('Average Daily Sleep Quantity and Quality', () => {
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


})

describe('Should test sleepData', () => {

  const sampleSleepData = { sleepData: [
    {userID: 1, date: '2023/03/21', hoursSlept: 9.9, sleepQuality: 4.7},
    {userID: 2, date: '2023/03/21', hoursSlept: 7.4, sleepQuality: 1.7},
    {userID: 1, date: '2023/03/22', hoursSlept: 6.3, sleepQuality: 3.6},
    {userID: 2, date: '2023/03/22', hoursSlept: 4.2, sleepQuality: 4.6},
    {userID: 1, date: '2023/03/23', hoursSlept: 10, sleepQuality: 2.4},
    {userID: 2, date: '2023/03/23', hoursSlept: 6.7, sleepQuality: 2.9},
    {userID: 1, date: '2023/03/24', hoursSlept: 9.6, sleepQuality: 4.3},
    {userID: 2, date: '2023/03/24', hoursSlept: 8.4, sleepQuality: 3.5},
    {userID: 1, date: '2023/03/25', hoursSlept: 9.7, sleepQuality: 4.7},
    {userID: 2, date: '2023/03/25', hoursSlept: 4.7, sleepQuality: 3},
    {userID: 1, date: '2023/03/26', hoursSlept: 8, sleepQuality: 3.1},
    {userID: 2, date: '2023/03/26', hoursSlept: 4.2, sleepQuality: 1.2},
    {userID: 1, date: '2023/03/27', hoursSlept: 4.1, sleepQuality: 3.9},
    {userID: 2, date: '2023/03/27', hoursSlept: 9.2, sleepQuality: 1.6},
    {userID: 1, date: '2023/03/28', hoursSlept: 4.8, sleepQuality: 2.5},
    {userID: 2, date: '2023/03/28', hoursSlept: 7.2, sleepQuality: 2.2},
    {userID: 1, date: '2023/03/29', hoursSlept: 7.2, sleepQuality: 1},
    {userID: 2, date: '2023/03/29', hoursSlept: 4, sleepQuality: 3.1},
    {userID: 1, date: '2023/03/30', hoursSlept: 6.5, sleepQuality: 1.4},
    {userID: 2, date: '2023/03/30', hoursSlept: 5.3, sleepQuality: 4.7},
  ]}

  it('Should be able to calculate the average daily hours of sleep', () => {
    expect(calculateUserAvgDailyHoursSlept(1, sampleSleepData)).to.equal(7.609999999999999)
    expect(calculateUserAvgDailyHoursSlept(2, sampleSleepData)).to.equal(6.13)
  })

  it('Should be able to calculate the average sleep quality per day over all time', () => {
    expect(calculateUserAvgSleepQuality(1, sampleSleepData)).to.equal(3.1599999999999997)
    expect(calculateUserAvgSleepQuality(2, sampleSleepData)).to.equal(2.85)
  })

})

describe('Activity', () => {

  it('Should return miles user walked in a day', () => {

    const userOne = calculateDailyMilesWalked(2, '2023/03/28', sampleData, sampleActivityData)
    const userTwo = calculateDailyMilesWalked(1, '2023/03/20', sampleData, sampleActivityData)

    expect(userOne).to.be.a('number')
    expect(userOne).to.equal(12.548863636363636)
    expect(userTwo).to.equal(5.577272727272727)
  })
