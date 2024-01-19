import { SectionDescription } from '../models/sectionDescription.model.js';
import { catchAsync } from '../utils/catchAsync.js';

export const findAll = catchAsync(async (req, res) => {
  const SectionsDescriptions = await SectionDescription.findAll();
  return res.status(200).json({
    status: 'success',
    results: SectionsDescriptions.length,
    SectionsDescriptions,
  });
});
export const findOne = catchAsync(async (req, res) => {
  const { sectionDescription } = req;

  return res.status(200).json({
    status: 'success',
    sectionDescription,
  });
});

export const create = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  const sectionDescription = await SectionDescription.create({
    sectionId: id,
    description,
  });

  return res.status(200).json({
    status: 'success',
    message: 'the sectionDescription  has been create',
    sectionDescription,
  });
});

export const update = catchAsync(async (req, res) => {
  const { sectionDescription } = req;
  const { description } = req.body;

  await sectionDescription.update({
    description,
  });

  return res.status(201).json({
    status: 'Success',
    message: 'sectionDescription actualizados correctamente',
    sectionDescription,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { sectionDescription } = req;

  await sectionDescription.destroy();
  return res.status(200).json({
    status: 'success',
    message: 'sectionDescription has been delete',
    sectionDescription,
  });
});
