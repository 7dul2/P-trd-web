(function() {
    var tags = _ie({
        tag : "div",
        className : "tags",
    },document.getElementById("container"));

    var relations = _ie({
        tag : "div",
        className : "relations",
    },document.getElementById("container"));

    var info_heading = _ie({
        tag: 'div',
        attribute: {
            class: 'info_heading'
        },
        style : {
            diplay : "none"
        },
        children: [
            {
                tag: 'p',
                children: [
                    {
                        tag: 'text',
                    }
                ]
            },
            {
                tag: 'div',
                attribute: {
                    class: 'info_indexs'
                },
            },
            {
                tag: 'div',
                attribute: {
                    class: 'info_setting'
                },
                children: [
                    {
                        tag: 'svg',
                        attribute: {
                            viewBox: '64 64 896 896',
                            width: '1.3rem'
                        },
                        children: [
                            {
                                tag: 'path',
                                attribute: {
                                    d: 'M924.8 625.7l-65.5-56c3.1-19 4.7-38.4 4.7-57.8s-1.6-38.8-4.7-57.8l65.5-56a32.03 32.03 0 009.3-35.2l-.9-2.6a443.74 443.74 0 00-79.7-137.9l-1.8-2.1a32.12 32.12 0 00-35.1-9.5l-81.3 28.9c-30-24.6-63.5-44-99.7-57.6l-15.7-85a32.05 32.05 0 00-25.8-25.7l-2.7-.5c-52.1-9.4-106.9-9.4-159 0l-2.7.5a32.05 32.05 0 00-25.8 25.7l-15.8 85.4a351.86 351.86 0 00-99 57.4l-81.9-29.1a32 32 0 00-35.1 9.5l-1.8 2.1a446.02 446.02 0 00-79.7 137.9l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.3 56.6c-3.1 18.8-4.6 38-4.6 57.1 0 19.2 1.5 38.4 4.6 57.1L99 625.5a32.03 32.03 0 00-9.3 35.2l.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1a32.12 32.12 0 0035.1 9.5l81.9-29.1c29.8 24.5 63.1 43.9 99 57.4l15.8 85.4a32.05 32.05 0 0025.8 25.7l2.7.5a449.4 449.4 0 00159 0l2.7-.5a32.05 32.05 0 0025.8-25.7l15.7-85a350 350 0 0099.7-57.6l81.3 28.9a32 32 0 0035.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l.9-2.6c4.5-12.3.8-26.3-9.3-35zM788.3 465.9c2.5 15.1 3.8 30.6 3.8 46.1s-1.3 31-3.8 46.1l-6.6 40.1 74.7 63.9a370.03 370.03 0 01-42.6 73.6L721 702.8l-31.4 25.8c-23.9 19.6-50.5 35-79.3 45.8l-38.1 14.3-17.9 97a377.5 377.5 0 01-85 0l-17.9-97.2-37.8-14.5c-28.5-10.8-55-26.2-78.7-45.7l-31.4-25.9-93.4 33.2c-17-22.9-31.2-47.6-42.6-73.6l75.5-64.5-6.5-40c-2.4-14.9-3.7-30.3-3.7-45.5 0-15.3 1.2-30.6 3.7-45.5l6.5-40-75.5-64.5c11.3-26.1 25.6-50.7 42.6-73.6l93.4 33.2 31.4-25.9c23.7-19.5 50.2-34.9 78.7-45.7l37.9-14.3 17.9-97.2c28.1-3.2 56.8-3.2 85 0l17.9 97 38.1 14.3c28.7 10.8 55.4 26.2 79.3 45.8l31.4 25.8 92.8-32.9c17 22.9 31.2 47.6 42.6 73.6L781.8 426l6.5 39.9zM512 326c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 01512 614c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 01400 502c0-29.9 11.7-58 32.8-79.2C454 401.6 482.1 390 512 390c29.9 0 58 11.6 79.2 32.8A111.6 111.6 0 01624 502c0 29.9-11.7 58-32.8 79.2z'
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    },document.getElementById("container"));
    var horizontal_infos_list = _ie({
        tag : "div",
        className : "horizontal_infos_list",
    },document.getElementById("container"));
    
    var chart = _ie({
        tag : "div",
        className : "chart"
    },document.getElementById("container"));

    // 反转物品名称和hash_name
    var reversed_item_names = Object.fromEntries(
        Object.entries(item_names).map(([key, value]) => [
            value.market_hash_name, 
            { "id": value.id, "market_name": key }
        ])
    );

    // infos dt
    var hash_name = item_names[item_name].market_hash_name;
    var url = "https://sdt-api.ok-skins.com/user/skin/v1/item"
    var post_data = {
        "appId": 730,
        "marketHashName": hash_name
    }
    Request.post(url,JSON.stringify(post_data),"infos_dt", "receive");
    wait4value("infos_dt").then(value=>{
        document.getElementById('loading').style.display = "none";
        var resp = JSON.parse(value).data;

        all_resps["dt_id"] = resp.itemId;

        // tags
        if (resp.exteriorName){ // 磨损
            gsap.from(_ie({tag:"div",className:"tag",children:[{tag:"p",innerHTML:resp.exteriorName}]},tags), {
                duration: 0.5, 
                x: 50, 
                opacity: 0,
                ease: "power3.out",
                delay: 0
            });
        }
        if (resp.rarityName){ // 稀有度
            gsap.from(_ie({tag:"div",className:"tag",children:[{tag:"p",innerHTML:resp.rarityName}]},tags), {
                duration: 0.5, 
                x: 50, 
                opacity: 0,
                ease: "power3.out",
                delay: 0
            });
        }
        if (resp.qualityName){ // 品质
            gsap.from(_ie({tag:"div",className:"tag",children:[{tag:"p",innerHTML:resp.qualityName}]},tags), {
                duration: 0.5, 
                x: 50, 
                opacity: 0,
                ease: "power3.out",
                delay: 0
            });
        }

        // relations
        var url = "https://sdt-api.ok-skins.com/user/skin/v1/sale-wear-detail"
        var post_data = {
            "appId": 730,
            "marketHashName": hash_name
        }
        Request.post(url,JSON.stringify(post_data),"relations_dt", "receive");
        wait4value("relations_dt").then(value=>{
            var resp = JSON.parse(value).data;
            relations_handling(resp);
        })

        // datas
        var url = "https://sdt-api.ok-skins.com/user/skin/v1/current-sell?itemId=" + all_resps["dt_id"];
        Request.get(url,"datas_dt", "receive");
        wait4value("datas_dt").then(value=>{
            var resp = JSON.parse(value).data;
            datas_handling(resp);
        })
    })
    function relations_handling(datas){
        var related = datas.relatedList;
        var category = datas.categoryList;

        // 获取 related 里面已有的 itemId 列表
        var related_ids = new Set(related.map(_c => _c.itemId));
        // 过滤 category，移除已存在的 itemId
        category = category.filter(_c => !related_ids.has(_c.itemId));
        // 拼接 category 到 related 后面
        related = related.concat(category);
        
        for (let i = 0;i<related.length;i++){
            var _option = {
                tag : "div",
                className : "relation",
                children : [
                    {
                        tag : "p",
                        innerHTML : related[i].tag,
                    },
                    {
                        tag : "a",
                        innerHTML : related[i].sellPrice,
                    },
                ]
            };
            var _r = _ie(_option,relations);
            gsap.from(_r, {
                duration: 0.5, 
                x: 50, 
                opacity: 0,
                ease: "power3.out",
                delay: 0.3 * i
            });

            _r.addEventListener('click', function() {
                Jump.jump("item",reversed_item_names[related[i].marketHashName].market_name);
            });
        }
    }
    function datas_handling(datas){
        const platforms = {
            "C5GAME": "C5",
            "BUFF": "BUFF",
            "悠悠": "悠悠有品",
            "Steam": "Steam",
            "DMarket": "DMarket",
            "CSMoney": "CSMoney",
            "SkinPort": "SkinPort",
            "WaxPeer": "WaxPeer",
            "HaloSkins": "HaloSkins"
        }
        
        const _generateDataOption = (name, keyName) => {
            const data_ = datas
                .map(_c => ({
                    platformName: platforms[_c.platformName],
                    [keyName]: _c[keyName]  // 动态 key
                }))
                .sort((_a, _b) => _a[keyName] - _b[keyName]); // 按 key 排序
        
            gsap.from(_ie(_generateOption(data_, keyName), horizontal_infos_list), {
                duration: 0.5,
                x: 50,
                opacity: 0,
                ease: "power3.out",
                delay: 0.3
            });
        };
        const _generateOption = (data, key) => ({
            tag: "div",
            className: "infos",
            children: data.map(_c => ({
                tag: "div",
                className: "info",
                children: [
                    {
                        tag: "p",
                        innerHTML: _c[key] === 0 ? "-" : _c[key] // 处理 0 变 "-"
                    },
                    {
                        tag: "a",
                        innerHTML: _c.platformName
                    }
                ]
            }))
        });
        
        _generateDataOption("price", "price");
        _generateDataOption("num", "sellCount");
        _generateDataOption("buy_price", "biddingPrice");
        _generateDataOption("buy_num", "biddingCount");

        var info_heading_names = ["在售价","在售量","求购价","求购量"];

        const info_indexs = document.querySelector('.info_indexs');
        const cards = document.querySelectorAll('.infos');
        function create_indicators() {
            info_indexs.innerHTML = '';
            cards.forEach((_, index) => {
                const dot = document.createElement('div');
                if (index === 0) {
                    dot.classList.add('index');
                }
                info_indexs.appendChild(dot);
            });
        }
        create_indicators();

        function update_indicator(active_index) {
            info_heading.children[0].innerHTML = info_heading_names[active_index];
            const dots = info_indexs.querySelectorAll('div');
            dots.forEach((dot, index) => {
                if (index === active_index) {
                    dot.classList.add('index');
                } else {
                    dot.classList.remove('index');
                }
            });
        }
        let scroll_timeout;
        horizontal_infos_list.addEventListener('scroll', () => {
            if (scroll_timeout) {
                clearTimeout(scroll_timeout);
            }
            scroll_timeout = setTimeout(() => {
                let container_width = horizontal_infos_list.clientWidth;
                let scroll_left = horizontal_infos_list.scrollLeft;
                let active_card_index = Math.round(scroll_left / container_width);
                update_indicator(active_card_index);
            }, 10);
        });
    }

    // steamDT源的数据
    function line_dt(){
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
                                },
                                {
                                    tag : "p",
                                    innerHTML : prices[prices.length-1]
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
                                },
                                {
                                    tag : "p",
                                    innerHTML : nums[nums.length-1]
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
                                },
                                {
                                    tag : "p",
                                    innerHTML : sold_num[sold_num.length-1]
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
                            return [posX === 'right' ? `${size.viewSize[0] - rightPos}` : leftPos, 10];
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
                        right: '13%',
                        bottom: '15%',
                        left: '13%',
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
                height : "35rem"
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
                    content: [{ name: 'MA', calcParams: [10, 30] }, { name: 'EMA', calcParams: [10, 30]}],
                    options: { order: Number.MIN_SAFE_INTEGER, }
                },
                {
                    type: 'indicator',
                    content: ['VOL'],
                    options: { order: 10 }
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
                        { title: '成交量', value: '{volume}' }
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
        if (chart.children.length > 1 && type === "line"){
            chart.removeChild(chart.children[2]);
            chart.removeChild(chart.children[1]);
        }else if (chart.children.length >= 1 && type === "k_line"){
            chart.removeChild(chart.children[1]);
        }

        if (type === "line"){
            document.getElementById("line").style.fill = "var(--text-color)";
            document.getElementById("k_line").style.fill = "";
            line_dt();
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
                    innerHTML : "价格"
                },
                {
                    tag : "div",
                    className : "chart_switch",
                    children : [
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
                        {
                            tag : "p",
                            innerHTML : "|"
                        },
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

        chart_switch("line"); 
    });
})();