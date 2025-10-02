// models/index.js

import sequelize from "../config/database.js";

export {
  sequelize,
  
 
};



// ================== Optional Default Export ==================

const db = {
  sequelize,
 
};

export default db;