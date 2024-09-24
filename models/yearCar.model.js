import { DataTypes } from 'sequelize';
import { db } from '../database/config.js';

const YearCar = db.define('yearCar', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  year: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { YearCar };
