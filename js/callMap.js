var worldShow = function() {
    $.get('../nCov_data_analysis/country_total.json').done(function (data) {
        data_country = []
        for (var i = 0; i < data["name"].length; i++) {
            data_country.push({name: data["name"][i], value: data["value"][i]})
        }
        myChart.setOption({
            // 设置标题和副标题及副标题跳转链接
            title: {
                text: '新冠病毒疫情病毒(各国确诊病例截止2020.04.10)',
                subtext: '数据来源--腾讯新闻',
                sublink: 'https://news.qq.com//zt2020/page/feiyan.htm'
            },
            // 数据提示框
            tooltip: {
                trigger: 'item', // item放到数据区域触发
                formatter: '{b}<br/>{c} (人)' // 提示数据格式br表示换行，地图 : {a}（系列名称），{b}（区域名称），{c}（合并数值）, {d}（无）
            },
            // 工具栏
            toolbox: {
                show: true,
                orient: 'horizontal',
                left: 'right',
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}
                }
            },


            // 连续映射方案
            // 视觉映射,疫情颜色根据传染病疫情等级分类为4机：蓝色-黄色-橙色-红色
            // 为了是视觉分布更好，可以添加更多的颜色范围，然后适当调小max的值，因为湖北和后面省份相差太大
            // 湖北有几万确诊，其它较严重省份人数在1000多人，max值设置在1500，整个地图颜色变化相对均匀
            visualMap: {
                min: 1, // 颜色映射对应的最小值，即对应下面的lightskyblue
                max: 15000, // 颜色映射对应的最大值，即对应下面的orangered
                text: ['严重', '一般'], // 映射图上下标记文本
                realtime: true, // 是否显示拖拽手柄，映射条可以拖拽调整要映射的范围
                calculable: true, // 拖拽时，是否实时更新地图
                inRange: {
                    color: ['lightblue', 'yellow', 'orange', 'darkorange', 'red', 'darkred'] // 颜色映射范围，最小值，过渡值，最大值
                }
            },


            // 分段映射方案：
            // visualMap默认是连续映射，我们也可以设置为分段型，对于分布范围广的数据
            // 使用透明度来区分疫情严重情况
            /*visualMap: {
                type: 'piecewise',
                pieces: [
                    {gt: 1500, color: 'darkred'},                        // (1500, Infinity]
                    {gt: 1000, lte: 1500, color: 'red', colorAlpha: 1},  // (1000, 1500]
                    {gt: 500, lte: 1000, color: 'red', colorAlpha: 0.8},
                    {gt: 300, lte: 500, color: 'red', colorAlpha: 0.6},
                    {gt: 100, lte: 300, color: 'red', colorAlpha: 0.4},
                    {gt: 50, lte: 100, color: 'red', colorAlpha: 0.3},
                    {lt: 50, color: 'red', colorAlpha: 0.2}          // (-Infinity, 100)
                ],


            },*/
            nameMap: {
                "Afghanistan":"阿富汗",
                "Albania":"阿尔巴尼亚",
                "Algeria":"阿尔及利亚",
                "Angola":"安哥拉",
                "Argentina":"阿根廷",
                "Armenia":"亚美尼亚",
                "Australia":"澳大利亚",
                "Austria":"奥地利",
                "Azerbaijan":"阿塞拜疆",
                "Bahamas":"巴哈马",
                "Bahrain":"巴林",
                "Bangladesh":"孟加拉国",
                "Belarus":"白俄罗斯",
                "Belgium":"比利时",
                "Belize":"伯利兹",
                "Benin":"贝宁",
                "Bhutan":"不丹",
                "Bolivia":"玻利维亚",
                "Bosnia and Herz.":"波斯尼亚和黑塞哥维那",
                "Botswana":"博茨瓦纳",
                "Brazil":"巴西",
                "British Virgin Islands":"英属维京群岛",
                "Brunei":"文莱",
                "Bulgaria":"保加利亚",
                "Burkina Faso":"布基纳法索",
                "Burundi":"布隆迪",
                "Cambodia":"柬埔寨",
                "Cameroon":"喀麦隆",
                "Canada":"加拿大",
                "Cape Verde":"佛得角",
                "Cayman Islands":"开曼群岛",
                "Central African Rep.":"中非共和国",
                "Chad":"乍得",
                "Chile":"智利",
                "China":"中国",
                "Colombia":"哥伦比亚",
                "Comoros":"科摩罗",
                "Congo":"刚果",
                "Costa Rica":"哥斯达黎加",
                "Croatia":"克罗地亚",
                "Cuba":"古巴",
                "Cyprus":"塞浦路斯",
                "Czech Rep.":"捷克共和国",
                "Côte d'Ivoire":"科特迪瓦",
                "Dem. Rep. Congo":"刚果民主共和国",
                "Dem. Rep. Korea":"朝鲜",
                "Denmark":"丹麦",
                "Djibouti":"吉布提",
                "Dominican Rep.":"多米尼加共和国",
                "Ecuador":"厄瓜多尔",
                "Egypt":"埃及",
                "El Salvador":"萨尔瓦多",
                "Equatorial Guinea":"赤道几内亚",
                "Eritrea":"厄立特里亚",
                "Estonia":"爱沙尼亚",
                "Ethiopia":"埃塞俄比亚",
                "Falkland Is.":"福克兰群岛",
                "Fiji":"斐济",
                "Finland":"芬兰",
                "Fr. S. Antarctic Lands":"所罗门群岛",
                "France":"法国",
                "Gabon":"加蓬",
                "Gambia":"冈比亚",
                "Georgia":"格鲁吉亚",
                "Germany":"德国",
                "Ghana":"加纳",
                "Greece":"希腊",
                "Greenland":"格陵兰",
                "Guatemala":"危地马拉",
                "Guinea":"几内亚",
                "Guinea-Bissau":"几内亚比绍",
                "Guyana":"圭亚那",
                "Haiti":"海地",
                "Honduras":"洪都拉斯",
                "Hungary":"匈牙利",
                "Iceland":"冰岛",
                "India":"印度",
                "Indonesia":"印度尼西亚",
                "Iran":"伊朗",
                "Iraq":"伊拉克",
                "Ireland":"爱尔兰",
                "Isle of Man":"马恩岛",
                "Israel":"以色列",
                "Italy":"意大利",
                "Jamaica":"牙买加",
                "Japan":"日本",
                "Jordan":"约旦",
                "Kazakhstan":"哈萨克斯坦",
                "Kenya":"肯尼亚",
                "Korea":"韩国",
                "Kuwait":"科威特",
                "Kyrgyzstan":"吉尔吉斯斯坦",
                "Lao PDR":"老挝",
                "Latvia":"拉脱维亚",
                "Lebanon":"黎巴嫩",
                "Lesotho":"莱索托",
                "Liberia":"利比里亚",
                "Libya":"利比亚",
                "Lithuania":"立陶宛",
                "Luxembourg":"卢森堡",
                "Macedonia":"马其顿",
                "Madagascar":"马达加斯加",
                "Malawi":"马拉维",
                "Malaysia":"马来西亚",
                "Maldives":"马尔代夫",
                "Mali":"马里",
                "Malta":"马耳他",
                "Mauritania":"毛利塔尼亚",
                "Mauritius":"毛里求斯",
                "Mexico":"墨西哥",
                "Moldova":"摩尔多瓦",
                "Monaco":"摩纳哥",
                "Mongolia":"蒙古",
                "Montenegro":"黑山共和国",
                "Morocco":"摩洛哥",
                "Mozambique":"莫桑比克",
                "Myanmar":"缅甸",
                "Namibia":"纳米比亚",
                "Nepal":"尼泊尔",
                "Netherlands":"荷兰",
                "New Caledonia":"新喀里多尼亚",
                "New Zealand":"新西兰",
                "Nicaragua":"尼加拉瓜",
                "Niger":"尼日尔",
                "Nigeria":"尼日利亚",
                "Norway":"挪威",
                "Oman":"阿曼",
                "Pakistan":"巴基斯坦",
                "Panama":"巴拿马",
                "Papua New Guinea":"巴布亚新几内亚",
                "Paraguay":"巴拉圭",
                "Peru":"秘鲁",
                "Philippines":"菲律宾",
                "Poland":"波兰",
                "Portugal":"葡萄牙",
                "Puerto Rico":"波多黎各",
                "Qatar":"卡塔尔",
                "Reunion":"留尼旺",
                "Romania":"罗马尼亚",
                "Russia":"俄罗斯",
                "Rwanda":"卢旺达",
                "S. Geo. and S. Sandw. Is.":"南乔治亚和南桑威奇群岛",
                "S. Sudan":"南苏丹",
                "San Marino":"圣马力诺",
                "Saudi Arabia":"沙特阿拉伯",
                "Senegal":"塞内加尔",
                "Serbia":"塞尔维亚",
                "Sierra Leone":"塞拉利昂",
                "Singapore":"新加坡",
                "Slovakia":"斯洛伐克",
                "Slovenia":"斯洛文尼亚",
                "Solomon Is.":"所罗门群岛",
                "Somalia":"索马里",
                "South Africa":"南非",
                "Spain":"西班牙",
                "Sri Lanka":"斯里兰卡",
                "Sudan":"苏丹",
                "Suriname":"苏里南",
                "Swaziland":"斯威士兰",
                "Sweden":"瑞典",
                "Switzerland":"瑞士",
                "Syria":"叙利亚",
                "Tajikistan":"塔吉克斯坦",
                "Tanzania":"坦桑尼亚",
                "Thailand":"泰国",
                "Togo":"多哥",
                "Tonga":"汤加",
                "Trinidad and Tobago":"特立尼达和多巴哥",
                "Tunisia":"突尼斯",
                "Turkey":"土耳其",
                "Turkmenistan":"土库曼斯坦",
                "U.S. Virgin Islands":"美属维尔京群岛",
                "Uganda":"乌干达",
                "Ukraine":"乌克兰",
                "United Arab Emirates":"阿拉伯联合酋长国",
                "United Kingdom":"英国",
                "United States":"美国",
                "Uruguay":"乌拉圭",
                "Uzbekistan":"乌兹别克斯坦",
                "Vanuatu":"瓦努阿图",
                "Vatican City":"梵蒂冈城",
                "Venezuela":"委内瑞拉",
                "Vietnam":"越南",
                "W. Sahara":"西撒哈拉",
                "Yemen":"也门",
                "Yugoslavia":"南斯拉夫",
                "Zaire":"扎伊尔",
                "Zambia":"赞比亚",
                "Zimbabwe":"津巴布韦"
            },
            // 具体数据
            series: [
                {
                    name: '各国确诊病例', // 系列名称
                    type: 'map', // 系列类型，地图
                    map: 'world', // 要使用的地图，即上面注册的地图名称
                    roam: true, // 开启鼠标缩放和平移漫游
                    label: { // 图形上的文本标签，地图默认显示数据名
                        show: false,
                        formatter: '{b}', // b是数据名，c是数据值
                        fontSize: 12
                    },
                    data: data_country,
                        
                }
            ]
        });
    });  
};

var ChinaShow = function() {
    $.get('../nCov_data_analysis/province_total.json').done(function (data) {
        myChart.setOption({
            // 设置标题和副标题及副标题跳转链接
            title: {
                text: '新冠病毒疫情病毒(各省确诊病例截止2020.04.10)',
                subtext: '数据来源--腾讯新闻',
                sublink: 'https://news.qq.com//zt2020/page/feiyan.htm'
            },
            // 数据提示框
            tooltip: {
                trigger: 'item', // item放到数据区域触发
                formatter: '{b}<br/>{c} (人)' // 提示数据格式br表示换行，地图 : {a}（系列名称），{b}（区域名称），{c}（合并数值）, {d}（无）
            },
            // 工具栏
            toolbox: {
                show: true,
                orient: 'horizontal',
                left: 'right',
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}
                }
            },


            // 连续映射方案
            // 视觉映射,疫情颜色根据传染病疫情等级分类为4机：蓝色-黄色-橙色-红色
            // 为了是视觉分布更好，可以添加更多的颜色范围，然后适当调小max的值，因为湖北和后面省份相差太大
            // 湖北有几万确诊，其它较严重省份人数在1000多人，max值设置在1500，整个地图颜色变化相对均匀
            visualMap: {
                min: 1, // 颜色映射对应的最小值，即对应下面的lightskyblue
                max: 5000, // 颜色映射对应的最大值，即对应下面的orangered
                text: ['严重', '一般'], // 映射图上下标记文本
                realtime: true, // 是否显示拖拽手柄，映射条可以拖拽调整要映射的范围
                calculable: true, // 拖拽时，是否实时更新地图
                inRange: {
                    color: ['lightblue', 'yellow', 'orange', 'darkorange', 'red', 'darkred'] // 颜色映射范围，最小值，过渡值，最大值
                }
            },


            // 分段映射方案：
            // visualMap默认是连续映射，我们也可以设置为分段型，对于分布范围广的数据
            // 使用透明度来区分疫情严重情况
            /*visualMap: {
                type: 'piecewise',
                pieces: [
                    {gt: 1500, color: 'darkred'},                        // (1500, Infinity]
                    {gt: 1000, lte: 1500, color: 'red', colorAlpha: 1},  // (1000, 1500]
                    {gt: 500, lte: 1000, color: 'red', colorAlpha: 0.8},
                    {gt: 300, lte: 500, color: 'red', colorAlpha: 0.6},
                    {gt: 100, lte: 300, color: 'red', colorAlpha: 0.4},
                    {gt: 50, lte: 100, color: 'red', colorAlpha: 0.3},
                    {lt: 50, color: 'red', colorAlpha: 0.2}          // (-Infinity, 100)
                ],


            },*/

            // 具体数据
            series: [
                {
                    name: '各省确诊病例', // 系列名称
                    type: 'map', // 系列类型，地图
                    map: 'china', // 要使用的地图，即上面注册的地图名称
                    roam: true, // 开启鼠标缩放和平移漫游
                    label: { // 图形上的文本标签，地图默认显示数据名
                        show: true,
                        formatter: '{b}', // b是数据名，c是数据值
                        fontSize: 12
                    },
                    data: [ // 取出data数据，data是json数据，取出字典的键对应的值
                        {name: data['name'][0], value: data['value'][0]},
                        {name: data['name'][1], value: data['value'][1]},
                        {name: data['name'][2], value: data['value'][2]},
                        {name: data['name'][3], value: data['value'][3]},
                        {name: data['name'][4], value: data['value'][4]},
                        {name: data['name'][5], value: data['value'][5]},
                        {name: data['name'][6], value: data['value'][6]},
                        {name: data['name'][7], value: data['value'][7]},
                        {name: data['name'][8], value: data['value'][8]},
                        {name: data['name'][9], value: data['value'][9]},
                        {name: data['name'][10], value: data['value'][10]},
                        {name: data['name'][11], value: data['value'][11]},
                        {name: data['name'][12], value: data['value'][12]},
                        {name: data['name'][13], value: data['value'][13]},
                        {name: data['name'][14], value: data['value'][14]},
                        {name: data['name'][15], value: data['value'][15]},
                        {name: data['name'][16], value: data['value'][16]},
                        {name: data['name'][17], value: data['value'][17]},
                        {name: data['name'][18], value: data['value'][18]},
                        {name: data['name'][19], value: data['value'][19]},
                        {name: data['name'][20], value: data['value'][20]},
                        {name: data['name'][21], value: data['value'][21]},
                        {name: data['name'][22], value: data['value'][22]},
                        {name: data['name'][23], value: data['value'][23]},
                        {name: data['name'][24], value: data['value'][24]},
                        {name: data['name'][25], value: data['value'][25]},
                        {name: data['name'][26], value: data['value'][26]},
                        {name: data['name'][27], value: data['value'][27]},
                        {name: data['name'][28], value: data['value'][28]},
                        {name: data['name'][29], value: data['value'][29]},
                        {name: data['name'][30], value: data['value'][30]},
                        {name: data['name'][31], value: data['value'][31]},
                        {name: data['name'][32], value: data['value'][32]},
                        {name: data['name'][33], value: data['value'][33]}
                    ],
                }
            ]
        });
    });
};

/**
 * 
 * 省份修改的话有三个地方：
 * 1.这里js\callMap.js添加点击事件主函数
 * 2.2019-nCoV\nCov_ECharts_map_visualization\overview.html里javascript省份地图引用要添加上，还有11、19、48行要改
 * 3.2019-nCoV\nCov_data_analysis\city_data_analysis.py 要改为获取对应省份的数据
 */
var HuBeiShow = function(name) {
    $.get('../nCov_data_analysis/hubei_total.json').done(function (data) {
        data_country = []
        for (var i = 0; i < data["name"].length; i++) {
            // 市的名字一定要跟地图中注册的一模一样才行！！！
            data_country.push({name: data["name"][i]+"市", value: data["value"][i]})
        }
        console.log(data_country);
        myChart.setOption({
            // 设置标题和副标题及副标题跳转链接
            title: {
                text: '新冠病毒疫情病毒(湖北各市确诊病例截止2020.04.10)',
                subtext: '数据来源--腾讯新闻',
                sublink: 'https://news.qq.com//zt2020/page/feiyan.htm'
            },
            // 数据提示框
            tooltip: {
                trigger: 'item', // item放到数据区域触发
                formatter: '{b}<br/>{c} (人)' // 提示数据格式br表示换行，地图 : {a}（系列名称），{b}（区域名称），{c}（合并数值）, {d}（无）
            },
            // 工具栏
            toolbox: {
                show: true,
                orient: 'horizontal',
                left: 'right',
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}
                }
            },


            // 连续映射方案
            // 视觉映射,疫情颜色根据传染病疫情等级分类为4机：蓝色-黄色-橙色-红色
            // 为了是视觉分布更好，可以添加更多的颜色范围，然后适当调小max的值，因为湖北和后面省份相差太大
            // 湖北有几万确诊，其它较严重省份人数在1000多人，max值设置在1500，整个地图颜色变化相对均匀
            visualMap: {
                min: 1, // 颜色映射对应的最小值，即对应下面的lightskyblue
                max: 5000, // 颜色映射对应的最大值，即对应下面的orangered
                text: ['严重', '一般'], // 映射图上下标记文本
                realtime: true, // 是否显示拖拽手柄，映射条可以拖拽调整要映射的范围
                calculable: true, // 拖拽时，是否实时更新地图
                inRange: {
                    color: ['lightblue', 'yellow', 'orange', 'darkorange', 'red', 'darkred'] // 颜色映射范围，最小值，过渡值，最大值
                }
            },

            // 具体数据
            series: [
                {
                    name: '各市确诊病例', // 系列名称
                    type: 'map', // 系列类型，地图
                    map: '湖北', // 要使用的地图，即上面注册的地图名称
                    roam: true, // 开启鼠标缩放和平移漫游
                    label: { // 图形上的文本标签，地图默认显示数据名
                        show: true,
                        formatter: '{b}', // b是数据名，c是数据值
                        fontSize: 12
                    },
                    data: data_country,
                        
                }
            ]
        });
    });  
};

var HuNanShow = function(name) {
    $.get('../nCov_data_analysis/hunan_total.json').done(function (data) {
        data_country = []
        for (var i = 0; i < data["name"].length; i++) {
            // 市的名字一定要跟地图中注册的一模一样才行！！！
            data_country.push({name: data["name"][i]+"市", value: data["value"][i]})
        }
        console.log(data_country);
        myChart.setOption({
            // 设置标题和副标题及副标题跳转链接
            title: {
                text: '新冠病毒疫情病毒(湖南各市确诊病例截止2020.04.10)',
                subtext: '数据来源--腾讯新闻',
                sublink: 'https://news.qq.com//zt2020/page/feiyan.htm'
            },
            // 数据提示框
            tooltip: {
                trigger: 'item', // item放到数据区域触发
                formatter: '{b}<br/>{c} (人)' // 提示数据格式br表示换行，地图 : {a}（系列名称），{b}（区域名称），{c}（合并数值）, {d}（无）
            },
            // 工具栏
            toolbox: {
                show: true,
                orient: 'horizontal',
                left: 'right',
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}
                }
            },


            // 连续映射方案
            // 视觉映射,疫情颜色根据传染病疫情等级分类为4机：蓝色-黄色-橙色-红色
            // 为了是视觉分布更好，可以添加更多的颜色范围，然后适当调小max的值，因为湖北和后面省份相差太大
            // 湖北有几万确诊，其它较严重省份人数在1000多人，max值设置在1500，整个地图颜色变化相对均匀
            visualMap: {
                min: 1, // 颜色映射对应的最小值，即对应下面的lightskyblue
                max: 500, // 颜色映射对应的最大值，即对应下面的orangered
                text: ['严重', '一般'], // 映射图上下标记文本
                realtime: true, // 是否显示拖拽手柄，映射条可以拖拽调整要映射的范围
                calculable: true, // 拖拽时，是否实时更新地图
                inRange: {
                    color: ['lightblue', 'yellow', 'orange', 'darkorange', 'red', 'darkred'] // 颜色映射范围，最小值，过渡值，最大值
                }
            },

            // 具体数据
            series: [
                {
                    name: '各市确诊病例', // 系列名称
                    type: 'map', // 系列类型，地图
                    map: '湖南', // 要使用的地图，即上面注册的地图名称
                    roam: true, // 开启鼠标缩放和平移漫游
                    label: { // 图形上的文本标签，地图默认显示数据名
                        show: true,
                        formatter: '{b}', // b是数据名，c是数据值
                        fontSize: 12
                    },
                    data: data_country,
                        
                }
            ]
        });
    });  
};