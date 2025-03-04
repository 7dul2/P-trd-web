(function() {
    function account_chart_load(){
        var color = config.up_color;
        var option = {
            grid: {
              top: '5%',
              bottom: '5%',
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              show: false,
            },
            yAxis: {
              type: 'value',
              show: false,
              scale:true,
            },
            series: [
                {
                    type: 'line',
                    smooth: 0.4,
                    symbol: 'none',
                    lineStyle: {
                        color: color,
                        width: 1,
                    },
                    connectNulls: true,
                    data: [1,2,3,5,7,9,12,17,19,23,12,31,33,25,21,15,12,10,9,8,7,6,5,4,7,19,21],
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x : 0,
                            x2 : 0,
                            y : 0,
                            y2 : 1,
                            colorStops: [{
                                offset: 0, color: color
                            }, {
                                offset: 1, color: config.background_color
                            }],
                        },
                    },
                },
            ],
        }
        var myChart = echarts.init(document.getElementById('account_chart'));
        myChart.setOption(option);
    }
    account_chart_load();

    // 委托进度条
    var orders = document.getElementById("orders").querySelectorAll(".order");
    for (let i = 0; i < orders.length; i++) {
        let infos = orders[i].querySelectorAll(".order_info");
        
        let order_num = infos[1].querySelector("p").innerHTML;
        let handled_num = infos[2].querySelector("p").innerHTML;

        orders[i].querySelector(".order_bar").children[0].style.width = (handled_num/order_num*100)*0.95 + "%";
        orders[i].querySelector(".order_bar").children[1].innerText = Math.round(handled_num/order_num*100,2) + "%";
    }

    function indexs_load(heading,list){
        function create_indicators() {
            Array.from(document.getElementById("orders").children).forEach((_, index) => {
                const dot = document.createElement('div');
                if (index === 0) {
                    dot.classList.add('index');
                }
                heading.children[1].appendChild(dot);
            });
        }
        create_indicators();
        function update_indicator(active_index) {
            const dots = heading.children[1].querySelectorAll('div');
            dots.forEach((dot, index) => {
                if (index === active_index) {
                    dot.classList.add('index');
                } else {
                    dot.classList.remove('index');
                }
            });
        }
        let scroll_timeout;
        list.addEventListener('scroll', () => {
            if (scroll_timeout) {
                clearTimeout(scroll_timeout);
            }
            scroll_timeout = setTimeout(() => {
                let container_width = list.clientWidth;
                let scroll_left = list.scrollLeft;
                let active_card_index = Math.round(scroll_left / container_width);
                update_indicator(active_card_index);
            }, 10);
        });
    }
    // 委托index
    var orders_heading = document.querySelector(".orders_heading");
    let orders_list = document.getElementById("orders");
    indexs_load(orders_heading,orders_list);
    // 持仓index
    var positions_heading = document.querySelector(".positions_heading");
    let positions_list = document.getElementById("positions");
    indexs_load(positions_heading,positions_list);

})();

