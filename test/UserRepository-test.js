import { expect } from 'chai';
import { getUserData } from '../src/scripts'


describe('User Repository', () => {
  // it('should run tests', function () {
    // expect(true).to.be(true);
  // });

  it('should return user object by id', function () {
    const users = [
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
      }];

    const userOne = getUserData(1, users)
    const userTwo = getUserData(2, users)
    expect(userOne[0].name).to.equal("Trystan Gorczany");
    expect(userTwo[0].name).to.equal("Tyreek VonRueden");
  });

});