<template>
  <top @clickTabs="clickTabs"></top>
  <div class="share">
    <div class="btn">
      <el-button @click="shareToFacebook()" type="warning">{{
        shareLink
      }}</el-button>
    </div>
    <div class="box">
      <div class="item" v-for="(item, index) in imageList" :key="index">
        <img :src="item" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import top from "@/components/top/index.vue";
import { getShareList } from "@/api/share/index.ts";
import { onMounted, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
let route = useRoute();
const state = reactive({
  imageList: [],
  shareLink: "分享链接",
});
const { imageList, shareLink } = toRefs(state);
const getShare = () => {
  let list = route.query;
  getShareList(list).then((res) => {
    state.imageList = res.coverImgUrlList;
  });
};

const shareToFacebook = () => {
  const url =
    "https://www.facebook.com/sharer/sharer.php?u=" +
    encodeURIComponent(window.location.href);
  window.open(url, "_blank");
};
const clickTabs = (shift) => {
  switch (shift) {
    case 0:
      state.shareLink = "分享链接";
      break;
    case 1:
      state.shareLink = "share link";
      break;
  }
};
onMounted(() => {
  getShare();
});
</script>

<style lang="scss" scoped>
.share {
  width: 1200px;
  margin: 0 auto;
  .btn {
    text-align: right;
  }
  .box {
    display: flex;

    flex-direction: column;
    align-items: center;
    .item {
      margin-top: 30px;
      margin: 10px 0;
      img {
        width: 750px;
        height: 500px;
      }
    }
    .not {
      width: 100%;
      height: 800px;
      display: flex;
      justify-content: center;
      flex-direction: column;
    }
  }
}
</style>
