<template>
  <div class="item" @click="onDetails()">
    <div class="content">
      <img :src="item.coverImgUrl" alt="" />
      <div class="btn">
        <div class="left">{{ item.imagesUrl.length }}</div>
        <div class="right">
          <el-icon size="24" @click.stop="onDownload()">
            <Download />
          </el-icon>
          <el-icon size="24" @click.stop="shareToFacebook()">
            <Share />
          </el-icon>
        </div>
      </div>
    </div>
    <div class="pv-num">
      {{ views }} {{ item.pv }}
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import FileSaver from "file-saver";
import { computed } from "vue"
const props = defineProps({
  item: { type: Object, default: {} },
  ChineseAndEnglish: {
    type: Number,
    default: 0,
  },
});
let router = useRouter();
//下载
const onDownload = () => {
  props.item.imagesUrl.forEach((item, index) => {
    new Promise((role, rolt) => {
      setTimeout(() => {
        FileSaver.saveAs(item, `图片${index}.jpg`);
      }, 1000);
    });
  });
};
//分享
const shareToFacebook = () => {
  const url =
    "https://www.facebook.com/sharer/sharer.php?u=" +
    encodeURIComponent(`https://sshoes.co/#/detail/${props.item.id}`);
  window.open(url, "_blank");
};
const onDetails = () => {
  router.push(`/detail/${props.item.id}`);
};
const views = computed(() => {
  const pvLanguage = [
    {
      name: "浏览量",
    },
    {
      name: "views",
    },
    {
      name: "Số lượt xem",
    },
  ];
  switch (props.ChineseAndEnglish) {
    case 0:
      return pvLanguage[0].name
    case 1:
      return pvLanguage[1].name
    case 2:
      return pvLanguage[2].name
  }
});
</script>

<style scoped lang="scss">
.item {
  width: 280px;
  padding: 20px;
  border: 1px solid #d9d9d9;
  margin-right: -1px;
  margin-top: -1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .pv-num {
    align-self: flex-end;
    color: #d9d9d9;
    margin-top: 10px;
  }

  .content {
    position: relative;
    display: flex;

    flex-direction: column;
    align-items: center;

    img {
      width: auto;
      height: 200px;
    }

    .btn {
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 999;
      padding: 5px 10px;
      width: 92%;
      color: #d9d9d9;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}</style>
