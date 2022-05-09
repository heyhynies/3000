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

        // Initialize the echarts instance based on the prepared dom
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

                //Start angle, support range [0, 360]
                startAngle: 0,

                // The radius of the pie chart, the first item of the array is the inner radius and the second item is the outer radius
                radius : [30, 70],
                 center : ['35%', '60%'],


                // Whether to display as a Nightingale chart, distinguishing data size by radius. Two modes can be selected.

                // 'radius' The area shows the percentage of the data, the radius shows the size of the data.

                // 'area' All sectors have the same area, only the data size is shown by radius

                roseType: 'area',

                // Whether or not to enable the policy of preventing overlapping labels, the default is on, in the case of the circle diagram you need to force all labels to be centred, set this value to false.

                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: true,
                      //  formatter: '{c}'
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


                // The graphs are displayed using the configuration items and data just specified.
                myChart.setOption(option);

         },
    });

        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
function echarts_3() {

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
                    axisPointer: {            // Coordinate axis indicator, axis trigger active
                type: 'shadow'        // Default is straight, optional is: 'line' | 'shadow'
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
            axisLine: {lineStyle: {color: 'rgba(255,255,255,1)'}},//Left line colour
        },
        yAxis: {
            type: 'category',
            axisLine: {lineStyle: {color: 'rgba(255,255,255,1)'}},//right line colour
            splitLine: {show:true,lineStyle: {color:"rgba(255,255,255,.1)"}},//x-axis line
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
        // The graphs are displayed using the configuration items and data just specified.
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
function echarts_6() {
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
                direction: 'up',/*Rolling on*/
                runshort: false,/*No scrolling when there is not enough content*/
                scrollamount: 20/*Speed*/
            });
        },
         error:function (msg) {
             console.log(msg);
             alert('A system error has occurred!');
         }
    })
}
function round(elm,data1,data2,clolr,str1,str2,str3) {
        // Initialize the echarts instance based on the prepared dom
        var myChart = echarts.init(document.getElementById(elm));
	    var v2=data2
		var v1=data1
		var v3=v1+v2
        option = {
            tooltip: {
                trigger: 'item',
            },
            series: [{

                type: 'pie',
                radius: ['60%', '70%'],
                color:clolr,
                label: {
                    normal: {
                    position: 'center'
                    }
                },
            data: [{
                value: v2,
                name: str1,
                label: {
                    normal: {
                        formatter: v2 +'',
                        textStyle: {
                            fontSize: 20,
                            color:'#fff',
                        }
                    }
                }
            }, {
                value: v1,
                name: str2,
                label: {
                    normal: {
                        formatter : function (params){
                            return str3
                        },
                        textStyle: {
                            color: '#aaa',
                            fontSize: 12
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgba(255,255,255,.2)'
                    },
                    emphasis: {
                        color: '#fff'
                    }
                },
            }]
            }]
        };
        myChart.setOption(option);
        window.addEventListener("resize",function(){
        myChart.resize();
        });
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
            $("#memberkdatop").append(homename[3]+"<br>Highest number of cases available");

            round('zb1',data1[0],data1[0],'#37A2DA');
            round('zb2',data1[1],data1[1],'#32C5E9');
            round('zb3',data1[2],data1[2],'#67E0E3');
               round('zb4',data1[3],data1[3],'#9FE6B8');

        },
        // error:function (msg) {
        //     console.log(msg);
        //     alert('A system error has occurred!');
        // }
    });


}
})



		
