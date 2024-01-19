import { DataTypes } from 'sequelize';
import { db } from '../database/config.js';

const SectionVideo = db.define('sectionVideo', {
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
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  linkImg: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  linkVideo: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export { SectionVideo };
