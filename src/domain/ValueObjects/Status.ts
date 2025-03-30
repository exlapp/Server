interface IStatus {
    readonly getValue: () => boolean
}

class Status implements IStatus {
    
    private readonly status: boolean

    constructor(status: boolean) {
        this.status = this.isValid(status)
    }

    private readonly isValid = (status: boolean) => {
       
        if (typeof status !== 'boolean') throw new TypeError(`Could nоt assign a value. Type of property status of class User must be a boolean or null, but is ${typeof status}`)

        return status

    }

    public readonly getValue = () => {
        const value = this.status
        return value        
    }

}

export { Status }