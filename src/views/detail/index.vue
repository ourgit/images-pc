<template>
  <div class="details">
    <div class="header">
      <div class="contes">
        <div class="left">
          <span>欢迎来到大雄潮鞋</span>
        </div>
        <div class="dropdown">
          <div class="dropbtn">
            <img src="@/assets/img/language.png" alt="" />
          </div>
          <div class="dropdown-content">
            <!-- <span
              v-for="(item, index) in options"
              :key="index"
              @click="onOut(item)"
              >{{ item.name }}</span
            > -->
          </div>
        </div>
      </div>
    </div>

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
          <div class="swiper-container" ref="cur">
            <div class="swiper-button-next"></div>
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

            <div class="swiper-button-prev"></div>
          </div>
        </div>
        <div class="right">
          <div class="title">
            {{ detailList.title }}
          </div>
          <div class="btn">
            <div class="download b" @click="onDownload()">
              <el-icon><Download /></el-icon>
              <span>下载相册</span>
            </div>
            <div class="copylink b" @click="shareToFacebook()">
              <el-icon><Share /></el-icon>
              <span>分享链接</span>
            </div>
          </div>
        </div>
      </div>
      <div class="theme">
        <div class="video">
          <video
            controls
            src="http://vod.v.jstv.com/2023/05/13/JSTV_JSWSNEW_1683986849831_4U3t97z_1133.mp4"
          ></video>
        </div>
        <div
          class="item"
          v-for="(item, index) in detailList.imagesUrl"
          :key="index"
        >
          <img :src="item" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, watch, nextTick, onMounted } from "vue";
import Swiper from "swiper";
import { useRoute } from "vue-router";
import { getProductDetail } from "@/api/product/index.ts";
import FileSaver from "file-saver";
let route = useRoute();
const mask = ref();
const big = ref();
const cur = ref();
const state = reactive({
  detailList: [] as any,
  image: "",
});
const { detailList, image } = toRefs(state);
const getDetail = () => {
  let id = route.params.id;
  getProductDetail({ id }).then((res) => {
    res.imagesUrl = JSON.parse(res.imagesUrl);
    state.image = res.imagesUrl[0];
    state.detailList = res;
    console.log(res);
    console.log(state.detailList);
  });
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
  // state.detailList.imagesUrl.forEach((item, index) => {
  //   FileSaver.saveAs(item, `${index}.jpg`);
  // });
};
const haVideo = () => {
  // var name = "download";
  // var url =
  //   "http://vod.v.jstv.com/2023/05/13/JSTV_JSWSNEW_1683986849831_4U3t97z_1133.mp4";
  // var suffix = url.substring(url.lastIndexOf("."), url.length);
  // //跳过浏览直接下载
  // fetch(url)
  //   .then((res) => res.blob())
  //   .then((blob) => {
  //     const a = document.createElement("a");
  //     const objectUrl = window.URL.createObjectURL(blob);
  //     a.download = name;
  //     a.href = objectUrl;
  //     a.click();
  //     window.URL.revokeObjectURL(objectUrl);
  //   });
  const videoUrl =
    "http://vod.v.jstv.com/2023/05/13/JSTV_JSWSNEW_1683986849831_4U3t97z_1133.mp4"; // 替换为你的视频文件的实际URL

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
watch(image, async () => {
  await nextTick(() => {
    new Swiper(cur.value, {
      // 如果需要前进后退按钮
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      //显示几个图片设置
      slidesPerView: 3,
      //每一次切换图片个数
      slidesPerGroup: 1,
    });
  });
});
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
  state.image = item.imgUrl;
};
onMounted(() => {
  getDetail();
});
</script>

<style scoped lang="scss">
.details {
  .inner-box {
    margin: 0 auto;
    height: 120px;
    width: 1200px;
    display: flex;
    align-items: center;
    .logo {
      img {
        height: 80px;
      }
    }
    .search {
      height: 40px;
      margin-left: 100px;
      border: 2px solid #ff3333;
      width: 700px;
      display: flex;
      input {
        margin-left: 20px;
        border: none;
        outline: none;
        width: 560px;
      }
      .request {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #ff3333;
        width: 120px;
        color: #fff;
        height: 40px;
        .svg {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
    .contact {
      padding: 14px 30px;
      background-color: #d74b00;
      border-color: #d74b00;
      margin-left: 50px;
      color: #fdfdfd;
    }
  }
  .header {
    border-bottom: 1px solid #dcdfe6;
    .contes {
      margin: 0 auto;
      width: 1200px;
      height: 50px;
      display: flex;
      align-items: center;
      font-size: 12px;
      justify-content: space-between;
      .left {
        span {
          padding: 10px;
        }
      }
      .dropdown {
        /* 下拉按钮样式 */
        .dropbtn {
          color: black;
          padding: 10px;
          font-size: 16px;
          border: none;
          cursor: pointer;
        }
        /* 下拉内容（默认隐藏） */
        .dropdown-content {
          display: none;
          position: absolute;
          background-color: #f9f9f9;
          border-radius: 10px;
          min-width: 160px;
          box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
          z-index: 1;
        }

        .dropdown-content span {
          color: black;
          padding: 12px 16px;
          text-decoration: none;
          display: block;
        }

        .dropdown-content span:hover {
          background-color: #f1f1f1;
        }
      }
      & > :hover .dropdown-content {
        display: block;
      }
    }
  }
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

        .swiper-container {
          height: 56px;
          width: 401.5px;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          align-items: center;
          overflow: hidden;
          .swiper-wrapper {
            flex: 1;
            display: flex;
            max-width: 375.5px;

            .swiper-slide {
              width: 56px;
              height: 56px;
              margin: 0 20px;
              img {
                width: 100%;
                height: 100%;
                border: 1px solid #ccc;
                padding: 2px;
                width: 50px;
                height: 50px;

                &.active {
                  border: 2px solid #f60;
                  padding: 1px;
                }
              }
            }
          }

          .swiper-button-next {
            z-index: 9999;
          }

          .swiper-button-prev {
            z-index: 9999;
          }

          .swiper-button-next,
          .swiper-button-prev {
            box-sizing: border-box;
            width: 12px;
            height: 56px;
            background: rgb(235, 235, 235);
            border: 1px solid rgb(204, 204, 204);
            top: 0;
            margin-top: 0;
            &::after {
              font-size: 12px;
            }
          }
        }
      }
      .right {
        display: flex;
        flex-direction: column;
        margin-left: 30px;
        font-weight: 900;
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
    }
    .theme {
      margin-top: 30px;
      border: 1px solid #e8e8e8;
      display: flex;
      flex-direction: column;
      .video {
        width: 100%;
        height: 960px;
      }
      .item {
        // height: 400px;
      }
    }
  }
}
</style>
