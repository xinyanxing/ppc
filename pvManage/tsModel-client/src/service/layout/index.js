import fetch from 'utils/fetch';
import _ from 'lodash';
//headList 
const headlistService = {
    //头部list 课程分类
    getheadlist() {
        return fetch({
            url: 'CourseCategory/LoadCourseCategory',
            method: 'post'
        });
    },


};
export { headlistService };