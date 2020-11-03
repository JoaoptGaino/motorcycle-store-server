import express from 'express';
import MotorcyclesController from './Controllers/MotorcyclesController';
const motorcycleController = new MotorcyclesController();
const routes = express.Router();

routes.get('/', (req, res) => {
    res.json({
        message: "Hello world!",
    });
});

routes.get('/motorcycles', motorcycleController.index);
routes.post('/motorcycles', motorcycleController.create);


export default routes;