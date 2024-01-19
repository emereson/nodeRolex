import { DataTypes } from 'sequelize';
import { db } from '../database/config.js';

const SectionDescription = db.define('sectionDescription', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  sectionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export { SectionDescription };
