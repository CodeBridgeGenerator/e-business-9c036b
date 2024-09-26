module.exports = () => {
  let theCode = Math.floor(Math.random() * 999999);
  while (theCode < 100001) {
    theCode = Math.floor(Math.random() * 999999);
  }
  return theCode;
};
