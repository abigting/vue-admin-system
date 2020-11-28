<template>
  <div class="home-pages">
    <!--顶部card -->
    <div class="top-card-block">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="24" :lg="9" :xl="9">
          <div class="notic-block block">
            <div class="flex-between top-block">
              <div class="after_title_border">消息通知</div>
              <div class="more-link" @click="moreList">查看更多<span class="el-icon-arrow-right"></span></div>
            </div>
            <ul class="notic-list">
              <li class="item flex-between" :class="{'no_border_item':index==2}" v-for="(item,index) in 3" @click="toDetail">
                <div class="over_hidden text">
                  <span class="squire"></span>
                  关于XXXX的关于XXXX的通知关于XXXX的通知关于XXXX的通知关于XXXX的通知通知
                </div>
                <span class="date">2020-09-29</span>
              </li>
            </ul>
          </div>
        </el-col>
        <!-- 自查情况 -->
        <el-col :xs="24" :sm="8" :md="8" :lg="5" :xl="5">
          <div class="zicha-block block">
            <div class="top-block">
              <i class="iconfont iconzicha"></i>
              <span>自查情况</span>
            </div>
            <div class="content-block">
              <div class="type-block flex-align">
                <div class="item">
                  <span class="over_hidden">564</span>
                  <div class="over_hidden">合格</div>
                </div>
                <div class="item">
                  <span class="over_hidden">564</span>
                  <div class="over_hidden">不合格</div>
                </div>
                <div class="item">
                  <span class="dange-color over_hidden">564</span>
                  <div class="over_hidden">逾期</div>
                </div>
              </div>
              <div class="detail-btn">查看详情</div>
            </div>
          </div>
        </el-col>
        <!-- 培训情况 -->
        <el-col :xs="24" :sm="8" :md="8" :lg="5" :xl="5">
          <div class="peixun-block block">
            <div class="top-block">
              <i class="iconfont iconpeixun"></i>
              <span>培训情况</span>
            </div>
            <div class="content-block">
              <div class="type-block flex-align">
                <div class="item">
                  <span class="over_hidden">564</span>
                  <div class="over_hidden">已培训</div>
                </div>
                <div class="item">
                  <span class="over_hidden">564</span>
                  <div class="over_hidden">未培训</div>
                </div>
                <div class="item"></div>
              </div>
              <div class="detail-btn">查看详情</div>
            </div>
          </div>
        </el-col>
        <!-- 考试情况 -->
        <el-col :xs="24" :sm="8" :md="8" :lg="5" :xl="5">
          <div class="test-block block">
            <div class="top-block">
              <i class="iconfont iconexamination_icon"></i>
              <span>考试情况</span>
            </div>
            <div class="content-block">
              <div class="type-block flex-align">
                <div class="item">
                  <span class="over_hidden">564</span>
                  <div class="over_hidden">合格</div>
                </div>
                <div class="item">
                  <span class="dange-color over_hidden">564</span>
                  <div class="over_hidden">不合格</div>
                </div>
                <div class="item">
                  <span class="over_hidden">564</span>
                  <div class="over_hidden">未参加考试</div>
                </div>
              </div>
              <div class="detail-btn">查看详情</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 进行中自查 -->
    <div class="handing-block">
      <div class="after_title_border">进行中的自查</div>
      <div class="list-wrap">
        <div class="item over_hidden flex-between" v-for="item in 6">
          <div class="over_hidden title">【公共场所-沐浴场所】</div>
          <div class="over_hidden subtitle">9月22日临时自查</div>
          <div class="flex-align over_hidden">
            <span class="tag">进行中</span>
            <span>（2020/09/01 - 2020/09/22）</span>
          </div>
          <div class="over_hidden">已完成 <span class="blue-color">23</span> 家</div>
          <div class="over_hidden">剩余 <span class="blue-color">45</span> 家未完成</div>
          <div class="over_hidden">不合格 <span class="red-color">4</span> 家</div>
          <div class="over_hidden detail-link">查看 <span class="el-icon-arrow-right"></span></div>
        </div>
      </div>
    </div>
    <!-- 企业自查 -->
    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
      <div class="chart-block">
        <div class="after_title_border">企业自查</div>
        <div id="qiye" style="height: 600px;"></div>
      </div>
    </el-col>
    <!-- 人员考试 -->
    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
      <div class="chart-block">
        <div class="after_title_border">人员考试</div>
        <div id="renyuan" style="height: 620px;"></div>
      </div>
    </el-col>
  </div>
</template>

<script>
  import echarts from "echarts";
  export default {
    name: "home",
    data() {
      return {

      }
    },
    components: {},
    mounted() {
      this.qiyeChart();
      this.renyuanChart();
    },
    methods: {
      //消息通知-更多
      moreList() {
        this.$router.push('/index/list')
      },
      toDetail() {
        this.$router.push('/index/detail')
      },
      //企业自查
      qiyeChart(data) {
        var labelOption = {
          show: true,
          position: 'insideBottom',
          distance: 15,
          align: 'left',
          verticalAlign: 'middle',
          rotate: 90,
          formatter: '{c}  {name|{a}}',
          fontSize: 16,
          rich: {
            name: {
              textBorderColor: '#fff'
            }
          }
        };
        var myChart = echarts.init(document.getElementById("qiye"));
        const option = {
          title: {
            text: ''
          },
          color: ['#5DC7BD', '#47A2D5'], //跟legend series 一一对应
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data: ['从业人员', '合格人数']
          },
          toolbox: {
            feature: {
              // saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日', '周二', '周三', '周四', '周五', '周六', '周日']
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
              name: '从业人员',
              type: 'line',
              stack: '总量',
              smooth: false, //true为曲线 false 直线
              areaStyle: {
                normal: {
                  color: {
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0,
                      color: "#4F7CD7" // 0% 处的颜色
                    }, {
                      offset: 0.7,
                      color: "#94E6D8" // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                  }
                }
              },
              data: [120, 132, 101, 134, 90, 230, 210, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '合格人数',
              type: 'line',
              stack: '总量',
              smooth: false, //true为曲线 false 直线
               areaStyle: {
                 normal: {
                   color: {
                     x: 0,
                     y: 0,
                     x2: 0,
                     y2: 1,
                     colorStops: [{
                       offset: 0,
                       color: "#4FA8EE" // 0% 处的颜色
                     }, {
                       offset: 0.7,
                       color: "#9BE4EB" // 100% 处的颜色
                     }],
                     globalCoord: false // 缺省为 false
                   }
                 }
               },
              data: [220, 182, 191, 234, 290, 330, 310, 182, 191, 234, 290, 330, 310]
            },
          ]
        };
        myChart.setOption(option);
        window.onresize = myChart.resize;
      },
      //人员考试
      renyuanChart(data) {
        var labelOption = {
          show: true,
          position: 'insideBottom',
          distance: 15,
          align: 'left',
          verticalAlign: 'middle',
          rotate: 90,
          formatter: '{c}  {name|{a}}',
          fontSize: 16,
          rich: {
            name: {
              textBorderColor: '#fff'
            }
          }
        };
        var myChart = echarts.init(document.getElementById("renyuan"));
        var option = {
          color: ['#7A9AF7', '#7EC349'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['Forest', 'Steppe']
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
              // mark: {
              //   show: true
              // },
              // dataView: {
              //   show: true,
              //   readOnly: false
              // },
              // magicType: {
              //   show: true,
              //   type: ['line', 'bar', 'stack', 'tiled']
              // },
              // restore: {
              //   show: true
              // },
              // saveAsImage: {
              //   show: true
              // }
            }
          },
          xAxis: [{
            type: 'category',
            axisTick: {
              show: false
            },
            data: ['宁波市', '宁波市', '宁波市', '宁波市', '宁波市', '宁波市', '宁波市', '宁波市', '宁波市', ]
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
              name: 'Forest',
              type: 'bar',
              barGap: 0,
              label: labelOption,
              data: [320, 332, 301, 334, 390, 332, 301, 334, 390]
            },
            {
              name: 'Steppe',
              type: 'bar',
              label: labelOption,
              data: [220, 182, 191, 234, 290, 182, 191, 234, 290]
            },
          ]
        }
        myChart.setOption(option);
        window.onresize = myChart.resize;
      },
    }
  }
</script>

<style lang="scss">
  .home-pages {
    height: 100%;

    .top-card-block {
      .card-title {
        display: block;
        padding: 10px 0;
      }

      .zicha-block {
        .detail-btn {
          background: #2C7BE5;
        }

        .type-block {
          background: linear-gradient(180deg, rgba(57, 116, 226, .1) 0%, rgba(87, 178, 244, 0) 100%);
        }
      }

      .peixun-block {
        .detail-btn {
          background: #F1A50F;
        }

        .type-block {
          background: linear-gradient(180deg, rgba(241, 169, 38, .1) 0%, rgba(87, 178, 244, 0) 100%);
        }
      }

      .test-block {
        .detail-btn {
          background: #0AB779;
        }

        .type-block {
          background: linear-gradient(180deg, rgba(0, 184, 125, .1) 0%, rgba(87, 178, 244, 0) 100%);
        }
      }

      .top-block {
        height: 40px;
        line-height: 40px;

        .iconzicha {
          color: #255DCB;
        }

        .iconpeixun {
          color: #F1A50F;
        }

        .iconexamination_icon {
          color: #0AB779;
        }

        span {
          font-weight: 600;
          color: #1F2022;
        }
      }

      .content-block {
        .type-block {
          border-radius: 2px;
          padding: 9px 0;
          margin-bottom: 12px;

          .item {
            width: 33.3%;
            text-align: center;

            span {
              font-size: 20px;
              font-weight: 500;
              color: #1F2022;
              line-height: 28px;
            }

            div {
              font-weight: 400;
              color: #61646A;
              line-height: 20px;
            }

            .dange-color {
              color: #ED5C55;
            }
          }
        }

        .detail-btn {
          cursor: pointer;
          margin: auto;
          width: 110px;
          height: 30px;
          border-radius: 2px;
          text-align: center;
          line-height: 30px;
          font-weight: 400;
          color: #FFFFFF;
        }
      }

      .block {
        height: 170px;
        padding: 0 10px;
        background: #fff;
      }

      .notic-block {
        overflow: hidden;

        .more-link {
          cursor: pointer;
          font-size: 14px;
          font-weight: 400;
          color: #6B7280;
        }

        .more-link:hover {
          color: #255DCB;
        }

        .notic-list {
          padding-top: 10px;

          .item {
            cursor: pointer;
            padding: 9px 0;
            border-bottom: 1px solid #E0E5EC;

            .text {
              width: 80%;
              font-weight: 400;
              color: #1F2022;
              position: relative;
              padding-left: 14px;
              box-sizing: border-box;

              .squire {
                display: block;
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                background: #E0E5EC;
                width: 6px;
                height: 6px;
              }
            }

            .date {
              font-weight: 400;
              color: #6B7280;
            }
          }

          .no_border_item {
            border: none;
          }

          .text:hover {
            color: #306BDB;

            .squire {
              background-color: #255DCB;
            }
          }
        }
      }
    }

    .handing-block {
      margin: 20px 0;
      background: #fff;
      padding: 12px;

      .list-wrap {
        padding: 14px 4px;

        .item {
          height: 40px;
          background: #F0F3F9;
          border-radius: 4px;
          margin-bottom: 8px;
          padding: 0 12px 0 16px;
          color: #1F2022;
          cursor: grab;

          .title {
            width: 150px;
            font-weight: 500;
            color: #1951BE;
          }

          .subtitle {
            width: 150px;
          }

          .tag {
            padding: 2px 4px;
            background: #00BB73;
            font-size: 12px;
            font-weight: 400;
            color: #FFFFFF;
            border-radius: 15px;
          }

          .blue-color {
            font-weight: 600;
            color: #306BDB;
          }

          .red-color {
            font-weight: 600;
            color: #ED5C55;
          }

          .detail-link {
            font-weight: 400;
            color: #6B7280;
            cursor: pointer;
          }
        }

        .item:hover {
          background: rgba(57, 116, 226, .3);
        }
      }
    }

    .chart-block {
      margin-top: 20px;
      padding: 20px;
      box-sizing: border-box;
    }
  }
</style>
