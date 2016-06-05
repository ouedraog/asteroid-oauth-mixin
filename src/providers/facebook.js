import parse from "url-parse";

import generateCredentialToken from "../lib/generate-credential-token";
import getOauthState from "../lib/get-oauth-state";
import getOauthClientId from "../lib/get-oauth-client-id";
import getOauthProtocol from "../lib/get-oauth-protocol";

export const name = "facebook";

export function getOptions ({url, configCollection, scope}) {
    const credentialToken = generateCredentialToken();
    const {protocol, host} = url;
    const query = {
        "response_type": "code",
        "client_id": getOauthClientId(configCollection),
        "redirect_uri": getOauthProtocol(protocol) + `//${host}`,
        "state": getOauthState(credentialToken),
        "scope": scope || "openid email"
    };
    const loginUrl = parse("https://www.facebook.com/v2.2/dialog/oauth")
        .set("query", query)
        .toString();
    return {credentialToken, loginUrl};
}
