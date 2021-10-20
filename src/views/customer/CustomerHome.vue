<template>
  <div class="customer-home-conatainer">
    <div id="lbs-container" v-show="!showShopList"></div>
    <div class="list-btn" v-show="!showShopList">
      <van-button
        square
        type="primary"
        style="width:8rem"
        @click="handleClickListBtn"
        >零售户列表</van-button
      >
    </div>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line
declare let TMap: any
import { computed, defineComponent, onMounted, ref } from 'vue'
import { TMapGL } from '@/plugins/Tmap'
import { http } from '@/http'
import { Toast } from 'vant'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'

interface ShopInfo {
  id: number
  shopLat: number
  shopLng: number
  ShopName: string
  addr: string
  contactPhone: string
  distance: number
}

export default defineComponent({
  name: 'CustomerHome',
  setup() {
    const store = useStore<GlobalDataProps>()
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    // const lat = computed(() => store.state.lat || 39.860464)
    // const lng = computed(() => store.state.lng || 116.70602)

    const showShopList = ref(false)

    const handleClickListBtn = () => {
      showShopList.value = true
    }

    onMounted(() => {
      TMapGL().then(() => {
        const lat = computed(() => store.state.lat)
        const lng = computed(() => store.state.lng)
        console.log(lat.value, lng.value)
        const center = new TMap.LatLng(lat.value, lng.value)
        const map = new TMap.Map(document.getElementById('lbs-container'), {
          center: center, //  设置地图中心点坐标
          zoom: 12,
          draggable: false, //  是否支持拖拽移动地图，默认为true。
          scrollable: false, // 是否支持鼠标滚轮缩放地图，默认为true
          doubleClickZoom: false, // 是否支持双击缩放地图，默认为true。
          showControl: false // 是否显示地图上的控件，默认true。
        })
        //初始marker
        const markerLayer = new TMap.MultiMarker({
          id: 'marker-layer',
          map: map,
          styles: {
            myStyle: new TMap.MarkerStyle({
              width: 25, // 点标记样式宽度（像素）
              height: 35, // 点标记样式高度（像素）
              // src: '../img/marker.png', //图片路径
              //焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
              anchor: { x: 16, y: 32 }
            })
          },
          geometries: []
        })
        //初始化infoWindow
        const infoWindow = new TMap.InfoWindow({
          map: map,
          position: new TMap.LatLng(39.984104, 116.307503),
          content:
            "<div><img src='https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/em.jpg'><p>Hello World!</p></div>",
          offset: { x: 0, y: -32 } //设置信息窗相对position偏移像素
        })
        infoWindow.close() //初始关闭信息窗关闭
        //监听标注点击事件
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        markerLayer.on('click', function(evt: any) {
          console.log(evt)
          //设置infoWindow
          infoWindow.open() //打开信息窗
          infoWindow.setPosition(evt.geometry.position) //设置信息窗位置
          infoWindow.setContent(
            "<div><img src='https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/em.jpg'><p>Hello World!</p></div>"
          ) //设置信息窗内容
        })
        const getHomeInfo = (lat: number, lng: number) => {
          http
            .post('/hbSeller/fans/homeInfo', { lat, lng }, false)
            .then((res) => {
              if (res.code === '200') {
                const { bindInfo, shopList } = res.data
                // d店铺绑定信息
                if (bindInfo) {
                  console.log(bindInfo)
                }
                if (shopList && shopList.length) {
                  const markers = shopList.map((i: ShopInfo) => {
                    return {
                      id: i.id, //点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id
                      styleId: 'myStyle', //指定样式id
                      position: new TMap.LatLng(i.shopLat, i.shopLng), //点标记坐标位置
                      properties: {
                        //自定义属性
                        title: i.ShopName,
                        ShopName: i.ShopName,
                        addr: i.addr,
                        contactPhone: i.contactPhone,
                        distance: i.distance
                      }
                    }
                  })
                  markerLayer.add(markers)
                }
              } else {
                Toast.fail(res.msg)
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        getHomeInfo(lat.value!, lng.value!)
      })
    })
    return {
      handleClickListBtn,
      showShopList
    }
  }
})
</script>

<style lang="less" scoped>
.customer-home-conatainer {
  height: 100%;
  #lbs-container {
    /*地图(容器)显示大小*/
    width: 100%;
    height: 100%;
  }
  .list-btn {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 9999;
  }
}
</style>
