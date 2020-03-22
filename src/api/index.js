import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};
export const rs_login = param => {
    return request({
        url: '/api/login/',
        method: 'post',
        data: param
    });
};
export const rs_logout = param => {
    return request({
        url: '/api/logout/',
        method: 'get',
        data: param
    }); 
};
export const rs_addproject = param => {
    return request({
        url: '/api/v1/pm/addproject/',
        method: 'post',
        data: param
    }); 
};
export const rs_importproject = param => {
    return request({
        url: '/api/v1/pm/importproject/',
        method: 'post',
        data: param
    }); 
};

export const rs_projectdetail = param => {
    return request({
        url: '/api/v1/pm/projectdetail/',
        method: 'post',
        data: param
    }); 
};
export const rs_sendprojectemail = param => {
    return request({
        url: '/api/v1/pm/sendprojectemail/',
        method: 'post',
        data: param
    }); 
};
export const rs_projectreviewlist = query => {
    return request({
        url: '/api/v1/pm/projectreviewlist/',
        method: 'post',
        data: query
    });
};
export const rs_projectreviewdetail = query => {
    return request({
        url: '/api/v1/pm/projectreviewdetail/',
        method: 'post',
        data: query
    });
};

export const rs_updateprojectreview = query => {
    return request({
        url: '/api/v1/pm/updateprojectreview/',
        method: 'post',
        data: query
    });
};
export const rs_deleteproject = query => {
    return request({
        url: '/api/v1/pm/deleteproject/',
        method: 'post',
        data: query
    });
};
export const rs_userlist = query => {
    return request({
        url: '/api/v1/pm/userlist/',
        method: 'post',
        data: query
    });
};