<template>
  <div id="container"></div>
</template>

<script lang="ts">
// eslint-disable-next-line
declare let TMap: any
import { defineComponent, onMounted } from 'vue'
import { TMapGL } from '@/plugins/Tmap'

export default defineComponent({
  name: 'CustomerHome',
  setup() {
    onMounted(() => {
      TMapGL().then(() => {
        const center = new TMap.LatLng(39.98412, 116.307484)
        const map = new TMap.Map(document.getElementById('container'), {
          center: center //设置地图中心点坐标
        })
        // eslint-disable-next-line
        const marker = new TMap.MultiMarker({
          id: 'marker-layer', //图层id
          map: map,
          styles: {
            //点标注的相关样式
            marker: new TMap.MarkerStyle({
              width: 25,
              height: 35,
              anchor: { x: 16, y: 32 },
              src:
                'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/markerDefault.png'
            })
          },
          geometries: [
            {
              //点标注数据数组
              id: 'demo',
              styleId: 'marker',
              position: new TMap.LatLng(39.984104, 116.307503),
              properties: {
                title: 'marker'
              }
            }
          ]
        })
      })
    })
    return {}
  }
})
</script>

<style scoped>
#container {
  /*地图(容器)显示大小*/
  width: 100%;
  height: 100vh;
}
</style>
