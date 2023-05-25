<template>
  <div class="item">
    <img :src="item.imagesUrl" @click="onDetail(item)" />
    <span>{{ item.title }}</span>
  </div>
</template>

<script setup lang="ts">
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
    width: 50px;
    height: 50px;
  }
  span {
    font-size: 12px;
    margin-left: 10px;
  }
}
</style>
