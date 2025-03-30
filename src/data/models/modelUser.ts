import { Schema, model } from 'mongoose';

interface IdataSchema extends Document {
    login: string;
    password: string;
    status: boolean;
}

const dataSchema = new Schema<IdataSchema>({
    
    login: {
        type: String,
        required: true,
    },
    
    password: {
        type: String,
        required: true,
    },

    status: {
        type: Boolean,
        default: false
    }
    
});

const user = model<IdataSchema & Document>('users', dataSchema);

export { user };