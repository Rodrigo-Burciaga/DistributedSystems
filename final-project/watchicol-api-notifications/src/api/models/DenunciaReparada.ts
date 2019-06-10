import * as mongoose from "mongoose";

const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["Point"],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
}, {_id: false});
const denunciasReparadasSchema = new mongoose.Schema({
    type: String,
    id: String,
    geometry: pointSchema,
    geometry_name: String,
});

export const denunciasReparadas = mongoose.model("reparadas", denunciasReparadasSchema);