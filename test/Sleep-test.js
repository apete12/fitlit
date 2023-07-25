import { expect } from 'chai';

import {
    getAvgHoursSlept,
    getAvgSleepQuality,
    getSleepAmountByDay,
    getSleepQualityByDay,
    getWeeklySleepQualityStats,
    getWeeklySleepHoursStats
  } from '../src/data-model/sleep-data';

import { 
    sampleSleepData, 
  } from '../src/sample-data/sampleSleepData';

describe('Sleep Repository', () => {
    let userOne, userTwo, userThree, invalidUserEntry, invalidDateEntry
  
    beforeEach(() => {
      userOne = 1
      userTwo = 2
      userThree = 3
    })
  
    it('Should return sleep hours for specific day', function () {
      let userOneSleepHours = getSleepAmountByDay(userOne, '2023/03/21', sampleSleepData)
      let userTwoSleepHours = getSleepAmountByDay(userTwo, '2023/03/22', sampleSleepData)
  
      expect(userOneSleepHours).to.be.a('number')
      expect(userTwoSleepHours).to.be.a('number')
      expect(userOneSleepHours).to.equal(9.9)
      expect(userTwoSleepHours).to.equal(4.2)
    })
  
    it('Should return undefined if user is not found', () => {
      invalidUserEntry = getSleepAmountByDay(userThree, '2023/03/21', sampleSleepData)
  
      expect(invalidUserEntry).to.equal(undefined)
    })
  
    it('Should return sleep quality for specific day', function () {
      let userOneSleepQuality = getSleepQualityByDay(userOne, '2023/03/21', sampleSleepData)
      let userTwoSleepQuality = getSleepQualityByDay(userTwo, '2023/03/27', sampleSleepData)
      
      expect(userOneSleepQuality).to.be.a('number')
      expect(userTwoSleepQuality).to.be.a('number')
      expect(userOneSleepQuality).to.equal(4.7)
      expect(userTwoSleepQuality).to.equal(1.6)
    })
  
    it('Should return undefined if user is not found ', () => {
      invalidUserEntry = getSleepQualityByDay(userThree, '2023/03/21', sampleSleepData)
  
      expect(invalidUserEntry).to.deep.equal(undefined)
    })
  
    it('Should return the average hours slept for all time', () => {
      let userOneSleepAverage = getAvgHoursSlept(userOne, sampleSleepData)
      let userTwoSleepAverage = getAvgHoursSlept(userTwo, sampleSleepData)
  
      expect(userOneSleepAverage).to.be.a('number')
      expect(userTwoSleepAverage).to.be.a('number')
      expect(userOneSleepAverage).to.equal(7.61)
      expect(userTwoSleepAverage).to.equal(6.13)
    })
  
    it('Should return NaN if user is not found', () => {
      invalidUserEntry = getAvgHoursSlept(userThree, sampleSleepData)
  
      expect(invalidUserEntry).to.deep.equal(NaN)
    })
  
    it('Should return the average sleep quality for all time', () => {
      let userOneSleepQualityAverage = getAvgSleepQuality(userOne, sampleSleepData)
      let userTwoSleepQualityAverage = getAvgSleepQuality(userTwo, sampleSleepData)
  
      expect(userOneSleepQualityAverage).to.be.a('number')
      expect(userTwoSleepQualityAverage).to.be.a('number')
      expect(userOneSleepQualityAverage).to.equal(3.16)
      expect(userTwoSleepQualityAverage).to.equal(2.85)
    })
  
    it('Should return NaN if user is not found', () => {
      invalidUserEntry = getAvgSleepQuality(userThree, sampleSleepData) 
  
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