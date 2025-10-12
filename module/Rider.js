// models/Rider.js
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // adjust the path to your Sequelize config

class Rider extends Model {
  // You can add instance or class-level methods here if needed
}

Rider.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    vender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    middle_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    mobile: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    alternate_mobile: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    adhar_number: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    driving_license: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    driving_license_expiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    driving_experience: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    pic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    adhar_photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    driving_licence_photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Rider',
    tableName: 'rider',
    paranoid: true, // enable soft deletes
    timestamps: true, // auto-manage createdAt & updatedAt
  }
);

export default Rider;
