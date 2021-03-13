import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: query.url,
        method: query.method||'get',
        params: query.params,
        data: query.data,
        headers: query.headers||''
    });
};
