// models/index.js

import sequelize from '../config/database.js'
import Rider from './Rider.js'
import User from './User.js'
import Profile from './Profile.js'
import Vehicle from './Vehicle.js'
export { sequelize, Rider, User, Profile, Vehicle }

// ================== Optional Default Export ==================

const db = {
  sequelize,
  Rider,
  User,
  Profile,
  Vehicle
}

export default db
