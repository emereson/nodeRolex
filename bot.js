// import { catchAsync } from '../utils/catchAsync.js';
// import axios from 'axios';
// import { YearCar } from '../models/yearCar.model.js';
// import { CarBrand } from '../models/carBrand.model.js';
// import { CarModel } from '../models/carModel.model.js';
// import * as cheerio from 'cheerio';
// import { Op } from 'sequelize';

// export const findAll = catchAsync(async (req, res) => {
//   const years = await YearCar.findAll();
//   return res.status(200).json({
//     status: 'success',
//     results: years.length,
//     years,
//   });
// });
// export const findOne = catchAsync(async (req, res) => {
//   const { year } = req;

//   return res.status(200).json({
//     status: 'success',
//     year,
//   });
// });
// // export const create = catchAsync(async (req, res) => {
// //   // const { year } = req.body;

// //   // const yearCar = await YearCar.create({
// //   //   year,
// //   // });

// //   // return res.status(200).json({
// //   //   status: 'success',
// //   //   message: 'The yearCar have been created',
// //   //   yearCar,
// //   // });

// // axios.get

// // });

// const extractBrandsFromHTML = (html) => {
//   const regex = /<option value="[^"]+">([^<]+)<\/option>/g;
//   let match;
//   const brands = [];

//   while ((match = regex.exec(html)) !== null) {
//     // Agrega la marca si no es la opción "Selecciona una marca"
//     if (
//       match[1] !== 'Selecciona una marca' ||
//       match[1] !== 'Selecciona un modelo'
//     ) {
//       brands.push(match[1]);
//     }
//   }

//   return brands;
// };

// const extractDataFromHTML = (html) => {
//   const $ = cheerio.load(html);

//   // Extraer el nombre del vehículo
//   const name = $('div.container.modelos > h2').text().trim();

//   // Extraer las imágenes del vehículo
//   const imagesCar = $('div.container.modelos > img')
//     .map((i, img) => $(img).attr('src'))
//     .get();

//   // Extraer los datos de las secciones colapsables
//   const dataValues = $('div[data-role="collapsible"]')
//     .map((i, section) => {
//       const title = $(section).find('h4').text().trim();
//       const details = $(section)
//         .find('p')
//         .map((i, p) => {
//           const text = $(p).text().split(': ');
//           return {
//             label: text[0].trim(),
//             value: text[1] ? text[1].trim() : '',
//           };
//         })
//         .get();
//       const button = $(section).find('button');
//       return {
//         title,
//         details,
//         button: button.length
//           ? {
//               text: button.text().trim(),
//               onclick: button
//                 .attr('onclick')
//                 .replace(/^viewImage\('/, '')
//                 .replace(/'\)$/, ''),
//             }
//           : null,
//       };
//     })
//     .get();

//   // Construir el JSON final
//   return {
//     name,
//     imagesCar,
//     dataValues,
//   };
// };

// // export const create = catchAsync(async (req, res) => {
// //   for (let year = 1966; year <= 2025; year++) {
// //     const yearUrl = `https://diagrams.com.mx/get_brands.php?year=${year}`;

// //     try {
// //       const response = await axios.get(yearUrl);
// //       const yearRecord = await YearCar.create({ year });
// //       const brands = extractBrandsFromHTML(response.data); // Extraer las marcas

// //       for (const brand of brands) {
// //         try {
// //           const carBrand = await CarBrand.create({
// //             yearCarId: yearRecord.id,
// //             brand, // Nombre de la marca
// //             year,
// //           });

// //           const brandUrl = `https://diagrams.com.mx/get_models.php?year=${year}&brand=${brand}`;
// //           const brandResponse = await axios.get(brandUrl);
// //           const models = extractBrandsFromHTML(brandResponse.data); // Extraer los modelos

// //           for (const model of models) {
// //             try {
// //               const modelUrl = `https://diagrams.com.mx/get_car_id.php?year=${year}&brand=${brand}&model=${model}`;
// //               const modelResponse = await axios.get(modelUrl);
// //               console.log(modelResponse);

// //               await CarModel.create({
// //                 brandCarId: carBrand.id,
// //                 model, // Nombre del modelo
// //                 idTwo: Number(modelResponse.data), // ID o información adicional
// //               });
// //             } catch (modelError) {
// //               console.log(
// //                 `Error al procesar el modelo ${model} para la marca ${brand} en el año ${year}:`,
// //                 modelError
// //               );
// //             }
// //           }
// //         } catch (brandError) {
// //           console.log(
// //             `Error al procesar la marca ${brand} en el año ${year}:`,
// //             brandError
// //           );
// //         }
// //       }
// //     } catch (yearError) {
// //       console.log(`Error al procesar el año ${year}:`, yearError);
// //     }
// //   }

// //   res.status(200).json({
// //     status: 'success',
// //     message: 'Datos procesados correctamente.',
// //   });
// // });

// export const create = catchAsync(async (req, res) => {
//   try {
//     const models = await CarModel.findAll({
//       where: {
//         carData: null,
//       },
//     });

//     console.log(models.length);

//     for (const model of models) {
//       const url = `https://diagrams.com.mx/diagrama.php?carId=${model.idTwo}`;
//       // Realizar la solicitud con axios y obtener datos
//       const response = await axios.get(url, {
//         headers: {
//           Cookie: 'PHPSESSID=4b92f6d6f865c0f0f005f53da41c37ed',
//         },
//       });

//       const data = extractDataFromHTML(response.data);

//       // Actualizar el modelo con los datos procesados
//       await model.update({ carData: data });

//       console.log(model.id);
//     }

//     // Enviar respuesta al cliente después de procesar todos los modelos
//     res.status(200).json({
//       status: 'success',
//       message: 'Datos procesados correctamente.',
//       data: results, // Incluye los resultados procesados aquí
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       status: 'error',
//       message: 'Ocurrió un error al procesar los datos.',
//     });
//   }
// });

// export const deleteElement = catchAsync(async (req, res) => {
//   const { year } = req;
//   const imageName = year.linkImg.split('/').pop();

//   try {
//     await axios.delete(`${process.env.SERVER_IMAGE}/delete-image/${imageName}`);
//     console.log('Image deleted successfully');
//   } catch (error) {
//     console.error('Error deleting image:', error.message);
//     // Aquí puedes decidir qué hacer en caso de error. Puedes devolver una respuesta de error si es necesario.
//   }

//   await year.destroy();
//   return res.status(200).json({
//     status: 'success',
//     message: 'year has been delete',
//     year,
//   });
// });

// export const deleteAllElement = catchAsync(async (req, res) => {
//   const { section } = req;

//   await Promise.all(
//     section.galleries.map(async (file) => {
//       const imageName = file.linkImg.split('/').pop();

//       try {
//         await axios.delete(
//           `${process.env.SERVER_IMAGE}/delete-image/${imageName}`
//         );
//         console.log('Image deleted successfully');
//       } catch (error) {
//         console.error('Error deleting image:', error.message);
//         // Aquí puedes decidir qué hacer en caso de error. Puedes devolver una respuesta de error si es necesario.
//       }

//       const year = await year.findOne({
//         where: {
//           id: file.id,
//         },
//       });

//       if (year) {
//         await year.destroy();
//         console.log('year deleted successfully');
//       } else {
//         console.error('year not found');
//         // Puedes decidir qué hacer si no se encuentra el SectionVideo
//       }
//     })
//   );

//   return res.status(200).json({
//     status: 'success',
//     message: 'All related elements have been deleted',
//   });
// });
