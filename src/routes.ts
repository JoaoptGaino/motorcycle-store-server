import express from 'express';
import VehiculesController from './Controllers/VehiculesController';
const vehiculesController = new VehiculesController();
const routes = express.Router();

routes.get('/', (req, res) => {
    res.json({
        message: "Hello world!",
    });
});

routes.get('/vehicules/motorcycles', vehiculesController.indexMotos);//Show all motorcycles
routes.get('/vehicules/cars', vehiculesController.indexCars);//Show all cars
routes.get('/vehicules', vehiculesController.index);//Show all vehicules


routes.post('/vehicules', vehiculesController.create);//Create a new vehicule


export default routes;