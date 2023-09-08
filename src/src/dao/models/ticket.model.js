import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const { Schema } = mongoose;

export const ticketsCollection = 'tickets'

const ticketsSchema = new Schema({
    purchase_datetime: {
    type: Date,
    required: true,
  },
    amount: {
    type: Number,
    required: true,
  },
    code: {
        type: String,
        required: true,
        unique: true,
        validate: {
        validator: async function(value) {
            const count = await mongoose.models[ticketsCollection].countDocuments({ code: value });
            return count === 0;
        },
        message: 'El código especificado está en uso por otro producto existente',
        }
  },
    price: {
        type: Number,
        required: true,
        min: [0, 'El Precio no puede ser negativo']
  },
  purchaser: {
    type: String,
    default: true,
  },
}
);

ticketsSchema.plugin(mongoosePaginate);

const ticketsModel = mongoose.model(ticketsCollection, ticketsSchema);

export default ticketsModel;