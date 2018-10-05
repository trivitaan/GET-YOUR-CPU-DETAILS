var os = require('os');
const express = require('express'); const app = express();
var MongoClient = require('mongodb').MongoClient; 
var url = 'mongodb://trivita:159951@localhost:27017/cpus';

MongoClient.connect(url, function(err, db) { 
    console.log("Terhubung ke MongoDB!"); 
});

var hostname = os.hostname();
var type = os.type();
var platform = os.platform();
var release = os.release();
var freemem = os.freemem(); 
var totalmem = os.totalmem();

console.log(hostname);

console.log(os.cpus());
console.log('totalmem : ' + os.totalmem());
console.log('freemem : ' + os.freemem())
console.log('hostname : ' + os.hostname());
console.log('type: ' + os.type());
console.log('platform : '+ os.platform());
console.log('arch : ' + os.arch());
console.log('release : ' + os.release());
console.log('uptime : ' + os.uptime());
console.log('loadavg : '+ os.loadavg());
console.log('networkInterfaces : '+os.networkInterfaces());

app.post('/data', (req,res)=>{ 
    MongoClient.connect(url, (err, db)=>{ 
        var data = {hostname, type, platform, release, freemem, totalmem};
        var collection = db.collection('cpu'); 
        collection.insert(data, (err, result)=>{ 
            console.log(result); 
            res.send(result); 
        });
    });
})

app.get('/data', (req, res)=>{ 
    MongoClient.connect(url, (err, db)=>{ 
        var collection = db.collection('cpu'); 
        collection.find({}).toArray((err, docs)=>{ 
            console.log(docs); 
            res.send(docs); 
        });
    });
})


app.listen(3210, ()=>{ 
    console.log('Server aktif di port 3210') 
});

