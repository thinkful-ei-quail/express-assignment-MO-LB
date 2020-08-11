/* eslint-disable quotes */
const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));

app.get('/', (request, response) => {
  response.send('Hello Express!');
});

app.get('/burgers', (request, response) => {
  response.send('We have juicy burgers!');
});

app.get('/pizza', (request, response) => {
  response.send('Yay Pizza!');
});

app.get('/pizza/pepperoni', (request, response) => {
  response.send('Your pizza is on the way!');
});

app.get('/pizza/pineapple', (request, response) => {
  response.send('We don\'t serve that here. Never call again!');
});

//Working with the Express response object
app.get('/hello', (req, res) => {
  res.status(204).end();
});

app.get('/video', (req, res) => {
  const video = {
    title: 'Cats falling over',
    description: '15 minutes of hilarious fun as cats fall over',
    length: '15.40'
  };
  res.json(video);
});

app.get('/colors', (req, res) => {
  const colors = [
    {
      name: "red",
      rgb: "FF0000"
    },
    {
      name: "green",
      rgb: "00FF00"
    },
    {
      name: "blue",
      rgb: "0000FF"
    },
  ];
  res.json(colors);
});

app.get('/grade', (req, res) => {
  // get the mark from the query
  const { mark } = req.query;

  // do some validation
  if (!mark) {
    // mark is required
    return res
      .status(400)
      .send('Please provide a mark');
  }

  const numericMark = parseFloat(mark);
  if (Number.isNaN(numericMark)) {
    // mark must be a number
    return res
      .status(400)
      .send('Mark must be a numeric value');
  }

  if (numericMark < 0 || numericMark > 100) {
    // mark must be in range 0 to 100
    return res
      .status(400)
      .send('Mark must be in range 0 to 100');
  }

  if (numericMark >= 90) {
    return res.send('A');
  }

  if (numericMark >= 80) {
    return res.send('B');
  }

  if (numericMark >= 70) {
    return res.send('C');
  }

  res.send('F');
});


//Exercises 8/10/2020
app.get('/sum', (request, response) => {
  const a = parseInt(request.query.a);
  const b = parseInt(request.query.b);
  const c = a + b;
  response.send(`The sum of ${a} and ${b} is ${c}`);
});

app.get('/cipher', (request, response) => {
  const text = request.query.text;
  const shift = parseInt(request.query.shift);
  let encryption = '';
  for (let i = 0; i < text.length; i++) {
    let currentCharCode = text[i].charCodeAt(0);
    let shiftedCharCode = currentCharCode + shift;
    if (shiftedCharCode > 90) {
      encryption += String.fromCharCode(shiftedCharCode - 26);
    } else {
      encryption += String.fromCharCode(shiftedCharCode);
    }
  }
  response.send(encryption);
});

app.get('/lotto', (request, response) => {
  const numbers = request.query.arr;
  const lotto = [];

  //generate 6 random numbers
  for (let i = 0; i < numbers.length; i++) {
    lotto.push(Math.ceil(Math.random() * Math.floor(20)));
  }

  //compare numbers
  let numMatch = 0;
  for (let i = 0; i < numbers.length; i++) {
    let number = parseInt(numbers[i]);

    for (let j = 0; j < lotto.length; j++) {
      if (number === lotto[j])
        numMatch++;
    }
  }
  // respond based on numMatch
  switch (numMatch) {
  case 4:
    response.send('Congratulations, you win a free ticket');
    break;
  case 5:
    response.send('Congratulations! You win $100!');
    break;
  case 6:
    response.send('Wow! Unbelievable! You could have won the mega millions!');
    break;
  default:
    response.send('Sorry, you lose');
  }
});

app.listen(8080, () => {
  console.log('Express server is listening on port 8080!');
});