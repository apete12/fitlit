import { expect } from 'chai';
import { getUserData, getAvgSteps, getAvgDailyOunces } from '../src/dataModel';


describe('User Repository', () => {
  const sampleData = [
  {
  "id": 1,
  "name": "Trystan Gorczany",
  "address": "9484 Lucas Flat, West Kittymouth WA 67504",
  "email": "Taurean_Pollich31@gmail.com",
  "strideLength": 4,
  "dailyStepGoal": 7000,
  "friends": [
    5,
    43,
    46,
    11
  ]
  },
  {
  "id": 2,
  "name": "Tyreek VonRueden",
  "address": "623 Koelpin Skyway, Lake Luigichester MN 77576-1678",
  "email": "Nicolette_Halvorson43@yahoo.com",
  "strideLength": 4.5,
  "dailyStepGoal": 9000,
  "friends": [
    13,
    19,
    3
  ]
  },
  {
  "id": 3,
  "name": "Colt Rohan",
  "address": "48010 Balistreri Harbor, Cleobury IN 43317",
  "email": "Wilford.Barton@gmail.com",
  "strideLength": 2.7,
  "dailyStepGoal": 3000,
  "friends": [
    31,
    16,
    15,
    7
  ]
  }];

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

  const avgSteps = getAvgSteps(sampleData) 
  it.skip('Should return average step goal amongst all users', function() {
    expect(avgSteps).to.equal(6333.333333333333)
  })
  
//////////////// getAvgDailyOunces test///////////////////////

it('should return average daily ounces for user', () => {
  const hydrationData = [
    {
      "userID": 1,
      "date": "2023/03/24",
      "numOunces": 28
    },
    {
      "userID": 2,
      "date": "2023/03/24",
      "numOunces": 35
    },
    {
      "userID": 3,
      "date": "2023/03/24",
      "numOunces": 95
    },
    {
      "userID": 1,
      "date": "2023/03/24",
      "numOunces": 74
    },
    {
      "userID": 2,
      "date": "2023/03/24",
      "numOunces": 47
    },
  ]

  const user2Avg = getAvgDailyOunces(2, hydrationData)
  expect(user2Avg).to.equal(41)

})

it('should return number of OZ for a specific day', () => {
  const hydrationData = [
    {
      "userID": 1,
      "date": "2023/03/23",
      "numOunces": 28
    },
    {
      "userID": 2,
      "date": "2023/03/24",
      "numOunces": 35
    },
    {
      "userID": 3,
      "date": "2023/03/24",
      "numOunces": 95
    },
    {
      "userID": 1,
      "date": "2023/03/24",
      "numOunces": 74
    },
    {
      "userID": 2,
      "date": "2023/03/24",
      "numOunces": 47
    },
  ]

  const userOneMarch24OZ = getOzByDay(1, "2023/03/24")
  expect(userOneMarch24OZ).to.equal(74)

})

});

