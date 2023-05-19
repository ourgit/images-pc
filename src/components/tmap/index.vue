<template>
  <el-row :gutter="35">
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
      <el-autocomplete v-model="address" :fetch-suggestions="querySearch" placeholder="请输入详细地址" :trigger-on-focus="false" @input="querySearch" class="w100" @select="handleSelect" />
    </el-col>
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
      <div ref="mapRef" :style="{ width: width + 'px', height: height + 'px' }" />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { keywordSearch, getDetailByLocation } from '@/api/system/map/index'
const props = defineProps({
  width: {
    type: Number,
    default: 600,
  },
  height: {
    type: Number,
    default: 600,
  },
})

const emit = defineEmits(['onChange'])

const mapRef = ref()
const dataMap = reactive({
  map: '',
  markerLayer: '',
  latitude: '', //纬度
  lngitude: '', //经度
})
const TMap = (window as any).TMap

const initMap = (latitude: any, lngitude: any) => {
  dataMap.latitude = latitude
  dataMap.lngitude = lngitude
  let center = new TMap.LatLng(latitude, lngitude)
  dataMap.map = new TMap.Map(mapRef.value, {
    center: center, //设置地图中心点坐标
    zoom: 11, //设置地图缩放级别
    viewMode: '2D',
  })
  ;(dataMap.map as any).on('click', clickHandler) // 绑定点击地图获取地理位置的事件
  markerLayer() // 标记地图
}
// 重载地图
const reloadMap = () => {
  ;(mapRef.value as any).innerHTML = ''
  dataMap.markerLayer = ''
  let center = new TMap.LatLng(dataMap.latitude, dataMap.lngitude)
  dataMap.map = new TMap.Map(mapRef.value, {
    center: center, //设置地图中心点坐标
    viewMode: '2D',
  })
  markerLayer()
}

// 点击获取经纬度
const clickHandler = (evt: any) => {
  dataMap.latitude = evt.latLng.getLat().toFixed(6)
  dataMap.lngitude = evt.latLng.getLng().toFixed(6)
  ;(dataMap.map as any).setCenter(
    new TMap.LatLng(dataMap.latitude, dataMap.lngitude)
  )
  getAddressByLocation()
  reloadMap()
}

//标记地图
const markerLayer = () => {
  dataMap.markerLayer = new TMap.MultiMarker({
    map: dataMap.map, //指定地图容器
    //样式定义
    styles: {
      myStyle: new TMap.MarkerStyle({
        width: 25, // 点标记样式宽度（像素）
        height: 35, // 点标记样式高度（像素）
        background: 'pink',
        anchor: { x: 16, y: 32 },
      }),
    },
    //点标记数据数组
    geometries: [
      {
        id: '1', //点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id
        styleId: 'myStyle', //指定样式id
        position: new TMap.LatLng(dataMap.latitude, dataMap.lngitude), //点标记坐标位置
      },
    ],
  })
}
const address = ref('')

//查询关键字
const querySearch = async (queryString: string, callback: any) => {
  try {
    let params = {
      keyword: queryString,
    }
    let { data } = await keywordSearch(params)
    const results = data.map((item: any) => {
      let obj = {
        value: item.address,
        address: item.address,
        location: item.location,
      }
      return obj
    })
    if (callback) {
      callback(results)
    }
  } catch (e) {
    console.log(e)
  }
}

//点击选择关键字
const handleSelect = (val: any) => {
  dataMap.latitude = val.location.lat.toFixed(6)
  dataMap.lngitude = val.location.lng.toFixed(6)
  ;(dataMap.map as any).setCenter(
    new TMap.LatLng(dataMap.latitude, dataMap.lngitude)
  )
  const data = {
    address: val.address,
    latitude: dataMap.latitude,
    lngitude: dataMap.lngitude,
  }
  emit('onChange', data)
  reloadMap()
}

//根据经纬度获取地址
const getAddressByLocation = async () => {
  try {
    let params = {
      location: dataMap.latitude + ',' + dataMap.lngitude,
    }
    let { result } = await getDetailByLocation(params)
    if (result.address) {
      const data = {
        address: result.address + result.formatted_addresses.recommend,
        latitude: dataMap.latitude,
        lngitude: dataMap.lngitude,
      }
      emit('onChange', data)
    }
    console.log(result)
  } catch (e) {
    console.log(e)
  }
}

// 暴露变量
defineExpose({
  initMap,
})
</script>
<style lang="scss" scoped></style>
