import { OLDSARATOV_AUTH } from '../apis/oldsaratov.api';

const sessionKey = 'okn_session';
const stateKey = 'okn_state';

export const authService = {
    login(storage = window.sessionStorage) {
        const state = window.btoa(window.location.pathname);
        const redirectTo = `${window.location.origin}/auth`;
        const authParams = `scope=openid+profile+email&state=${state}&redirect_uri=${redirectTo}`;
        const authUrl = `${OLDSARATOV_AUTH}?response_type=token&client_id=okn&${authParams}`;

        storage.setItem(stateKey, state);

        window.open(authUrl, '_self');
    },

    isLoggedIn() {
        const session = this.getSession();

        return session && this.validateSession(session);
    },

    getAccessToken(storage = window.localStorage) {
        const session = this.getSession();

        if (session && this.validateSession(session)) {
            return session.accessToken;
        }

        return null;
    },

    saveSession(session, storage = window.localStorage) {
        storage.setItem(sessionKey, JSON.stringify(session));
    },

    getSession(storage = window.localStorage) {
        const sessionString = storage.getItem(sessionKey);

        return JSON.parse(sessionString);
    },

    extractSession(redirectUrl = '', storage = window.sessionStorage) {
        // Parse access_token
        const accessTokenMatch = redirectUrl.match(/access_token=([^&]+)/);
        const accessToken = accessTokenMatch ? accessTokenMatch[1] : null;

        // Parse expires_in and calculate expiration time
        const now = (new Date()).getTime() / 1000;
        const expiresInMatch = redirectUrl.match(/expires_in=([^&]+)/);
        const expires = expiresInMatch ? now + parseInt(expiresInMatch[1]) : now + 3600;

        // Parse state
        const passedState = storage.getItem(stateKey) || '';
        const stateMatch = redirectUrl.match(/state=([^&]+)/);
        const givenState = stateMatch ? decodeURIComponent(stateMatch[1]) : null;

        // Validate auth response
        const valid = accessToken && expires && (passedState === givenState);

        storage.removeItem(stateKey); // Remove after extraction

        return valid ? { accessToken, expires, state: window.atob(passedState) } : null;
    },

    validateSession(session) {
        const now = (new Date()).getTime() / 1000;

        return now < session.expires;
    },

    invalidateSession(storage = window.localStorage) {
        storage.removeItem(sessionKey);
    }
};
