import { expect } from 'chai';

import {
  getUserData, 
  getAvgSteps, 
  generateRandomUser,
  } from '../src/data-model/user-data';

import { 
  sampleUserData, 
} from '../src/sample-data/sampleUserData';

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