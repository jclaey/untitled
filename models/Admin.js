import crypto from 'crypto'
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const AdminSchema = new Schema({
  email: String,
  password: String
})

AdminSchema.methods.comparePasswords = function(suppliedPassword) {
  const [hashed, salt] = this.password.split('.')

  const hashedSupplied = crypto.createHash('sha256').update(suppliedPassword + salt).digest('hex')

  return hashedSupplied === hashed
}

const Admin = mongoose.model('Admin', AdminSchema)

export default Admin