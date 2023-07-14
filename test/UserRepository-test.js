import { expect } from 'chai';
import { getUserData, getAvgSteps, getAvgDailyOunces, getOzByDay, calculateWeeklyOunces, sleepAmountByDay, sleepQualityByDay } from '../src/dataModel';
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
