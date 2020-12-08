import { Request, Response } from 'express';
import db from '../Database/connection';


export default class VehiculesController {
    async index(req: Request, res: Response) {
        const vehicules = await db('vehicules').select('*');
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
                image_url: `http://192.168.215.193:3333/uploads/${vehicule.image_url}`,
                user_id: vehicule.user_id
            }
        });
        return res.json(serializedVehicules);
    }

    async indexTipo(req: Request, res: Response) {
        const filter = req.query;
        const tipo = filter.tipo as string;
        const vehicules = await db('vehicules').select('*').where('tipo', '=', tipo);
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
                image_url: `http://192.168.215.193:3333/uploads/${vehicule.image}`,
                user_id: vehicule.user_id
            }
        });
        return res.json(serializedVehicules);

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
            tipo,
            user_id
        } = req.body;
        const vehicule = { image_url: req.file.filename, modelo, marca, ano, combustivel, motor, preco, descricao, opcionais, estilo, tipo, user_id };
        const trx = await db.transaction();
        try {
            await trx('vehicules').insert(vehicule);
            await trx.commit();
            return res.status(201).send();
        } catch (err) {
            await trx.rollback();
            return res.status(400).json({
                error: "Unable to create new vehicule",
                err
            });
        }
    }
    async update(req: Request, res: Response) {
        const id = req.params;
        const { modelo, preco } = req.body;
        const vehicule = { modelo, preco }
        await db('vehicules').where('id', '=', id).update(vehicule);

        return res.status(200).json({
            updated: { modelo, preco }
        })
    }
    async delete(req: Request, res: Response) {
        const id = req.params;
        await db('vehicules').where('id', '=', id).delete();

        res.status(201).json({
            deleted: id
        });
    }
}