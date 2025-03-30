interface ILogin {
    readonly getValue: () => string
}

class Login implements ILogin {
    
    private readonly login: string

    constructor(login: string) {
        this.login = this.isValid(login)
    }

    private readonly isValid = (login: string) => {
       
        if (typeof login !== 'string') throw new TypeError(`Could nоt assign a value. Type of property login of class User must be a string or null, but is ${typeof login}`)

        if (login.length === 0) throw new RangeError(`Could nоt assign a value. Property id of class User must have a length greater than 0, but is ${login.length}`)

        return login

    }

    public readonly getValue = () => {
        const value = this.login
        return value        
    }

}

export { Login }