import * as mongoose from "mongoose";

const Schema = mongoose.Schema;
const notificacionSchema = new Schema({
        typeDenuncia: String,
        leida: Boolean,
        areaTexto: String
    }
);

export const notificacion = mongoose.model("notificacion", notificacionSchema);