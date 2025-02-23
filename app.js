const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  const beersArray = await punkAPI.getBeers();

  console.log(beersArray);
  res.render('beers', { beersArray: beersArray });
});

// app.get('/beers', (req, res) => {
//   punkAPI
//     .getBeers()
//     .then(beersFromApi => {
//       res.render('beers', { beersArray: beersFromApi });
//     })
//     .catch(error => console.log(error));
// });

app.get('/random-beer', async (req, res) => {
  const randomBeer = await punkAPI.getRandom();

  console.log(randomBeer);
  res.render('random-beer', { randomBeer: randomBeer });
});

app.get('/beers/beer-:id', async (req, res) => {
  res.render('random-beer', {
    randomBeer: await punkAPI.getBeer(req.params.id)
  });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
