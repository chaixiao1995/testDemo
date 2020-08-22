var boardCash = {
    myChart: '',
    data: {
        objData: [{
                cashSurplus: -45.78,
                compactPay: 45.78,
                happenTime: "2019-10"
            },
            {
                cashSurplus: 45.78,
                compactPay: 45.78,
                happenTime: "2019-11"
            }
        ]
    },
    // 实例化Echarts
    cashEcharts(xData, compactPay, cashSurplus, hasData) {
        boardCash.myChart = echarts.init($('#cash_charts')[0]);
        let minHeight = 16;
        // 指定图表的配置项和数据
        let option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                    shadowStyle: {
                        color: 'rgba(0,0,0,0.25)'
                    },
                },
                textStyle: {
                    fontSize: 12,
                },
                borderWidth: 1,
                backgroundColor: 'rgba(0,0,0,0.3)',
                borderColor: '#1d9fff',
                borderRadius: 0,
                formatter: function (params) {
                    var relVal = params[0].name
                    $.each(params, (i, v) => {
                        if (v.seriesName != '单月现金盈余（负）') {
                            relVal += `<br/>${v.marker}${v.seriesName}:${v.value != ''?v.value:0}万元`
                        }
                    })
                    return relVal
                },
            },
            title: {
                textStyle: {
                    color: 'rgba(255,255,255,.8)',
                    fontSize: 12
                }
            },
            color: ['red', 'green', 'yellow'],
            // color: ['#F69666', '#B9EB54', '#8BF8C7', '#4d5aaf', '#89BEFD', '#8BF8C7'],
            legend: {
                selectedMode: false,
                show: !hasData,
                data: [
                    {
                        name: '单月成本支付',
                        icon: 'roundRect',
                    }, {
                        name: '单月现金盈余',
                        icon: 'image://image/greenBlue.png',
                    }, {
                        name: '单月现金盈余（负）',
                        icon: 'image://image/watermelonRed.png',
                    },{
                        name: '指标三'
                    }
                ],
                textStyle: {
                    color: 'rgba(255,255,255,.8)',
                },
                itemWidth: 14, // 设置宽度
            },
            xAxis: {
                data: xData,
                axisLine: {
                    lineStyle: {
                        color: ['rgba(255,255,255,0.6)']
                    }
                },
                axisPointer: {
                    type: 'shadow'
                }
            },
            yAxis: [{
                type: 'value',
                name: '万元',
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,0.6)'
                    }
                },
                splitLine: {
                    show: false //是否显示分隔线。
                },
                axisLabel: {
                    formatter: function (value) {
                        return value.toFixed(0)
                    }
                }
            }, ],
            series: [{
                    name: '单月成本支付',
                    type: 'bar',

                    barMinHeight: minHeight,
                    data: compactPay
                },
                {
                    name: '单月现金盈余',
                    type: 'bar',

                    barMinHeight: minHeight,
                    data: cashSurplus,
                    //配置样式
                    itemStyle: {
                        //通常情况下：
                        normal: {
                            //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                            color: function (params) {
                                if (params.value >= 0) {
                                    return '#89FDE9'
                                } else {
                                    return '#FF7A7A'
                                }
                            }
                        }
                    },
                },
                {
                    name: '指标三',
                    type: 'bar',
                    data: [10,15]
                },
                {
                    name: '单月现金盈余（负）',
                    type: 'bar',
                    barMinHeight: minHeight,
                    data: []
                }
            ],
            grid: {
                left: '2%',
                right: '4%',
                bottom: 30,
                containLabel: true
            },
        };
        // 使用刚指定的配置项和数据显示图表。
        boardCash.myChart.setOption(option);
    },

    getListData() {
        let [xData, compactPay, cashSurplus] = [
            [],
            [],
            []
        ]

        $.each(this.data.objData, (i, val) => {
            xData[i] = val.happenTime
            compactPay[i] = val.compactPay
            cashSurplus[i] = val.cashSurplus
        })

        boardCash.cashEcharts(xData, compactPay, cashSurplus)
    }
}

boardCash.getListData();

window.onresize = function(){
    // 监听窗口大小变化
    if(boardCash.barChart) boardCash.barChart.resize();
}
