import { Request, Response } from 'express';
import db from '../Database/connection';

export default class UsersController {
    async index(req: Request, res: Response) {
        const users = await db('users').select('*');
        return res.json(users);
    }
    async create(req: Request, res: Response) {
        const {
            name,
            username,
            email,
            password
        } = req.body;

        const user = { name, username, email, password }
        const trx = await db.transaction();

        try {
            await trx('users').insert(user);
            await trx.commit();
            return res.status(201).send();
        } catch (err) {
            await trx.rollback();
            return res.status(400).json({
                error: "Erro ao criar usuario"
            });
        }
    }
}