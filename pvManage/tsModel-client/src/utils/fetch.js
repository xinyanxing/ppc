import axios from 'axios';
// import configdefalut from 'src/config';
import getUserInfo from './getUserInfo';
import { Modal } from 'antd';
import globalLoading from './globalLoading';
globalLoading();
// 创建axios实例
const service = axios.create({
    timeout: 3000 * 1000, // 请求超时时间,
    method: 'post',
});

export const reportService = axios.create({
    timeout: 30 * 1000 // 请求超时时间
});




// request拦截器
service.interceptors.request.use(config => {
    window.fetchNum++;

    // const userInfo = getUserInfo();
    // config.url = configdefalut.API_URL + config.url;
    // config.headers['TM-Header-CompanyId'] = userInfo.companyId;
    // config.headers['TM-Header-UserId'] = userInfo.userId;
    // config.headers['TM-Environment-Token'] = sessionStorage.getItem('environmentToken');

    // if (!userInfo) {
    //     delete config.headers['TM-Header-CompanyId'];
    //     delete config.headers['TM-Header-UserId'];
    // }

    // console.log('axios');
    // console.log(config);

    return config;
}, error => {
    window.fetchNum--;
    // Do something with request error
    console.error(error); // for debug
    Promise.reject(error);
});

const toLoginCodes = ['405', '406', '609'];
const codeMsg = {
    '405': 'token过期',
    '406': '帐号已在其他设备登录',
};
// respone拦截器
service.interceptors.response.use(
    response => {
        window.fetchNum--;
        if (response.headers['content-type'].includes('text/html')) {
            window.location.href = response.request.responseURL;
            return response.data;
        }
        if (!response.data) {
            console.log('response error');
            console.log(response.request);
            return Promise.reject(response.data);
        }
        const data = response.data;
        if (data.success === false) {
            const code = data.errors[0].code;
            const content = codeMsg[code] || '未知错误';
            Modal.error({
                content,
                onOk: () => {
                    if (toLoginCodes.indexOf(code) >= 0) {
                        window.location.href = '/';
                    }
                }
            });
            return Promise.reject(response.data);
        }
        if (data.Code !== '200') {
            Modal.error({
                content: data.Message || '未知错误',
                onOk: () => {
                    if (toLoginCodes.indexOf(data.Code) >= 0) {
                        window.location.href = '/';
                    }
                }
            });
            return Promise.reject(response.data);
        }
        return data;
    },
    error => {
        window.fetchNum--;
        let msg = '';
        if (error.response) {
            try {
                msg = error.response.data;
                console.error(error.response.data);
            } catch (e) {
                msg = '服务器异常';
            }

        } else if (error.request) {

            msg = '服务器无响应';
            console.error(error.request);
        } else {
            msg = `Error : ${error.message}`;
            console.error('Error', error.message);
        }
        console.error(error.response);
        console.log('errorresponse');

        return Promise.reject(error);
    }
);
export default service;



