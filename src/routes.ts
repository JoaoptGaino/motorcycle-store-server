import express from 'express';
import multer from 'multer'
import VehiculesController from './Controllers/VehiculesController';
const vehiculesController = new VehiculesController();
import multerConfig from './config/multer';
import { celebrate, Joi } from 'celebrate';
const routes = express.Router();
const upload = multer(multerConfig);
routes.get('/', (req, res) => {
    res.json({
        message: "Hello world!",
    });
});

routes.get('/vehicules/motorcycles', vehiculesController.indexMotos);//Show all motorcycles
routes.get('/vehicules/cars', vehiculesController.indexCars);//Show all cars
routes.get('/vehicules', vehiculesController.index);//Show all vehicules


routes.post('/vehicules',
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            modelo: Joi.string().required(),
            marca: Joi.string().required(),
            ano: Joi.string().required(),
            combustivel: Joi.string().required(),
            motor: Joi.string().required(),
            preco: Joi.number().required(),
            descricao: Joi.string().required(),
            opcionais: Joi.string().required(),
            estilo: Joi.string().required(),
            tipo: Joi.string().required()
        })
    }, {
        abortEarly: false
    }),
    vehiculesController.create);//Create a new vehicule
routes.delete('/vehicules/:id', vehiculesController.delete);


export default routes;