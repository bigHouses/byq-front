<template>
  <div>
    <div class="formContainer" style="padding: 20px">
      <div class="mb20 mt20">
        <el-select clearable filterable :disabled="readOnlyFlag" v-model="form.city" placeholder="请选择城市" @change="changeCity">
          <el-option
            v-for="item in cityList"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>

        <el-select clearable class="ml100" filterable :disabled="readOnlyFlag" v-model="form.biandz" placeholder="请选择变电站">
          <el-option
            v-for="item in biandzList"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>

        <el-select clearable class="ml100" filterable :disabled="readOnlyFlag" v-model="form.dianydj" placeholder="请选择电压等级">
          <el-option
            v-for="item in dainydjList"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>

        <el-button v-show="!isEditExist" class="ml100" type="primary" @click="resetParam">重置条件</el-button>

      </div>


      <div>
        <el-select clearable filterable :disabled="readOnlyFlag" v-model="form.bianyaqxh" placeholder="请选择变压器序号">
          <el-option
            v-for="item in bianyqxuhList"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>

        <el-select clearable class="ml100" filterable :disabled="readOnlyFlag" v-model="form.bianyqxh" placeholder="请选择变压器型号">
          <el-option
            v-for="item in bianyqxinghList"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>

        <el-select clearable class="ml100" filterable :disabled="readOnlyFlag" v-model="form.year" placeholder="请选择年份">
          <el-option
            v-for="item in yearList"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <el-button v-show="!isEditExist" class="ml100" type="primary" @click="checkShowForm">新增报告</el-button>

      </div>
    </div>


    <div class="app-container formContainer" v-show="showForm">
      <!--试验资料-->
      <div id="formArea">
        <el-input id="headInput" :readonly="readOnlyFlag" v-model="form.reportName"
                  placeholder="________________________________________________"
                  class="border-t border-l" style="width: 500px;"></el-input>
        <el-input id="head" readonly value="主变试验报告" class="border-t border-r " style="width: 498px;"></el-input>

        <span style="font-size: 26px;line-height: 40px"></span>
        <br>
        <el-input readonly value="试" class="verticalInput border-l border-t border-r"></el-input>
        <el-input readonly value="名            称" class="border-t w100" style=""></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.mingc" class="border-t border-r border-l w860"></el-input>

        <br>
        <el-input readonly value="验" class="verticalInput border-l  border-r"></el-input>
        <el-input readonly value="装  设  地  点" class="border-t border-r w101" style=""></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.zhuangsdd" class="w378 border-t border-r"></el-input>

        <el-input readonly value="环  境  温  度" class="border-t border-r w101"></el-input>
        <el-input :readonly="readOnlyFlag" v-model="form.huanjwd" class="w378 border-t border-r"></el-input>

        <br>
        <el-input readonly value="资" class="verticalInput border-l  border-r"></el-input>
        <el-input readonly value="试  验  性  质" class="border-t border-r w101"></el-input>
        <el-input :readonly="readOnlyFlag" v-model="form.shiyxz" class="w378 border-t border-r"></el-input>

        <el-input readonly value="相  对  湿  度" class="border-t border-r w101"></el-input>
        <el-input :readonly="readOnlyFlag" v-model="form.xiangdwd" class="w378 border-t border-r"></el-input>

        <br>
        <el-input readonly value="料" class="verticalInput border-l  border-r"></el-input>
        <el-input readonly value="试  验  日  期" class="border-t border-r w101"></el-input>
        <el-input :readonly="readOnlyFlag" v-model="form.shiyrq" class="w378 border-t border-r"></el-input>

        <el-input readonly value="油            温" class="border-t border-r w101"></el-input>
        <el-input :readonly="readOnlyFlag" v-model="form.youw" class="w378 border-t border-r"></el-input>

        <br>
        <!--铭牌上半部分-->
        <el-input readonly value="" class="verticalInput border-l  border-r border-t"></el-input>
        <el-input readonly value="型            号" class="border-t border-r w101"></el-input>
        <el-input :readonly="readOnlyFlag" v-model="form.xingh" class="w378 border-t border-r"></el-input>

        <el-input readonly value="空  载  电  流" class="border-t border-r w101"></el-input>
        <el-input :readonly="readOnlyFlag" v-model="form.kongzdl" class="w378 border-t border-r"></el-input>

        <br>
        <el-input readonly value="铭" class="verticalInput border-l  border-r"></el-input>
        <el-input readonly value="冷  却  方  式" class="border-t border-r w101"></el-input>
        <el-input :readonly="readOnlyFlag" v-model="form.lengqfs" class="w378 border-t border-r"></el-input>

        <el-input readonly value="额  定  容  量" class="border-t border-r" style="width: 101px;"></el-input>
        <el-input :readonly="readOnlyFlag" v-model="form.edrl" class="w378 border-t border-r"></el-input>

        <br>
        <el-input readonly value="" class="verticalInput border-l  border-r"></el-input>
        <el-input readonly value="接  线  组  别" class="border-t border-r w101"></el-input>
        <el-input :readonly="readOnlyFlag" v-model="form.jiexzbs" class="w378 border-t border-r"></el-input>

        <el-input readonly value="出  厂  日  期" class="border-t border-r w101"></el-input>
        <el-input :readonly="readOnlyFlag" v-model="form.chucrq" class="w378 border-t border-r"></el-input>

        <br>
        <!--铭牌下半部分-->
        <el-input readonly value="" class="verticalInput border-l  border-r"></el-input>
        <el-input readonly value="空  载  损  耗" class="border-t border-r w101"></el-input>
        <el-input :readonly="readOnlyFlag" v-model="form.kongzsh" class="w378 border-t border-r"></el-input>

        <el-input readonly value="编          号" class="border-t border-r w101"></el-input>
        <el-input :readonly="readOnlyFlag" v-model="form.bianh" class="w378 border-t border-r"></el-input>

        <br>
        <el-input readonly value="牌" class="verticalInput border-l  border-r"></el-input>
        <el-input readonly value="额  定  电  压" class="border-t w100"></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.eddy" class="border-t border-r border-l w860"></el-input>

        <br>
        <el-input readonly value="" class="verticalInput border-l  border-r"></el-input>
        <el-input readonly value="制    造    厂" class="border-t w100"></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.zhizc" class="border-t border-r border-l w860"></el-input>

        <br>
        <!--短路阻抗试验-->
        <!--第一行-->
        <el-input readonly value="" class="h80 verticalInput border-l  border-r border-t"></el-input>
        <el-input readonly value="接  线  方  式" class="border-t border-b border-r w100 h80"></el-input>
        <el-input readonly value="档          位" class="border-t border-b border-r w100 h80"></el-input>
        <span class="flex-down">
      <el-input readonly value="              实             测               值Ukj(%)"
                class="border-t border-b border-r w300 flex-up"></el-input>
        <el-input readonly value="       A      " class="border-t border-b border-r w100"></el-input>
        <el-input readonly value="       B      " class="border-t border-b border-r w100"></el-input>
        <el-input readonly value="       C      " class="border-t border-b border-r border-r w100"></el-input>
      </span>
        <el-input readonly value=" 平   均   值(%)" class="border-t border-b w110 h80 ml300 border-r"></el-input>
        <el-input readonly value=" 铭   牌   值(%)" class="border-t border-b w110 h80 border-r"></el-input>
        <el-input readonly value="横  比  误 差(%)" class="border-t border-b w120 h80  border-r"></el-input>
        <el-input readonly value="纵  比  误 差(%)" class="border-t border-b w118 h80 border-r"></el-input>
        <br>

        <el-input readonly value="短" class="verticalInput border-l  border-r"></el-input>
        <el-input readonly="" class="w100 border-r"></el-input>

        <el-input readonly="" value="一档" class="w100 border-r"></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[0].shiczA" class="w100 border-r"></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[0].shiczB" class="w100 border-r"></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[0].shiczC" class="w100 border-r"></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[0].pingjz" class="w110 border-r"></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[0].mingpz" class="w110 border-r"></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[0].hengzwc" class="w120 border-r"></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[0].zongbwc" class="w118 border-r"></el-input>

        <br>

        <el-input readonly value="路" class="verticalInput border-l border-r"></el-input>

        <el-input value="  HV - LV" class="w100 border-r"></el-input>

        <el-input readonly="" value="九档" class="w100 border-r border-b border-t"></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[1].shiczA"
                  class="w100 border-r border-b border-t"></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[1].shiczB"
                  class="w100 border-r border-b border-t"></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[1].shiczC"
                  class="w100 border-r border-b border-t"></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[1].pingjz"
                  class="w110 border-r border-b border-t"></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[1].mingpz"
                  class="w110 border-r border-b border-t"></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[1].hengzwc"
                  class="w120 border-r border-b border-t"></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[1].zongbwc"
                  class="w118 border-r border-b border-t"></el-input>

        <br>

        <el-input readonly value="阻" class="verticalInput border-l  border-r"></el-input>

        <el-input readonly="" class="w100 border-r border-b "></el-input>

        <el-input readonly="" value="十七档" class="w100 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[2].shiczA"
                  class="w100 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[2].shiczB"
                  class="w100 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[2].shiczC"
                  class="w100 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[2].pingjz"
                  class="w110 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[2].mingpz"
                  class="w110 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[2].hengzwc"
                  class="w120 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[2].zongbwc"
                  class="w118 border-r border-b "></el-input>

        <br>

        <el-input readonly value="抗" class="verticalInput border-l  border-r"></el-input>

        <el-input readonly="" class="w100 border-r "></el-input>

        <el-input readonly="" value="一档" class="w100 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[3].shiczA"
                  class="w100 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[3].shiczB"
                  class="w100 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[3].shiczC"
                  class="w100 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[3].pingjz"
                  class="w110 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[3].mingpz"
                  class="w110 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[3].hengzwc"
                  class="w120 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[3].zongbwc"
                  class="w118 border-r border-b "></el-input>

        <br>

        <el-input readonly value="试" class="verticalInput border-l  border-r"></el-input>

        <el-input readonly="" value="  HV - MV" class="w100 border-r "></el-input>

        <el-input readonly="" value="九档" class="w100 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[4].shiczA"
                  class="w100 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[4].shiczB"
                  class="w100 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[4].shiczC"
                  class="w100 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[4].pingjz"
                  class="w110 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[4].mingpz"
                  class="w110 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[4].hengzwc"
                  class="w120 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[4].zongbwc"
                  class="w118 border-r border-b "></el-input>

        <br>

        <el-input readonly value="验" class="verticalInput border-l  border-r"></el-input>

        <el-input readonly="" class="w100 border-r border-b "></el-input>

        <el-input readonly="" value="十七档" class="w100 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[5].shiczA"
                  class="w100 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[5].shiczB"
                  class="w100 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[5].shiczC"
                  class="w100 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[5].pingjz"
                  class="w110 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[5].mingpz"
                  class="w110 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[5].hengzwc"
                  class="w120 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[5].zongbwc"
                  class="w118 border-r border-b "></el-input>

        <br>

        <el-input readonly value="" class="verticalInput border-l  border-r"></el-input>

        <el-input readonly="" class="w100 border-r "></el-input>

        <el-input readonly="" value="一档" class="w100 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[6].shiczA"
                  class="w100 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[6].shiczB"
                  class="w100 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[6].shiczC"
                  class="w100 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[6].pingjz"
                  class="w110 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[6].mingpz"
                  class="w110 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[6].hengzwc"
                  class="w120 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[6].zongbwc"
                  class="w118 border-r border-b "></el-input>

        <br>

        <el-input readonly value="" class="verticalInput border-l  border-r"></el-input>

        <el-input readonly="" value="  MV - LV" class="w100 border-r "></el-input>

        <el-input readonly="" value="三挡" class="w100 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[7].shiczA"
                  class="w100 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[7].shiczB"
                  class="w100 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[7].shiczC"
                  class="w100 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[7].pingjz"
                  class="w110 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[7].mingpz"
                  class="w110 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[7].hengzwc"
                  class="w120 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[7].zongbwc"
                  class="w118 border-r border-b "></el-input>

        <br>

        <el-input readonly value="" class="verticalInput border-l border-b h44 border-r"></el-input>

        <el-input readonly="" class="w100 border-r border-b "></el-input>

        <el-input readonly="" value="三挡" class="w100 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[8].shiczA"
                  class="w100 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[8].shiczB"
                  class="w100 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[8].shiczC"
                  class="w100 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[8].pingjz"
                  class="w110 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[8].mingpz"
                  class="w110 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[8].hengzwc"
                  class="w120 border-r border-b "></el-input>

        <el-input :readonly="readOnlyFlag" v-model="form.impedanceList[8].zongbwc"
                  class="w118 border-r border-b "></el-input>

        <br>
      </div>


      <div class="btns-submit">
        <el-button round v-show="!readOnlyFlag && !isEditExist">保  存</el-button>
        <el-button v-show="!readOnlyFlag" class="btn-submit" type="primary" round @click="submitForm">提  交</el-button>
      </div>
    </div>
  </div>

</template>

<script>
  import {getSelectParam} from '@/api/table'

  export default {
    data() {
      return {
        showForm: false,
        readOnlyFlag: false,
        isEditExist: false,
        readOnly: false,
        form: {
          city: '',
          biandz: '',
          dianydj: '',
          bianyaqxh: '',//变压器序号
          bianyqxh: '',//变压器型号
          year: '',
          reportName: '',
          mingc: '',
          zhuangsdd: '',
          huanjwd: '',
          shiyxz: '',
          xiangdwd: '',
          shiyrq: '',
          youw: '',
          xingh: '',
          kongzdl: '',
          lengqfs: '',
          edrl: '',
          jiexzbs: '',
          chucrq: '',
          kongzsh: '',
          bianh: '',
          eddy: '',
          zhizc: '',
          impedanceList: [{}, {}, {}, {}, {}, {}, {}, {}, {}],
        },
        formBase: {
          city: '',
          biandz: '',
          dianydj: '',
          bianyaqxh: '',//变压器序号
          bianyqxh: '',//变压器型号
          year: '',
          reportName: '',
          mingc: '',
          zhuangsdd: '',
          huanjwd: '',
          shiyxz: '',
          xiangdwd: '',
          shiyrq: '',
          youw: '',
          xingh: '',
          kongzdl: '',
          lengqfs: '',
          edrl: '',
          jiexzbs: '',
          chucrq: '',
          kongzsh: '',
          bianh: '',
          eddy: '',
          zhizc: '',
          impedanceList: [{}, {}, {}, {}, {}, {}, {}, {}, {}],
        },
        cityList: ['福州', '龙岩', '南平', '宁德', '莆田', '泉州', '三明', '厦门', '漳州'],
        //变电站
        biandzMap: {'福州': ['变电站1', '变电站2'], '厦门': ['变电站3', '变电站4']},
        biandzList: ['变电站1', '变电站2', '变电站3', '变电站4'],
        dainydjList: ['110kV', '220kV'],
        bianyqxuhList: ['#1主变', '#2主变', '#3主变'], //变压器序号
        bianyqxinghList: ['变压器型号1', '#变压器型号2', '变压器型号3'], //变压器型号
        yearList: ['2019', '2020'], //变压器序号
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
        }
      }
    },
    mounted: function () {
      console.log(this.$route.query.detail)
      if (this.$route.query.readOnlyFlag == undefined) {
        //直接进入页面,先获取草稿
        this.getDraft()
      } else {
        let form = JSON.parse(this.$route.query.detail);
        //点击修改进入
        this.readOnlyFlag = (typeof this.$route.query.readOnlyFlag === 'boolean')?this.$route.query.readOnlyFlag:'true' === this.$route.query.readOnlyFlag?true:false
        this.form = this.handleForm(form)
        this.showForm = true
        this.isEditExist = true
      }
      //城市
      this.queryParamList(1)
      //变电站
      this.queryParamList(2)
      //变压器型号
      this.queryParamList(4)
    },
    methods: {
      //获取草稿
      getDraft() {





      },
      queryParamList(type) {
        this.listLoading = true
        this.queryParam.city = this.form.city
        this.queryParam.biandz = this.form.biandz
        this.queryParam.bianyaqxh = this.form.bianyaqxh
        this.queryParam.bianyqxh = this.form.bianyqxh
        this.queryParam.dianydj = this.form.dianydj
        this.queryParam.year = this.form.year
        this.queryParam.queryType = type
        let param = JSON.parse(JSON.stringify(this.queryParam))
        getSelectParam(param).then(response => {
          if(type === 1){
            this.cityList = response.data
          }else if(type === 2){
            this.biandzList = response.data
          }else if(type === 4){
            this.bianyqxinghList = response.data
          }
          this.listLoading = false
        })
      },
      handleForm(form) {
        let formCopy = JSON.parse(JSON.stringify(form))
        if (formCopy.impedanceList.length < 9) {
          let length = formCopy.impedanceList.length;
          for (let i = 0; i < (9 - length); i++) {
            formCopy.impedanceList[i + length] = {}  // a  b  c
          }
        }
        return formCopy
      },
      saveDraft() {
        this.$message('submit!')
      },
      resetParam() {
        this.form = JSON.parse(JSON.stringify(this.formBase))
        this.showForm = false
      },
      checkShowForm() {
        if ('' === this.form.city) {
          this.$message('请先选择城市')
          return
        }
        if ('' === this.form.biandz) {
          this.$message('请先选择变电站')
          return
        }
        if ('' === this.form.dianydj) {
          this.$message('请先选择电压等级')
          return
        }
        if ('' === this.form.bianyqxh) {
          this.$message('请先选择变压器序号')
          return
        }
        if ('' === this.form.bianyaqxh) {
          this.$message('请先选择变压器型号')
          return
        }
        if ('' === this.form.year) {
          this.$message('请先选择年份')
          return
        }
        this.showForm = true
      },
      submitForm() {
        this.$store.dispatch('form/submitReport', this.form).then((data) => {
          this.resetParam();
          this.loading = false
        })
      },
      //获取变电站
      changeCity() {
        this.queryParamList(2)
        this.queryParamList(4)
        this.resetForm()
      },
      resetForm() {
        this.form.biandz = ''
        this.form.bianyaqxh = ''
        this.form.bianyqxh = ''
        this.form.dianydj = ''
        this.form.year = ''
      }
    }
  }
</script>
<style>
  @import '../../assets/css/form.css';

  .line {
    text-align: center;
  }

  #formArea input.el-input__inner {
    border: 0;
    border-radius: 0;
    padding-left: 11px;
    padding-right: 0;
  }

  #head {
    font-weight: bold !important;
  }

  #headInput {
    text-align: right;
    /*direction: rtl;*/
    /*text-decoration: underline;*/
  }
</style>

