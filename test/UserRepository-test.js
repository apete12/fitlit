import { expect } from 'chai';
import { getAvgSteps } from '../src/scripts'

// describe('User Repository', () => {
//   it('should run tests', function () {
//     expect(true).to.be(true);
//   });
// });

describe('User Data Step Goals', function() {
  var sampleData = [
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
  }]
  it('Should be a function', function() {
    expect(getAvgSteps).to.be.a('function')
  })

  it('Should return average step goal amongst all users', function() {
    const avgSteps = getAvgSteps(sampleData) 
    expect(avgSteps).to.equal(6333.333333333333)
  })
})