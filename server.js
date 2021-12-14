const express = require('express')
    , app = express()
    , routes = require('./api/routes/')
    , path = require('path')
    , public_dir = path.resolve(__dirname, 'www/public')

// load environment variables if not done already
undefined === process.env.HTTP_PORT && require('dotenv').config({ path: path.resolve(__dirname, '.env') })

app.use('/public/', express.static(public_dir))
app.use(express.json())

app.get('/api/fruits', routes.fruits.list)
app.put('/api/fruits', routes.fruits.create)
app.get('/api/fruits/:id', routes.fruits.single)
app.patch('/api/fruits/:id', routes.fruits.update)
app.delete('/api/fruits/:id', routes.fruits.delete)

app.get('/*', (req, res) => res.sendFile(path.resolve(public_dir, 'index.html')))

global.Util = require('./api/model/Util')

const server = app.listen(process.env.HTTP_PORT, () =>
  console.log(`Server listening on localhost:${server.address().port}`))
