# Terribly Tiny Tales
Submission for Software Engineer Internship at ttt<br>

![Heroku](https://heroku-badge.herokuapp.com/?app=heroku-badge)

Check out the deployed version:
https://ttt-se-intern.herokuapp.com/

Libraries and Plugins used:
<ul>
  <li>Express Js</li>
  <li>mongoose</li>
  <li>node-fetch</li>
</ul>
Trying my best to explain the components of the code
Importing all npm modules

```javascript
var express    = require("express"),
    bodyParser = require("body-parser"),
    app        = express(),
    mongoose   = require("mongoose"),
    fetch      = require("node-fetch");
```
bodyParser and mongoose initial setup

```javascript
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/ttt-se");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
```
app GET for the index page
```javascript
app.get("/", function(req, res){
	res.render("index");
});
```
index page aka ( The main screen ), sorry for the theme copy from your website I just couldn't help it, it was neat.
![alt text](https://github.com/rajcrk/ttt-se-intern/blob/master/public/img/screencapture-localhost-3380-1523878721682.png)

submission from the above page leds to a POST request of the /submit page

```javascript
app.post("/submit", function(req, res){
	var N = req.body.hN;
	console.log(N);
	fetch("http://terriblytinytales.com/test.txt").then(function(res){
		return res.text();
	}).then(function(body){
		var wordCount = {};
		var words = body.split(/\s/);
		for(var i = 0;i < words.length;i++)
			wordCount[words[i].toLowerCase()] = (wordCount[words[i].toLowerCase()] || 0) + 1;
		keysSorted = Object.keys(wordCount).sort(function(a, b){return wordCount[b] - wordCount[a]});
		res.render("sorted", {keysSorted: keysSorted, N: N});
	});
});
```
The data from the hosted text file is retrived by using the node module <strong>node-fetch</strong>
```javascript
fetch("http://terriblytinytales.com/test.txt").then(function(res){
		return res.text();
	}).then(function(body){}
```
The hosted text file is retrived and each words are seperated by using the javaScript split method.
```javascript
var words = body.split(/\s/);
```
A loop is created to loop until the end of all words and the word count is stored in an Object called "wordCount" 
```javascript
for(var i = 0;i < words.length;i++)
			wordCount[words[i].toLowerCase()] = (wordCount[words[i].toLowerCase()] || 0) + 1;
```
the wordCount object model has the property as word and the value as occurence 
```javascript
{
  "word": occurence
}
```

The wordCount object is then sorted in descending order 

```javascript
keysSorted = Object.keys(wordCount).sort(function(a, b){return wordCount[b] - wordCount[a]});
```

Finally sorted page is rendered and along with res.render the sorted value as well the user requested N value is also sent

```javascript
res.render("sorted", {keysSorted: keysSorted, N: N});
```

The final sorted page is. The maximum occurencers are displayed until the user provided N value.<br>

![alt text](https://github.com/rajcrk/ttt-se-intern/blob/master/public/img/screencapture-localhost-3380-submit-1523878780161.png)

A check is performed at the begining of the sorted page to see if the user provided value is correct.<br>
A loop is used on the server side to loop till the requested N value in the keySorted object.

```javascript
<% if(N < keysSorted.length && N > 0){ %>
```

If the user provided an invalid entry an okayish kind of an error page is rendered <br>

![alt text](https://github.com/rajcrk/ttt-se-intern/blob/master/public/img/screencapture-localhost-3380-submit-1523878830180.png)


