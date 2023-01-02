import { recoverPersonalSignature } from 'eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { config } from '../../config';
import { User } from '../../models/user.model';

export const login = async (req: Request, res: Response, next: NextFunction) => {
	const { signature, publicAddress } = req.body;
	if (!signature || !publicAddress) {
		return res
			.status(400)
			.send({ message: 'signature and publicAddress is required' });

	}

	// Get the user with the given publicAddres
	const user = new User();
	const userExists = await User.findOne({ where: { publicAddress } });
	if (!userExists) {
		user.nonce = Math.floor(Math.random() * 10000);
		return user.save();
	}
	else {
		// if user exists then verify user signature
		const msg = `nonce: ${userExists.nonce}`;
		const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf8'));
		const address = recoverPersonalSignature({
			data: msgBufferHex,
			sig: signature,
		});
		console.log("address",address);
		//match stored address with address found after verify signature

		if (address.toLowerCase() === publicAddress.toLowerCase()) {
			//create jwt token
			const token =  jwt.sign({
				payload: {
					id: user.id,
					publicAddress,
				},
			},
				config.secret,
				{
					algorithm: config.algorithms[0],
				})
			return res.json({ accessToken : token });
		} else {
			res.status(401).send({
				error: 'Signature verification failed',
			});

		}
	}
}
