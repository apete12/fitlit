import { expect } from 'chai';

import { 
    getDailyMilesWalked, 
    checkIfStepGoalWasMade, 
    getDailySteps,
    getActiveMinutes,
  } from '../src/data-model/activity-data';

import { 
    sampleActivityData, 
  } from '../src/sample-data/sampleActivityData';

import { 
    sampleUserData, 
  } from '../src/sample-data/sampleUserData';

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
      let userOneMilesWalked = getDailyMilesWalked(userTwo, '2023/03/28', sampleUserData, sampleActivityData)
      let userTwoMilesWalked = getDailyMilesWalked(userOne, '2023/03/20', sampleUserData, sampleActivityData)
  
      expect(userOneMilesWalked).to.be.a('number')
      expect(userTwoMilesWalked).to.be.a('number')
      expect(userOneMilesWalked).to.equal(12.55)
      expect(userTwoMilesWalked).to.equal(5.58)
    })
  
    it('Should return No Entry Found if user or date does not exist', () => {   
      invalidUserEntry = getDailyMilesWalked(userThree, '2023/03/28', sampleUserData, sampleActivityData)
      invalidDateEntry = getDailyMilesWalked(userOne, '2024/03/20', sampleUserData, sampleActivityData)
  
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
  