import { Response } from 'express'

interface IProps {
    statusCode: number
    data: object
    response: Response
}

const view = async (props: IProps): Promise<void> => {

    const {statusCode, data, response} = props

    response
        .status(statusCode)
        .json(data)
    
}

export { view };