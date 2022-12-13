const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;

// Creating app 
const app = express();

// Middlewear 
app.use(cors());
app.use(express.json());


// Root Endpoint 
app.get('/', (req, res) => {
    res.send('Random Users');
});

// for unavailable routes 
app.all("*", (req, res) => {
    res.send("No route found");
})

// listening server 
app.listen(port, () => {
    console.log('Server running on port', port);
});