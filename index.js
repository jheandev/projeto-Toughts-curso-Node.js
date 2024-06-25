const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session) //salvar as seções na pasta session
const flash = require('express-flash')

const app = express()  //iniciando o express  


const conn = require('./db/conn') //importando a conecção 

// Models
const Tought = require('./models/Tought')
const User = require('./models/User')


// Import Routes
const ToughtsRoutes = require('./routes/toughtsRoutes')
const authRoutes = require('./routes/authRoutes')

// Import Controller
const ToughtController = require('./controllers/ToughtController')


// define a template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// receber resposta do body(requisição de formulario)
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

// session middleware(ele indica onde o express vai salvar as sessões )
app.use(
  session({
    name: "session",
    secret: "nosso_secret",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function() {},
      path:require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      httpOnly: true
    }
  }),
)


// flash messages(status do sistema)
app.use(flash())

// public path(referente a img, css, javascript)
app.use(express.static('public'))


// set session to resposta
app.use((req, res, next) => {

  if(req.session.userid) {
    res.locals.session = req.session 
  }

    next()
})

// Routes
app.use('/toughts', ToughtsRoutes)
app.use('/', authRoutes)

app.get('/', ToughtController.showToughts)


//chamando a aplicação  
conn
  //.sync({ force: true })
  .sync()
  .then(() => {
    app.listen(3000)
  })
  .catch((err) => console.log(err))


