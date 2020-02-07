const express=require('express')
const app=express()
const mongoose=require('mongoose')
const path=require('path')
const config = require('config');



//app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());



const users=require('./routes/api/users')
//const borrowers=require('./routes/api/borrower').borrower
const auth=require('./routes/api/auth')
const books=require('./routes/api/books')
const admins=require('./routes/api/admins')

const borrowers=require('./routes/api/borrowers')
const enquiries=require('./routes/api/enquiries')
const requests=require('./routes/api/requests')



//Use Routes
app.use('/api/users',users)
app.use('/api/auth',auth)
app.use('/api/books',books)
app.use('/api/admins',admins)
app.use('/api/borrowers',borrowers)
app.use('/api/enquiries',enquiries)
app.use('/api/requests',requests)




//another way to do that:
//app.use('/api/users',require('./routes/api/users'))
//app.use('/api/items',require('./routes/api/items'))



//BodyParser Middleware


///const db = require('./config/db');
 const db='mongodb+srv://SarahMA:035212212Ss.$@cluster0-v7ewu.mongodb.net/test?retryWrites=true&w=majority'

// // const mongoURI=process.env.MONGODB_URI||'mongodb://SarahMA:035212212sS.$@cluster0-v7ewu.mongodb.net/shopping'

//  mongoose.connect(db,{useNewUrlParser: true,  useCreateIndex: true}).then(()=>console.log('MongoDB connected'))
//  .catch(error=>console.log(error))

// //const db = config.get('mongoURI');

// // Connect to Mongo
// mongoose
//   .connect(mongoURI, { 
//     useNewUrlParser: true,
//     useCreateIndex: true
//   }) // Adding new mongo url parser
//   .then(() => console.log('MongoDB Connected...'))
//   .catch(err => console.log(err));


// const MongoClient = require('mongodb').MongoClient;
// //const uri = "mongodb://localhost/shopping-shopping";
// const client = new MongoClient(db, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


//useUnifiedTopology gets rid of "DeprecationWarning"

const connectTo=process.env.MONGODB_URI||db
mongoose.connect(connectTo, {useNewUrlParser: true,useUnifiedTopology: true});
const conn = mongoose.connection;
mongoose.connection.once('open', () => { console.log('MongoDB Connected'); });
mongoose.connection.on('error', (err) => { console.log('MongoDB connection error: ', err); }); 

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }
  
const port =process.env.PORT || 5000

app.listen(port,()=> console.log(`Server started on port ${port}`))