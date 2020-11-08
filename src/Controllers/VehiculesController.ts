import { Request, Response } from 'express';
import db from '../Database/connection';


export default class VehiculesController {
    async index(req: Request, res: Response) {
        const vehicules = await db('veiculos').select('*');
        const serializedVehicules = vehicules.map(vehicule => {
            return {
                id: vehicule.id,
                modelo: vehicule.modelo,
                marca: vehicule.marca,
                ano: vehicule.ano,
                combustivel: vehicule.combustivel,
                motor: vehicule.motor,
                preco: vehicule.preco,
                descricao: vehicule.descricao,
                opcionais: vehicule.opcionais,
                estilo: vehicule.estilo,
                tipo: vehicule.tipo,
                image_url: `http://localhost:3333/uploads/${vehicule.image}`
            }
        });
        return res.json(serializedVehicules);
    }
    async indexMotos(req: Request, res: Response) {
        const motorcycles = await db('veiculos')
            .where('tipo', '=', 'Motocicleta')
            .select('*');
        const serializedBikes = motorcycles.map(motorcycle => {
            return {
                id: motorcycle.id,
                modelo: motorcycle.modelo,
                marca: motorcycle.marca,
                ano: motorcycle.ano,
                combustivel: motorcycle.combustivel,
                motor: motorcycle.motor,
                preco: motorcycle.preco,
                descricao: motorcycle.descricao,
                opcionais: motorcycle.opcionais,
                estilo: motorcycle.estilo,
                tipo: motorcycle.tipo,
                image_url: `http://localhost:3333/uploads/${motorcycle.image}`
            }
        });
        return res.json(serializedBikes);
    }
    async indexCars(req: Request, res: Response) {
        const cars = await db('veiculos')
            .where('tipo', '=', 'Carro')
            .select('*');
        const serializedCars = cars.map(car => {
            return {
                id: car.id,
                modelo: car.modelo,
                marca: car.marca,
                ano: car.ano,
                combustivel: car.combustivel,
                motor: car.motor,
                preco: car.preco,
                descricao: car.descricao,
                opcionais: car.opcionais,
                estilo: car.estilo,
                tipo: car.tipo,
                image_url: `http://localhost:3333/uploads/${car.image}`
            }
        });
        return res.json(serializedCars);
    }
    async create(req: Request, res: Response) {
        const {
            modelo,
            marca,
            ano,
            combustivel,
            motor,
            preco,
            descricao,
            opcionais,
            estilo,
            tipo
        } = req.body;
        const vehicule = { image: req.file.filename, modelo, marca, ano, combustivel, motor, preco, descricao, opcionais, estilo, tipo };
        const trx = await db.transaction();
        try {
            await trx('veiculos').insert(vehicule);
            await trx.commit();
            return res.status(201).send();
        } catch (err) {
            await trx.rollback();
            return res.status(400).json({
                error: "Unable to create new vehicule"
            });
        }
    }
    async update(req: Request, res: Response) {
        const id = req.params;
        const { modelo, preco } = req.body;
        const vehicule = { modelo, preco }
        await db('veiculos').where('id', '=', id).update(vehicule);

        return res.status(200).json({
            updated: modelo
        })
    }
    async delete(req: Request, res: Response) {
        const id = req.params;
        await db('veiculos').where('id', '=', id).delete();

        res.status(201).json({
            deleted: id
        });
    }
}