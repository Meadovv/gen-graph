const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.use(express.json({
   limit: '50mb'
}))
app.use(morgan('dev'))


app.use('/graph', require('./routers/graphRoute'))


app.get('/', (req, res) => {
   res.status(200).send({
      success: true,
      message: 'Server is running!'
   })
})

app.listen(process.env.SERVER_PORT, () => {
   console.log(`>>> Log: Server is running in ${process.env.NODE_MODE} Mode on PORT: ${process.env.SERVER_PORT}`);
})
