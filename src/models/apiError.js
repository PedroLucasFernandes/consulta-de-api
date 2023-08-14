class APIError extends Error {
    constructor(status, message) {
        super(message);
        this.response = { status };
        this.name = 'APIError';
    }

    get status() {
        return this.response.status;
    }
}


module.exports = { APIError };
