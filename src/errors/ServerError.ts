export class ServerError extends Error {		
	statusCode = 500
	constructor (message: string){
		super(message)
		Object.setPrototypeOf(this, new.target.prototype)
	}
}