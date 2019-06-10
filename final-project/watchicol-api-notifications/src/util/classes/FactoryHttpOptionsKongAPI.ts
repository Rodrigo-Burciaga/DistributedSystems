import { ClientDTO } from "../../api/dto/ClientDTO";
import { env } from "../../env";
import { MethodsHTTP } from "../enums/MethodsHTTP";
import { ConstantsGeneratorHttpOptions } from "./constantsGeneratorHttpOptions";
import { OptionsHttpRequest } from "./OptionsHttpRequest";
import { OptionsImplicitGrant } from "./OptionsImplicitGrant";
import { OptionsVerifyClient } from "./OptionsVerifyClient";

export class FactoryHttpOptionsKongAPI {

    public getConfig(optionConfigRequested: string, clientDTO: ClientDTO): OptionsHttpRequest {
        let optionsHttpRequest: OptionsHttpRequest;
        switch (optionConfigRequested) {
            case ConstantsGeneratorHttpOptions.IMPLICIT_OPTIONS_CONFIG:
                optionsHttpRequest = new OptionsImplicitGrant(clientDTO.implicitGrantRequest,
                    MethodsHTTP.POST, env.app.endpointGetAccessTokenImplicitGrant,
                    true);
                break;
            case ConstantsGeneratorHttpOptions.VERIFY_CLIENT_OPTIONS:
                optionsHttpRequest = new OptionsVerifyClient(clientDTO.entity,
                    MethodsHTTP.GET, env.app.endpointVerifyClientKong, false);
                break;
            default:
                return undefined;
        }

        return optionsHttpRequest;
    }
}