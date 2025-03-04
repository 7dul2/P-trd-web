(function() {
    var container = document.getElementById("container");

    var chart = _ie({
        tag : "div",
        className : "chart"
    },document.getElementById("container"));

    // infos dt
    var hash_name = item_names[item_name].market_hash_name;
    var url = "https://sdt-api.ok-skins.com/user/skin/v1/item"
    var post_data = {
        "appId": 730,
        "marketHashName": hash_name
    }
    Request.post(url,JSON.stringify(post_data),"infos_dt", "receive");
    wait4value("infos_dt").then(value=>{
        var resp = JSON.parse(value).data;
        all_resps["dt_id"] = resp.itemId;
    })

    function line(){
        var url = "https://sdt-api.ok-skins.com/user/skin/v1/item"
        var post_data = {
            "appId": 730,
            "marketHashName": hash_name
        }
        Request.post(url,JSON.stringify(post_data),"item_dt", "receive");
        wait4value("item_dt").then(value=>{
            var dt_id = all_resps["dt_id"]
            
            var url = "https://sdt-api.ok-skins.com/user/steam/type-trend/v2/item/details";
            var post_data = {
                "platform": "YOUPIN",
                "typeDay": "5",
                "dateType": 3,
                "itemId": dt_id,
                "timestamp": new Date().getTime()
            }
            Request.post(url,JSON.stringify(post_data),"chart_dt", "receive");
            wait4value("chart_dt").then(value=>{
                var resp = JSON.parse(value).data;
                
                // 处理数据格式
                var timestamps = resp.map(item => item[0]);
                var prices = resp.map(item => item[1]);
                var nums = resp.map(item => item[2]);
                var sold_num = resp.map(item => item[6]);

                // 转换时间戳为日期格式
                timestamps = timestamps.map(item => {
                    const date = new Date(parseInt(item) * 1000);
                    return date.getFullYear() + '-' + 
                            (date.getMonth() + 1).toString().padStart(2, '0') + '-' + 
                            date.getDate().toString().padStart(2, '0');
                });

                var legends = _ie({
                    tag : 'div',
                    className : "chart_legends",
                    children : [
                        {
                            tag : "div",
                            className : "legend",
                            children : [
                                {
                                    tag : "div",
                                    className : "top",
                                    children : [
                                        {
                                            tag : "div",
                                            className : "l1",
                                        },
                                        {
                                            tag : "p",
                                            innerHTML : "价格"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            tag : "div",
                            className : "legend",
                            children : [
                                {
                                    tag : "div",
                                    className : "top",
                                    children : [
                                        {
                                            tag : "div",
                                            className : "l2",
                                        },
                                        {
                                            tag : "p",
                                            innerHTML : "在售量"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            tag : "div",
                            className : "legend",
                            children : [
                                {
                                    tag : "div",
                                    className : "top",
                                    children : [
                                        {
                                            tag : "div",
                                            className : "l3",
                                        },
                                        {
                                            tag : "p",
                                            innerHTML : "成交量"
                                        }
                                    ]
                                }
                            ]
                        },
                    ]
                },chart);
                gsap.from(legends, {
                    duration: 0.5, 
                    y: 50, 
                    opacity: 0,
                    ease: "power3.out",
                    delay: 0
                });
        
                var _chart = _ie({
                    tag : "div",
                    id : "chart"
                },chart);
                gsap.from(_chart, {
                    duration: 0.5, 
                    y: 50, 
                    opacity: 0,
                    ease: "power3.out",
                    delay: 0.3
                });
    
                var option = {
                    tooltip: {
                        backgroundColor: config.background_sub_color,
                        borderColor: config.background_sub_color,
                        extraCssText: 'box-shadow: none;', // 移除投影效果
                        textStyle: {
                            color: config.text_color ,
                            fontSize: 12,
                        },
                        trigger: 'axis',
                        position: function (pos, params, el, elRect, size) {
                            const chartWidth = size.viewSize[0];
                            const posX = pos[0] < chartWidth / 2 ? 'right' : 'left';
                            const leftPos = 40;
                            const rightPos = 120;
                            return [posX === 'right' ? `${size.viewSize[0] - rightPos}` : leftPos, 5];
                        },
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: config.background_sub_color,
                                color: config.text_color ,
                            },
                            fontSize: 12,
                        },
                        formatter: function(params) {
                            return params.map(param => {
                                const seriesName = param.seriesName;
                                const value = param.value;
                                return `${seriesName}: ${value}`;
                            }).join('<br/>');
                        }
                    },
                    legend: {
                        show: false,
                        selected: {
                            '价格': true,
                            "在售量" : true,
                            "成交量" : true
                        },
                    },
                    grid: {
                        top: '5%',
                        bottom: '15%',
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: timestamps,
                        axisLabel: {
                            fontSize: 10,
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#8e8e8e'
                            }
                        },
                        splitLine: {
                            show: false
                        }
                    },
                    yAxis: [
                        {
                            type: 'value',
                            scale: true,
                            position: 'left',
                            axisLabel: {
                                formatter: function(value) {
                                    if (value >= 10000) {
                                        return (value / 10000) + 'w';
                                    } else if (value >= 1000) {
                                        return (value / 1000) + 'k';
                                    } else {
                                        return value;
                                    }
                                },
                                fontSize: 10,
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#8e8e8e'
                                }
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: 'rgba(255, 255, 255, 0.05)',
                                    width: 1,
                                    type: 'solid',
                                }
                            },
                        },
                        {
                            type: 'value',
                            scale: true,
                            position: 'right',
                            axisLabel: {
                                formatter: function(value) {
                                    if (value >= 10000) {
                                        return (value / 10000) + 'w';
                                    } else if (value >= 1000) {
                                        return (value / 1000) + 'k';
                                    } else {
                                        return value;
                                    }
                                },
                                fontSize: 10,
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#8e8e8e'
                                }
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: 'rgba(255, 255, 255, 0.05)',
                                    width: 1,
                                    type: 'solid',
                                }
                            },
                        }
                    ],
                    series: [
                        {
                            name: "价格",
                            type: 'line',
                            smooth: 0.3,
                            symbol: 'none',
                            lineStyle: {
                                color: "#157efb",
                                width: 1,
                            },
                            connectNulls: true,
                            data: prices,
                            animationDuration: 500,
                            animationEasing: 'cubicInOut',
                            yAxisIndex: 0
                        },
                        {
                            name: "在售量",
                            type: 'line',
                            smooth: 0.3,
                            symbol: 'none',
                            lineStyle: {
                                color: "#53d769",
                                width: 1,
                            },
                            connectNulls: true,
                            data: nums,
                            animationDuration: 500,
                            animationEasing: 'cubicInOut',
                            yAxisIndex: 1 
                        },
                        {
                            name: "成交量",
                            type: 'line',
                            smooth: 0.3,
                            symbol: 'none',
                            lineStyle: {
                                color: "#fdcb2e",
                                width: 1,
                            },
                            connectNulls: true,
                            data: sold_num,
                            animationDuration: 500,
                            animationEasing: 'cubicInOut',
                            yAxisIndex: 1 
                        },
                    ],
                    dataZoom: [
                        {
                            type: 'inside',
                            xAxisIndex: [0],
                            start: Math.max(0, ((timestamps.length - 30) / timestamps.length) * 100),
                            end: 100,
                            zoomLock: false
                        },
                        {
                            show: false,
                            type: 'slider',
                            xAxisIndex: [0],
                            start: Math.max(0, ((timestamps.length - 30) / timestamps.length) * 100),
                            end: 100,
                            bottom: 0
                        }
                    ]
                };
                const selectedStatus = {};
                option.series.forEach(series => {
                    selectedStatus[series.name] = true;
                });
                var _chart_ = echarts.init(document.getElementById('chart'));
                _chart_.setOption(option);
                document.querySelectorAll('.legend').forEach((item, index) => {
                    item.addEventListener('click', () => {
                        const seriesName = option.series[index].name;
                        const isActive = item.classList.toggle('active');
                        selectedStatus[seriesName] = !isActive;
                        _chart_.setOption({
                            legend: {
                                selected: selectedStatus
                            }
                        });
                    });
                });
            });
        });
    }

    function k_line(){
        var _chart = _ie({
            tag : "div",
            id : "chart",
            style : {
                height : "15rem"
            }
        },chart);
        gsap.from(_chart, {
            duration: 0.5, 
            y: 50, 
            opacity: 0,
            ease: "power3.out",
            delay: 0.3
        });
        
        var _chart_ = klinecharts.init('chart', {
            layout: [
                {
                    type: 'candle',
                    options: { order: Number.MIN_SAFE_INTEGER, }
                },
                {
                    type: 'xAxis',
                    options: { order: 9 }
                }
            ]
        });

        _chart_.removeIndicator('MA')

        all_resps["chart"] = _chart_;
        
        // 设置图表样式
        _chart_.setStyles({
            grid: {
                show: true,
                horizontal: {
                    color: 'rgba(245,245,247, 0.1)'
                },
                vertical: {
                    color: 'rgba(245,245,247, 0.1)'
                }
            },
            candle: {
                bar: {
                    upColor: config.up_color,
                    downColor: config.down_color,
                    upBorderColor: config.up_color,
                    downBorderColor: config.down_color,
                    upWickColor: config.up_color,
                    downWickColor: config.down_color
                },
                priceMark: {
                    last: {
                        upColor: config.up_color,
                        downColor: config.down_color
                    }
                },
                tooltip: {
                    backgroundColor: config.background_sub_color,
                    showRule: 'follow_cross',
                    showType: 'rect',
                    custom: [
                        { title: '时间', value: '  {time}' },
                        { title: '开盘', value: '{open}' },
                        { title: '最高', value: '{high}' },
                        { title: '最低', value: '{low}' },
                        { title: '收盘', value: '{close}' },
                        { title: '成交额', value: '{volume}' }
                    ],
                    rect: {
                        borderColor: config.background_sub_color,
                        color: config.background_sub_color
                    },
                    text: {
                        color: config.text_color,
                    },
                }
            },
            indicator: {
                bars: [
                    {
                        upColor: config.up_color,
                        downColor: config.down_color
                    }
                ]
            },
            yAxis: {
                inside: true,
                axisLine: {
                    show: false
                }
            },
            crosshair: {
                horizontal: {
                    text: {
                        color: config.text_color,
                        borderColor: config.background_sub_color,
                        backgroundColor: config.background_sub_color
                    }
                },
                vertical: {
                    text: {
                        color: config.text_color,
                        borderColor: config.background_sub_color,
                        backgroundColor: config.background_sub_color
                    }
                }
            },
        });
        

        const ts_now = Math.floor(Date.now() / 1000); // 当前秒级时间戳

        function dt_kline_data_fetch(ts, datas, callback) {
            var url = "https://sdt-api.ok-skins.com/user/steam/category/v1/kline?type=2&maxTime=" 
                      + ts + "&typeVal=" + all_resps["dt_id"] + "&platform=YOUPIN&specialStyle";
            Request.get(url, "kline_datas_dt", "receive");
            
            wait4value("kline_datas_dt").then(function(value) {
                const resp = JSON.parse(all_resps["kline_datas_dt"]).data;
                
                // 删除缓存
                delete all_resps["kline_datas_dt"];
                
                // 如果没有返回数据，则调用回调返回最终数据
                if (!resp || resp.length === 0) {
                    callback(datas);
                    return;
                }
                
                // 累加数据
                datas = datas.concat(resp);
                
                // 往前推3个月（注意这里只是简单相减秒数，如果需要精确计算请用 Date 对象）
                var elder_ts = ts - 24 * 3600 * 30 * 3;
                
                // 继续递归请求，传入累积的 datas 和最终回调
                dt_kline_data_fetch(elder_ts, datas, callback);
            });
        }
        
        // 调用时提供回调函数，在所有数据获取完后打印 kline_datas
        dt_kline_data_fetch(ts_now, [], function(kline_datas) {
            var data = [];
            var records = kline_datas;

            for (var i = 0; i < records.length; i++) {
                var record = records[i];
                var timestamp = record[0]; // Unix 时间戳（秒）
                var open = record[1];
                var close = record[2];
                var high = record[3];
                var low = record[4];
                var volume = record[6];

                // 将秒级时间戳转换为毫秒级
                var date = new Date(timestamp * 1000);

                data.push({
                    timestamp: new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(),
                    open: open,
                    high: high,
                    low: low,
                    close: close,
                    volume: volume,
                });
            }

            data.sort((a, b) => a.timestamp - b.timestamp);

            _chart_.applyNewData(data);
        });
    }

    function chart_switch(type){
        if (chart.children.length > 1){
            while (chart.children.length > 1) {
                chart.removeChild(chart.children[1]);
            }
        }

        if (type === "line"){
            document.getElementById("line").style.fill = "var(--text-color)";
            document.getElementById("k_line").style.fill = "";
            line();
        }

        if (type === "k_line"){
            document.getElementById("k_line").style.fill = "var(--text-color)";
            document.getElementById("line").style.fill = "";
            k_line();
        }
    }

    wait4value("dt_id").then(value => {
        var heading = _ie({
            tag : "div",
            className : "chart_heading",
            children : [
                {
                    tag : "p",
                    innerHTML : "行情"
                },
                {
                    tag : "div",
                    className : "chart_switch",
                    children : [
                        {
                            tag: 'svg',
                            id: 'k_line',
                            attribute : {
                                width: '1.3rem',
                                viewBox: '64 64 896 896',
                            },
                            children: [
                                {
                                    tag: 'path',
                                    attribute : {
                                        d: 'M320 224h-66v-56c0-4.4-3.6-8-8-8h-52c-4.4 0-8 3.6-8 8v56h-66c-4.4 0-8 3.6-8 8v560c0 4.4 3.6 8 8 8h66v56c0 4.4 3.6 8 8 8h52c4.4 0 8-3.6 8-8v-56h66c4.4 0 8-3.6 8-8V232c0-4.4-3.6-8-8-8zm-60 508h-80V292h80v440zm644-436h-66v-96c0-4.4-3.6-8-8-8h-52c-4.4 0-8 3.6-8 8v96h-66c-4.4 0-8 3.6-8 8v416c0 4.4 3.6 8 8 8h66v96c0 4.4 3.6 8 8 8h52c4.4 0 8-3.6 8-8v-96h66c4.4 0 8-3.6 8-8V304c0-4.4-3.6-8-8-8zm-60 364h-80V364h80v296zM612 404h-66V232c0-4.4-3.6-8-8-8h-52c-4.4 0-8 3.6-8 8v172h-66c-4.4 0-8 3.6-8 8v200c0 4.4 3.6 8 8 8h66v172c0 4.4 3.6 8 8 8h52c4.4 0 8-3.6 8-8V620h66c4.4 0 8-3.6 8-8V412c0-4.4-3.6-8-8-8zm-60 145a3 3 0 01-3 3h-74a3 3 0 01-3-3v-74a3 3 0 013-3h74a3 3 0 013 3v74z'
                                    }
                                }
                            ]
                        },
                        {
                            tag : "p",
                            innerHTML : "|"
                        },
                        {
                            tag: 'svg',
                            id: 'line',
                            attribute : {
                                width: '1.3rem',
                                viewBox: '64 64 896 896',
                            },
                            children: [
                                {
                                    tag: 'path',
                                    attribute : {
                                        d: 'M888 792H200V168c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h752c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM305.8 637.7c3.1 3.1 8.1 3.1 11.3 0l138.3-137.6L583 628.5c3.1 3.1 8.2 3.1 11.3 0l275.4-275.3c3.1-3.1 3.1-8.2 0-11.3l-39.6-39.6a8.03 8.03 0 00-11.3 0l-230 229.9L461.4 404a8.03 8.03 0 00-11.3 0L266.3 586.7a8.03 8.03 0 000 11.3l39.5 39.7z'
                                    }
                                }
                            ]
                        },
                    ]
                }
            ]
        },chart);
        gsap.from(heading, {
            duration: 0.5, 
            y: 50, 
            opacity: 0,
            ease: "power3.out",
            delay: 0
        });
        document.getElementById("line").addEventListener('click', () => {
            chart_switch("line");
        });
        document.getElementById("k_line").addEventListener('click', () => {
            chart_switch("k_line");
        });

        chart_switch("k_line"); 


        var form = _ie({
            tag: "div",
            className: "form",
            children: [
                {
                    tag : "div",
                    className : "chart_heading",
                    children : [
                        {
                            tag : "p",
                            innerHTML : "操作"
                        }
                    ]
                },
                {
                    tag: "div",
                    className: "buy_inputs",
                    children: [
                        {
                            tag: "ru_input",
                            attribute: { hint: "价格" }
                        },
                        {
                            tag: "ru_input",
                            attribute: { hint: "数量" }
                        }
                    ]
                },
                {
                    tag: "div",
                    className: "buy_infos",
                    children: [
                        {
                            tag: "div",
                            children: [
                                { tag: "a", innerHTML: "所需" },
                                { tag: "p", innerHTML: "123.12" }
                            ]
                        },
                        {
                            tag: "div",
                            children: [
                                { tag: "a", innerHTML: "余额" },
                                { tag: "p", innerHTML: "123.12" }
                            ]
                        }
                    ]
                },
                {
                    tag: "div",
                    className: "buy_btn",
                    children: [
                        { tag: "p", innerHTML: "买入" }
                    ]
                }
            ]
        }, container);
        
        ru_input_init(form.children[1].children[0]);
        ru_input_init(form.children[1].children[1]);

        document.querySelectorAll('ru_input input').forEach(function(input) {
            input.addEventListener('focus', function(e) {
                // 延时等待移动端键盘弹出
                setTimeout(function() {
                    // 使用 scrollIntoView 滚动到输入框所在位置，确保它在视口中居中显示
                    e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            });
        });
    });
})();