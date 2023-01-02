import { NextFunction, Request, Response } from 'express';

import { User } from '../../models/user.model';

export const find = async (req: Request, res: Response, next: NextFunction) => {

	const whereClause = req.query && req.query.publicAddress ? { where: { publicAddress: req.query.publicAddress }, } : undefined;

	return await User.findAll(whereClause)
		.then((users: User[]) => res.json(users))
		.catch(next);
};

export const get = (req: Request, res: Response, next: NextFunction) => {

	if ((req as any).user.payload.id !== +req.params.userId) {
		return res
			.status(401)
			.send({ error: 'You can can only access yourself' });
	}
	return User.findByPk(req.params.userId)
		.then((user: User | null) => res.json(user))
		.catch(next);
};

export const create = (req: Request, res: Response, next: NextFunction) => {
	User.create(req.body)
		.then((user: User) => res.json(user))
		.catch(next);
}


export const patch = (req: Request, res: Response, next: NextFunction) => {

	if ((req as any).user.payload.id !== +req.params.userId) {
		return res
			.status(401)
			.send({ error: 'You can can only access yourself' });
	}
	return User.findByPk(req.params.userId)
		.then((user: User | null) => {
			if (!user) {
				return user;
			}

			Object.assign(user, req.body);
			return user.save();
		})
		.then((user: User | null) => {
			return user
				? res.json(user)
				: res.status(401).send({
					error: `User with publicAddress ${req.params.userId} is not found`,
				});
		})
		.catch(next);
};
