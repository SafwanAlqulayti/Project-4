const express=require('express')
const app=express()
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const path=require('path')
//const config = require('config');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



const items=require('./routes/api/items')


//Use Routes
app.use('/api/items',items)



//BodyParser Middleware


///const db = require('./config/db');
const db='mongodb+srv://SarahMA:035212212Ss.$@cluster0-v7ewu.mongodb.net/test?retryWrites=true&w=majority'

// const mongoURI=process.env.MONGODB_URI||'mongodb://SarahMA:035212212sS.$@cluster0-v7ewu.mongodb.net/shopping'

 mongoose.connect(db,{useNewUrlParser: true,  useCreateIndex: true}).then(()=>console.log('MongoDB connected'))
 .catch(error=>console.log(error))

// //const db = config.get('mongoURI');

// // Connect to Mongo
// mongoose
//   .connect(mongoURI, { 
//     useNewUrlParser: true,
//     useCreateIndex: true
//   }) // Adding new mongo url parser
//   .then(() => console.log('MongoDB Connected...'))
//   .catch(err => console.log(err));


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost/shopping-shopping";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }
  
const port =process.env.PORT || 5000

app.listen(port,()=> console.log(`Server started on port ${port}`))