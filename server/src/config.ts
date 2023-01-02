/**
 * config variables.
 */
export const config = {
	algorithms: ['HS256' as const],
	secret: 'ABCDEF',
	HOST: "localhost",
	USER: "postgres",
	PASSWORD: "Yourpostgrespassword",
	DB: "web3-login-using-metamask",
	
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
}
