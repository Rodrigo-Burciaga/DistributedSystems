import { inject, injectable } from "inversify";
import { Body, Get, InternalServerError, JsonController, Post } from "routing-controllers";
import { Logger } from "../../lib/logger/Logger";
import { ResponseApi } from "../../util/interfaces/ResponseApi";
import { notificacion } from "../models/Notificacion";
import { GeoJSONService } from "../services/GeoJSONService";
import { ResponseServiceContext, TypesResponse } from "../services/ResponseServiceContext";
import { FeatureCollection } from "../util/classes/FeatureCollection";

@JsonController()
@injectable()
export class NotificationController {

    private _logger: Logger;

    constructor(@inject(Logger) logger: Logger,
                @inject(GeoJSONService) private _geoJSONService: GeoJSONService) {
        this._logger = logger;
    }

    @Post("/pushNotification")
    public async pushNotification(@Body() featureCollection: FeatureCollection) {
        console.log("agregando notificacion ");
        const nuevaDenuncia = new notificacion({
            typedenuncia: featureCollection.tipoDenuncia,
            leida: false,
            areaTexto: featureCollection.areaTexto
        });
        this._logger.info("guardando", featureCollection);
        nuevaDenuncia.save(function (err) {
            if (err) {
                throw  new InternalServerError("Error ");
            }
            console.log("saved notification");
        });
        let responseApi: ResponseApi = ResponseServiceContext.doResponse(TypesResponse.HTTP_OK,
            undefined, "created");

        return responseApi;
    }

    @Get("/getNotifications")
    public async getNotifications() {
        console.log("get notifications");
        let responseApi: ResponseApi = undefined;
        await notificacion.find({leida: false}, {_id: 0}, (error, document) => {
            if (error) {
                this._logger.error(error);
                throw  new InternalServerError("Error ");
            }
            let denunciasN = 0;
            document.forEach(function (item) {
                denunciasN++;
            });
            console.log("busco ", denunciasN);
            responseApi = ResponseServiceContext.doResponse(TypesResponse.HTTP_OK,
                undefined, denunciasN);
            console.log(responseApi.data);
        });

        return responseApi;
    }
}