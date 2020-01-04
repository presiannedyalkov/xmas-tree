const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PythonShell = require('python-shell').PythonShell;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3000, function() {
    console.log('server running on port 3000');
});

const pyFile = 'input.py';
const pyScriptPath = './python/';
const pyVersionPath = '/usr/bin/python2.7';
const pyMode = 'text';
let options = {mode: pyMode, pythonPath: pyVersionPath, scriptPath: pyScriptPath}
let result;

function checkArray(array) {
  console.log('array', array);
  if (Array.isArray(array)) {
    console.log('is array: ', Array.isArray(array));
    array.forEach(checkNumber);
    console.log('result', result);
    if (result === 'OK') {
      result = 'OK';
    } else {
      return result;
    }
    return result;
  } else {
    return new Error('Error: leds should contain only arrays!');
  }
}
function checkNumber(value) {
  console.log('value', value);
  if (typeof value == 'number') {
    return result = 'OK';
  }
  result = new Error('Error: array should contain only numbers!');
}
function typeCheck(ledsWrapper) {
  console.log('initiating typeCheck');
  console.log('ledsWrapper', ledsWrapper);
  if (Array.isArray(ledsWrapper)) {
    console.log('ledsWrapper is an array!');
    ledsWrapper.forEach(checkArray);
    result === 'OK' ? 'OK' : new Error('Error: leds should contain only arrays!');
    return result;
  } else {
    console.log('Error: leds is not an array!');
    return new Error('Error: leds is not an array!');
  }
}

app.post('/lights', (req, res) => {
  // req.body.leds {Array} an array containing one or multiple arrays eg [[1,2], [3,4], [5,6]] || [[1]] || [[1,2]]
  // red leds: [1, 3, 4, 6, 8]
  // green leds: [0, 2, 5, 7, 9]
  console.log('body: ', req.body);
  if (req.body && req.body.leds) {
    let ledsWrapper = req.body.leds;

    console.log('1: leds: ', ledsWrapper);
    options.args = JSON.stringify(ledsWrapper);
  
    if (typeCheck(ledsWrapper) === 'OK') {
      console.log('typeCheck completed');
      PythonShell.run(pyFile, options, function (error, results) {
        if (error) {
          console.error("ERROR: ", error);
          res.status(404).json('Error: Something went wrong!');
          throw new Error(error);
        };
        console.log('results: ', JSON.parse(results[0]));
      });
      res.status(200).json('OK');
    } else if (typeCheck instanceof Error) {
      return res.status(404).json(typeCheck.message);
    } else {
      return res.status(404).json('Error: Unexpected error!');
    }
  } else if (!req.body) {
    return res.status(404).json('Error: request body is missing!');
  } else if (!req.body.leds) {
    return res.status(404).json('Error: leds is missing!');
  } else {
    return res.status(404).json('Error: Something went wrong!');
  }
});
