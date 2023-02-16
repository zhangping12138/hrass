<template>
  <div v-loading="loading" class="dashboard-container">
    <div class="app-container">
      <!-- 实现页面的基本布局 -->
      <el-card class="tree-card">
        <!-- 用了一个行列布局 -->
        <!-- 缺少treeNode -->
        <tree-tools :tree-node="company" />
        <!--放置一个属性   这里的props和我们之前学习的父传子 的props没关系-->
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <!-- 说明el-tree里面的这个内容 就是插槽内容 => 填坑内容  => 有多少个节点循环多少次 -->
          <!-- scope-scope 是 tree组件传给每个节点的插槽的内容的数据 -->
          <!-- 顺序一定是 执行slot-scope的赋值 才去执行 props的传值 -->
          <template v-slot="{ data }">
            <tree-tools :tree-node="data" @delDepts="getDepartments" @addDepts="addDepts" @editDepts="editDepts" />
          </template>
        </el-tree>
      </el-card>
    </div>
    <add-dept ref="addDept" :show-dialog.sync="showDialog" :tree-node="node" @addDepts="getDepartments" />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import AddDept from './components/add-dept'
import { getDepartments } from '@/api/departments'
import { transListToTreeData } from '@/utils'
export default {
  components: {
    TreeTools,
    AddDept
  },

  data() {
    return {
      defaultProps: {
        label: 'name'// 表示 从这个属性显示内容
      },
      departs: [],
      company: {},
      node: null,
      showDialog: false, // 显示窗体
      loading: false // 用来控制进度弹层的显示和隐藏
    }
  },
  created() {
    this.getDepartments() // 调用自身的方法
  },
  methods: {
    async getDepartments() {
      // debugger
      const { depts, companyName } = await getDepartments()
      this.company = { manager: '负责人', name: companyName, id: '' }
      this.departs = transListToTreeData(depts, '')
      // console.log(result)
    },
    addDepts(node) {
      // debugger
      this.showDialog = true // 显示弹层
      // 因为node是当前的点击的部门， 此时这个部门应该记录下来,
      this.node = node
      // console.log('node', node)
    },
    async editDepts(node) {
      this.loading = true
      // 我们需要在这个位置 调用子组件的方法
      // 父组件 调用子组件的方法
      console.log('this.$refs.addDept', this.$refs)
      await this.$refs.addDept.getDepartDetail(node.id) // 直接调用子组件中的方法 传入一个id
      // 首先打开弹层
      this.showDialog = true
      this.node = node // 赋值操作的节点
      this.loading = false
    }
  }
}

</script>

<style scoped>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
</style>
