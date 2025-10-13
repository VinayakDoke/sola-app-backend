// models/Vehicle.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js'; // your Sequelize instance

class Vehicle extends Model {}

Vehicle.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    vendor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('Hatchback', 'Sedan', 'MUV', 'SUV'),
      allowNull: false,
    },
    vehicle_no: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    rc_no: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    rc_date_from: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    rc_date_upto: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    puc_no: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    puc_date_from: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    puc_date_to: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fitness_certificate_no: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    fitness_certificate_from: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fitness_certificate_to: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    insurance: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    insurance_from: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    insurance_to: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    rc_pic: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    puc_pic: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    fitness_certificate_pic: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    insurance_pic: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    veh_pic: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    veh_pic1: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    veh_pic2: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    veh_pic3: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    veh_pic4: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
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
    modelName: 'Vehicle',
    tableName: 'vehical',
    paranoid: true, // enables soft delete
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

export default Vehicle;
