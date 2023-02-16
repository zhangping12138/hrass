import request from '@/utils/request'

export function login(data) {
// 返回一个axios对象=>promise 返回了一个promise对象
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
/**
 * 获取用户的资料
 */
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
// /**
//  * 设置用户的资料
//  */
// export function setUserInfo() {

// }
// /**
//  * 删除用户的资料
//  */
// export function reomveUserInfo() {}
/** *
 *获取用户的头像
 */
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

