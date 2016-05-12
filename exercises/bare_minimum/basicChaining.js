/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var promisification = require('./promisification');
var promiseConstructor = require('./promiseConstructor');

var Promise = require('bluebird');
Promise.promisifyAll(fs);


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return promiseConstructor.pluckFirstLineFromFileAsync(readFilePath)
    .then(function(username) {
      return promisification.getGitHubProfileAsync(username);
    })
    .then(function(responseBody) {
      console.log(JSON.stringify(responseBody));
      return fs.writeFileAsync(writeFilePath, JSON.stringify(responseBody));
    })
    .catch(function(error) {
      console.error(error);
    });
};

// var request = require('request');
// Promise.promisifyAll(request, {multiArgs: true});

// // var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
// //   return fs.readFileAsync(readFilePath, 'utf8')
//     .then(function(content) {
//       var firstLine = content.slice(0, content.indexOf('\n'));
//       return firstLine;
//     })
//     .then(function(username) {
//       var options = {
//         url: 'https://api.github.com/users/' + username,
//         headers: { 'User-Agent': 'request' },
//         json: true  // will JSON.parse(body) for us
//       };

//       return request.getAsync(options);
//     })
//     .then(function(result) {
//       // response
//       // var response = result[0];
//       var body = result[1];
//       return fs.writeFileAsync(writeFilePath, JSON.stringify(body));
//     })
//     .catch(function(err) {
//       console.log('Error: ' + err);
//     });
// };

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
