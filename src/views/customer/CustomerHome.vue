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
        <li
          v-for="item in shopListRef"
          :key="item.id"
          @click="handleClickShop(item)"
        >
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
    needCloseBtn
    @confirm="showNoBind = false"
    @cancel="showNoBind = false"
  />
  <popup-with-head
    :show="showShopDetail"
    :headImgStyle="{
      width: '80vw',
      height: '52.26667vw ',
      borderRadius: '2.66667vw'
    }"
    :headImg="shopDetail.shopImg"
    confirmBtnText="绑定零售户"
    needCloseBtn
    @confirm="showBindPopup = true"
    @cancel="showShopDetail = false"
  >
    <template #content>
      <div class="shop-detail-container">
        <div class="shop-detail-title">
          {{ shopDetail.ShopName }}
          <template v-if="bindShop">
            <span
              v-if="bindShop.shopId === shopDetail.id"
              class="btn-unbind"
              @click="handleClickUnbind"
              >解绑零售户</span
            >
          </template>
        </div>
        <div class="shop-detail-content">地址：{{ shopDetail.addr }}</div>
        <div class="shop-detail-content">
          电话：{{ shopDetail.contactPhone }}
        </div>
      </div>
    </template>
    <div v-if="bindShop"></div>
  </popup-with-head>
  <popup-with-head
    :show="showBindPopup"
    headImg="https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/icon-debind-head.png"
    needCancelBtn
    @confirm="
      () => {
        showBindPopup = false
        showShopDetail = false
        handleBindShop()
      }
    "
    @cancel="showBindPopup = false"
  >
    <template #content>
      <div class="bind-popup-container">
        绑定成为零售户专属粉丝后，就只能参与您当前绑定零售户店铺的互动不能在解绑了哦，您确定绑定吗？
      </div>
    </template>
  </popup-with-head>
  <popup-with-head
    :show="showBindSuccess"
    headImg="https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/icon-debind-head.png"
    needCancelBtn
    @confirm="showBindSuccess = false"
    @cancel="showBindSuccess = false"
  >
    <template #content>
      <div class="bind-popup-container">
        恭喜您，成为零售户专属粉丝！赶快去参与专属活动吧！
      </div>
    </template>
  </popup-with-head>
</template>

<script lang="ts">
// eslint-disable-next-line
declare let TMap: any
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { TMapGL } from '@/plugins/Tmap'
import { http } from '@/http'
import { Dialog, Toast } from 'vant'
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
  iconUrl: string
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
    const showBindPopup = ref(false)
    const showShopDetail = ref(false)
    const showBindSuccess = ref(false)

    const shopDetail = ref<ShopInfo>({
      id: 0,
      shopImg: '',
      ShopName: '',
      contactPhone: '',
      addr: '',
      shopLat: 0,
      shopLng: 0,
      distance: 0,
      iconUrl: ''
    })

    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 10000
    })

    let initMapFlag = false

    setTimeout(() => {
      if (!initMapFlag) {
        Dialog.confirm({
          title: '提示',
          message:
            '尊敬的用户，获取您的地理位置信息失败，请重新进入或刷新本页面。',
          closeOnClickOverlay: true,
          confirmButtonText: '知道了'
        })
          .then(() => {
            // on confirm
          })
          .catch(() => {
            // on cancel
          })
      }
    }, 11000)

    const handleClickListBtn = () => {
      showShopList.value = !showShopList.value
    }

    const handleClickShop = (shop: ShopInfo) => {
      shopDetail.value.id = shop.id
      shopDetail.value.shopImg = shop.shopImg
      shopDetail.value.ShopName = shop.ShopName
      shopDetail.value.contactPhone = shop.contactPhone
      shopDetail.value.addr = shop.addr
      shopDetail.value.shopLat = shop.shopLat
      shopDetail.value.shopLng = shop.shopLng
      shopDetail.value.distance = shop.distance
      showShopDetail.value = true
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
    interface Styles {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string]: any
    }
    let styles: Styles = {}
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
              styles = {
                bindedStyle: new TMap.MarkerStyle({
                  width: 47, // 点标记样式宽度（像素）
                  height: 40, // 点标记样式高度（像素）
                  src:
                    'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/lbs-icon-seller-binded.png', //图片路径
                  //焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
                  anchor: { x: 16, y: 32 }
                }),
                cqStyle: new TMap.MarkerStyle({
                  width: 47, // 点标记样式宽度（像素）
                  height: 40, // 点标记样式高度（像素）
                  src:
                    'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/lbs-icon-seller-cq.png', //图片路径
                  //焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
                  anchor: { x: 16, y: 32 }
                }),
                hqStyle: new TMap.MarkerStyle({
                  width: 47, // 点标记样式宽度（像素）
                  height: 40, // 点标记样式高度（像素）
                  src:
                    'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/lbs-icon-seller-hq.png', //图片路径
                  //焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
                  anchor: { x: 16, y: 32 }
                })
              }
              const markers = shopList.map((i: ShopInfo) => {
                const style = `style${i.id}`
                styles[style] = new TMap.MarkerStyle({
                  width: 47, // 点标记样式宽度（像素）
                  height: 40, // 点标记样式高度（像素）
                  src: i.iconUrl, //图片路径
                  //焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
                  anchor: { x: 16, y: 32 }
                })

                return {
                  id: i.id, //点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id
                  styleId:
                    bindShop.value?.shopId === i.id ? 'bindedStyle' : style, //指定样式id
                  position: new TMap.LatLng(i.shopLat, i.shopLng), //点标记坐标位置
                  properties: {
                    //自定义属性
                    id: i.id,
                    title: i.ShopName,
                    ShopName: i.ShopName,
                    addr: i.addr,
                    contactPhone: i.contactPhone,
                    distance: i.distance,
                    shopImg: i.shopImg,
                    shopLat: i.shopLat,
                    shopLng: i.shopLng
                  }
                }
              })
              console.log(markers)
              markerLayer.setStyles(styles)
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

    const handleBindShop = () => {
      http
        .post('/hbSeller/fans/bindShop', { shopId: shopDetail.value.id }, false)
        .then((res) => {
          if (res.code === '200') {
            Toast.success({
              message: '绑定成功',
              onClose: () => {
                markerLayer.remove(shopListRef.value.map((i) => i.id))
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                getHomeInfo(lat.value!, lng.value!)
              }
            })
            showBindSuccess.value = true
          } else {
            Toast.fail(res.msg)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }

    const handleClickUnbind = () => {
      Dialog.confirm({
        title: '提示',
        message:
          '尊敬的用户，解绑零售户，需在公众号留言“解绑零售户”，由客服人员后台操作处理，解绑前需领取未领取的奖品，如已领取请忽略，绑定关系解除后，已产生的相关活动数据会中断，需重新绑定零售户后参与店铺活动。',
        closeOnClickOverlay: true,
        confirmButtonText: '知道了'
      })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        })
    }

    const initTmap = () => {
      TMapGL().then(() => {
        console.log(lat.value, lng.value)
        initMapFlag = true
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
          geometries: []
        })

        //监听标注点击事件
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        markerLayer.on('click', function(evt: any) {
          console.log(evt.geometry)
          handleClickShop(evt.geometry.properties as ShopInfo)
        })

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        getHomeInfo(lat.value!, lng.value!)
      })
    }

    watch(
      () => lat.value,
      (nValue, oValue) => {
        if (lat.value && lng.value && oValue == null) {
          initTmap()
        }
      }
    )
    if (process.env.NODE_ENV !== 'production') {
      store.commit('setLng', 116.70602)
      store.commit('setLat', 39.860464)
    }
    onMounted(() => {
      if (process.env.NODE_ENV === 'production') {
        if (lat.value && lng.value) {
          initTmap()
          return
        }
      }
      if (!sessionStorage.getItem('CustomerHome')) {
        sessionStorage.setItem('CustomerHome', '1')
        window.location.reload()
        return
      }
    })

    return {
      showShopList,
      showNoBind,
      showBindPopup,
      shopListRef,
      showShopDetail,
      showBindSuccess,
      shopDetail,
      bindShop,
      handleClickListBtn,
      handleClickShop,
      handleBindShop,
      handleClickUnbind
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
.shop-detail-container {
  padding-top: 110px;
  margin: 0 17px -8vw;
  box-sizing: border-box;
  .shop-detail-title {
    height: 27px;
    font-size: 20px;
    font-weight: bold;
    line-height: 27px;
    color: #303133;
    margin-bottom: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    .btn-unbind {
      float: right;
      width: 67px;
      height: 26px;
      background: rgba(32, 105, 255, 0.06);
      border: 1px solid #2069ff;
      line-height: 26px;
      text-align: center;
      color: #2069ff;
      font-size: 12px;
      border-radius: 5px;
      box-sizing: border-box;
    }
  }
  .shop-detail-content {
    height: 27px;
    font-size: 14px;
    line-height: 27px;
    color: #303133;
    margin-bottom: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.bind-popup-container {
  margin: 108px 24px -15px;
  font-size: 14px;
  line-height: 24px;
  color: #303133;
  text-align: justify;
}
</style>
