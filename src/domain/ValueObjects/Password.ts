interface IPassword {
    readonly getValue: () => string
}

class Password implements IPassword {
    
    private readonly password: string

    constructor(password: string) {
        this.password = this.isValid(password)
    }

    private readonly isValid = (password: string) => {
       
        if (typeof password !== 'string') throw new TypeError(`Could nоt assign a value. Type of property id of class User must be a string or null, but is ${typeof password}`)

        if (password.length === 0) throw new RangeError(`Could nоt assign a value. Property id of class User must have a length greater than 0, but is ${password.length}`)

        return password

    }

    public readonly getValue = () => {
        const value = this.password
        return value        
    }

}

export { Password }