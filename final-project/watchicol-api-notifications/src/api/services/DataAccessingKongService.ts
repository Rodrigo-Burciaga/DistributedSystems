import { inject, injectable } from "inversify";
import * as request from "request-promise-native";
import { Logger } from "../../lib/logger/Logger";
import { ResponseVerifyClientKong } from "../../types/interfaces";
import { ConstantsGeneratorHttpOptions } from "../../util/classes/constantsGeneratorHttpOptions";
import { FactoryHttpOptionsKongAPI } from "../../util/classes/FactoryHttpOptionsKongAPI";
import { OptionsHttpRequest } from "../../util/classes/OptionsHttpRequest";
import { ClientDTO } from "../dto/ClientDTO";
import { ResponseKongImplicitGrant } from "../util/interfaces/kongInterfaces";

@injectable()
export class DataAccessingKongService {

    private logger: Logger;
    private readonly _request: request;

    constructor(@inject(Logger) logger: Logger) {
        this._request = request;
        this.logger = logger;
    }

    public async getClient(clientDTO: ClientDTO): Promise<ResponseVerifyClientKong> {
        const configFactory: FactoryHttpOptionsKongAPI = new FactoryHttpOptionsKongAPI();
        const optionsHttpRequestVerifyClient: OptionsHttpRequest = configFactory
            .getConfig(ConstantsGeneratorHttpOptions.VERIFY_CLIENT_OPTIONS, clientDTO);
        this.logger.info("preparing http request: getClient " +
            "dataAccessingKongService " + JSON.stringify(optionsHttpRequestVerifyClient), this.constructor.name);

        return this._request(optionsHttpRequestVerifyClient);
    }

    public async getAccessTokenImplicitGrant(clientDTO: ClientDTO): Promise<ResponseKongImplicitGrant> {
        const configFactory = new FactoryHttpOptionsKongAPI();
        const optionsHttpRequestVerifyClient: OptionsHttpRequest = configFactory.getConfig(
            ConstantsGeneratorHttpOptions.IMPLICIT_OPTIONS_CONFIG, clientDTO);
        this.logger.info("preparing http request: getTokenImplicitGrant " +
            "dataAccessingKongService " + JSON.stringify(optionsHttpRequestVerifyClient), this.constructor.name);

        return this._request(optionsHttpRequestVerifyClient);
    }
}