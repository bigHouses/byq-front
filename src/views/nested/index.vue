<template>
  <div v-loading.fullscreen.lock="loading">
    <div ref="imageWrapper" >
      <div class="formContainer" style="padding: 20px">
        <div class="mb20 mt20">
          <el-select clearable filterable :disabled="readOnlyFlag" v-model="form.city" placeholder="请选择城市"
                     @change="changeCity">
            <el-option
              v-for="item in cityList"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>

          <el-select clearable class="ml100" filterable :disabled="readOnlyFlag" v-model="form.biandz"
                     @change="changeLevel"
                     placeholder="请选择变电站">
            <el-option
              v-for="item in biandzList"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>

          <el-select clearable class="ml100" filterable :disabled="readOnlyFlag || dianydjFlag" v-model="form.dianydj"
                     placeholder="请选择电压等级">
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
          <el-select clearable filterable :disabled="readOnlyFlag" @change="handleReportName" v-model="form.bianyaqxh"
                     placeholder="请选择变压器序号">
            <el-option
              v-for="item in bianyqxuhList"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>

          <el-select @change="handleXH" clearable class="ml100" filterable :disabled="readOnlyFlag"
                     v-model="form.bianyqxh"
                     placeholder="请选择变压器型号">
            <el-option
              v-for="item in bianyqxinghList"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>

          <el-select @change="changeYear" clearable class="ml100" filterable :disabled="readOnlyFlag"
                     v-model="form.year"
                     placeholder="请选择年份">
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
          <el-input id="head" readonly value="  试验报告" class="border-t border-r " style="width: 498px;"></el-input>
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
          <el-input readonly value="试  验  性  质" class="border-t  border-r w101"></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shiyxz" class="w378 border-t border-r"></el-input>

          <el-input readonly value="相  对  湿  度" class="border-t border-r w101"></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.xiangdwd" class="w378 border-t border-r"></el-input>

          <br>
          <el-input readonly value="料" class="verticalInput border-l  border-r"></el-input>
          <el-input readonly value="试  验  日  期" class="border-t border-r w101"></el-input>

          <!--<el-input :readonly="readOnlyFlag"  v-model="form.shiyrq" class="w378 border-t border-r"></el-input>-->
          <span class="w378 border-t border-r" style="display: inline-flex;">
            <el-date-picker
              v-model="form.shiyrq"
              :readonly="readOnlyFlag"
              align="left"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"

              @change="changeShiyrq"
              :picker-options="pickerOptions">
    </el-date-picker>

          </span>

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
          <el-input :readonly="readOnlyFlag" v-model="form.jiexzb" class="w378 border-t border-r"></el-input>

          <el-input readonly value="出  厂  日  期" class="border-t border-r w101"></el-input>
          <!--<el-input :readonly="readOnlyFlag"  v-model="form.chucrq" class="w378 border-t border-r"></el-input>-->
          <span class="w378 border-t border-r" style="display: inline-flex;">
            <el-date-picker style="width: 378px !important;"
                            :readonly="readOnlyFlag"
                            v-model="form.chucrq"
                            align="left"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            :picker-options="pickerOptions">
            </el-date-picker>
          </span>
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

          <!--电容量测量-->
          <el-input readonly value="电" class=" verticalInput border-l  border-r border-t"></el-input>
          <el-input readonly value="接  线  方  式" class="border-t border-r w101 "></el-input>
          <el-input readonly value="   试   验   电   压(kV)" class="border-t border-r w157 "></el-input>
          <el-input readonly value="         接   线   方   法" class="border-t border-r w200 "></el-input>
          <el-input readonly value="       出 厂 电 容 量(PF)" class="border-t border-r w200 "></el-input>
          <el-input readonly value="       实 测 电 容 量(PF)" class="border-t border-r w200 "></el-input>
          <el-input readonly value="   △Cx(%)" class="border-t border-r w100 "></el-input>
          <br>
          <el-input readonly value="容" class=" verticalInput border-l  border-r"></el-input>
          <el-input readonly value="高/中低及地" class="border-t border-r w101 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.capacitanceList[0].shiydy"
                    class="border-t border-r w157 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.capacitanceList[0].jiexff"
                    class="border-t border-r w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.capacitanceList[0].chucdr"
                    class="border-t border-r w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.capacitanceList[0].shicdl"
                    class="border-t border-r w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.capacitanceList[0].variateX"
                    class="border-t border-r w100 "></el-input>
          <br>
          <el-input readonly value="量" class=" verticalInput border-l  border-r"></el-input>
          <el-input readonly value="中/高低及地" class="border-t border-r w101 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.capacitanceList[1].shiydy"
                    class="border-t border-r w157 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.capacitanceList[1].jiexff"
                    class="border-t border-r w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.capacitanceList[1].chucdr"
                    class="border-t border-r w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.capacitanceList[1].shicdl"
                    class="border-t border-r w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.capacitanceList[1].variateX"
                    class="border-t border-r w100 "></el-input>
          <br>
          <el-input readonly value="测" class=" verticalInput border-l  border-r "></el-input>
          <el-input readonly value="低/高中及地" class="border-t border-r w101 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.capacitanceList[2].shiydy"
                    class="border-t border-r w157 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.capacitanceList[2].jiexff"
                    class="border-t border-r w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.capacitanceList[2].chucdr"
                    class="border-t border-r w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.capacitanceList[2].shicdl"
                    class="border-t border-r w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.capacitanceList[2].variateX"
                    class="border-t border-r w100 "></el-input>
          <br>
          <el-input readonly value="量" class=" verticalInput border-l  border-r "></el-input>
          <el-input readonly value="高中/低及地" class="border-t border-r w101 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.capacitanceList[3].shiydy"
                    class="border-t border-r w157 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.capacitanceList[3].jiexff"
                    class="border-t border-r w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.capacitanceList[3].chucdr"
                    class="border-t border-r w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.capacitanceList[3].shicdl"
                    class="border-t border-r w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.capacitanceList[3].variateX"
                    class="border-t border-r w100 "></el-input>
          <br>
          <el-input readonly value="" class="verticalInput border-l  border-r "></el-input>
          <el-input readonly value="高中低/地" class="border-t border-r w101 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.capacitanceList[4].shiydy"
                    class="border-t border-r w157 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.capacitanceList[4].jiexff"
                    class="border-t border-r w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.capacitanceList[4].chucdr"
                    class="border-t border-r w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.capacitanceList[4].shicdl"
                    class="border-t border-r w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.capacitanceList[4].variateX"
                    class="border-t border-r w100 "></el-input>
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

          <el-input readonly="" value="三档" class="w100 border-r border-b "></el-input>

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

          <el-input readonly="" value="五档" class="w100 border-r border-b "></el-input>

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

          <!--频响法数据-->
          <el-input readonly value="" class="verticalInput border-l  border-r "></el-input>
          <el-input readonly value="绕组及分接方式" class=" border-r w200 "></el-input>
          <el-input readonly value="相关系数Rxy" class=" border-r w158 "></el-input>
          <el-input readonly value="低频段(1-100kHz)RLF" class=" border-r w200 "></el-input>
          <el-input readonly value="中频段(100-600kHz)RMF" class=" border-r w200 "></el-input>
          <el-input readonly value="高频段(600-1000kHz)RHF" class=" border-r w200 "></el-input>

          <br>
          <el-input readonly value="频" class="verticalInput border-l  border-r "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[0].frequency.raozjfjfs"
                    class="border-t border-r w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[0].frequency.xianggxs"
                    class="border-t border-r w158 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[0].frequency.dipd"
                    class=" border-r border-t w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[0].frequency.zhongpd"
                    class="border-t border-r w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[0].frequency.gaopd"
                    class="border-t border-r w200 "></el-input>
          <el-dropdown v-show="!readOnlyFlag" style="margin-left: 10px;">
            <el-button type="primary" size="small">
              A相<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-dropdown style="margin-left: 10px;">
                  <el-dropdown-item>
                    <el-upload
                      ref="A1"
                      accept="txt"
                      :disabled="false"
                      :action="host+'/transformer/readFile/readTxt'"
                      :data="uploadData"
                      :on-success="uploadFileHOHA1"
                      name="multipartFile"
                      :limit="1"
                      :auto-upload="false"
                      :show-file-list="false"
                      :file-list="fileList1"
                      :on-change="countFileA1"
                      :headers="uploadHeader">
                      <el-button size="small" type="primary">TXT文件</el-button>
                    </el-upload>
                  </el-dropdown-item>
                </el-dropdown>
              </el-dropdown-item>

              <!--<el-dropdown-item>-->
                <!--<el-dropdown style="margin-left: 10px;">-->
                  <!--<el-button type="primary" size="small">-->
                    <!--CSV文件<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                  <!--</el-button>-->
                  <!--<el-dropdown-menu slot="dropdown">-->
                    <!--<el-dropdown-item>-->
                      <!--<el-upload-->
                        <!--accept="txt"-->
                        <!--:action="host+'/transformer/readFile/readTxt'"-->
                        <!--:data="uploadData"-->
                        <!--:on-success="uploadFileHOHA1"-->
                        <!--name="multipartFile"-->
                        <!--:headers="uploadHeader">-->
                        <!--<el-button size="small" type="primary">HOHA</el-button>-->
                      <!--</el-upload>-->
                    <!--</el-dropdown-item>-->

                    <!--<el-dropdown-item>-->
                      <!--<el-upload-->
                        <!--accept="txt"-->
                        <!--:action="host+'/transformer/readFile/readTxt'"-->
                        <!--:data="uploadData"-->
                        <!--:on-success="uploadFileHOHB1"-->
                        <!--name="multipartFile"-->
                        <!--:headers="uploadHeader">-->
                        <!--<el-button size="small" type="primary">HOHB</el-button>-->
                      <!--</el-upload>-->
                    <!--</el-dropdown-item>-->

                    <!--<el-dropdown-item>-->
                      <!--<el-upload-->
                        <!--accept="txt"-->
                        <!--:action="host+'/transformer/readFile/readTxt'"-->
                        <!--:data="uploadData"-->
                        <!--:on-success="uploadFileHOHC1"-->
                        <!--name="multipartFile"-->
                        <!--:headers="uploadHeader">-->
                        <!--<el-button size="small" type="primary">HOHC</el-button>-->
                      <!--</el-upload>-->
                    <!--</el-dropdown-item>-->

                  <!--</el-dropdown-menu>-->
                <!--</el-dropdown>-->
              <!--</el-dropdown-item>-->
            </el-dropdown-menu>
          </el-dropdown>
          <el-button style="margin-left:5px" :disabled="count1 !== 3" size="small" type="primary" @click="getRxyData1">
            生成系数
          </el-button>

          <br>
          <el-input readonly value="响" class="verticalInput border-l  border-r "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[1].frequency.raozjfjfs"
                    class="border-t border-r w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[1].frequency.xianggxs"
                    class="border-t border-r w158 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[1].frequency.dipd"
                    class=" border-r border-t w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[1].frequency.zhongpd"
                    class="border-t border-r w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[1].frequency.gaopd"
                    class="border-t border-r w200 "></el-input>
          <el-dropdown v-show="!readOnlyFlag" style="margin-left: 10px;">
            <el-button type="primary" size="small">
              B相<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-dropdown style="margin-left: 10px;">
                  <el-dropdown-item>
                    <el-upload
                      ref="B1"
                      accept="txt"
                      :action="host+'/transformer/readFile/readTxt'"
                      :data="uploadData"
                      :on-success="uploadFileHOHB1"
                      name="multipartFile"
                      :disabled="false"
                      :limit="1"
                      :auto-upload="false"
                      :show-file-list="false"
                      :file-list="fileList2"
                      :on-change="countFileB1"
                      :headers="uploadHeader">
                      <el-button size="small" type="primary">TXT文件</el-button>
                    </el-upload>
                  </el-dropdown-item>
                </el-dropdown>
              </el-dropdown-item>

              <!--<el-dropdown-item>-->
                <!--<el-dropdown style="margin-left: 10px;">-->
                  <!--<el-button type="primary" size="small">-->
                    <!--CSV文件<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                  <!--</el-button>-->
                  <!--<el-dropdown-menu slot="dropdown">-->
                    <!--<el-dropdown-item>-->
                      <!--<el-upload-->
                        <!--accept="txt"-->
                        <!--:action="host+'/transformer/readFile/readTxt'"-->
                        <!--:data="uploadData"-->
                        <!--:on-success="uploadFileHOHA1"-->
                        <!--name="multipartFile"-->
                        <!--:headers="uploadHeader">-->
                        <!--<el-button size="small" type="primary">HOHA</el-button>-->
                      <!--</el-upload>-->
                    <!--</el-dropdown-item>-->

                    <!--<el-dropdown-item>-->
                      <!--<el-upload-->
                        <!--accept="txt"-->
                        <!--:action="host+'/transformer/readFile/readTxt'"-->
                        <!--:data="uploadData"-->
                        <!--:on-success="uploadFileHOHB1"-->
                        <!--name="multipartFile"-->
                        <!--:headers="uploadHeader">-->
                        <!--<el-button size="small" type="primary">HOHB</el-button>-->
                      <!--</el-upload>-->
                    <!--</el-dropdown-item>-->

                    <!--<el-dropdown-item>-->
                      <!--<el-upload-->
                        <!--accept="txt"-->
                        <!--:action="host+'/transformer/readFile/readTxt'"-->
                        <!--:data="uploadData"-->
                        <!--:on-success="uploadFileHOHC1"-->
                        <!--name="multipartFile"-->
                        <!--:headers="uploadHeader">-->
                        <!--<el-button size="small" type="primary">HOHC</el-button>-->
                      <!--</el-upload>-->
                    <!--</el-dropdown-item>-->

                  <!--</el-dropdown-menu>-->
                <!--</el-dropdown>-->
              <!--</el-dropdown-item>-->
            </el-dropdown-menu>
          </el-dropdown>
          <br>
          <el-input readonly value="法" class="verticalInput border-l  border-r "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[2].frequency.raozjfjfs"
                    class="border-t border-r w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[2].frequency.xianggxs"
                    class="border-t border-r w158 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[2].frequency.dipd"
                    class=" border-r border-t w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[2].frequency.zhongpd"
                    class="border-t border-r w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[2].frequency.gaopd"
                    class="border-t border-r w200 "></el-input>
          <el-dropdown v-show="!readOnlyFlag" style="margin-left: 10px;">
            <el-button type="primary" size="small">
              C相<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-dropdown style="margin-left: 10px;">
                  <el-dropdown-item>
                    <el-upload
                      ref="C1"
                      accept="txt"
                      :disabled="false"
                      :action="host+'/transformer/readFile/readTxt'"
                      :data="uploadData"
                      :on-success="uploadFileHOHC1"
                      name="multipartFile"
                      :limit="1"
                      :auto-upload="false"
                      :show-file-list="false"
                      :file-list="fileList3"
                      :on-change="countFileC1"
                      :headers="uploadHeader">
                      <el-button size="small" type="primary">TXT文件</el-button>
                    </el-upload>
                  </el-dropdown-item>
                </el-dropdown>
              </el-dropdown-item>

              <!--<el-dropdown-item>-->
                <!--<el-dropdown style="margin-left: 10px;">-->
                  <!--<el-button type="primary" size="small">-->
                    <!--CSV文件<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                  <!--</el-button>-->
                  <!--<el-dropdown-menu slot="dropdown">-->
                    <!--<el-dropdown-item>-->
                      <!--<el-upload-->
                        <!--accept="txt"-->
                        <!--:action="host+'/transformer/readFile/readTxt'"-->
                        <!--:data="uploadData"-->
                        <!--:on-success="uploadFileHOHA1"-->
                        <!--name="multipartFile"-->
                        <!--:headers="uploadHeader">-->
                        <!--<el-button size="small" type="primary">HOHA</el-button>-->
                      <!--</el-upload>-->
                    <!--</el-dropdown-item>-->

                    <!--<el-dropdown-item>-->
                      <!--<el-upload-->
                        <!--accept="txt"-->
                        <!--:action="host+'/transformer/readFile/readTxt'"-->
                        <!--:data="uploadData"-->
                        <!--:on-success="uploadFileHOHB1"-->
                        <!--name="multipartFile"-->
                        <!--:headers="uploadHeader">-->
                        <!--<el-button size="small" type="primary">HOHB</el-button>-->
                      <!--</el-upload>-->
                    <!--</el-dropdown-item>-->

                    <!--<el-dropdown-item>-->
                      <!--<el-upload-->
                        <!--accept="txt"-->
                        <!--:action="host+'/transformer/readFile/readTxt'"-->
                        <!--:data="uploadData"-->
                        <!--:on-success="uploadFileHOHC1"-->
                        <!--name="multipartFile"-->
                        <!--:headers="uploadHeader">-->
                        <!--<el-button size="small" type="primary">HOHC</el-button>-->
                      <!--</el-upload>-->
                    <!--</el-dropdown-item>-->

                  <!--</el-dropdown-menu>-->
                <!--</el-dropdown>-->
              <!--</el-dropdown-item>-->
            </el-dropdown-menu>
          </el-dropdown>

          <br>
          <el-input readonly value="数" class="verticalInput border-l  border-r "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[3].frequency.raozjfjfs"
                    class="border-t border-r w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[3].frequency.xianggxs"
                    class="border-t border-r w158 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[3].frequency.dipd"
                    class=" border-r border-t w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[3].frequency.zhongpd"
                    class="border-t border-r w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[3].frequency.gaopd"
                    class="border-t border-r w200 "></el-input>
          <el-dropdown v-show="!readOnlyFlag" style="margin-left: 10px;">
            <el-button type="primary" size="small">
              A相<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-dropdown style="margin-left: 10px;">
                  <el-dropdown-item>
                    <el-upload
                      ref="A2"
                      accept="txt"
                      :disabled="false"
                      :action="host+'/transformer/readFile/readTxt'"
                      :data="uploadData"
                      :on-success="uploadFileHOHA2"
                      name="multipartFile"
                      :limit="1"
                      :auto-upload="false"
                      :show-file-list="false"
                      :file-list="fileList4"
                      :on-change="countFileA2"
                      :headers="uploadHeader">
                      <el-button size="small" type="primary">TXT文件</el-button>
                    </el-upload>
                  </el-dropdown-item>
                </el-dropdown>
              </el-dropdown-item>

              <!--<el-dropdown-item>-->
                <!--<el-dropdown style="margin-left: 10px;">-->
                  <!--<el-button type="primary" size="small">-->
                    <!--CSV文件<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                  <!--</el-button>-->
                  <!--<el-dropdown-menu slot="dropdown">-->
                    <!--<el-dropdown-item>-->
                      <!--<el-upload-->
                        <!--accept="txt"-->
                        <!--:action="host+'/transformer/readFile/readTxt'"-->
                        <!--:data="uploadData"-->
                        <!--:on-success="uploadFileHOHA1"-->
                        <!--name="multipartFile"-->
                        <!--:headers="uploadHeader">-->
                        <!--<el-button size="small" type="primary">HOHA</el-button>-->
                      <!--</el-upload>-->
                    <!--</el-dropdown-item>-->

                    <!--<el-dropdown-item>-->
                      <!--<el-upload-->
                        <!--accept="txt"-->
                        <!--:action="host+'/transformer/readFile/readTxt'"-->
                        <!--:data="uploadData"-->
                        <!--:on-success="uploadFileHOHB1"-->
                        <!--name="multipartFile"-->
                        <!--:headers="uploadHeader">-->
                        <!--<el-button size="small" type="primary">HOHB</el-button>-->
                      <!--</el-upload>-->
                    <!--</el-dropdown-item>-->

                    <!--<el-dropdown-item>-->
                      <!--<el-upload-->
                        <!--accept="txt"-->
                        <!--:action="host+'/transformer/readFile/readTxt'"-->
                        <!--:data="uploadData"-->
                        <!--:on-success="uploadFileHOHC1"-->
                        <!--name="multipartFile"-->
                        <!--:headers="uploadHeader">-->
                        <!--<el-button size="small" type="primary">HOHC</el-button>-->
                      <!--</el-upload>-->
                    <!--</el-dropdown-item>-->

                  <!--</el-dropdown-menu>-->
                <!--</el-dropdown>-->
              <!--</el-dropdown-item>-->
            </el-dropdown-menu>
          </el-dropdown>
          <el-button style="margin-left:5px" :disabled="count2 !== 3" size="small" type="primary" @click="getRxyData2">
            生成系数
          </el-button>

          <br>
          <el-input readonly value="据" class="verticalInput border-l  border-r "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[4].frequency.raozjfjfs"
                    class="border-t border-r w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[4].frequency.xianggxs"
                    class="border-t border-r w158 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[4].frequency.dipd"
                    class=" border-r border-t w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[4].frequency.zhongpd"
                    class="border-t border-r w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[4].frequency.gaopd"
                    class="border-t border-r w200 "></el-input>
          <el-dropdown v-show="!readOnlyFlag" style="margin-left: 10px;">
            <el-button type="primary" size="small">
              B相<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-dropdown style="margin-left: 10px;">
                  <el-dropdown-item>
                    <el-upload
                      ref="B2"
                      accept="txt"
                      :action="host+'/transformer/readFile/readTxt'"
                      :data="uploadData"
                      :on-success="uploadFileHOHB2"
                      name="multipartFile"
                      :disabled="false"
                      :limit="1"
                      :auto-upload="false"
                      :show-file-list="false"
                      :file-list="fileList5"
                      :on-change="countFileB2"
                      :headers="uploadHeader">
                      <el-button size="small" type="primary">TXT文件</el-button>
                    </el-upload>
                  </el-dropdown-item>
                </el-dropdown>
              </el-dropdown-item>

              <!--<el-dropdown-item>-->
                <!--<el-dropdown style="margin-left: 10px;">-->
                  <!--<el-button type="primary" size="small">-->
                    <!--CSV文件<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                  <!--</el-button>-->
                  <!--<el-dropdown-menu slot="dropdown">-->
                    <!--<el-dropdown-item>-->
                      <!--<el-upload-->
                        <!--accept="txt"-->
                        <!--:action="host+'/transformer/readFile/readTxt'"-->
                        <!--:data="uploadData"-->
                        <!--:on-success="uploadFileHOHA1"-->
                        <!--name="multipartFile"-->
                        <!--:headers="uploadHeader">-->
                        <!--<el-button size="small" type="primary">HOHA</el-button>-->
                      <!--</el-upload>-->
                    <!--</el-dropdown-item>-->

                    <!--<el-dropdown-item>-->
                      <!--<el-upload-->
                        <!--accept="txt"-->
                        <!--:action="host+'/transformer/readFile/readTxt'"-->
                        <!--:data="uploadData"-->
                        <!--:on-success="uploadFileHOHB1"-->
                        <!--name="multipartFile"-->
                        <!--:headers="uploadHeader">-->
                        <!--<el-button size="small" type="primary">HOHB</el-button>-->
                      <!--</el-upload>-->
                    <!--</el-dropdown-item>-->

                    <!--<el-dropdown-item>-->
                      <!--<el-upload-->
                        <!--accept="txt"-->
                        <!--:action="host+'/transformer/readFile/readTxt'"-->
                        <!--:data="uploadData"-->
                        <!--:on-success="uploadFileHOHC1"-->
                        <!--name="multipartFile"-->
                        <!--:headers="uploadHeader">-->
                        <!--<el-button size="small" type="primary">HOHC</el-button>-->
                      <!--</el-upload>-->
                    <!--</el-dropdown-item>-->

                  <!--</el-dropdown-menu>-->
                <!--</el-dropdown>-->
              <!--</el-dropdown-item>-->
            </el-dropdown-menu>
          </el-dropdown>
          <br>
          <el-input readonly value="" class="verticalInput border-l  border-r "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[5].frequency.raozjfjfs"
                    class="border-t border-r w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[5].frequency.xianggxs"
                    class="border-t border-r w158 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[5].frequency.dipd"
                    class=" border-r border-t w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[5].frequency.zhongpd"
                    class="border-t border-r w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[5].frequency.gaopd"
                    class="border-t border-r w200 "></el-input>
          <el-dropdown v-show="!readOnlyFlag" style="margin-left: 10px;">
            <el-button type="primary" size="small">
              C相<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-dropdown style="margin-left: 10px;">
                  <el-dropdown-item>
                    <el-upload
                      ref="C2"
                      accept="txt"
                      :disabled="false"
                      :action="host+'/transformer/readFile/readTxt'"
                      :data="uploadData"
                      :on-success="uploadFileHOHC2"
                      name="multipartFile"
                      :limit="1"
                      :auto-upload="false"
                      :show-file-list="false"
                      :file-list="fileList6"
                      :on-change="countFileC2"
                      :headers="uploadHeader">
                      <el-button size="small" type="primary">TXT文件</el-button>
                    </el-upload>
                  </el-dropdown-item>
                </el-dropdown>
              </el-dropdown-item>

              <!--<el-dropdown-item>-->
                <!--<el-dropdown style="margin-left: 10px;">-->
                  <!--<el-button type="primary" size="small">-->
                    <!--CSV文件<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                  <!--</el-button>-->
                  <!--<el-dropdown-menu slot="dropdown">-->
                    <!--<el-dropdown-item>-->
                      <!--<el-upload-->
                        <!--accept="txt"-->
                        <!--:action="host+'/transformer/readFile/readTxt'"-->
                        <!--:data="uploadData"-->
                        <!--:on-success="uploadFileHOHA1"-->
                        <!--name="multipartFile"-->
                        <!--:headers="uploadHeader">-->
                        <!--<el-button size="small" type="primary">HOHA</el-button>-->
                      <!--</el-upload>-->
                    <!--</el-dropdown-item>-->

                    <!--<el-dropdown-item>-->
                      <!--<el-upload-->
                        <!--accept="txt"-->
                        <!--:action="host+'/transformer/readFile/readTxt'"-->
                        <!--:data="uploadData"-->
                        <!--:on-success="uploadFileHOHB1"-->
                        <!--name="multipartFile"-->
                        <!--:headers="uploadHeader">-->
                        <!--<el-button size="small" type="primary">HOHB</el-button>-->
                      <!--</el-upload>-->
                    <!--</el-dropdown-item>-->

                    <!--<el-dropdown-item>-->
                      <!--<el-upload-->
                        <!--accept="txt"-->
                        <!--:action="host+'/transformer/readFile/readTxt'"-->
                        <!--:data="uploadData"-->
                        <!--:on-success="uploadFileHOHC1"-->
                        <!--name="multipartFile"-->
                        <!--:headers="uploadHeader">-->
                        <!--<el-button size="small" type="primary">HOHC</el-button>-->
                      <!--</el-upload>-->
                    <!--</el-dropdown-item>-->

                  <!--</el-dropdown-menu>-->
                <!--</el-dropdown>-->
              <!--</el-dropdown-item>-->
            </el-dropdown-menu>
          </el-dropdown>
          <br>
          <el-input readonly value="" class="verticalInput border-l  border-r "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[6].frequency.raozjfjfs"
                    class="border-t border-r w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[6].frequency.xianggxs"
                    class="border-t border-r w158 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[6].frequency.dipd"
                    class=" border-r border-t w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[6].frequency.zhongpd"
                    class="border-t border-r w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[6].frequency.gaopd"
                    class="border-t border-r w200 "></el-input>
          <el-dropdown v-show="!readOnlyFlag" style="margin-left: 10px;">
            <el-button type="primary" size="small">
              A相<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-dropdown style="margin-left: 10px;">
                  <el-dropdown-item>
                    <el-upload
                      ref="A3"
                      accept="txt"
                      :disabled="false"
                      :action="host+'/transformer/readFile/readTxt'"
                      :data="uploadData"
                      :on-success="uploadFileHOHA3"
                      name="multipartFile"
                      :limit="1"
                      :auto-upload="false"
                      :show-file-list="false"
                      :file-list="fileList7"
                      :on-change="countFileA3"
                      :headers="uploadHeader">
                      <el-button size="small" type="primary">TXT文件</el-button>
                    </el-upload>
                  </el-dropdown-item>
                </el-dropdown>
              </el-dropdown-item>

              <!--<el-dropdown-item>-->
                <!--<el-dropdown style="margin-left: 10px;">-->
                  <!--<el-button type="primary" size="small">-->
                    <!--CSV文件<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                  <!--</el-button>-->
                  <!--<el-dropdown-menu slot="dropdown">-->
                    <!--<el-dropdown-item>-->
                      <!--<el-upload-->
                        <!--accept="txt"-->
                        <!--:action="host+'/transformer/readFile/readTxt'"-->
                        <!--:data="uploadData"-->
                        <!--:on-success="uploadFileHOHA1"-->
                        <!--name="multipartFile"-->
                        <!--:headers="uploadHeader">-->
                        <!--<el-button size="small" type="primary">HOHA</el-button>-->
                      <!--</el-upload>-->
                    <!--</el-dropdown-item>-->

                    <!--<el-dropdown-item>-->
                      <!--<el-upload-->
                        <!--accept="txt"-->
                        <!--:action="host+'/transformer/readFile/readTxt'"-->
                        <!--:data="uploadData"-->
                        <!--:on-success="uploadFileHOHB1"-->
                        <!--name="multipartFile"-->
                        <!--:headers="uploadHeader">-->
                        <!--<el-button size="small" type="primary">HOHB</el-button>-->
                      <!--</el-upload>-->
                    <!--</el-dropdown-item>-->

                    <!--<el-dropdown-item>-->
                      <!--<el-upload-->
                        <!--accept="txt"-->
                        <!--:action="host+'/transformer/readFile/readTxt'"-->
                        <!--:data="uploadData"-->
                        <!--:on-success="uploadFileHOHC1"-->
                        <!--name="multipartFile"-->
                        <!--:headers="uploadHeader">-->
                        <!--<el-button size="small" type="primary">HOHC</el-button>-->
                      <!--</el-upload>-->
                    <!--</el-dropdown-item>-->

                  <!--</el-dropdown-menu>-->
                <!--</el-dropdown>-->
              <!--</el-dropdown-item>-->
            </el-dropdown-menu>
          </el-dropdown>
          <el-button style="margin-left:5px" :disabled="count3 !== 3" size="small" type="primary" @click="getRxyData3">
            生成系数
          </el-button>

          <br>
          <el-input readonly value="" class="verticalInput border-l  border-r "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[7].frequency.raozjfjfs"
                    class="border-t border-r w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[7].frequency.xianggxs"
                    class="border-t border-r w158 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[7].frequency.dipd"
                    class=" border-r border-t w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[7].frequency.zhongpd"
                    class="border-t border-r w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[7].frequency.gaopd"
                    class="border-t border-r w200 "></el-input>
          <el-dropdown v-show="!readOnlyFlag" style="margin-left: 10px;">
            <el-button type="primary" size="small">
              B相<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-dropdown style="margin-left: 10px;">
                  <el-dropdown-item>
                    <el-upload
                      ref="B3"
                      accept="txt"
                      :action="host+'/transformer/readFile/readTxt'"
                      :data="uploadData"
                      :on-success="uploadFileHOHB3"
                      name="multipartFile"
                      :disabled="false"
                      :limit="1"
                      :auto-upload="false"
                      :show-file-list="false"
                      :file-list="fileList8"
                      :on-change="countFileB3"
                      :headers="uploadHeader">
                      <el-button size="small" type="primary">TXT文件</el-button>
                    </el-upload>
                  </el-dropdown-item>
                </el-dropdown>
              </el-dropdown-item>

              <!--<el-dropdown-item>-->
                <!--<el-dropdown style="margin-left: 10px;">-->
                  <!--<el-button type="primary" size="small">-->
                    <!--CSV文件<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                  <!--</el-button>-->
                  <!--<el-dropdown-menu slot="dropdown">-->
                    <!--<el-dropdown-item>-->
                      <!--<el-upload-->
                        <!--accept="txt"-->
                        <!--:action="host+'/transformer/readFile/readTxt'"-->
                        <!--:data="uploadData"-->
                        <!--:on-success="uploadFileHOHA1"-->
                        <!--name="multipartFile"-->
                        <!--:headers="uploadHeader">-->
                        <!--<el-button size="small" type="primary">HOHA</el-button>-->
                      <!--</el-upload>-->
                    <!--</el-dropdown-item>-->

                    <!--<el-dropdown-item>-->
                      <!--<el-upload-->
                        <!--accept="txt"-->
                        <!--:action="host+'/transformer/readFile/readTxt'"-->
                        <!--:data="uploadData"-->
                        <!--:on-success="uploadFileHOHB1"-->
                        <!--name="multipartFile"-->
                        <!--:headers="uploadHeader">-->
                        <!--<el-button size="small" type="primary">HOHB</el-button>-->
                      <!--</el-upload>-->
                    <!--</el-dropdown-item>-->

                    <!--<el-dropdown-item>-->
                      <!--<el-upload-->
                        <!--accept="txt"-->
                        <!--:action="host+'/transformer/readFile/readTxt'"-->
                        <!--:data="uploadData"-->
                        <!--:on-success="uploadFileHOHC1"-->
                        <!--name="multipartFile"-->
                        <!--:headers="uploadHeader">-->
                        <!--<el-button size="small" type="primary">HOHC</el-button>-->
                      <!--</el-upload>-->
                    <!--</el-dropdown-item>-->

                  <!--</el-dropdown-menu>-->
                <!--</el-dropdown>-->
              <!--</el-dropdown-item>-->
            </el-dropdown-menu>
          </el-dropdown>
          <br>
          <el-input readonly value="" class="border-b verticalInput border-l  border-r "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[8].frequency.raozjfjfs"
                    class="border-t border-b border-r w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[8].frequency.xianggxs"
                    class="border-t border-b border-r w158 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[8].frequency.dipd"
                    class=" border-r border-t border-b w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[8].frequency.zhongpd"
                    class="border-t border-b border-r w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.frequencyList[8].frequency.gaopd"
                    class="border-t border-b border-r w200 "></el-input>
          <el-dropdown v-show="!readOnlyFlag" style="margin-left: 10px;">
            <el-button type="primary" size="small">
              C相<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-dropdown style="margin-left: 10px;">
                  <el-dropdown-item>
                    <el-upload
                      ref="C3"
                      accept="txt"
                      :disabled="false"
                      :action="host+'/transformer/readFile/readTxt'"
                      :data="uploadData"
                      :on-success="uploadFileHOHC3"
                      name="multipartFile"
                      :limit="1"
                      :auto-upload="false"
                      :show-file-list="false"
                      :file-list="fileList9"
                      :on-change="countFileC3"
                      :headers="uploadHeader">
                      <el-button size="small" type="primary">TXT文件</el-button>
                    </el-upload>
                  </el-dropdown-item>
                </el-dropdown>
              </el-dropdown-item>

              <!--<el-dropdown-item>-->
                <!--<el-dropdown style="margin-left: 10px;">-->
                  <!--<el-button type="primary" size="small">-->
                    <!--CSV文件<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                  <!--</el-button>-->
                  <!--<el-dropdown-menu slot="dropdown">-->
                    <!--<el-dropdown-item>-->
                      <!--<el-upload-->
                        <!--accept="txt"-->
                        <!--:action="host+'/transformer/readFile/readTxt'"-->
                        <!--:data="uploadData"-->
                        <!--:on-success="uploadFileHOHA1"-->
                        <!--name="multipartFile"-->
                        <!--:headers="uploadHeader">-->
                        <!--<el-button size="small" type="primary">HOHA</el-button>-->
                      <!--</el-upload>-->
                    <!--</el-dropdown-item>-->

                    <!--<el-dropdown-item>-->
                      <!--<el-upload-->
                        <!--accept="txt"-->
                        <!--:action="host+'/transformer/readFile/readTxt'"-->
                        <!--:data="uploadData"-->
                        <!--:on-success="uploadFileHOHB1"-->
                        <!--name="multipartFile"-->
                        <!--:headers="uploadHeader">-->
                        <!--<el-button size="small" type="primary">HOHB</el-button>-->
                      <!--</el-upload>-->
                    <!--</el-dropdown-item>-->

                    <!--<el-dropdown-item>-->
                      <!--<el-upload-->
                        <!--accept="txt"-->
                        <!--:action="host+'/transformer/readFile/readTxt'"-->
                        <!--:data="uploadData"-->
                        <!--:on-success="uploadFileHOHC1"-->
                        <!--name="multipartFile"-->
                        <!--:headers="uploadHeader">-->
                        <!--<el-button size="small" type="primary">HOHC</el-button>-->
                      <!--</el-upload>-->
                    <!--</el-dropdown-item>-->

                  <!--</el-dropdown-menu>-->
                <!--</el-dropdown>-->
              <!--</el-dropdown-item>-->
            </el-dropdown-menu>
          </el-dropdown>
          <br>

          <!--短路冲击数据-->
          <el-input readonly value="短" class="verticalInput border-l  border-r h80 "></el-input>
          <el-input readonly value="   日    期" class=" border-r h80 w100 "></el-input>
          <el-input readonly value="  故  障  位  置" class=" border-r h80 w120 "></el-input>
          <el-input readonly value="故障电流(kA)" class=" border-r h80 w100 "></el-input>
          <el-input readonly value="持续时长(ms)" class=" border-r h80 w100 "></el-input>
          <span class="flex-down">
          <el-input readonly value="         冲   击   次   数" class=" border-b border-r w200 flex-up"></el-input>
           <el-input readonly value="    3-5In" class="border-t  border-r w100"></el-input>
           <el-input readonly value="    ≥5In" class="border-t  border-r border-r w100"></el-input>
         </span>
          <span style="margin-left: 200px;" class="flex-down">
          <el-input readonly value="  中  压  侧" class=" border-r w100 flex-up"></el-input>
          <el-input readonly value=" 额 定 电 流" class="mt1 border-r w100"></el-input>
        </span>
          <span style="margin-left: 300px;" class="flex-down">
          <el-input readonly value="  低  压  侧" class=" border-r w100 flex-up"></el-input>
          <el-input readonly value=" 额 定 电 流" class="mt1 border-r w100"></el-input>
        </span>
          <span style="margin-left: 400px;" class="flex-down">
          <el-input readonly value="  倍数(故障电流/" class=" border-r w138 flex-up"></el-input>
          <el-input readonly value="    额定电流)" class="mt1 border-r w138"></el-input>
        </span>
          <br>

          <el-input readonly value="路" class="verticalInput border-l  border-r "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[0].riq"
                    class="border-t border-r w100 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[0].guzwz"
                    class="border-t border-r w120 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[0].guzdl"
                    class=" border-r border-t w100 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[0].chixsc"
                    class="border-t border-r w100 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[0].chongjcs3"
                    class="border-t border-r w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[0].zhongyceddl"
                    class="border-t border-r w100 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[0].diyceddl"
                    class="border-t border-r w100 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[0].beis"
                    class="border-t border-r w138 "></el-input>
          <br>
          <el-input readonly value="冲" class="verticalInput border-l  border-r "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[1].riq"
                    class="border-t border-r w100 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[1].guzwz"
                    class="border-t border-r w120 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[1].guzdl"
                    class=" border-r border-t w100 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[1].chixsc"
                    class="border-t border-r w100 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[1].chongjcs3"
                    class="border-t border-r w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[1].zhongyceddl"
                    class="border-t border-r w100 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[1].diyceddl"
                    class="border-t border-r w100 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[1].beis"
                    class="border-t border-r w138 "></el-input>
          <br>
          <el-input readonly value="击" class="verticalInput border-l  border-r "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[2].riq"
                    class="border-t border-r w100 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[2].guzwz"
                    class="border-t border-r w120 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[2].guzdl"
                    class=" border-r border-t w100 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[2].chixsc"
                    class="border-t border-r w100 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[2].chongjcs3"
                    class="border-t border-r w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[2].zhongyceddl"
                    class="border-t border-r w100 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[2].diyceddl"
                    class="border-t border-r w100 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[2].beis"
                    class="border-t border-r w138 "></el-input>
          <br>
          <el-input readonly value="数" class="verticalInput border-l  border-r "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[3].riq"
                    class="border-t border-r w100 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[3].guzwz"
                    class="border-t border-r w120 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[3].guzdl"
                    class=" border-r border-t w100 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[3].chixsc"
                    class="border-t border-r w100 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[3].chongjcs3"
                    class="border-t border-r w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[3].zhongyceddl"
                    class="border-t border-r w100 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[3].diyceddl"
                    class="border-t border-r w100 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[3].beis"
                    class="border-t border-r w138 "></el-input>
          <br>
          <el-input readonly value="据" class="verticalInput border-l  border-r"></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[4].riq"
                    class="border-t border-r w100 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[4].guzwz"
                    class="border-t border-r w120 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[4].guzdl"
                    class=" border-r border-t w100 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[4].chixsc"
                    class="border-t border-r w100 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[4].chongjcs3"
                    class="border-t border-r w200 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[4].zhongyceddl"
                    class="border-t border-r w100 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[4].diyceddl"
                    class="border-t border-r w100 "></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.shortCircuitList[4].beis"
                    class="border-t border-r w138 "></el-input>
          <br>
          <el-input readonly value="" class="verticalInput border-l border-t border-r border-b"></el-input>
          <el-input readonly value="是否合格" class="border-b border-t border-r w220"></el-input>
          <el-input :readonly="readOnlyFlag" v-model="form.heg" class="border-b border-t border-r w738"></el-input>
          <el-button size="small" style="margin-left: 10px;" type="primary" @click="getResult">获取评估结果</el-button>
        </div>


        <div class="btns-submit">
          <el-button round v-show="!readOnlyFlag && !isEditExist" @click="saveDraft">保 存</el-button>
          <el-button v-show="!readOnlyFlag" class="btn-submit" type="primary" round @click="submitForm">提 交</el-button>
          <!--<el-button  class="btn-submit" type="primary" round @click="canves">测试</el-button>-->
          <!--<el-button  class="btn-submit" type="primary" round @click="initChart">测试图表</el-button>-->
        </div>
      </div>
    </div>

    <div id="chart1" style="width: 85%;height:600px;margin: 0 auto;margin-top: 70px"></div>
    <div id="chart2" style="width: 85%;height:600px;margin: 0 auto;margin-top: 70px"></div>
    <div id="chart3" style="width: 85%;height:600px;margin: 0 auto;margin-top: 70px;margin-bottom: 200px;"></div>
    <!--<img :src="dataURL" alt="">-->
  </div>

</template>

<script>
  import {getSelectParam} from '@/api/table'
  import {saveDraft, getDraft, generateData, getResult} from '@/api/form'
  import {getUser, getToken} from '@/utils/auth'
  import html2canvas from "html2canvas"

  let echarts = require('echarts');
  // Vue.prototype.$echarts = echarts


  export default {
    data() {
      return {
        loading: false,
        // host: 'http://146.56.201.46:42109',
        host: 'http://192.168.10.115:42109',
        fileList1: [],
        fileList2: [],
        fileList3: [],
        fileList4: [],
        fileList5: [],
        fileList6: [],
        fileList7: [],
        fileList8: [],
        fileList9: [],
        dataList1: ['', '', ''],
        dataList2: ['', '', ''],
        dataList3: ['', '', ''],
        count1: 0,
        count2: 0,
        count3: 0,
        dianydjFlag: false,
        uploadData: {fileType: '1'},
        uploadHeader: {},
        dataURL: '',
        showForm: false,
        readOnlyFlag: false,
        isEditExist: false,
        readOnly: false,
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        form: {
          reportType: '', //1表单，2word导入
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
          jiexzb: '',
          chucrq: '',
          kongzsh: '',
          bianh: '',
          eddy: '',
          zhizc: '',
          impedanceList: [{}, {}, {}, {}, {}, {}, {}, {}, {}],
          shortCircuitList: [{}, {}, {}, {}, {}],
          frequencyList: [{frequency: {}}, {frequency: {}}, {frequency: {}}, {frequency: {}}, {frequency: {}}, {frequency: {}}, {frequency: {}}, {frequency: {}}, {frequency: {}}],
          capacitanceList: [{}, {}, {}, {}, {}],
          heg: ''
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
          jiexzb: '',
          chucrq: '',
          kongzsh: '',
          bianh: '',
          eddy: '',
          zhizc: '',
          impedanceList: [{}, {}, {}, {}, {}, {}, {}, {}, {}],
          shortCircuitList: [{}, {}, {}, {}, {}],
          frequencyList: [{frequency: {}}, {frequency: {}}, {frequency: {}}, {frequency: {}}, {frequency: {}}, {frequency: {}}, {frequency: {}}, {frequency: {}}, {frequency: {}}],
          capacitanceList: [{}, {}, {}, {}, {}],
          heg: ''
        },
        cityList: ['福州', '龙岩', '南平', '宁德', '莆田', '泉州', '三明', '厦门', '漳州'],
        //变电站
        biandzMap: {'福州': ['变电站1', '变电站2'], '厦门': ['变电站3', '变电站4']},
        biandzList: ['变电站1', '变电站2', '变电站3', '变电站4'],
        dainydjList: ['110kV', '220kV'],
        // dainydjListC: [],
        bianyqxuhList: ['#1主变', '#2主变', '#3主变'], //变压器序号
        bianyqxinghList: ['SZ11-50000/110', 'SZ10-50000/110', 'SFZ8-50000/110', 'SFZ9-50000/110', 'SZ-50000/110'], //变压器型号
        yearList: [], //变压器序号
        fileList: [],
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
        option1: {
          title: {
            text: '频率响应曲线'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['H0HA', 'H0HB', 'HOHC']
          },
          grid: {
            left: '0%',
            right: '0%',
            bottom: '0%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            position: 'bottom',
            boundaryGap: false,
            data: ['0', '100', '200', '300', '400', '500', '600', '700', '800', '900', '1000']
          },
          yAxis: {
            type: 'value',
            name: '响应(dB)'
          },
          series: []
        },
        option2: {
          title: {
            text: '频率响应曲线'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['H0HA', 'H0HB', 'HOHC']
          },
          grid: {
            left: '0%',
            right: '0%',
            bottom: '0%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            position: 'bottom',
            boundaryGap: false,
            data: ['0', '100', '200', '300', '400', '500', '600', '700', '800', '900', '1000']
          },
          yAxis: {
            type: 'value',
            name: '响应(dB)'
          },
          series: []
        },
        option3: {
          title: {
            text: '频率响应曲线'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['H0HA', 'H0HB', 'HOHC']
          },
          grid: {
            left: '0%',
            right: '0%',
            bottom: '0%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            position: 'bottom',
            boundaryGap: false,
            data: ['0', '100', '200', '300', '400', '500', '600', '700', '800', '900', '1000']
          },
          yAxis: {
            type: 'value',
            name: '响应(dB)'
          },
          series: []
        }
      }
    },
    mounted: function () {
      if (this.$route.query.readOnlyFlag == undefined) {
        //直接进入页面,先获取草稿
        this.getDraft()
      } else {
        let form = JSON.parse(this.$route.query.detail);
        //点击修改进入
        this.readOnlyFlag = (typeof this.$route.query.readOnlyFlag === 'boolean') ? this.$route.query.readOnlyFlag : 'true' === this.$route.query.readOnlyFlag ? true : false
        this.form = this.handleForm(form)
        this.showForm = true
        this.isEditExist = true
      }
      for(var i=1999;i <= 2021 ;i++){
        this.yearList.push(i.toString())
      }
      //城市
      this.queryParamList(1)
      //变电站
      this.queryParamList(2)
      //变压器型号
      this.queryParamList(4)
      this.uploadHeader.TOKEN = getToken()
    },
    methods: {
      getResult(){
        this.loading = true
        let param = this.buildParam();
        console.log(param)
        getResult(param).then(response =>{
          this.form.heg = response.data
          this.loading = false
        })
      },
      buildParam(){
        let param = {
          "capacitanceMap": {},
          "shortMap": {},
          "frequencyMap": {}
        }
        for(let i=0;i < this.form.capacitanceList.length ;i++){
          if(this.form.capacitanceList[i].chucdr === undefined
          || this.form.capacitanceList[i].shicdl === undefined
          || this.form.capacitanceList[i].variateX === undefined
          || '' === this.form.capacitanceList[i].chucdr
          || '' === this.form.capacitanceList[i].shicdl
          || '' === this.form.capacitanceList[i].variateX){
            continue
          }
          param.capacitanceMap["list"+(i+1)] = [
            this.form.capacitanceList[i].chucdr,
            this.form.capacitanceList[i].shicdl,
            this.form.capacitanceList[i].variateX
          ]
        }
        for(let i=0;i < this.form.impedanceList.length ;i++){
          if(this.form.impedanceList[i].shiczA === undefined
            || this.form.impedanceList[i].shiczB === undefined
            || this.form.impedanceList[i].shiczC === undefined
            || this.form.impedanceList[i].pingjz === undefined
            || this.form.impedanceList[i].mingpz === undefined
            || this.form.impedanceList[i].hengzwc === undefined
            || this.form.impedanceList[i].zongbwc === undefined
            || '' === this.form.impedanceList[i].shiczA
            || '' === this.form.impedanceList[i].shiczB
            || '' === this.form.impedanceList[i].shiczC
            || '' === this.form.impedanceList[i].pingjz
            || '' === this.form.impedanceList[i].mingpz
            || '' === this.form.impedanceList[i].hengzwc
            || '' === this.form.impedanceList[i].zongbwc){
            continue
          }
          param.shortMap["list"+(i+1)] = [
            this.form.impedanceList[i].shiczA,
            this.form.impedanceList[i].shiczB,
            this.form.impedanceList[i].shiczC,
            this.form.impedanceList[i].pingjz,
            this.form.impedanceList[i].mingpz,
            this.form.impedanceList[i].hengzwc,
            this.form.impedanceList[i].zongbwc
          ]
        }
        for(let i=0;i < this.form.frequencyList.length ;i++){
          if(this.form.frequencyList[i].frequency.dipd === undefined
            || this.form.frequencyList[i].frequency.zhongpd === undefined
            || this.form.frequencyList[i].frequency.gaopd === undefined
            || '' === this.form.frequencyList[i].frequency.dipd
            || '' === this.form.frequencyList[i].frequency.zhongpd
            || '' === this.form.frequencyList[i].frequency.gaopd){
            continue
          }
          param.frequencyMap["list"+(i+1)] = [
            this.form.frequencyList[i].frequency.dipd,
            this.form.frequencyList[i].frequency.zhongpd,
            this.form.frequencyList[i].frequency.gaopd
          ]
        }
        return param
      },
      generateData1(){
        generateData(this.dataList1).then(response => {
          let data = JSON.parse(response.data);
          this.form.frequencyList[0].frequency.xianggxs = data[0][0].toString()
          this.form.frequencyList[0].frequency.dipd = data[0][1].toString()
          this.form.frequencyList[0].frequency.zhongpd = data[0][2].toString()
          this.form.frequencyList[0].frequency.gaopd = data[0][3].toString()

          this.form.frequencyList[1].frequency.xianggxs = data[1][0].toString()
          this.form.frequencyList[1].frequency.dipd = data[1][1].toString()
          this.form.frequencyList[1].frequency.zhongpd = data[1][2].toString()
          this.form.frequencyList[1].frequency.gaopd = data[1][3].toString()

          this.form.frequencyList[2].frequency.xianggxs = data[2][0].toString()
          this.form.frequencyList[2].frequency.dipd = data[2][1].toString()
          this.form.frequencyList[2].frequency.zhongpd = data[2][2].toString()
          this.form.frequencyList[2].frequency.gaopd = data[2][3].toString()
          this.$forceUpdate()
        })
      },
      generateData2(){
        generateData(this.dataList2).then(response => {
          let data = JSON.parse(response.data);
          this.form.frequencyList[3].frequency.xianggxs = data[0][0].toString()
          this.form.frequencyList[3].frequency.dipd = data[0][1].toString()
          this.form.frequencyList[3].frequency.zhongpd = data[0][2].toString()
          this.form.frequencyList[3].frequency.gaopd = data[0][3].toString()

          this.form.frequencyList[4].frequency.xianggxs = data[1][0].toString()
          this.form.frequencyList[4].frequency.dipd = data[1][1].toString()
          this.form.frequencyList[4].frequency.zhongpd = data[1][2].toString()
          this.form.frequencyList[4].frequency.gaopd = data[1][3].toString()

          this.form.frequencyList[5].frequency.xianggxs = data[2][0].toString()
          this.form.frequencyList[5].frequency.dipd = data[2][1].toString()
          this.form.frequencyList[5].frequency.zhongpd = data[2][2].toString()
          this.form.frequencyList[5].frequency.gaopd = data[2][3].toString()
          this.$forceUpdate()
        })
      },
      generateData3(){
        generateData(this.dataList3).then(response => {
          let data = JSON.parse(response.data);
          this.form.frequencyList[6].frequency.xianggxs = data[0][0].toString()
          this.form.frequencyList[6].frequency.dipd = data[0][1].toString()
          this.form.frequencyList[6].frequency.zhongpd = data[0][2].toString()
          this.form.frequencyList[6].frequency.gaopd = data[0][3].toString()

          this.form.frequencyList[7].frequency.xianggxs = data[1][0].toString()
          this.form.frequencyList[7].frequency.dipd = data[1][1].toString()
          this.form.frequencyList[7].frequency.zhongpd = data[1][2].toString()
          this.form.frequencyList[7].frequency.gaopd = data[1][3].toString()

          this.form.frequencyList[8].frequency.xianggxs = data[2][0].toString()
          this.form.frequencyList[8].frequency.dipd = data[2][1].toString()
          this.form.frequencyList[8].frequency.zhongpd = data[2][2].toString()
          this.form.frequencyList[8].frequency.gaopd = data[2][3].toString()
          this.$forceUpdate()
        })
      },
      getRxyData1(){
        this.generateData1()
      },
      getRxyData2(){
        this.generateData2()
      },
      getRxyData3(){
        this.generateData3()
      },
      changeYear() {
        this.form.shiyrq = ''
      },
      changeLevel() {
        if ('' === this.form.biandz) {
          this.form.dianydj = ''
          this.dianydjFlag = false;
        } else {
          this.form.dianydj = this.form.biandz.substring(0, 5)
          this.dianydjFlag = true;
          this.handleReportName()
        }
      },
      handleXH() {
        this.form.xingh = this.form.bianyqxh
      },
      handleReportName() {
        if ((this.form.biandz !== '') && (this.form.bianyaqxh !== '')) {
          this.form.reportName = this.form.biandz + this.form.bianyaqxh
        } else {
          this.form.reportName = ''
        }
      },
      initChart1() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('chart1'));
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(this.option1);
      },
      initChart2() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('chart2'));
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(this.option2);
      },
      initChart3() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('chart3'));
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(this.option3);
      },
      handleExceed1(files, fileList) {
        this.$message.warning('请重新按住crtl键同时选择3个数据文件上传')
        this.$refs.A1.abort()
        this.$refs.A1.clearFiles()
        this.fileList1 = []
      },
      countFileA1(file, fileList) {
        this.fileList1.push(file)
        this.$refs.A1.submit()
        this.form.frequencyList[0].frequency.raozjfjfs = file.name.split('.')[0]
      },
      countFileB1(file, fileList) {
        this.fileList2.push(file)
        this.$refs.B1.submit()
        this.form.frequencyList[1].frequency.raozjfjfs = file.name.split('.')[0]
      },
      countFileC1(file, fileList) {
        this.fileList3.push(file)
        this.$refs.C1.submit()
        this.form.frequencyList[2].frequency.raozjfjfs = file.name.split('.')[0]
      },
      countFileA2(file, fileList) {
        this.fileList4.push(file)
        this.$refs.A2.submit()
        this.form.frequencyList[3].frequency.raozjfjfs = file.name.split('.')[0]
      },
      countFileB2(file, fileList) {
        this.fileList5.push(file)
        this.$refs.B2.submit()
        this.form.frequencyList[4].frequency.raozjfjfs = file.name.split('.')[0]
      },
      countFileC2(file, fileList) {
        this.fileList6.push(file)
        this.$refs.C2.submit()
        this.form.frequencyList[5].frequency.raozjfjfs = file.name.split('.')[0]
      },
      countFileA3(file, fileList) {
        this.fileList7.push(file)
        this.$refs.A3.submit()
        this.form.frequencyList[6].frequency.raozjfjfs = file.name.split('.')[0]
      },
      countFileB3(file, fileList) {
        this.fileList8.push(file)
        this.$refs.B3.submit()
        this.form.frequencyList[7].frequency.raozjfjfs = file.name.split('.')[0]
      },
      countFileC3(file, fileList) {
        this.fileList9.push(file)
        this.$refs.C3.submit()
        this.form.frequencyList[8].frequency.raozjfjfs = file.name.split('.')[0]
      },
      changeShiyrq() {
        if (null !== this.form.shiyrq && (this.form.year !== this.form.shiyrq.substring(0, 4))) {
          this.$message('试验日期与所选报告年份不符')
          this.form.shiyrq = ''
        }
      },
      handleUploadData1(i, name, response){
        this.option1.series[i] = {
          name: name,
          type: 'line',
          stack: '响应(dB)'
        }
        this.option1.legend.data[i] = name
        this.option1.series[i].data = response.data.ylist
        this.form.frequencyList[i].xlist = this.option1.xAxis.data
        this.form.frequencyList[i].ylist = this.option1.series[i].data
      },
      handleUploadData2(i, name, response){
        this.option2.series[i] = {
          name: name,
          type: 'line',
          stack: '响应(dB)'
        }
        this.option2.legend.data[i] = name
        this.option2.series[i].data = response.data.ylist
        this.form.frequencyList[i + 3].xlist = this.option2.xAxis.data
        this.form.frequencyList[i + 3].ylist = this.option2.series[i].data
      },
      handleUploadData3(i, name, response){
        this.option3.series[i] = {
          name: name,
          type: 'line',
          stack: '响应(dB)'
        }
        this.option3.legend.data[i] = name
        this.option3.series[i].data = response.data.ylist
        this.form.frequencyList[i + 6].xlist = this.option3.xAxis.data
        this.form.frequencyList[i + 6].ylist = this.option3.series[i].data
      },
      uploadFileHOHA1(response) {
        this.count1++
        this.option1.xAxis.data = response.data.xlist
        let name = this.form.frequencyList[0].frequency.raozjfjfs;
        this.handleUploadData1(0, name, response)
        this.dataList1[0] = response.data.uuid
        this.initChart1()
      },
      uploadFileHOHB1(response) {
        this.count1++
        this.option1.xAxis.data = response.data.xlist
        let name = this.form.frequencyList[1].frequency.raozjfjfs;
        this.handleUploadData1(1, name, response)
        this.dataList1[1] = response.data.uuid
        this.initChart1()
      },
      uploadFileHOHC1(response) {
        this.count1++
        this.option1.xAxis.data = response.data.xlist
        let name = this.form.frequencyList[2].frequency.raozjfjfs;
        this.handleUploadData1(2, name, response)
        this.dataList1[2] = response.data.uuid
        this.initChart1()
      },
      uploadFileHOHA2(response) {
        this.count2++
        this.option2.xAxis.data = response.data.xlist
        let name = this.form.frequencyList[3].frequency.raozjfjfs;
        this.handleUploadData2(0, name, response)
        this.dataList2[0] = response.data.uuid
        this.initChart2()
      },
      uploadFileHOHB2(response) {
        this.count2++
        this.option2.xAxis.data = response.data.xlist
        let name = this.form.frequencyList[4].frequency.raozjfjfs;
        this.handleUploadData2(1, name, response)
        this.dataList2[1] = response.data.uuid
        this.initChart2()
      },
      uploadFileHOHC2(response) {
        this.count2++
        this.option2.xAxis.data = response.data.xlist
        let name = this.form.frequencyList[5].frequency.raozjfjfs;
        this.handleUploadData2(2, name, response)
        this.dataList2[2] = response.data.uuid
        this.initChart2()
      },
      uploadFileHOHA3(response) {
        this.count3++
        this.option3.xAxis.data = response.data.xlist
        let name = this.form.frequencyList[6].frequency.raozjfjfs;
        this.handleUploadData3(0, name, response)
        this.dataList3[0] = response.data.uuid
        this.initChart3()
      },
      uploadFileHOHB3(response) {
        this.count3++
        this.option3.xAxis.data = response.data.xlist
        let name = this.form.frequencyList[7].frequency.raozjfjfs;
        this.handleUploadData3(1, name, response)
        this.dataList3[1] = response.data.uuid
        this.initChart3()
      },
      uploadFileHOHC3(response) {
        this.count3++
        this.option3.xAxis.data = response.data.xlist
        let name = this.form.frequencyList[8].frequency.raozjfjfs;
        this.handleUploadData3(2, name, response)
        this.dataList3[2] = response.data.uuid
        this.initChart3()
      },
      handleChange(file, fileList) {
        // this.fileList = []
      },
      handleCommand(param) {
        console.log(param)
      },
      canves() {
        //滚动到页面顶部
        window.pageYoffset = 0;
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        let that = this
        let opts = {
          logging: true, // 启用日志记录以进行调试 (发现加上对去白边有帮助)
          allowTaint: true, // 否允许跨源图像污染画布
          // backgroundColor: null, // 解决生成的图片有白边
          useCORS: true // 如果截图的内容里有图片,解决文件跨域问题
        }
        // eslint-disable-next-line no-undef
        html2canvas(that.$refs.imageWrapper, opts).then((canvas) => {
          let url = canvas.toDataURL('image/png')
          that.dataURL = url
        })

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
      handleForm(form) {
        let formCopy = JSON.parse(JSON.stringify(form))
        if (formCopy.impedanceList.length < 9) {
          let length = formCopy.impedanceList.length;
          for (let i = 0; i < (9 - length); i++) {
            formCopy.impedanceList[i + length] = {}
          }
        }
        if (formCopy.shortCircuitList.length < 5) {
          let length = formCopy.shortCircuitList.length;
          for (let i = 0; i < (5 - length); i++) {
            formCopy.shortCircuitList[i + length] = {}
          }
        }
        if (formCopy.frequencyList.length < 9) {
          let length = formCopy.frequencyList.length;
          for (let i = 0; i < (9 - length); i++) {
            formCopy.frequencyList[i + length] = {frequency: {}}
          }
        }
        if (formCopy.capacitanceList.length < 5) {
          let length = formCopy.capacitanceList.length;
          for (let i = 0; i < (5 - length); i++) {
            formCopy.capacitanceList[i + length] = {}
          }
        }
        return formCopy
      },
      //获取草稿
      getDraft() {
        getDraft(JSON.parse(getUser()).id).then(response => {
          if ('' !== response.data) {
            this.form = response.data
          }
        })
      },
      saveDraft() {
        this.listLoading = true
        saveDraft(this.form, JSON.parse(getUser()).id).then(response => {
          if (200 !== response.code) {
            this.$message('保存草稿失败，请重试')
          } else {
            this.$message('保存草稿成功')
          }
          this.listLoading = false
        })
      },
      resetParam() {
        this.form = JSON.parse(JSON.stringify(this.formBase))
        this.showForm = false
      },
      beforeUploadReport() {
        if (this.form.city === ''
          || this.form.bianh === ''
          || this.form.biandz === ''
          || this.form.dianydj === ''
          || this.form.dianydj === ''
          || this.form.bianyqxh === ''
        ) {
          this.$message('上传前请选择必选参数')
          return false
        }
        this.form.reportType = '2'
        return true
      },
      uploadReport() {

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
        this.form.reportType = '1'
        this.form.userId = this.form, JSON.parse(getUser()).id
        this.$store.dispatch('form/submitReport', this.form).then((data) => {
          this.$message('提交成功')
          this.resetParam();
          //滚动到页面顶部
          window.pageYoffset = 0;
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          window.location.reload()

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

  .el-icon-date {
    display: none;
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

