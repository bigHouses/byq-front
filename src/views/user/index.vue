<template>
  <div style="padding:30px;">
    <el-button style="margin-bottom: 20px;" type="primary" @click="addUserForm">+新增用户</el-button>
    <el-table :data="accountList" v-loading="loading" element-loading-text="给我一点时间" border fit highlight-current-row
              tooltip-effect="light" style="width: 100%">
      <el-table-column min-width="130px" label="账号">
        <template slot-scope="scope">
          <span>{{scope.row.username}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="130px" label="密码">
        <template slot-scope="scope">
          <span>{{scope.row.password}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="130px" label="系统角色">
        <template slot-scope="scope">
          <span v-if="scope.row.role === 'admin'">管理员</span>
          <span v-if="scope.row.role === 'user'">操作员</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" label="姓名">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="130px" label="手机号码">
        <template slot-scope="scope">
          <span>{{scope.row.telephoneNum}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleUpdate(scope.row)">修改
          </el-button>
          <el-button size="mini" type="danger" @click="delUser(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.size"
                     layout="total, sizes, prev, pager, next, jumper" :total="totalRow">
      </el-pagination>
    </div>

    <el-dialog title="新增用户" :visible.sync="dialogFormVisible" width="800px">
    <el-form :model="newUser">
      <el-form-item label="姓名" style="width: 300px;">
        <el-input v-model="newUser.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="登录账号" style="width: 300px;">
        <el-input v-model="newUser.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" style="width: 300px;">
        <el-input v-model="newUser.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号" style="width: 300px;">
        <el-input v-model="newUser.telephoneNum" autocomplete="off"></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="addUser">确 定</el-button>
    </div>
  </el-dialog>

    <el-dialog title="新增用户" :visible.sync="updateDialogFormVisible" width="800px">
      <el-form :model="newUser">
        <el-form-item label="姓名" style="width: 300px;">
          <el-input v-model="newUser.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="登录账号" style="width: 300px;">
          <el-input readonly v-model="newUser.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" style="width: 300px;">
          <el-input v-model="newUser.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" style="width: 300px;">
          <el-input v-model="newUser.telephoneNum" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {queryAllUser, addUser, delUser, updateUser} from '@/api/user'
  import {resetRouter} from '@/router'

  export default {
    name: 'userAdmin',
    data() {
      return {
        formLabelWidth: '120px',
        dialogFormVisible: false,
        updateDialogFormVisible: false,
        newUser: {name: '', username:'',password:'',telephoneNum:''},
        loading: false,
        dialogFormVisible: false,
        textMap: {
          update: '修改子账号',
          create: '添加子账号'
        },
        totalRow: 0,
        accountList: [{status: 1,}],
        listQuery: {
          pageNum: 1,
          pageSize: 20
        },
        newSysUser: {
          id: undefined,
          username: undefined,
          realName: undefined,
          phone: undefined,
          mobile: undefined,
          gender: '1',
          cardNo: undefined,
          sysRoleIds: [],
          status: undefined,
          userDescription: undefined,
          parentId: undefined
        },
        allSysRoleOptions: undefined,
        allSysRoleMap: {},
      }
    },
    methods: {
      delUser(row){
        delUser({userId: row.id}).then(response=>{
          this.$message('删除用户成功')
          this.queryUserList()
        })
      },
      addUserForm() {
        this.dialogFormVisible = true
      },
      addUser(){
        if(this.newUser.name === ''){
          this.$message('姓名不能为空')
        }
        if(this.newUser.username === ''){
          this.$message('用户名不能为空')
        }
        if(this.newUser.password === ''){
          this.$message('密码不能为空')
        }
        if(this.newUser.telephoneNum === ''){
          this.$message('手机号不能为空')
        }
        this.newUser.role = 'user'
        addUser(this.newUser).then(response=>{
          this.queryUserList()
          this.newUser = {}
          this.$message('增加成功')
        })
        this.dialogFormVisible = false
      },
      updateUser(){
        if(this.newUser.name === ''){
          this.$message('姓名不能为空')
        }
        if(this.newUser.username === ''){
          this.$message('用户名不能为空')
        }
        if(this.newUser.password === ''){
          this.$message('密码不能为空')
        }
        if(this.newUser.telephoneNum === ''){
          this.$message('手机号不能为空')
        }
        this.newUser.role = 'user'
        updateUser(this.newUser).then(response=>{
          this.queryUserList()
          this.newUser = {}
          this.$message('更新成功')
        })
        this.updateDialogFormVisible = false
      },
      handleUpdate(row) {
        this.newUser = row
        this.updateDialogFormVisible = true
      },
      queryUserList() {
        this.loading = true
        queryAllUser(this.listQuery).then(response => {
          this.accountList = response.data.list
          this.totalRow = response.data.total
          this.accountList[0].password = 123456
          this.accountList[1].password = 123456
          this.loading = false
        })
      },
      deleteRow(index, rows) {
        rows.splice(index, 1)
      },
      handleSizeChange(val) {
        this.listQuery.pageSize = val
        this.queryUserList()
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val
        this.queryUserList()
      },
    },
    mounted: function () {
      resetRouter()
      this.queryUserList()
    }
  }
</script>
