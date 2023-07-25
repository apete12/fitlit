import { expect } from 'chai';

import {
    getRandomIndex,
    getTodaysDate,
    getStatsByWeek
  } from '../src/data-model/helper-functions';

import { 
    sampleUserData, 
  } from '../src/sample-data/sampleUserData';
  
import { 
    sampleHydrationData, 
  } from '../src/sample-data/sampleHydrationData';
  
import { 
    sampleActivityData, 
  } from '../src/sample-data/sampleActivityData';
  
import { 
    sampleSleepData, 
  } from '../src/sample-data/sampleSleepData';

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