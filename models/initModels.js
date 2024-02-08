import { Gallery } from './gallery.model.js';
import { PhotoAlbum } from './photoAlbum.model.js';
import { Section } from './section.model.js';
import { SectionDescription } from './sectionDescription.model.js';
import { SectionVideo } from './sectionVideo.model.js';

const initModel = () => {
  Section.hasMany(SectionDescription, { foreignKey: 'sectionId' });
  SectionDescription.belongsTo(Section, { foreignKey: 'sectionId' });
  Section.hasMany(SectionVideo, { foreignKey: 'sectionId' });
  SectionVideo.belongsTo(Section, { foreignKey: 'sectionId' });
  Section.hasMany(PhotoAlbum, { foreignKey: 'sectionId' });
  PhotoAlbum.belongsTo(Section, { foreignKey: 'sectionId' });
  Section.hasMany(Gallery, { foreignKey: 'sectionId' });
  Gallery.belongsTo(Section, { foreignKey: 'sectionId' });
};

export { initModel };
