class TokenManager {
    private static instance: TokenManager;
    private _bearerToken?: string;

    /**
     * Getter bearerToken
     * @return {string | undefined}
     */
    public get bearerToken(): string | undefined {
        return this._bearerToken;
    }

    /**
     * Setter bearerToken
     * @param {string} value
     */
    public set bearerToken(value: string) {
        this._bearerToken = value;
    }

    get checkToken(): boolean {
        return !!this._bearerToken;
    }

    // Singleton
    public static getInstance(): TokenManager {
        if (!TokenManager.instance) {
            TokenManager.instance = new TokenManager();
        }
        return TokenManager.instance;
    }
}

const tokenManager = TokenManager.getInstance();
export default tokenManager; 