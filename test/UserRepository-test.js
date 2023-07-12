import { expect } from 'chai';
import { getUserData, getAvgSteps, getAvgDailyOunces, getOzByDay } from '../src/dataModel';
import {sampleUserData, hydrationData } from '../src/data/sampleData';


describe('User Repository', () => {
  

  it.skip('should return user object by id', function () {

    const userOne = getUserData(1)
    const userTwo = getUserData(2)

    expect(userOne[0].name).to.equal("Trystan Gorczany");
    expect(userTwo[0].name).to.equal("Tyreek VonRueden");

    // const userOne = getUserData(1)
    // const userTwo = getUserData(2)
    
    expect(sampleDataObject.sampleData).to.equal(userOne);
    // expect(userTwo[0].name).to.equal("Tyreek VonRueden");


  })
  it.skip('Should be a function', function() {
    expect(getAvgSteps).to.be.a('function')
  })

  // const avgSteps = getAvgSteps(sampleData) 
  it.skip('Should return average step goal amongst all users', function() {
    expect(avgSteps).to.equal(6333.333333333333)
  })
  
//////////////// getAvgDailyOunces test///////////////////////

it('should return average daily ounces for user', () => {
  

  const user2Avg = getAvgDailyOunces(2, hydrationData)
  expect(user2Avg).to.equal(41)

})

it('should return number of OZ for a specific day', () => {

  const userOneMarch24OZ = getOzByDay(1, "2023/03/24")
  expect(userOneMarch24OZ).to.equal(74)

})

});

