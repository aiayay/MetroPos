const express = require('express')
const cors = require('cors')


const app = express()

var corsOptions = {
    origin: 'http://localhost:8081'
}

// middleware
app.use(cors(corsOptions))

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