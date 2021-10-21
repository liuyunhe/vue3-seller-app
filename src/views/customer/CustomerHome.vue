<template>
  <div class="customer-home-conatainer">
    <div id="lbs-container" v-show="!showShopList"></div>
    <div
      class="list-btn"
      v-show="!showShopList"
      @click="handleClickListBtn"
    ></div>
    <div class="list-container" v-show="showShopList">
      <ul>
        <li v-for="item in shopListRef" :key="item.id">
          <div class="img"><img :src="item.shopImg" alt="" /></div>
          <div class="content">
            <div class="name">
              <p>{{ item.ShopName }}</p>
              <span class="distance">{{ item.distance }}</span>
            </div>
            <div class="addr">{{ item.addr }}</div>
          </div>
          <div class="icon-right"></div>
        </li>
      </ul>
    </div>
    <div
      class="lbs-btn"
      v-show="showShopList"
      @click="handleClickListBtn"
    ></div>
  </div>
  <popup-with-head
    :show="showNoBind"
    headImg="
      https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/icon-popup-head-lbs.png
    "
    contentText="您还没有专属零售户哦！赶快去绑定吧！"
    confirmBtnText="选择零售户"
    @confirm="showNoBind = false"
  >
  </popup-with-head>
  <img
    id="img"
    src="https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/lbs-icon-seller-cq.png"
    style="display:none"
    alt=""
  />
</template>

<script lang="ts">
// eslint-disable-next-line
declare let TMap: any
import { computed, defineComponent, ref, watch } from 'vue'
import { TMapGL } from '@/plugins/Tmap'
import { http } from '@/http'
import { Toast } from 'vant'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'
import PopupWithHead from '@/components/PopupWithHead/index.vue'

interface ShopInfo {
  id: number
  shopLat: number
  shopLng: number
  ShopName: string
  addr: string
  contactPhone: string
  distance: number | string
  shopImg: string
}
interface BindShop {
  id: number
  ctime: string
  utime: string
  rcdNote: string
  shopId: number
  openid: string
  unionid: string
  bindChannel: number
  wxmpSyncTime: string
  fanNickName: string | null
  fanHeadImg: string | null
  fanGender: number | null
  fanMobile: string | null
  birthday: string | null
}

export default defineComponent({
  name: 'CustomerHome',
  components: { PopupWithHead },
  setup() {
    const store = useStore<GlobalDataProps>()
    const lat = computed(() => store.state.lat)
    const lng = computed(() => store.state.lng)
    const shopListRef = ref<ShopInfo[]>([])
    const bindShop = ref<BindShop | null>(null)

    const showShopList = ref(false)
    const showNoBind = ref(false)

    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    })

    const handleClickListBtn = () => {
      showShopList.value = !showShopList.value
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let markerLayer: any

    const sortShopList = (shopList: ShopInfo[]) => {
      shopList.forEach((item) => {
        if (item.distance > 1000) {
          item.distance =
            Math.floor(((item.distance as number) / 1000) * 100) / 100 + 'km'
        } else {
          item.distance = Math.floor(item.distance as number) + 'm'
        }
      })
      return shopList
    }

    const getHomeInfo = (lat: number, lng: number) => {
      http
        .post('/hbSeller/fans/homeInfo', { lat, lng }, false)
        .then((res) => {
          if (res.code === '200') {
            const { bindInfo, shopList } = res.data
            // 店铺绑定信息
            if (!bindInfo) {
              showNoBind.value = true
            } else {
              bindShop.value = bindInfo as BindShop
            }
            if (shopList && shopList.length) {
              shopListRef.value = sortShopList(shopList)
              const markers = shopList.map((i: ShopInfo) => {
                return {
                  id: i.id, //点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id
                  styleId: 'cqStyle', //指定样式id
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

    watch(
      () => lat.value,
      () => {
        if (lat.value && lng.value) {
          TMapGL().then(() => {
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
            //初始marker样式
            markerLayer = new TMap.MultiMarker({
              id: 'marker-layer',
              map: map,
              styles: {
                cqStyle: new TMap.MarkerStyle({
                  width: 47, // 点标记样式宽度（像素）
                  height: 40, // 点标记样式高度（像素）
                  src: require('@/assets/images/lbs-icon-seller-cq.png'), //图片路径
                  //焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
                  anchor: { x: 16, y: 32 }
                })
              },
              geometries: []
            })

            //监听标注点击事件
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            markerLayer.on('click', function(evt: any) {
              console.log(evt.geometry)
            })

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            getHomeInfo(lat.value!, lng.value!)
          })
        }
      }
    )
    if (process.env.NODE_ENV !== 'production') {
      store.commit('setLng', 116.70602)
      store.commit('setLat', 39.860464)
    }

    return {
      handleClickListBtn,
      showShopList,
      showNoBind,
      shopListRef
    }
  }
})
</script>

<style lang="less" scoped>
@import '@/theme/common';
.customer-home-conatainer {
  position: relative;
  height: 100%;
  #lbs-container {
    /*地图(容器)显示大小*/
    width: 100%;
    height: 100%;
  }
  .list-container {
    padding-top: 10px;
    margin: 0 10px;
    box-sizing: border-box;
    ul {
      li {
        display: flex;
        height: 100px;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        padding: 12px;
        box-sizing: border-box;
        border-radius: 5px;
        margin-bottom: 10px;
        .img {
          margin-right: 12px;
          img {
            display: block;
            width: 75px;
            height: 75px;
          }
        }
        .content {
          flex: 1;
          .name {
            width: 200px;
            height: 20px;
            font-size: 14px;
            line-height: 20px;
            color: #303133;
            margin-bottom: 22px;

            p {
              width: 140px;
              float: left;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .distance {
              float: right;
              font-size: 12px;
              color: #b1b1b1;
              margin-left: 12px;
              text-align: right;
            }
          }
          .addr {
            width: 195px;
            height: 17px;
            font-size: 12px;
            line-height: 17px;
            color: #606266;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .icon-right {
          .bg-img(
            10px,
            16px,
            'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/personal/iconfont-go.png'
          );
          filter: contrast(0.5);
        }
      }
    }
  }
  .list-btn {
    .bg-img(
      53px,
      53px,
      'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/icon-group-lbs.png'
    );
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1003;
  }
  .lbs-btn {
    .bg-img(
      53px,
      53px,
      'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/icon-group-list.png'
    );
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 1003;
  }
}
</style>
