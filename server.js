import 'dotenv/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import cookieSession from 'cookie-session'
import methodOverride from 'method-override'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import ngrok from '@ngrok/ngrok'
import process from 'node:process'
import index from './routes/index.js'
import admin from './routes/admin/index.js'
import quotes from './routes/quotes/index.js'
import docs from './routes/docs/index.js'
import products from './routes/products/index.js'
import services from './routes/services/index.js'
import users from './routes/users/index.js'
import connectDB from './config/db.js'

connectDB()

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Use public folder for static files
app.use(express.static(path.join(__dirname, 'public')))

app.use(methodOverride('_method'))

// Use cookie session for authentication
app.use(cookieSession({
  secret: 'lklekaiudbfip32n48dpa3pihirgldnagf3qp3r09ieemviej',
  secure: process.env.NODE_ENV === 'production' ? true : false,
  httpOnly: true,
  maxAge: 10800000,
  sameSite: 'strict'
}))

app.use('/users/stripe/events', express.raw({ type: 'application/json' }))

// Use body parser for form data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.use(session({
//   secret: 'lklekaiudbfip32n48dpa3pihirgldnagf3qp3r09ieemviej',
//   store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
//   resave: false,
//   saveUninitialized: true
// }))

// Mount routes
app.use('/', index)
app.use('/admin', admin)
app.use('/quotes', quotes)
app.use('/docs', docs)
app.use('/products', products)
app.use('/services', services)
app.use('/users', users)

const PORT = process.env.PORT || 3000

// Set Express server to listen to port 3000
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
})