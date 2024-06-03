import 'dotenv/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import cookieSession from 'cookie-session'
import index from './routes/index.js'
import admin from './routes/admin/index.js'
import quotes from './routes/quotes/index.js'
import docs from './routes/docs/index.js'
import products from './routes/products/index.js'
import services from './routes/services/index.js'
import connectDB from './config/db.js'

connectDB()

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Use public folder for static files
app.use(express.static(path.join(__dirname, 'public'))) 

// Use body parser for form data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieSession({
  secret: 'lklekaiudbfip32n48dpa3pihirgldnagf3qp3r09ieemviej',
  secure: process.env.NODE_ENV === 'production' ? true : false,
  httpOnly: true,
  maxAge: 10800000,
  sameSite: 'strict'
}))

// Mount routes
app.use('/', index)
app.use('/admin', admin)
app.use('/quotes', quotes)
app.use('/docs', docs)
app.use('/products', products)
app.use('/services', services)

const PORT = process.env.PORT || 3000

// Set Express server to listen to port 3000
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
})