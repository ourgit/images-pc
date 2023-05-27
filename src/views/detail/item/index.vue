<template>
  <div class="item" @click="onDetail(item)">
    <img :src="item.coverImgUrl" />
    <span>{{ item.title }}</span>
  </div>
</template>

<script setup >
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
    width: 80px;
    height: 100px;
  }
  span {
    font-size: 16px;
    margin-left: 10px;
  }
}
</style>
