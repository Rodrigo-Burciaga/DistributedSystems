import { inject, injectable } from "inversify";
import { ImplicitGrantRequest, ResponseVerifyClientKong } from "../../types/interfaces";
import { ClientDTO } from "../dto/ClientDTO";
import { JWTDecodedInterface } from "../util/interfaces/JWTDecodedInterface";
import { ResponseKongImplicitGrant } from "../util/interfaces/kongInterfaces";
import { DataAccessingKongService } from "./DataAccessingKongService";

@injectable()
export class ClientService {

    private _dataAccessingKongService: DataAccessingKongService;

    public static verifyOptionsImplicitGrantRequest(implicitGrantObject: ImplicitGrantRequest): boolean {
        return !!(implicitGrantObject.scope && implicitGrantObject.client_id && implicitGrantObject.authenticated_userid
            && implicitGrantObject.state);
    }

    public static matchBothUserIDImplicitGrant(decodedJWT: JWTDecodedInterface, implicitObject: ImplicitGrantRequest):
        boolean {
        return decodedJWT.sub === implicitObject.authenticated_userid;
    }

    constructor(@inject(DataAccessingKongService) dataAccessingkongService: DataAccessingKongService) {
        this._dataAccessingKongService = dataAccessingkongService;
    }

    public getClient(clientDTO: ClientDTO): Promise<ResponseVerifyClientKong> {
        return this._dataAccessingKongService.getClient(clientDTO);
    }

    public getAccessTokenImplicitGrant(clientDTO: ClientDTO): Promise<ResponseKongImplicitGrant> {
        return this._dataAccessingKongService.getAccessTokenImplicitGrant(clientDTO);
    }
}