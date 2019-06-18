const getUserInfo = () => {
    let userInfo = null;
    try {
        userInfo = JSON.parse(sessionStorage.getItem('tmsUserInfo') || '"null"');
    } catch (e) {
        console.warn(e.stack);
    }
    return userInfo;
};

export default getUserInfo;