import { SectionVideo } from '../models/sectionVideo.model.js';
import { catchAsync } from '../utils/catchAsync.js';
import axios from 'axios';
import FormData from 'form-data';

export const findAll = catchAsync(async (req, res) => {
  const sectionVideos = await SectionVideo.findAll();
  return res.status(200).json({
    status: 'success',
    results: sectionVideos.length,
    sectionVideos,
  });
});
export const findOne = catchAsync(async (req, res) => {
  const { sectionVideo } = req;

  return res.status(200).json({
    status: 'success',
    sectionVideo,
  });
});

export const create = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { title, linkVideo } = req.body;

  const sectionImgFile = req.file;

  const formDataImg = new FormData();
  formDataImg.append('sectionImg', sectionImgFile.buffer, {
    filename: sectionImgFile.originalname,
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

  const sectionVideo = await SectionVideo.create({
    sectionId: id,
    title,
    linkVideo,
    linkImg: imagePath,
  });

  // Devolver la respuesta al cliente
  return res.status(200).json({
    status: 'success',
    message: 'The sectionVideo has been created',
    sectionVideo,
  });
});

export const update = catchAsync(async (req, res) => {
  const { sectionVideo } = req;
  const { title, linkVideo } = req.body;
  const imageName = sectionVideo.linkImg.split('/').pop();

  const sectionImgFile = req.file;

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

      await sectionVideo.update({
        linkImg: response.data.imagePath,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message:
          'Internal server error while uploading new image and updating section',
        error: error.message,
      });
    }
  } else {
    await sectionVideo.update({
      title,
      linkVideo,
    });
  }

  return res.status(200).json({
    status: 'success',
    message: 'The sectionVideo has been created',
    sectionVideo,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { sectionVideo } = req;
  const imageName = sectionVideo.linkImg.split('/').pop();

  try {
    await axios.delete(`${process.env.SERVER_IMAGE}/delete-image/${imageName}`);
    console.log('Image deleted successfully');
  } catch (error) {
    console.error('Error deleting image:', error.message);
    // Aquí puedes decidir qué hacer en caso de error. Puedes devolver una respuesta de error si es necesario.
  }

  await sectionVideo.destroy();
  return res.status(200).json({
    status: 'success',
    message: 'sectionVideo has been delete',
    sectionVideo,
  });
});
