const express = require('express')
const cors = require('cors')


const app = express()

// middleware

app.use(express.json())

app.use(express.urlencoded({ extended: true }))


// routers
const router = require('./routes/productrouter.js');
app.use('/api/products', router)

// Testing API
app.get('/', (req, res) => {
    res.json({ message: 'hello ' });
});

//port

const PORT = process.env.PORT || 3000

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})