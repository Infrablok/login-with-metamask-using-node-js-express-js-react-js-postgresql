import { Model } from 'sequelize';

export class User extends Model {
	public id!: number;
	public nonce!: number;
	public publicAddress!: string;
	public username?: string; 
}
