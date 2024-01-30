const fs = require('node:fs');
const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
const template = fs.readFileSync('card-template.html', 'utf8');

const fruitList = data.map(fruit => {
  return template
    .replace('{{image}}', fruit.image)
    .replace('{{productName}}', fruit.productName)
    .replace('{{description}}', fruit.description);
});

document.getElementById('fruit-list').innerHTML = fruitList.join('');
