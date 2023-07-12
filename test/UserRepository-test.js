import { expect } from 'chai';
import { getUserData, getAvgSteps, getAvgDailyOunces, getOzByDay } from '../src/dataModel';
import { sampleData } from '../src/data/sampleData';


describe('User Repository', () => {

  it('should return user name by id', function () {
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
  

//////////////// getAvgDailyOunces test///////////////////////

// it.skip('should return average daily ounces for user', () => {
  

//   const user2Avg = getAvgDailyOunces(2, hydrationData)
//   expect(user2Avg).to.equal(41)

// })

// it.skip('should return number of OZ for a specific day', () => {

//   const userOneMarch24OZ = getOzByDay(1, "2023/03/24")
//   expect(userOneMarch24OZ).to.equal(74)

// })

});

