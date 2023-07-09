// On load, a user should be chosen at random.
export const randomNum = (array) => {
    return Math.floor(Math.random() * array.length)
  }