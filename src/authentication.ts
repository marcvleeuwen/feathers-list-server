import { ServiceAddons, Params } from "@feathersjs/feathers";
import { AuthenticationService, JWTStrategy } from "@feathersjs/authentication";
import { LocalStrategy } from "@feathersjs/authentication-local";
import {
  expressOauth,
  OAuthStrategy,
  OAuthProfile,
} from "@feathersjs/authentication-oauth";

import { Application } from "./declarations";

declare module "./declarations" {
  interface ServiceTypes {
    authentication: AuthenticationService & ServiceAddons<any>;
  }
}

class GithubStrategy extends OAuthStrategy {
  async getEntityData(profile: OAuthProfile) {
    // @ts-ignore-start
    const baseData = await super.getEntityData(profile);
    // @ts-ignore-end

    return {
      ...baseData,
      email: profile.email,
      username: profile.login,
      profileId: profile.id,
      avatar: profile.avatar_url
    };
  }
}

export default function (app: Application) {
  const authentication = new AuthenticationService(app);

  authentication.register("jwt", new JWTStrategy());
  authentication.register("username", new LocalStrategy());
  authentication.register("email", new LocalStrategy());
  authentication.register("github", new GithubStrategy());

  app.use("/authentication", authentication);
  app.configure(expressOauth());
}
