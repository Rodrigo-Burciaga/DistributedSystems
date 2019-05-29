import { inject, injectable } from "inversify";
import { Body, Get, InternalServerError, JsonController, Post } from "routing-controllers";
import { Logger } from "../../lib/logger/Logger";
import { ResponseApi } from "../../util/interfaces/ResponseApi";
import { ducto } from "../models/Ducto";
import { GeoJSONService } from "../services/GeoJSONService";
import { ResponseServiceContext, TypesResponse } from "../services/ResponseServiceContext";
import { FeatureCollection } from "../util/classes/FeatureCollection";

@JsonController()
@injectable()
export class GeoLocalizationController {

    private _logger: Logger;

    constructor(@inject(Logger) logger: Logger,
                @inject(GeoJSONService) private _geoJSONService: GeoJSONService) {
        this._logger = logger;
    }

    @Post("/geoJSON")
    public async receiveGeoJSON(@Body() featureCollection: FeatureCollection) {
        //  longitude, latitude
        this._logger.info("recibidas coordenadas: ", featureCollection.features[0].geometry.coordinates);
        let responseApi: ResponseApi = undefined;
        await ducto.find({
            geometry: {
                $near: {
                    $geometry: {type: "Point", coordinates: featureCollection.features[0].geometry.coordinates},
                    $maxDistance: 5000
                }
            }
        }, (error, document) => {
            if (error) {
                throw  new InternalServerError("Error ");
            }
            document.forEach(function (item) {
                console.log(item.toObject().geometry.coordinates[0], item.toObject().id);
            });
            if (document.length > 0) {
                responseApi = ResponseServiceContext.doResponse(TypesResponse.HTTP_OK,
                    undefined, {foundPoints: document.length});
                this._geoJSONService.guardarIncidencia(featureCollection.features[0].geometry.coordinates);
            } else {
                responseApi = ResponseServiceContext.doResponse(TypesResponse.HTTP_OK,
                    undefined, {foundPoints: 0});
            }
        });

        return responseApi;
    }

    @Get("/incidencias/controladas")
    public incidenciasControladas(){
        return "si";
    }

}