import { PhotoAlbum } from '../models/photoAlbum.model.js';
import { catchAsync } from '../utils/catchAsync.js';
import FormData from 'form-data';
import axios from 'axios';

export const findAll = catchAsync(async (req, res) => {
  const photosAlbum = await PhotoAlbum.findAll();
  return res.status(200).json({
    status: 'success',
    results: photosAlbum.length,
    photosAlbum,
  });
});
export const findOne = catchAsync(async (req, res) => {
  const { photoAlbum } = req;

  return res.status(200).json({
    status: 'success',
    photoAlbum,
  });
});

export const create = catchAsync(async (req, res) => {
  const { id } = req.params;

  const sectionImgFiles = req.files['linkImg'];
  const createdPhotoAlbums = [];

  console.log(sectionImgFiles);

  await Promise.all(
    sectionImgFiles.map(async (file) => {
      const formDataImg = new FormData();
      formDataImg.append('sectionImg', file.buffer, {
        filename: file.originalname,
      });

      const responseImg = await axios.post(
        `${process.env.SERVER_IMAGE}/upload`,
        formDataImg,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const { imagePath } = responseImg.data;

      const photoAlbum = await PhotoAlbum.create({
        sectionId: id,
        linkImg: imagePath,
      });

      createdPhotoAlbums.push(photoAlbum);
    })
  );

  return res.status(200).json({
    status: 'success',
    message: 'The photoAlbums have been created',
    photoAlbums: createdPhotoAlbums,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { photoAlbum } = req;
  const imageName = photoAlbum.linkImg.split('/').pop();
  console.log(imageName);

  try {
    await axios.delete(`${process.env.SERVER_IMAGE}/delete-image/${imageName}`);
    console.log('Image deleted successfully');
  } catch (error) {
    console.error('Error deleting image:', error.message);
    // Aquí puedes decidir qué hacer en caso de error. Puedes devolver una respuesta de error si es necesario.
  }

  await photoAlbum.destroy();
  return res.status(200).json({
    status: 'success',
    message: 'photoAlbum has been delete',
    photoAlbum,
  });
});

export const deleteAllElement = catchAsync(async (req, res) => {
  const { section } = req;
  console.log(section);

  await Promise.all(
    section.photoAlbums.map(async (file) => {
      const imageName = file.linkImg.split('/').pop();

      try {
        await axios.delete(
          `${process.env.SERVER_IMAGE}/delete-image/${imageName}`
        );
        console.log('Image deleted successfully');
      } catch (error) {
        console.error('Error deleting image:', error.message);
        // Aquí puedes decidir qué hacer en caso de error. Puedes devolver una respuesta de error si es necesario.
      }

      const photoAlbum = await PhotoAlbum.findOne({
        where: {
          id: file.id,
        },
      });

      if (photoAlbum) {
        await photoAlbum.destroy();
        console.log('photoAlbum deleted successfully');
      } else {
        console.error('photoAlbum not found');
        // Puedes decidir qué hacer si no se encuentra el SectionVideo
      }
    })
  );

  return res.status(200).json({
    status: 'success',
    message: 'All related elements have been deleted',
  });
});
