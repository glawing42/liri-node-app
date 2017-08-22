// Node modules required to run functions
var fs = require("fs");
// reads and writes files  

var request = require("request");
var keys = require("./keys.js");
var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var twit = new twitter(keys.twitterKeys);
var liriArg = process.argv[2];
var value = process.argv[3];
var dataText = process.argv[4];

var params = {
    "screen_name": "glaw42",
    "count": 20
}

// Twitter
if(liriArg === "my-tweets"){
    twit.get('statuses/user_timeline', params, gotData);
        function gotData(error, data, response){
            
            var tweets = data;
            for(var i = 0; i<tweets.length; i++){
                console.log(tweets[i].text + "\r\n");
                console.log(tweets[i].created_at + "\r\n");
            }
        };
}

//  Spotify
if(liriArg === "spotify-this-song"){

    var spotify = new Spotify({
  id: "6ca42ceeea5b45c48e09d875971669c9",
  secret: "a0adab62a7d544d1868cfa995b54d614"
});

    var songTitle = process.argv[3];
    spotify.search({ type: 'track', query: songTitle }, function(err, data){
        
        if(process.argv[3]){
            var data = data.tracks.items;
            for(var i =0; i < data.length; i++){
                
                console.log("Song: " + data[i].name + "\r\n"); //song track name
                console.log("Album: " + data[i].album.name + "\r\n"); //album name
                console.log("Preview Link: " + data[i].preview_url + "\r\n"); //preview link to the song
            
                for(var j =0; j < data[i].artists.length; j++){
                    console.log("Artist: " + data[i].artists[j].name + "\r\n"); //artist's name
                }
            }
        }else{
            spotify.search({ type: 'track', query: "what's my age again"}, function(err, data){
                var data = data.tracks.items;
                console.log(data[0].name); //song track name
                console.log(data[0].album.name); //album name
                console.log(data[0].preview_url); //preview link to the song
                console.log(data[0].artists[0].name); //artist's name
            });
        }
    });
    outputText = function(){
    console.log(data)
    };
}

// OMDB
if(liriArg === "movie-this"){ 
    // console.log(process.argv);
    var movieTitle = process.argv[3];
    request("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&r=json&tomatoes=true&apikey=40e9cece",function (error, response, body){
        
        if(process.argv[3]){
        console.log("Movie Title: " + JSON.parse(body).Title + "\r\n");  
        console.log("Release Year: " + JSON.parse(body).Year + "\r\n");
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating + "\r\n");
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating + "\r\n");
        console.log("Country: " + JSON.parse(body).Country + "\r\n");
        console.log("Language: " + JSON.parse(body).Language + "\r\n");
        console.log("Plot: " + JSON.parse(body).Plot + "\r\n");
        console.log("Actors: " + JSON.parse(body).Actors + "\r\n");
       
        }else{
            request("http://www.omdbapi.com/?t=mr+nobody+&y=&plot=short&r=json&tomatoes=true&apikey=40e9cece",function(error, response,body){
                console.log("Movie Title: " + JSON.parse(body).Title);  
                console.log("Release Year: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
            
            })
        }
    })
    outputText = function(){
    console.log(data);
    };
}


