const fs = require('node:fs');
const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

const getUrlParams = () => {
  const params = {};
  window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, (match, key, value) => {
    params[key] = value;
  });
  return params;
};

const productId = getUrlParams().id;
const fruit = data.find(item => item.id === productId);

document.querySelector('h1').innerText = fruit.productName;
document.querySelector('img').src = fruit.image;
document.querySelector('img').alt = fruit.productName;
document.querySelector('p').innerText = fruit.description;
