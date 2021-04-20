/**
 * It moves all zeros to right and returns an array with and without zeros
 * @example
 * // returns { arrayWithoutZeros:  [4, 8, 9, 2, 5, 3, 9], arrayZeroRight: [ 4, 8, 9, 2, 5, 3, 9, 0, 0, 0 ]}
 * moveZerosToRight([4, 8, 0, 9, 2, 5, 0, 3, 9, 0])
 * @param {Number[]} array List of Integers
 * @returns {Object} Object with the following props: arrayWithoutZeros and arrayZeroRight
 * @author Cassiano Vellames <c.vellames@gmail.com>
 */
const moveZerosToRight = (array) => {
  const arr = [...array]
  const arrayWithoutZeros = []

  let maxIndex = arr.length
  for (let i = 0; i < maxIndex; i++) {
    if (arr[i] === 0) {
      arr.push(arr.splice(i, 1)[0])
      i--
      maxIndex--
      continue
    }

    arrayWithoutZeros.push(arr[i])
  }

  return { arrayWithoutZeros, arrayZeroRight: arr }
}

/**
 * Sum the sent value to array and returns it as an array
 * @example
 * // returns [4, 8, 9, 2, 5, 4, 0]
 * sumToArray([4, 8, 9, 2, 5, 3, 9], 1)
 * @param {Number[]} array List of Integers
 * @param {Number} value Number to sum
 * @returns {Number[]} Returns sum as array
 * @author Cassiano Vellames <c.vellames@gmail.com>
 */
const sumToArray = (array, value) => {
  const arrayNumberPlusOne = parseInt(array.join('')) + value
  return String(arrayNumberPlusOne).split('').map(Number)
}

/**
 * It finds the max sub array sum and return it (Kadane's Algorithm). In addition, if all subarrays are negative, the subarray closest to 0 is returned
 * @example
 * // returns 13
 * findMaxSubArraySum([-4, 8, -9, 2, -5, 8, -4, 9])
 * @param {Number[]} array Array with numbers
 * @returns {Number} It returns max array sum
 * @author Cassiano Vellames <c.vellames@gmail.com>
 */
const findMaxSubArraySum = (array) => {
  let globalMax = Number.MIN_SAFE_INTEGER
  let localMax = 0

  // Negative cases
  let higherNegativeNumber = Number.MIN_SAFE_INTEGER
  let onlyNegativeNumbers = true

  for (let i = 0; i < array.length; i++) {
    localMax += array[i]
    if (globalMax < localMax) {
      globalMax = localMax
    }

    if (localMax < 0) {
      localMax = 0
    }

    // Negative cases
    if (array[i] > higherNegativeNumber && array[i] < 0) {
      higherNegativeNumber = array[i]
    }

    if (array[i] >= 0) {
      onlyNegativeNumbers = false
    }
  }

  return onlyNegativeNumbers ? higherNegativeNumber : globalMax
}

/**
 * Main function to execute all test steps
 * @param {Number[]} array Array with numbers
 * @author Cassiano Vellames <c.vellames@gmail.com>
 */
const main = (array) => {
  const arr = [...array]
  const { arrayWithoutZeros, arrayZeroRight } = moveZerosToRight(arr)
  
  console.log('Array zeros right:', arrayZeroRight)

  console.log('Array without zero', arrayWithoutZeros)

  console.log('Array without zero plus one', sumToArray(arrayWithoutZeros, 1))

  // Multiply odd positions by -1
  const oddArrayMinusOne = [...arrayWithoutZeros]
  for (let i = 0; i < oddArrayMinusOne.length; i+=2) {
    oddArrayMinusOne[i] *= -1
  }
  
  console.log('Array without zeros odd * -1', oddArrayMinusOne)
  console.log('Max sub-array sum', findMaxSubArraySum(oddArrayMinusOne))
}

main([4, 8, 0, 9, 2, 5, 0, 3, 3, 0])
// console.log(findMaxSubArraySum([-4, 8, -9, 2, -5, 8, -4, 9])) // 13
