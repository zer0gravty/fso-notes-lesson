const palindrome = (string) => {
  return string.split('').reverse().join('');
};

const average = (array) => {
  if (array.length === 0) return 0;
  return array.reduce((acc, ele) => acc + ele, 0) / array.length;
};

module.exports = { palindrome, average };