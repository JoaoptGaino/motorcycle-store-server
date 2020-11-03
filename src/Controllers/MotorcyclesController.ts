import { Request, Response } from 'express';
import db from '../Database/connection';


export default class MotorcyclesController {
    async index(req: Request, res: Response) {
        const all = await db('veiculos')
            .select('*');
        res.json(all);
    }
    async create(req: Request, res: Response) {
        const {
            modelo,
            marca,
            ano,
            combustivel,
            cilindradas,
            preco,
            descricao,
            opcionais,
            estilo
        } = req.body;
        const motorcycle = { modelo, marca, ano, combustivel, cilindradas, preco, descricao, opcionais,estilo };
        const trx = await db.transaction();
        try {
            await trx('veiculos').insert(motorcycle);
            await trx.commit();
            return res.status(201).send();
        } catch (err) {
            await trx.rollback();
            return res.status(400).json({
                error: "Unable to create new vehicule"
            });
        }
    }
}