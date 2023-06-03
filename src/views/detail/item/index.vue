<template>
  <div class="item" @click="onDetail(item)">
    <img :src="item.coverImgUrl" />
    <span>
      {{
        ChineseAndEnglish == 0
          ? item.title
          : ChineseAndEnglish == 1
          ? item.englishTitle
          : item.vietnameseTitle
      }}</span
    >
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
let router = useRouter();
const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
  ChineseAndEnglish: {
    type: Number,
    default: 0,
  },
});
const onDetail = (item) => {
  router.push(`/detail/${item.id}`);
};
</script>

<style lang="scss" scoped>
.item {
  margin: 10px 0;
  display: flex;
  height: 60px;
  img {
    width: 60px;
    height: auto;
  }
  span {
    font-size: 16px;
    letter-spacing: 1px;
    margin-left: 10px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    height: 32px;
    overflow: hidden;
  }
}
</style>
