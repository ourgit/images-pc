<template>
  <div class="item" @click="onDetail(item)">
    <img :src="item.coverImgUrl" />
    <span>{{ item.title }}</span>
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
});
const onDetail = (item) => {
  router.push(`/detail/${item.id}`);
};
</script>

<style lang="scss" scoped>
.item {
  margin: 10px 0;
  display: flex;
  height: 114.5px;
  img {
    width: 60px;
    height: 60px;
  }
  span {
    display: block;
    font-size: 16px;
    height: 60px;

    letter-spacing: 1px;
    margin-left: 10px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
}
</style>
