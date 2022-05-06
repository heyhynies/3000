 $(window).load(function(){  
             $(".loading").fadeOut()
            })  
$(function () {
    heropick60();
    echarts_1();
	echarts_2();
	echarts_3();
	echarts_4();
	echarts_5();
	echarts_6()
	homedata();
	wingstop5();

function echarts_1() {
        // 基于准备好的dom，初始化echarts实例
        // (Initialize the echarts instance based on the prepared dom)
        var myChart = echarts.init(document.getElementById('echart1'));
         $.ajax({
            url:'/data/get_fore',
            data: {},
            type: 'GET',
            async: false,
            dataType:'json',
            success: function (data_list) {
                console.log(data_list);
                var  option = {
                    tooltip : {
                        trigger: 'item',
                        formatter: "{b} : {c} ({d}%)"
                    },
                    legend: {
                        right:0,
                        top:30,
                        height:160,
                        itemWidth:10,
                        itemHeight:10,
                        itemGap:10,
                        textStyle:{
                            color: 'rgba(255,255,255,.6)',
                            fontSize:12
                        },
                        orient:'vertical',
                        data:data_list.name
                    },
                   calculable : true,
                    series : [
                        {
                            name:' ',
							color: ['#62c98d', '#2f89cf', '#4cb9cf', '#53b666', '#62c98d', '#205acf', '#c9c862', '#c98b62', '#c962b9', '#7562c9','#c96262','#c25775','#00b7be'],	
                            type:'pie',
                            radius : [30, 70],
                            center : ['35%', '50%'],
                            roseType : 'radius',
                            label: {
                                normal: {
                                    show: true
                                },
                                emphasis: {
                                    show: true
                                }
                            },

                            lableLine: {
                                normal: {
                                    show: true
                                },
                                emphasis: {
                                    show: true
                                }
                            },

                            data:data_list.data
                        },
                    ]
                };
                myChart.setOption(
                option
            )
        },
    });

        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }

function echarts_2() {
        // 基于准备好的dom，初始化echarts实例
        // (Initialize the echarts instance based on the prepared dom)
        var myChart = echarts.init(document.getElementById('echart2'));
         $.ajax({
            url:'/data/get_fire',
            data: {},
            type: 'GET',
            async: false,
            dataType:'json',
            success: function (data_list) {
                console.log(data_list);
              var  option = {
                    tooltip: {
                        trigger: 'item',
                       formatter: "{b} : {c} ({d}%)"
                    },
                    legend: {

				top:'15%',
                data:data_list.name,
                icon: 'circle',
                textStyle: {
                    color: 'rgba(255,255,255,.6)',
                }
            },
            calculable: true,
            series: [{
                name: '',
				color: ['#c9c862', '#c98b62', '#c962b9','#c96262'],
                type: 'pie',
                //起始角度，支持范围[0, 360]
                //(Start angle, support range [0, 360])
                startAngle: 0,
                //饼图的半径，数组的第一项是内半径，第二项是外半径
                // (The radius of the pie chart, the first item of the array is the inner radius and the second item is the outer radius)
                radius : [30, 70],
                 center : ['35%', '60%'],

                //是否展示成南丁格尔图，通过半径区分数据大小。可选择两种模式：
                // (Whether to display as a Nightingale chart, distinguishing data size by radius. Two modes can be selected.)
                // 'radius' 面积展现数据的百分比，半径展现数据的大小。
                // ('radius' The area shows the percentage of the data, the radius shows the size of the data.)
                // 'area' 所有扇区面积相同，仅通过半径展现数据大小
                // ('area' All sectors have the same area, only the data size is shown by radius)
                roseType: 'area',
                //是否启用防止标签重叠策略，默认开启，圆环图这个例子中需要强制所有标签放在中心位置，可以将该值设为 false。
                //Whether or not to enable the policy of preventing overlapping labels, the default is on, in the case of the circle diagram you need to force all labels to be centred, set this value to false.
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: true,
                      //  formatter: '{c}辆'
                    },
                    emphasis: {
                        show: true
                    }
                },
                labelLine: {
                    normal: {
                        show: true,
                        length2: 1,
                    },
                    emphasis: {
                        show: true
                    }
                },

                data: data_list.data
            }]
        };

                // 使用刚指定的配置项和数据显示图表。
                // The graphs are displayed using the configuration items and data just specified.
                myChart.setOption(option);

         },
    });

        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
function echarts_3() {
        // 基于准备好的dom，初始化echarts实例
        // Initialize the echarts instance based on the prepared dom
        var myChart = echarts.init(document.getElementById('echart3'));
        var lpl = {};
        $.ajax({
            url:'/data/get_nine',
            data: {},
            type: 'GET',
            async: false,
            dataType:'json',
            success:function (data) {

                var option = {
                          xAxis: {
                            type: 'category',
                            data: data.name,
                            axisLine: {lineStyle: {color: 'rgba(255,255,255,1)'}},//左线色
                          },
                          yAxis: {
                            type: 'value',
                               axisLine: {lineStyle: {color: 'rgba(255,255,255,1)'}},//左线色
                            splitLine: {show:true,lineStyle: {color:"rgba(255,255,255,.1)"}},//x轴线
                          },
                          series: [
                            {
                              data: data.Serious_Critical,
                              type: 'line',
                              smooth: true
                            }
                          ]
                        }
                         myChart.setOption(option);
            },
        //     error:function (msg) {
        //     console.log(msg);
        //     alert('A system error has occurred!');
        // }

        });
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }

function echarts_4() {
    // 基于准备好的dom，初始化echarts实例
    // Initialize the echarts instance based on the prepared dom
    var myChart = echarts.init(document.getElementById('echart4'));
    var lpl = {};
    $.ajax({
        url:'/data/get_one',
        data: {},
        type: 'GET',
        async: false,
        dataType:'json',
        success: function (data_list) {

            var ec_right2_option = {
                title: {
                    text:"Covid-19 Visualisation platform",
                    left: 'center',
                    top: 'top'
                },

                visualMap: {
                    show:true,
                    min: 0,
                    max: 99999999,
                    left:'left',
                    top:'bottom',
                    textStyle:{fontsize:5},
                    inRange: {
                                color: ['#e0ffff', '#9D3030']
                            },
                    splitList:[{start:100000,end:999999},
                                {start:100000,end:999999},
                                {start:1000000,end:9999999},
                                {start:10000000,end:99999999},
                                {start:100000000}]

                },
                 tooltip: {
                        trigger: 'item',
                        formatter: '{b}<br/>{c}'
                      },
                series: [
                    {
                        name: 'infections',
                        type: 'map',
                        mapType: 'world',
                        roam: true,
                        itemStyle:{
                            emphasis:{label:{show:true}}
                        },
                        data:data_list.data
                    }
                ]
            };

            myChart.setOption(
                ec_right2_option
            )
        },
    });
    window.addEventListener("resize",function(){
        myChart.resize();
    });
}
function echarts_5() {
    // 基于准备好的dom，初始化echarts实例
    // Initialize the echarts instance based on the prepared dom
    var myChart = echarts.init(document.getElementById('echart5'));
    var lpl = {};
    $.ajax({
        url:'/data/get_eight',
        data: {},
        type: 'GET',
        async: false,
        dataType:'json',
        success:function (data) {
            lpl.name = data.name;
            lpl.outcount = data.New_cases;

            myChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效 (Coordinate axis indicator, axis trigger active)
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow' (Default is straight, optional is: 'line' | 'shadow')
            }
        },

        grid: {
            left: '0%',
            right: '4%',
            bottom: '1%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            axisLine: {lineStyle: {color: 'rgba(255,255,255,1)'}},//左线色 (Left line colour)
        },
        yAxis: {
            type: 'category',
            axisLine: {lineStyle: {color: 'rgba(255,255,255,1)'}},//左线色 (right line colour)
            splitLine: {show:true,lineStyle: {color:"rgba(255,255,255,.1)"}},//x轴线 (x-axis line)
            data: lpl.name
        },
        series: [
            {
                name: '',
                type: 'bar',
                stack: '总量',
                itemStyle: {
                    color: '#37A2DA'
                },
                label: {
                    show: false,
                    position: 'insideRight'
                },
                data: lpl.outcount
            },


        ]
            })
        },
        // error:function (msg) {
        //     console.log(msg);
        //     alert('A system error has occurred! Personal Data Stacking Chart');
        // }
    });
        // 使用刚指定的配置项和数据显示图表。
        // The graphs are displayed using the configuration items and data just specified.
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
function echarts_6() {
        // 基于准备好的dom，初始化echarts实例
        // Initialize the echarts instance based on the prepared dom
        var myChart = echarts.init(document.getElementById('echart6'));
         $.ajax({
            url:'/data/get_six',
            data: {},
            type: 'GET',
            async: false,
            dataType:'json',
            success: function (data_list) {
                console.log(data_list);
              var  option = {

              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              legend: {},
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01],
                 axisLine: {lineStyle: {color: 'rgba(255,255,255,1)'}},//左线色
              },
              yAxis: {
                type: 'category',
                data: data_list.name,
                  axisLine: {lineStyle: {color: 'rgba(255,255,255,1)'}},//左线色
                splitLine: {show:true,lineStyle: {color:"rgba(255,255,255,.1)"}},//x轴线
              },
              series: [
                {
                  name: '',
                  type: 'bar',
                  data: data_list.Total_Recovered,
                  barWidth: 30,
                },
  ]
};
                // 使用刚指定的配置项和数据显示图表。
                // The graphs are displayed using the configuration items and data just specified.
                myChart.setOption(option);

         },
    });

        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }



function wingstop5() {
    $.ajax({
        url:'/data/get_seven',
        data: {},
        type: 'GET',
        async: false,
        dataType:'json',
        success:function (data) {
            $("#wingstop5").children('tr').each(function (index,dom) {
                if (index != 0){
                    $(dom).children('td').eq(1).text(data.name[index-1]);
                    $(dom).children('td').eq(2).text(data.New_Recovered[index-1]);

                }
            });
            $("#membertop5").children('tr').each(function (index,dom) {
                if (index != 0){
                    $(dom).children('td').eq(1).text(data.membername[index-1]);
                    $(dom).children('td').eq(2).text(data.New_Recovered[index-1]);

                }
            })
        },

        // }
    })


}

function heropick60() {
    $.ajax({
        url:'/data/get_two',
        data: {},
        type: 'POST',
        async: false,
        dataType:'json',
        success:function (data) {
            var name = data.name;
            var outcount = data.New_cases;
            var winrate = data.New_Deaths;
            var picknum = data.New_Recovered;

            $.each(name,function (i,item) {
                $("#heropick").append("<li><p><span>"+ item +"</span><span>"+outcount[i]+"</span><span>"+picknum[i]+"</span><span>"+winrate[i]+"</span></p></li>");
            });
            $('.wrap,.adduser').liMarquee({
                direction: 'up',/*身上滚动 (Rolling on)*/
                runshort: false,/*内容不足时不滚动 (No scrolling when there is not enough content)*/
                scrollamount: 20/*速度 (Speed)*/
            });
        },
         error:function (msg) {
             console.log(msg);
             alert('A system error has occurred!');
         }
    })
}
function homedata() {
    $.ajax({
        url:'/data/get_three',
        data: {},
        type: 'GET',
        async: false,
        dataType:'json',
        success:function (data) {
            var homename = data.name
            var data1 = data.data1

            $("#winratetop").append(homename[0]+"<br>Most deaths");
            $("#killtop").append(homename[1]+"<br>Most recovered");
            $("#ineyetop").append(homename[2]+"<br>Most diagnosed");
            $("#memberkdatop").append(homename[3]+"<br>Most available");

            round('zb1',data1[0],data1[0],'Most deaths');
	        round('zb2',data1[1],data1[1],'Most recovered');
	        round('zb3',data1[2],data1[2],'Most diagnosed');
            round('zb4',data1[3],data1[3],'Most available');

        },
        // error:function (msg) {
        //     console.log(msg);
        //     alert('A system error has occurred!');
        // }
    });


}
})



		
