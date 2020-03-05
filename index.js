const express = require('express');
const app = express();

//add mongoDB to the backend
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://MTBDBUser:<password>@mind-the-gap-nhotr.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});

//import routes
const authRoute = require('./routes/auth');

//Route Middlewares
app.use('/api/user', authRoute);

app.listen(8000, () => { console.log('Server started!') });

