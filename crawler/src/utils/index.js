const pLimit = require('p-limit');
const axios = require('../axios');

/**
 * 创建并行任务
 * @param {Array} arr 传入数据给fn
 * @param {Number} num 并行限制数
 * @param {Function} fn 执行函数，接受一个参数
 */
async function createTask(arr, num, fn) {
    const limit = pLimit(num);
    const input = [];
    arr.map(item => {
        input.push(limit(fn, item));
    });
    try {
        return await Promise.all(input);
    } catch (error) {
    }
}

/**
 * 判断值是否是字符串
 * @param {String} value 
 * @return {boolean}
 */
function isString(value) {
    return typeof value === 'string';
}

/**
 * 用于请求url，获取网页字符串数据
 * @param {String} url 
 * @return String
 */
function request(url) {
    return axios.get(url).then(res => {
        if (res && res.data && isString(res.data)) {
            return res.data;
        } else {
            throw new Error(`请求数据错误-:${url}`);
        }
    });
}

/**
 * 去除所有空格
 * @param {String} str 
 */
function trimAllSpace(str) {
    return str.replace(/\s/ig, '');
}

module.exports = {
    createTask: createTask,
    isString: isString,
    request: request,
    trimAllSpace: trimAllSpace
};