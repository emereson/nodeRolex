import { catchAsync } from '../utils/catchAsync.js';
import FormData from 'form-data';
import axios from 'axios';
import { Gallery } from '../models/gallery.model.js';

export const findAll = catchAsync(async (req, res) => {
  const galleries = await Gallery.findAll();
  return res.status(200).json({
    status: 'success',
    results: galleries.length,
    galleries,
  });
});
export const findOne = catchAsync(async (req, res) => {
  const { gallery } = req;

  return res.status(200).json({
    status: 'success',
    gallery,
  });
});

export const create = catchAsync(async (req, res) => {
  const { id } = req.params;

  const sectionImgFiles = req.files['linkImg'];
  const createdGallery = [];

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

      const galerry = await Gallery.create({
        sectionId: id,
        linkImg: imagePath,
      });

      createdGallery.push(galerry);
    })
  );

  return res.status(200).json({
    status: 'success',
    message: 'The galerry have been created',
    galerry: createdGallery,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { gallery } = req;
  const imageName = gallery.linkImg.split('/').pop();

  try {
    await axios.delete(`${process.env.SERVER_IMAGE}/delete-image/${imageName}`);
    console.log('Image deleted successfully');
  } catch (error) {
    console.error('Error deleting image:', error.message);
    // Aquí puedes decidir qué hacer en caso de error. Puedes devolver una respuesta de error si es necesario.
  }

  await gallery.destroy();
  return res.status(200).json({
    status: 'success',
    message: 'gallery has been delete',
    gallery,
  });
});

export const deleteAllElement = catchAsync(async (req, res) => {
  const { section } = req;

  await Promise.all(
    section.galleries.map(async (file) => {
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

      const gallery = await Gallery.findOne({
        where: {
          id: file.id,
        },
      });

      if (gallery) {
        await gallery.destroy();
        console.log('gallery deleted successfully');
      } else {
        console.error('gallery not found');
        // Puedes decidir qué hacer si no se encuentra el SectionVideo
      }
    })
  );

  return res.status(200).json({
    status: 'success',
    message: 'All related elements have been deleted',
  });
});
