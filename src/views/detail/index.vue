<template>
  <div class="details">
    <top @clickTabs="clickTabs"></top>
    <div class="content">
      <div class="top">
        <div class="left">
          <div class="spec-preview">
            <img :src="image" />
            <div class="event" @mousemove="handler"></div>
            <div class="big">
              <img :src="image" ref="big" />
            </div>
            <!-- 遮罩层 -->
            <div class="mask" ref="mask"></div>
          </div>
          <div class="swiper-box">
            <div class="swiper-container" ref="cur">
              <div class="swiper-wrapper">
                <div
                  class="swiper-slide"
                  v-for="(item, index) in detailList.imagesUrl"
                  :key="index"
                  @click="onPitch(item)"
                >
                  <img :src="item" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="middle">
          <div class="title">
            {{ detailList.title }}
          </div>
          <div class="btn">
            <div class="download b" @click="onDownload()">
              <el-icon><Download /></el-icon>
              <span>{{ reform.DownloadVideo }}</span>
            </div>
            <div class="copylink b" @click="shareToFacebook()">
              <el-icon><Share /></el-icon>
              <span>{{ reform.transmit }}</span>
            </div>
          </div>
        </div>
        <div class="right">
          <in-item
            v-for="(item, index) in RecommendList"
            :key="index"
            :item="item"
          ></in-item>
        </div>
      </div>
      <div class="theme">
        <div class="tabs">
          <span @click="onShow('0')" :class="[show == 0 ? 'active' : '']">{{
            reform.video
          }}</span>
          <span @click="onShow('1')" :class="[show == 1 ? 'active' : '']">{{
            reform.photo
          }}</span>
        </div>
        <div class="box">
          <video-item
            v-show="show == 0"
            :videoUrl="detailList.videoUrl"
          ></video-item>
          <image-item
            v-show="show == 1"
            :imagesUrl="detailList.imagesUrl"
          ></image-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, watch, nextTick, onMounted } from "vue";
import Swiper from "swiper";
import { useRoute } from "vue-router";
import { getProductDetail, getRecommendList } from "@/api/product/index.ts";
import FileSaver from "file-saver";
import VideoItem from "./video-item/index.vue";
import ImageItem from "./img-item/index.vue";
import InItem from "./item/index.vue";
import top from "@/components/top/index.vue";
let route = useRoute();

const mask = ref();
const big = ref();
const cur = ref();
const state = reactive({
  detailList: [] as any,
  image: "",
  show: 0 as any,
  reform: {
    video: "视频",
    photo: "相册",
    DownloadVideo: "下载视频/相册",
    transmit: "分享链接",
  },
  RecommendList: [],
});
const { detailList, image, show, reform, RecommendList } = toRefs(state);
//详情
const getDetail = () => {
  let id = route.params.id;
  getProductDetail({ id }).then((res) => {
    res.imagesUrl = JSON.parse(res.imagesUrl);
    state.image = res.imagesUrl[0];
    state.detailList = res;
  });
};
//推荐
const geRecommend = () => {
  let id = route.params.id;
  getRecommendList({ id }).then((res) => {
    state.RecommendList = res.list;
  });
};
//翻译
const clickTabs = (shift) => {
  let ru1 = {
    video: "视频",
    photo: "相册",
    DownloadVideo: "下载视频/相册",
    transmit: "分享链接",
  };
  let ru2 = {
    video: "video",
    photo: "photo",
    DownloadVideo: "Download",
    transmit: "share link",
  };
  switch (shift) {
    case 0:
      state.reform = ru1;
      break;
    case 1:
      state.reform = ru2;
      break;
  }
};
//切换
const onShow = (type) => {
  state.show = type;
};
//分享
const shareToFacebook = () => {
  const url =
    "https://www.facebook.com/sharer/sharer.php?u=" +
    encodeURIComponent(window.location.href);
  window.open(url, "_blank");
};
//下载
const onDownload = () => {
  state.detailList.videoUrl != "" ? haVideo() : "";
  state.detailList.imagesUrl.forEach((item: any, index) => {
    new Promise((role, rolt) => {
      // const link = document.createElement("a");
      // link.href = item;
      // link.download = `image${index + 1}.jpg`; // 下载时的文件名
      // link.style.display = "none";
      // // 将链接添加到文档中并模拟点击
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
      setTimeout(() => {
        FileSaver.saveAs(item, `图片${index}.jpg`);
      }, 1000);
    });
  });
};
const getBase64Image = (img) => {
  let canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  let ctx = canvas.getContext("2d");
  ctx?.drawImage(img, 0, 0, img.width, img.height);
  let dataURL = canvas.toDataURL("image/png");
  return dataURL;
};

const haVideo = () => {
  const videoUrl = state.detailList.videoUrl;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", videoUrl, true);
  xhr.responseType = "blob";
  xhr.onload = function () {
    if (this.status === 200) {
      const videoBlob = this.response;
      FileSaver.saveAs(videoBlob, "video.mp4"); // 下载文件的名称
    }
  };

  xhr.send();
};
watch(
  route,
  (newValue, oldValue) => {
    getDetail();
  },
  { immediate: true }
);
const handler = (event: any) => {
  let Amask = mask.value;
  let Aabig = big.value;
  let left = event.offsetX - Amask.offsetWidth / 2;
  let top = event.offsetY - Amask.offsetHeight / 2;
  //约束范围
  if (left <= 0) left = 0;
  if (left >= Amask.offsetWidth) left = Amask.offsetWidth;
  if (top <= 0) top = 0;
  if (top >= Amask.offsetHeight) top = Amask.offsetHeight;
  //修改元素的left|top属性值
  Amask.style.left = left + "px";
  Amask.style.top = top + "px";
  Aabig.style.left = -2 * left + "px";
  Aabig.style.top = -2 * top + "px";
};
const onPitch = (item) => {
  state.image = item;
};
onMounted(() => {
  getDetail();
  geRecommend();
});
</script>

<style scoped lang="scss">
.details {
  .content {
    width: 1200px;
    margin: 20px auto;

    .top {
      display: flex;
      padding: 20px;
      border: 1px solid #e8e8e8;
      .left {
        position: relative;
        width: 400px;
        .spec-preview {
          position: relative;
          width: 400px;
          height: 400px;
          border: 1px solid #ccc;

          img {
            width: 100%;
            height: 100%;
          }

          .event {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 998;
          }

          .mask {
            width: 50%;
            height: 50%;
            background-color: rgba(0, 255, 0, 0.3);
            position: absolute;
            left: 0;
            top: 0;
            display: none;
          }

          .big {
            width: 100%;
            height: 100%;
            position: absolute;
            top: -1px;
            left: 100%;
            border: 1px solid #aaa;
            overflow: hidden;
            z-index: 998;
            display: none;
            background: white;

            img {
              width: 200%;
              max-width: 200%;
              height: 200%;
              position: absolute;
              left: 0;
              top: 0;
            }
          }

          .event:hover ~ .mask,
          .event:hover ~ .big {
            display: block;
          }
        }
        .swiper-box {
          height: 52px;
          overflow: hidden;
          .swiper-container {
            width: 400px;
            overflow-x: auto;
            .swiper-wrapper {
              display: flex;
              img {
                margin: 0 10px;
                width: 80px;
                height: 60px;
              }
            }
          }
        }
      }
      .middle {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 20px;
        justify-content: space-between;
        .title {
          font-size: 20px;
          color: #131313;
        }
        .btn {
          display: flex;
          justify-content: center;
          .b {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 150px;
            height: 45px;
            color: #fff;
          }
          .download {
            border-top-left-radius: 20px;
            border-bottom-left-radius: 20px;
            background: linear-gradient(
              90deg,
              rgb(255, 119, 0),
              rgb(255, 73, 0)
            );
            box-shadow: rgba(255, 119, 0, 0.2) 0px 9px 13px 0px;
          }
          .copylink {
            border-top-right-radius: 20px;
            border-bottom-right-radius: 20px;
            background: linear-gradient(
              90deg,
              rgb(255, 203, 0),
              rgb(255, 148, 2)
            );
            box-shadow: rgba(255, 203, 0, 0.2) 0px 9px 13px 0px;
          }
        }
      }
      .right {
        margin-left: 20px;
        width: 200px;
        // background-color: #f6f6f6;
        border-left: 1px solid #f3f3f3;
        display: flex;
        flex-direction: column;
        padding: 10px;
        overflow: hidden;
      }
    }
    .theme {
      margin-top: 30px;
      border: 1px solid #e8e8e8;
      display: flex;
      flex-direction: column;
      .tabs {
        background-color: #fafafa;
        height: 50px;
        border-bottom: 1px solid #fdfdfd;
        display: flex;
        align-items: center;
        width: 100%;
        span {
          text-align: center;
          line-height: 50px;
          font-size: 16px;
          color: #3c3c3c;
          width: 100px;

          border: 1px solid #f6f6f6;
        }
        & > .active {
          background-color: #ff3333;
          color: #f6f6f6;
        }
      }
      .box {
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
