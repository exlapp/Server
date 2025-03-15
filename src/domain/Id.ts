interface Iid {
    readonly getValue: () => string
}

class Id implements Iid {
    
    private readonly id: string

    constructor(id: string) {
        this.id = this.isValid(id)
    }

    private readonly isValid = (id: string) => {
       
        if (typeof id !== 'string') throw new TypeError(`Could nоt assign a value. Type of property id of class User must be a string or null, but is ${typeof id}`)

        if (id.length === 0) throw new RangeError(`Could nоt assign a value. Property id of class User must have a length greater than 0, but is ${id.length}`)

        return id

    }

    public readonly getValue = () => {
        const value = this.id
        return value        
    }

}

export { Id }