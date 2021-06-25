<template>
    <el-row type="flex" align="middle" style="background-color: #444444;height: 6vh">
        <el-col :span="20" style="color: #EEEEEE;font-size: large;">
            地图 - {{isShowingTrace ? "轨迹模式" : "普通模式"}}
        </el-col>
        <el-col :span="4" v-if="isShowingTrace">
            <el-button type="danger" @click="exitTraceMode">退出轨迹模式</el-button>
        </el-col>
    </el-row>
    <div id="mapContainer"></div>
</template>

<script>
    import AMapLoader from "@amap/amap-jsapi-loader";
    var gAMap = {};
    export default {
        name: "MapComponent",
        data(){
            return {
                map:{},
                AMap:{},
                mapDeviceInfoWindow:null,
                isShowingTrace:false
            }
        },
        created(){
            let self = this;
            AMapLoader.load({
                "key": "1bd4faa524ff99061f55f051b91af2c9",                                          // 申请好的Web端开发者Key，首次调用 load 时必填
                "version": "1.4.15",                                // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                "plugins": [],                                      // 需要使用的的插件列表，如比例尺'AMap.Scale'等
                "AMapUI": {                                         // 是否加载 AMapUI，缺省不加载
                    "version": '1.1',                               // AMapUI 缺省 1.1
                    "plugins":[],                                   // 需要加载的 AMapUI ui插件
                },
                "Loca":{                                            // 是否加载 Loca， 缺省不加载
                    "version": '1.3.2'                              // Loca 版本，缺省 1.3.2
                },
            }).then((AMap)=>{
                let m = new AMap.Map('mapContainer', {
                    zoom:11,                                        //级别
                    center: [117.20000, 39.13333],                 //中心点坐标
                    viewMode:'3D'                                   //使用3D视图
                });

                self.map = m;
                gAMap = AMap;
                self.drawTrace([
                    [117.20000, 39.13333],
                    [117.20000, 39.13334],
                    [117.20000, 39.13335]
                ])
                self.addMarkPoint()
            }).catch(e => {
                console.log(e);
            })

            document.addEventListener("enterTraceMode", () =>{
                this.enterTraceMode()
            })
        },
        methods:{
            setCenterPoint(centerLat,centerLng){
                console.log([centerLat,centerLng])
                this.map.setCenter([centerLat,centerLng],true)

            },
            drawTrace(ponitsArr){
                let path = []
                for (let i = 0;i<ponitsArr.length;++i){
                    let point = ponitsArr[i]
                    path[i] = new gAMap.LngLat(point[0],point[1])
                }
                    let polyline = new gAMap.Polyline({
                        path: path,          //设置线覆盖物路径
                        strokeColor: "#3366FF", //线颜色
                        strokeWeight: 1,        //线宽
                        strokeStyle: "solid",   //线样式
                    });
                    this.map.add(polyline);
                },
            addMarkPoint(){
                // 创建一个 Marker 实例：
                let marker = new gAMap.Marker({
                    position: new gAMap.LngLat(117.20000, 39.13333),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                    title: '北京'
                });
                marker.on('click',(mousePos)=>{
                    console.log(mousePos)
                    this.openDeviceInfoWindow({
                        name:"?",
                        id:"???"
                    })
                })
                // 将创建的点标记添加到已有的地图实例：
                this.map.add(marker);
            },
            enterTraceMode(){
                this.mapDeviceInfoWindow.close()
                this.isShowingTrace = true;
            },
            exitTraceMode(){
                this.isShowingTrace = false;
            },
            openDeviceInfoWindow(deviceInfo){
                let content = [
                    deviceInfo.name,
                    deviceInfo.id
            ]
                console.log(content)


                var info = [];
                info.push("<div style='min-width: 15vw' class='input-card content-window-card'><div><img style=\"float:left;\" src=\" https://webapi.amap.com/images/autonavi.png \"/></div> ");
                info.push("<div style=\"padding:7px 0px 0px 0px;\"><h4>"+deviceInfo.name+"</h4>");
                info.push("<p class='input-item'>"+deviceInfo.id+"</p>");
                info.push("<button onclick='document.dispatchEvent(new Event(\"enterTraceMode\"))' class='el-button el-button--primary'>查看历史轨迹</button></div></div>");

                if(this.mapDeviceInfoWindow === null){
                    this.mapDeviceInfoWindow = new gAMap.InfoWindow({
                        content: info.join("") //传入 dom 对象，或者 html 字符串
                    });
                }
                this.mapDeviceInfoWindow.setContent(info.join(""))

                this.mapDeviceInfoWindow.open(this.map,this.map.getCenter());

            }
        }
    }
</script>

<style scoped>
#mapContainer{
    height: 85vh;
    width: 100%;
    margin: auto;
}
</style>