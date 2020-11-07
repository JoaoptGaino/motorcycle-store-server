import { Request, Response } from 'express';
import db from '../Database/connection';


export default class VehiculesController {
    async index(req: Request, res: Response) {
        const vehicules = await db('veiculos')
            .select('*');
        res.json(vehicules);
    }
    async indexMotos(req: Request, res: Response) {
        const motorcycles = await db('veiculos')
            .where('tipo', '=', 'Motocicleta')
            .select('*');
        res.json(motorcycles);
    }
    async indexCars(req: Request, res: Response) {
        const cars = await db('veiculos')
            .where('tipo', '=', 'Carro')
            .select('*');
        res.json(cars);
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
        console.log("AQUI");
        const trx = await db.transaction();
        console.log("AQUI2");
        try {
            await trx('veiculos').insert(vehicule);
            console.log("AQUI3");
            await trx.commit();
            return res.status(201).send();
        } catch (err) {
            await trx.rollback();
            return res.status(400).json({
                error: "Unable to create new vehicule"
            });
        }
    }
    async delete(req: Request, res: Response) {
        const id = req.params;
        await db('veiculos').where('id', '=', id).delete();

        res.status(201).json({
            deleted: id
        });
    }
}