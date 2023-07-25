import { expect } from 'chai';

import {
    getAvgDailyOunces,
    getOuncesByDay,
    getOuncesByWeek,
  } from '../src/data-model/hydration-data';

import { 
    sampleHydrationData, 
  } from '../src/sample-data/sampleHydrationData';


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
      let userOneOz = getOuncesByDay(userOne, "2023/03/24", sampleHydrationData)
      let userTwoOz = getOuncesByDay(userOne, "2023/03/29", sampleHydrationData)
      let userThreeOz = getOuncesByDay(userTwo, "2023/03/24", sampleHydrationData)
  
      expect(userOneOz).to.be.a('number')
      expect(userTwoOz).to.be.a('number')
      expect(userThreeOz).to.be.a('number')
      expect(userOneOz).to.equal(47)
      expect(userTwoOz).to.equal(49)
      expect(userThreeOz).to.equal(81)
    })
  
    it('Should return Undefined if user does not exist', () => {
      invalidUserEntry = getOuncesByDay(userThree, "2023/03/24", sampleHydrationData)
  
      expect(invalidUserEntry).to.deep.equal(undefined)
    })
  
    it('Should return an object with users weekly hydration stats', () => {
      let userOneWeeklyOz = getOuncesByWeek(userOne, sampleHydrationData)
      let userTwoWeeklyOz = getOuncesByWeek(userTwo, sampleHydrationData)
  
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
      invalidUserEntry = getOuncesByWeek(userThree, sampleHydrationData)
    
      expect(invalidUserEntry).to.be.an('object')
      expect(invalidUserEntry.ounces.length).to.equal(0)
      expect(invalidUserEntry.dates.length).to.equal(0)
    })
  });