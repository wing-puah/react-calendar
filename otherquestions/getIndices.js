function getIndicesOfSum(arr, sum) {
  // Initialise the array to store the indices that made up the sum
  const indicesOfSum = [];

  // Loop through each element of the array
  arr.forEach((el, idx) => {
    // Find the possible indexes that made up the sum
    const intOfPair = sum - el;
    // To ensure that no numbers are repeated, the code will look from the current index
    if (arr.indexOf(intOfPair, idx) > 0) {
      // If there is presence of the indexes that make up the sum, the two indexes are return
      indicesOfSum.push(el, intOfPair);
    }
  });

  // Output if run on node
  console.log(indicesOfSum);
  // Output as usual function
  return indicesOfSum;
}

getIndicesOfSum([11, 2, 7, 15, 3, 6], 9);
