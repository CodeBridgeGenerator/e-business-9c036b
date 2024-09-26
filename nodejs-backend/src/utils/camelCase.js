module.exports = (string) => {
  string = string.replace(/[^a-zA-Z0-9]/g, ' ');
  let sentence = string.toLowerCase().split(' ');
  for (let i = 0; i < sentence.length; i++) {
    if (i === 0) continue;
    if (!sentence[i] || !sentence[i][0] || sentence[i][0] === ' ') continue;
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }
  string = sentence.join('');
  sentence = string.split('_');
  for (let i = 0; i < sentence.length; i++) {
    if (i === 0) continue;
    if (!sentence[i] || !sentence[i][0] || sentence[i][0] === ' ') continue;
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }
  return sentence.join('');
};
