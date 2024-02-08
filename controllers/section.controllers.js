import { Section } from '../models/section.model.js';
import { catchAsync } from '../utils/catchAsync.js';
import axios from 'axios';
import FormData from 'form-data';

export const findAll = catchAsync(async (req, res) => {
  const sections = await Section.findAll({
    order: [['id', 'ASC']],
  });

  return res.status(200).json({
    status: 'success',
    results: sections.length,
    sections,
  });
});

export const findOne = catchAsync(async (req, res) => {
  const { section } = req;

  return res.status(200).json({
    status: 'success',
    section,
  });
});

export const create = catchAsync(async (req, res) => {
  const { title, linkVideo } = req.body;

  const sectionImgFile = req.files['sectionImg'][0];
  const formDataImg = new FormData();
  formDataImg.append('sectionImg', sectionImgFile.buffer, {
    filename: sectionImgFile.originalname,
  });

  // Subir la primera imagen
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

  // Crear la sección en la base de datos
  const section = await Section.create({
    title,
    linkVideo,
    sectionImg: imagePath,
  });

  return res.status(200).json({
    status: 'success',
    message: 'The section has been created',
    section,
  });
});

export const update = catchAsync(async (req, res) => {
  const { section } = req;
  const { title, linkVideo } = req.body;
  const imageName = section.sectionImg.split('/').pop();

  const sectionImgFile = req.files['sectionImg']
    ? req.files['sectionImg'][0]
    : null;

  if (sectionImgFile) {
    const formDataImg = new FormData();
    formDataImg.append('sectionImg', sectionImgFile.buffer, {
      filename: sectionImgFile.originalname,
    });

    try {
      await axios.delete(
        `${process.env.SERVER_IMAGE}/delete-image/${imageName}`
      );

      const response = await axios.post(
        `${process.env.SERVER_IMAGE}/upload`,
        formDataImg,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      await section.update({
        sectionImg: response.data.imagePath,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message:
          'Internal server error while uploading new image and updating section',
        error: error.message,
      });
    }
  }

  if (!sectionImgFile) {
    await section.update({
      title,
      linkVideo,
    });
  }

  return res.status(201).json({
    status: 'Success',
    message: 'Sección actualizada correctamente',
    section,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { section } = req;
  const imageName = section.sectionImg.split('/').pop();

  try {
    await axios.delete(`${process.env.SERVER_IMAGE}/delete-image/${imageName}`);
    console.log('Image deleted successfully');
  } catch (error) {
    console.error('Error deleting image:', error.message);
    // Aquí puedes decidir qué hacer en caso de error. Puedes devolver una respuesta de error si es necesario.
  }

  // Independientemente de si hay un error o no, procede con la eliminación de la sección.
  await section.destroy();

  return res.status(200).json({
    status: 'success',
    message: 'Section has been deleted',
    section,
  });
});
