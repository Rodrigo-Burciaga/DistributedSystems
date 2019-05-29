import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

let multilineSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    coordinates: {
        type: [[[Number]]],
        required: true
    }
});

const DUCTO_SCHEMA = new Schema({
    type: String,
    id: String,
    geometry: multilineSchema,
    geometry_name: String,
    properties: {
        LAYER: String,
        ID: Number,
        LENGTH_MET: Number
    }
});

export const ducto = mongoose.model("ductos", DUCTO_SCHEMA);