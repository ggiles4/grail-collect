// DOTENV =================
require('dotenv').config()
// DEPENDANCIES ===========
const express = require('express')
const mongoose = require('mongoose');
const app = express()
const kicks = require('./models/kicks.js')
const PORT = process.env.PORT || 3000;
const reactViews = require('express-react-views');
const Kick = require('./models/kicks.js');
const createEngine = reactViews.createEngine

// const methodOverride = require('method-override');

const mongoURI = process.env.MONGO_URI;
const db = mongoose.connection;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

db.once('open', () => {
    console.log('Mongo is working!');
});
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'jsx');
app.engine('jsx', createEngine());
// app.use(methodOverride('_method'));
app.get('/', (req, res) => {
    res.send('<h1>Grail Collection</h1>')
})

// Index
app.get('/collection', (req, res) => {
    Kick.find({}, (error, allKicks) => {
        res.render('Index', {
            kicks: allKicks
        }, )
        })
    
})
// Show
app.get('/collection/sneaker', (req, res) => {
    res.render('Show')
})
// New
app.get('/collection/add', (req, res) => {
    res.render('New')
})

// Post
app.post('/collection/', (req, res) => {
    // Use Model to create Fruit Document
    Kick.create(req.body, (error, createdKick) => {
        // Once created - respond to client
        res.redirect('/collection');
    });
});

app.listen(PORT, (req, res) => {
    console.log('Check the kicks!');
    
})