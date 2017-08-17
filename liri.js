// Node modules required to run functions
var fs = require("fs");
// reads and writes files  

var request = require("request");
var keys = require("./keys");
var twitter = require("twitter");
var spotify = require("spotify");
var liriArg = require(processargv[2]);

// request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=40e9cece")