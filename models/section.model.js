import { DataTypes } from 'sequelize';
import { db } from '../database/config.js';

const Section = db.define('section', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  linkVideo: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  sectionImg: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export { Section };
