import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { setTimeStamp } from '@/utils/auth'
// 状态
// 初始化的时候从缓存中读取状态，vuex的持久化
const state = {
  token: getToken(), // 设置token的初始化状态，
  userInfo: {}// 这里增加一个空对象，是为了后面要用userInfo的属性，所以不能用null

}
// 修改状态
const mutations = {
  // 修改和设置token
  setToken(state, token) {
    state.token = token// 将修改了的token赋值给我们的state中的token，保持token的唯一性和准确性
    setToken(token)
  },
  // 删除之前的缓存即可
  removeToken(token) {
    state.token = null// 先清除我们state中的token数据
    removeToken()// 这一步主要是清除我们的同步到vuex中的缓存数据
  },
  // 设置用户信息
  setUserInfo(state, userInfo) {
    state.userInfo = { ...userInfo } // 用 浅拷贝的方式去赋值对象 因为这样数据更新之后，才会触发组件的更新
  },
  // 删除用户信息
  reomveUserInfo(state) {
    state.userInfo = {}
  }
}
// 异步执行操作
const actions = {
  // 在点击登录后，我们需要将所得到的的数据data传给我们的actions
  // 这里为啥要写两次login，第一次是我们在actions中封装的一个登录函数，第二次是我们的请求接口函数由于是异步操作，所以这里必须在actions中进行，而且要用async和await
  // 定义login action  也需要参数 调用action时 传递过来的参数
  // async 标记的函数其实就是一个异步函数 -> 本质是还是 一个promise
  async login(context, data) {
    // 经过响应拦截器的处理之后 这里的result实际上就是 token
    const result = await login(data) // 实际上就是一个promise  result就是执行的结果
    // axios默认给数据加了一层data
    // 表示登录接口调用成功 也就是意味着你的用户名和密码是正确的
    // 现在有用户token
    // actions 修改state 必须通过mutations
    context.commit('setToken', result)
    // 写入时间戳
    setTimeStamp() // 将当前的最新时间写入缓存
  },
  // 这里需要获取用户的资料
  async getUserInfo(context) {
    const res = await getUserInfo()
    // 定义一个获取头像的变量名
    const baseInfo = await getUserDetailById(res.userId)
    // 然后将两个接口进行合并
    const baseRes = { ...res, ...baseInfo }
    // 然后提交给mutations进行存储或者修改
    context.commit('setUserInfo', baseRes)
    return baseRes// 这里return是为了给后面做铺垫
  },
  // 登出的action
  logout(context) {
    // 删除token
    context.commit('removeToken') // 不仅仅删除了vuex中的 还删除了缓存中的
    // 删除用户资料
    context.commit('removeUserInfo') // 删除用户信息
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
