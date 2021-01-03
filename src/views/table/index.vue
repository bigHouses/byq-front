<template>
  <div>
    <div class="formContainer" style="padding: 20px">
      <div class="mb20 mt20">
        <el-select clearable filterable v-model="form.city" placeholder="请选择城市" @change="getBiandzList">
          <el-option
            v-for="item in cityList"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>

        <el-select clearable class="ml100" filterable v-model="form.biandz" placeholder="请选择变电站">
          <el-option
            v-for="item in biandzList"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>

        <el-select clearable class="ml100" filterable v-model="form.dianydj" placeholder="请选择电压等级">
          <el-option
            v-for="item in dainydjList"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>

        <el-button class="ml100" type="primary" @click="resetParam">重置条件</el-button>

      </div>


      <div>
        <el-select clearable filterable v-model="form.bianyaqxh" placeholder="请选择变压器序号">
          <el-option
            v-for="item in bianyqxuhList"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>

        <el-select clearable class="ml100" filterable v-model="form.bianyqxh" placeholder="请选择变压器型号">
          <el-option
            v-for="item in bianyqxinghList"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>

        <el-select clearable class="ml100" filterable v-model="form.year" placeholder="请选择年份">
          <el-option
            v-for="item in yearList"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <el-button class="ml100" type="primary" @click="queryReportList">查询报告</el-button>

      </div>
    </div>

    <div v-show="showTable" style="margin-top: 40px;">
      <el-table :data="list" row-key="id" v-loading.body="listLoading" border fit highlight-current-row
                style="width: 100%" tooltip-effect="light">
        <el-table-column align="center" label="城市">
          <template slot-scope="scope">
            <span>{{scope.row.city}}</span>
          </template>
        </el-table-column>

        <!--<el-table-column align="center" label="编号">-->
        <!--<template slot-scope="scope">-->
        <!--<span>{{scope.row.bianh}}</span>-->
        <!--</template>-->
        <!--</el-table-column>-->

        <el-table-column align="center" label="变电站">
          <template slot-scope="scope">
            <span>{{scope.row.biandz}}</span>
          </template>
        </el-table-column>


        <el-table-column align="center" label="电压等级">
          <template slot-scope="scope">
            <span>{{scope.row.dianydj}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="变压器型号">
          <template slot-scope="scope">
            <span>{{scope.row.bianyqxh}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="变压器序号">
          <template slot-scope="scope">
            <span>{{scope.row.bianyaqxh}}</span>
          </template>
        </el-table-column>


        <el-table-column align="center" label="试验日期">
          <template slot-scope="scope">
            <span>{{scope.row.shiyrq}}</span>
          </template>
        </el-table-column>

        <!--<el-table-column align="center" label="操作" width="350px">-->
        <!--<template slot-scope="scope">-->
        <!--<el-dropdown split-button type="primary" trigger="click" @click="viewDetail('试验报告录入', scope.row, true)"-->
        <!--@command="handleCommand" size="small">-->
        <!--详情-->
        <!--<el-dropdown-menu slot="dropdown">-->
        <!--<el-dropdown-item :command="{action:'modify',row:scope.row}">修改</el-dropdown-item>-->
        <!--<el-dropdown-item :command="{action:'remove',row:scope.row}">删除</el-dropdown-item>-->
        <!--</el-dropdown-menu>-->
        <!--</el-dropdown>-->
        <!--</template>-->
        <!--</el-table-column>-->

        <el-table-column align="center" label="操作" width="350px">
          <template slot-scope="scope">
            <el-button size="small" type="primary" trigger="click" @click="viewDetail('试验报告详情', scope.row, true)">详情
            </el-button>
            <el-button size="small" v-if="scope.row.delEnable && scope.row.editEnable" type="primary" trigger="click"
                       @click="viewDetail('试验报告详情', scope.row, false)">修改
            </el-button>
            <el-button size="small" v-if="scope.row.delEnable" type="primary" trigger="click"
                       @click="delReport(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>


      </el-table>

      <div class="pagination-container">
        <el-pagination background
                       @current-change="handleCurrentChange" :current-page.sync="form.pageNum"
                       :page-size="form.pageSize"
                       layout="total, prev, pager, next, jumper" :total="totalRow">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
  import {getReporeList} from '@/api/form'
  import {getSelectParam, delReport} from '@/api/table'
  import {getUser} from '@/utils/auth'


  export default {
    data() {
      return {
        list: [],
        showTable: true,
        listLoading: true,
        totalRow: 0,
        cityList: ['福州', '龙岩', '南平', '宁德', '莆田', '泉州', '三明', '厦门', '漳州'],
        //变电站
        biandzMap: {'福州': ['变电站1', '变电站2'], '厦门': ['变电站3', '变电站4']},
        biandzList: ['变电站1', '变电站2', '变电站3', '变电站4'],
        dainydjList: ['110kV', '220kV'],
        bianyqxuhList: ['#1主变', '#2主变', '#3主变'], //变压器序号
        bianyqxinghList: ['SZ11-50000/110', 'SZ10-50000/110', 'SFZ8-50000/110', 'SFZ9-50000/110', 'SZ-50000/110'], //变压器型号
        yearList: [], //变压器序号
        form: {
          "biandz": "",
          bianyaqxh: '',//变压器序号
          bianyqxh: '',//变压器型号
          "city": "",
          "dianydj": "",
          "pageNum": 1,
          "pageSize": 10,
          "year": ""
        },
        formBase: {
          "biandz": "",
          bianyaqxh: '',//变压器序号
          bianyqxh: '',//变压器型号
          "city": "",
          "dianydj": "",
          "pageNum": 1,
          "pageSize": 10,
          "year": ""
        },
        queryParam: {
          "condition": {
            "biandz": "",
            "bianyaqxh": "",
            "bianyqxh": "",
            "city": "",
            "dianydj": "",
            "year": ""
          },
          "queryType": 1
        },
      }
    },
    mounted: function () {
      for(var i=1999;i <= 2021 ;i++){
        this.yearList.push(i.toString())
      }
      //城市
      this.queryParamList(1)
      //变电站
      this.queryParamList(2)
      //变压器型号
      this.queryParamList(4)
      //变压器序号
      // this.queryParamList(3)
      let condition = this.$route.query.condition;
      if (condition != undefined) {
        this.form = JSON.parse(condition);
        this.queryReportList()
      }
    },
    methods: {
      //删除报告
      delReport(form){
        delReport({reportId: form.id}).then(response => {
          this.queryReportList()
        })
      },
      //查看详情
      viewDetail(name, form, readOnlyFlag) {
        this.$router.push({
          name: name,
          query: {detail: JSON.stringify(form), readOnlyFlag: readOnlyFlag, condition: JSON.stringify(this.form)}
        })
      },
      handleCommand(params) {
        switch (params.action) {
          case 'modify':
            this.viewDetail('试验报告详情', params.row, false)
            break
          case 'remove':
            this.ensureRemove(params.row)
            break
        }
      },
      ensureRemove() {

      },
      resetParam() {
        this.form = JSON.parse(JSON.stringify(this.formBase))
        this.list = []
      },
      //获取变电站
      getBiandzList() {
        // this.biandzList = this.biandzMap[this.form.city]
      },
      queryReportList() {
        let flag = false
        if (this.form.city !== '') {
          flag = true
        }
        if (this.form.biandz !== '') {
          flag = true
        }
        if (this.form.dianydj !== '') {
          flag = true
        }
        if (this.form.bianyaqxh !== '') {
          flag = true
        }
        if (this.form.bianyqxh !== '') {
          flag = true
        }
        if (this.form.year !== '') {
          flag = true
        }
        if (flag) {
          this.listLoading = true
          getReporeList(this.form).then(response => {
            let user = JSON.parse(getUser());
            let list = response.data.list;
            if ('admin' === user.role) {
              for (const form of list) {
                form.delEnable = true
                this.handleList(form)
              }
            } else {
              for (const form of list) {
                if (user.id === form.userId) {
                  form.delEnable = true
                }
                this.handleList(form)
              }
            }
            this.list = list
            this.totalRow = response.data.total
            this.showTable = true
            this.listLoading = false
          })
        } else {
          this.$message('请至少选择一项条件')
        }
      },
      handleList(form) {
        form.frequencyList = [{}, {}, {}, {}, {}, {}, {}, {}, {}]
        for (const i in form.frequencies) {
          form.frequencyList[i].frequency = form.frequencies[i]
          form.frequencyList[i].xlist = JSON.parse(form.frequencies[i].xlist)
          form.frequencyList[i].ylist = JSON.parse(form.frequencies[i].ylist)
        }
        if (form.reportType === '2') {
          form.editEnable = false
        } else {
          form.editEnable = true
        }
      },
      queryParamList(type) {
        this.listLoading = true
        this.queryParam.queryType = type
        let param = JSON.parse(JSON.stringify(this.queryParam))
        getSelectParam(param).then(response => {
          if (type === 1) {
            this.cityList = response.data
          } else if (type === 2) {
            this.biandzList = response.data
          } else if (type === 4) {
            this.bianyqxinghList = response.data
          }
          this.listLoading = false
        })
      },
      handleSizeChange() {
        console.log(this.form.pageSize)
        this.queryReportList()
      },
      handleCurrentChange() {
        this.queryReportList()
      }
    }
  }
</script>

<style>
  @import '../../assets/css/form.css';

</style>
