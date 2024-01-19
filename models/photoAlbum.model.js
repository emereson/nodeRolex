import { DataTypes } from 'sequelize';
import { db } from '../database/config.js';

const PhotoAlbum = db.define('photoAlbum', {
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
  linkImg: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { PhotoAlbum };
