export class BadReqError extends Error {		
	statusCode = 401
	constructor (message: string){
		super(message)
		Object.setPrototypeOf(this, new.target.prototype)
	}
}