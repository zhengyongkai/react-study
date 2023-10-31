import axios from 'axios';

import { createHashHistory } from 'history';

const customHistory = createHashHistory();

// import { Route } from "react-router-dom";

axios.interceptors.request.use((requestConfig) => {
    requestConfig.headers['X-Client-Info'] =
        requestConfig.headers['X-Client-Info'] ??
        '{"a":"3000","ch":"1002","v":"5.2.1","e":"16986321061049067236884481","bc":"110100"}';
    requestConfig.headers['X-Host'] = requestConfig.headers['X-Host'] ?? 'mall.film-ticket.film.list';
    requestConfig.headers['X-Requested-With'] = requestConfig.headers['X-Requested-With'] ?? 'XMLHttpRequest';
    requestConfig.headers['X-Token'] = 'undefined';
    //   console.log(requestConfig.params);
    console.log(requestConfig);
    return requestConfig;
});

axios.interceptors.response.use((response) => {
    //   location.href = "/#/login";

    return response.data;
});

export default axios;
