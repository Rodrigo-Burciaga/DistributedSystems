import "reflect-metadata";
import { Container } from "inversify";
import { OAuthController } from "./src/api/controllers/OAuthController";
import { AuthenticateUserInterceptor } from "./src/api/interceptors/AuthenticateUserInterceptor";
import { GetSignInterceptor } from "./src/api/interceptors/GetSignInterceptor";
import { GrantedAccessInterceptor } from "./src/api/interceptors/GrantedAccessInterceptor";
import { VerifyClientInterceptor } from "./src/api/interceptors/VerifyClientInterceptor";
import { ErrorHandlerMiddleware } from "./src/api/middlewares/ErrorHandlerMiddleware";
import { UserRepository } from "./src/api/repositories/UserRepository";
import { ClientService } from "./src/api/services/ClientService";
import { DataAccessingKongService } from "./src/api/services/DataAccessingKongService";
import { JWTService } from "./src/api/services/JWTService";
import { ResponseServiceContext } from "./src/api/services/ResponseServiceContext";
import { TokenService } from "./src/api/services/TokenService";
import { UserService } from "./src/api/services/UserService";
import { AuthService } from "./src/auth/AuthService";
import { GenericDAO } from "./src/dao/genericDAO";
import { UserDAO } from "./src/dao/userDAO";
import { Logger } from "./src/lib/logger/Logger";
import { WinstonConfig } from "./src/lib/logger/winston.config";
import { TypeORMLoader } from "./src/loaders/typeORMLoader";
import { BusinessRules } from "./src/services/BR";
import { TokenBusinessRules } from "./src/services/businessRules/tokenBusinessRules";
import { DatabaseCommonPool } from "./src/services/dbcp/databaseCommonPool";
import { GeoLocalizationController } from "./src/api/controllers/GeoLocalizationController";
import { GeoJSONService } from "./src/api/services/GeoJSONService";

const containerInversify = new Container();

containerInversify.bind<GeoLocalizationController>(GeoLocalizationController).toSelf();

// INTERCEPTORS
containerInversify.bind<VerifyClientInterceptor>(VerifyClientInterceptor).toSelf();
containerInversify.bind<AuthenticateUserInterceptor>(AuthenticateUserInterceptor).toSelf();
containerInversify.bind<GrantedAccessInterceptor>(GrantedAccessInterceptor).toSelf();
containerInversify.bind<GetSignInterceptor>(GetSignInterceptor).toSelf();

// SERVICES
containerInversify.bind<GeoJSONService>(GeoJSONService).toSelf();
containerInversify.bind<JWTService>(JWTService).toSelf();
containerInversify.bind<AuthService>(AuthService).toSelf();
containerInversify.bind<TokenService>(TokenService).toSelf();

containerInversify.bind<ResponseServiceContext>(ResponseServiceContext).toSelf();
containerInversify.bind<Logger>(Logger).toSelf();
containerInversify.bind<OAuthController>(OAuthController).toSelf();
containerInversify.bind<ErrorHandlerMiddleware>(ErrorHandlerMiddleware).toSelf();
containerInversify.bind<UserRepository>(UserRepository).to(UserRepository);
containerInversify.bind<TypeORMLoader>(TypeORMLoader).toSelf();
containerInversify.bind<UserService>(UserService).to(UserService);
containerInversify.bind<TokenBusinessRules>(TokenBusinessRules).to(TokenBusinessRules);
containerInversify.bind<GenericDAO>(GenericDAO).toSelf();
containerInversify.bind<WinstonConfig>(WinstonConfig).toSelf();
containerInversify.bind<UserDAO>(UserDAO).toSelf();
containerInversify.bind<DatabaseCommonPool>(DatabaseCommonPool).toSelf();
containerInversify.bind<BusinessRules>(BusinessRules).toSelf();
containerInversify.bind<DataAccessingKongService>(DataAccessingKongService).toSelf();
containerInversify.bind<ClientService>(ClientService).toSelf();
export { containerInversify };