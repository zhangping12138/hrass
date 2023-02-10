const getters = {
  sidebar: state => state.app.sidebar, // 使用箭头函数，存在return ，所以这里简写
  device: state => state.app.device
}
export default getters
