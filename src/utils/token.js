const  atob = require('atob');

export class TokenUtil {
    static accessToken = null;
    static refreshToken = null;

    static loadToken() {
        if (typeof window === "undefined") {
            return;
        }

        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');

        if (accessToken) {
            TokenUtil.setAccessToken(accessToken);
        }

        if(refreshToken) {
            TokenUtil.setRefreshToken(refreshToken);
        }
    }

    static persistToken() {
        if(TokenUtil.accessToken != null) {
            localStorage.setItem('access_token', TokenUtil.accessToken);
        } else {
            localStorage.removeItem('access_token');
        }

        if (TokenUtil.refreshToken != null) {
            localStorage.setItem('refresh_token', TokenUtil.refreshToken);
        } else {
            localStorage.removeItem('refresh_token');
        }

    }

    static setAccessToken(accessToken) {
        TokenUtil.accessToken = accessToken;
    }

    static setRefreshToken(refreshToken) {
        TokenUtil.refreshToken = refreshToken;
    }

    static clearAccessToken() {
        TokenUtil.accessToken = null;
    }

    static clearRefreshToken() {
        TokenUtil.accessToken = null;
    }

    static decodedToken() {
        return JSON.parse(atob(TokenUtil.accessToken.split('.')[1]));
    }
}

export const initLocalStorage = () => {
    if (typeof window === "undefined") {
        return {
            getItem: () => {}
        }
    } else {
        return window.localStorage
    }
}