import request from '@/utils/request'

const benchmarkTestApi = {
    get_model_history: '/benchmark_test/get_model_history',
    get_test_history: '/benchmark_test/get_group',
    list_by_repo_and_version: '/benchmark_test/list_by_repo_and_version',
    get_test_list: '/benchmark_test/list_group',
    update_item_by_id: '/benchmark_test/update_item_by_id',
    delete_item_by_id: '/benchmark_test/delete_item_by_id'
}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function getModelHistory (parameter) {
    return request({
        url: benchmarkTestApi.get_model_history,
        method: 'post',
        data: parameter
    })
}

export function getTestHistory (parameter) {
    return request({
        url: benchmarkTestApi.get_test_history,
        method: 'post',
        data: parameter
    })
}

export function getListByRepoAndVersion (parameter) {
    return request({
        url: benchmarkTestApi.list_by_repo_and_version,
        method: 'post',
        data: parameter
    })
}

export function getTestList (parameter) {
    return request({
        url: benchmarkTestApi.get_test_list,
        method: 'post',
        data: parameter
    })
}

export function updateItemById (parameter) {
    return request({
        url: benchmarkTestApi.update_item_by_id,
        method: 'post',
        data: parameter
    })
}

export function deleteItemById (parameter) {
    return request({
        url: benchmarkTestApi.delete_item_by_id,
        method: 'post',
        data: parameter
    })
}

// export function getInfo() {
//     return request({
//         url: userApi.UserInfo,
//         method: 'get',
//         headers: {
//             'Content-Type': 'application/json;charset=UTF-8'
//         }
//     })
// }

// export function getCurrentUserNav() {
//     return request({
//         url: userApi.UserMenu,
//         method: 'get'
//     })
// }

// export function logout() {
//     return request({
//         url: userApi.Logout,
//         method: 'post',
//         headers: {
//             'Content-Type': 'application/json;charset=UTF-8'
//         }
//     })
// }

// /**
//  * get user 2step code open?
//  * @param parameter {*}
//  */
// export function get2step(parameter) {
//     return request({
//         url: userApi.twoStepCode,
//         method: 'post',
//         data: parameter
//     })
// }
