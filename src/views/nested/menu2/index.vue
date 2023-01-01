<template>
  <div class="app-container" style="padding:30px;">
    <el-alert :closable="false" title="menu 2" />

    <el-table
      :data="list"
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="ID"
        width="120"
      />
      <el-table-column
        prop="name"
        label="名称"
        width="120"
      />
      <el-table-column
        prop="sex"
        label="性别"
        width="120"
      />
      <el-table-column
        prop="age"
        label="年龄"
        width="120"
      />
      <el-table-column
        prop="phone"
        label="电话"
        width="120"
      />
      <el-table-column
        prop="address"
        label="地址"
        width="250"
      />
      <el-table-column
        prop="email"
        label="Email"
        width="180"
      />
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)"
          >编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="bottom-button">
      <el-button
        type="primary"
        @click="onAdd"
      >新增
      </el-button>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-input v-model="form.sex" autocomplete="off" placeholder="请输入性别" />
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="form.age" autocomplete="off" placeholder="请输入年龄" />
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off" placeholder="请输入电话" />
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off" placeholder="请输入地址" />
        </el-form-item>
        <el-form-item label="Email" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off" placeholder="请输入Email" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <div class="block">
      <el-pagination
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { getInfoList, deleteInfo, insertInfo, editInfo } from '@/api/nested'
import { Message } from 'element-ui'

export default {
  data() {
    return {
      list: [],
      form: {
        name: '',
        sex: '',
        age: '',
        phone: '',
        address: '',
        email: ''
      },
      forms: {},
      dialogFormVisible: false,
      formLabelWidth: '60px',
      dialogTitle: '新增学生',
      currentPage4: 4,
      totalNum: 0,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getInfoList().then(response => {
        this.list = response.data
        this.list.forEach(() => {
          this.totalNum++
        })
      })
    },
    onAdd() {
      this.dialogFormVisible = true
      this.form = {
        name: '',
        sex: '',
        age: '',
        phone: '',
        address: '',
        email: ''
      }
      this.dialogTitle = '新增学生'
    },
    handleEdit(data) {
      this.list.forEach(item => {
        if (item.id === data.id) {
          this.dialogTitle = '编辑学生'
          // 用JSON.parse(JSON.stringify())进行深拷贝
          this.form = JSON.parse(JSON.stringify(item))
          this.dialogFormVisible = true
        }
      })
    },
    handleDelete(data) {
      deleteInfo({ id: data.id }).then(response => {
        this.fetchData()
        Message({
          message: response.message,
          type: 'success',
          duration: 5 * 1000
        })
      })
    },
    onSubmit() {
      this.dialogFormVisible = false
      if (this.dialogTitle === '新增学生') {
        insertInfo(this.form).then(response => {
          this.fetchData()
          Message({
            message: response.message,
            type: 'success',
            duration: 5 * 1000
          })
        })
      } else {
        editInfo(this.form).then(response => {
          this.fetchData()
          Message({
            message: response.message,
            type: 'success',
            duration: 5 * 1000
          })
        })
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style scoped lang="scss">
.app-container {
  .bottom-button, .block {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 30px;
  }
}
</style>
