import { DataTypes } from 'sequelize';
import { db } from '../database/config.js';

const CarModel = db.define('carModel', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  idTwo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  brandCarId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  carData: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});

export { CarModel };
