#### 2019 新型冠状病毒疫情可视化(全国/全球疫情地图)
- nCoc_data_analysis 目录

    用于可视化数据的获取

- nCov_ECharts_map_visualization 目录

    疫情数据可视化，包含全国疫情地图、世界疫情地图，当然想加各个省份的地图还是很方便的


#### 1. 数据来源
- 数据来源，腾讯新闻：https://news.qq.com/zt2020/page/feiyan.htm

- 经过解析后的数据地址(json格式数据)：

  中国疫情情况（总）：https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5

  中国疫情情况 （随时间变化）：https://view.inews.qq.com/g2/getOnsInfo?name=disease_other

  世界疫情情况：https://view.inews.qq.com/g2/getOnsInfo?name=disease_foreign

  > 上述解析后的数据地址可能会变掉，最好自己重新获取一波地址

#### 2. 数据请求
- 使用 requests 请求
- 注意将 json 数据转换为 dict 格式

#### 3. 疫情数据可视化
- 方案1：  basemap + matplotlib （这块显示的不怎么好看哈哈哈哈）
- 方案2：  ECharts （建议采用这个）
- 中国每日疫情变化时间图
- 中国疫情地图
- 全球疫情地图

##### 中国疫情可视化更改
为中国疫情地图增加时间轴，可切换时间查看过往疫情地图状态。(注：js language version 改成了es6)   
1. 数据来源
    ```js
    let apiUrl="https://api.inews.qq.com/newsqa/v1/query/pubished/daily/list?province="
    ```
   此api加省名即可获取该省过往历史数据。如
    ```js
    let apiUrl="https://api.inews.qq.com/newsqa/v1/query/pubished/daily/list?province=湖北"
    ```
2. 数据获取
    使用js实现，逻辑为访问所有省份的过往数据并分日期保存，具体代码如下
    ```js
    //日期-Data 格式,其中Data为数组，里面放着{name:湖北,value:123}这样的键值对。
    let dateDataMap = {};
    //省份表
    let princes = ["香港", "黑龙江", "台湾", "湖北", "上海", "广东", "内蒙古", "北京", "山西", "澳门", "浙江", "福建", "山东", "天津", "江苏", "四川", "河北", "云南", "陕西", "辽宁", "吉林", "重庆", "甘肃", "贵州", "湖南", "安徽", "宁夏", "海南", "青海", "新疆", "广西", "江西", "西藏", "河南"];
    const url = "https://api.inews.qq.com/newsqa/v1/query/pubished/daily/list?province=";
    //设置不异步
    $.ajaxSettings.async = false;
    princes.forEach(function (prince) {
        $.get(url + prince).done(function (result) {
            // dataArray 是数组，存放着 {date: "02.01", country: "中国", province: "黑龙江", confirm: 95, dead: 0, …}
            var dataArray = result["data"];
            dataArray.forEach(function (item) {
                if (!dateDataMap.hasOwnProperty(item["date"])) {
                    dateDataMap[item["date"]] = [];
                }
                dateDataMap[item["date"]].push({
                    "name": item["province"],
                    "value": item["confirm"]
                })
            })
        })
    });
    console.log(JSON.stringify(dateDataMap))
    ```


