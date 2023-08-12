function apiUrlFactory(baseApiUrl, apiKey) {
    return function (params = {}) {
        const paramString = Object.keys(params)
            .map(key => {
                return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
            })
            .join('&');

        const apiUrl = `${baseApiUrl}?apikey=${apiKey}&${paramString}`;
        
        return apiUrl;
    };
}

module.exports = { apiUrlFactory };
