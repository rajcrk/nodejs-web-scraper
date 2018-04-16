var express    = require("express"),
	bodyParser = require("body-parser"),
    app        = express(),
    mongoose   = require("mongoose"),
    fetch      = require("node-fetch");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/ttt-se");
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.bodyParser());
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));







app.get("/", function(req, res){
	res.render("index");
});

app.post("/submit", function(req, res){
	var N = req.body.hN;
	console.log(N);
	fetch("http://terriblytinytales.com/test.txt").then(function(res){
		return res.text();
	}).then(function(body){
		//console.log(body);
		//res.send(body);
		var wordCount = {};
		var words = body.split(/\s/);
		//res.send(words);
		for(var i = 0;i < words.length;i++)
			wordCount[words[i].toLowerCase()] = (wordCount[words[i].toLowerCase()] || 0) + 1;
		
		keysSorted = Object.keys(wordCount).sort(function(a, b){return wordCount[b] - wordCount[a]});

		//res.send(keysSorted);
		for(var i = 0;i < N;i++){
			console.log(keysSorted[i]);
		}
		res.render("sorted", {keysSorted: keysSorted, N: N});
		// console.log("==============");
		// console.log(wordCount);
	});
});

app.listen(3380, function(){
    console.log("The Server Has Started at 3380");
});