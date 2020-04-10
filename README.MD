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
