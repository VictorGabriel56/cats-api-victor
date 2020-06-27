var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://admin:admin@cluster0-nfulh.gcp.mongodb.net/testeste1233123dasdas213?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("cats");
  dbo.collection("Breeds").findOne({}, function(err, result) {
    if (err) throw err;
    console.log(result.id);
    db.close();
  });
});