<template>
  <div class="item" @click="onDetails()">
    <img :src="item.coverImgUrl" alt="" />
    <div class="contes">
      <p class="text">{{ item.title }}</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
});
let router = useRouter();
const onDetails = () => {
  router.push(`/detail/${props.item.id}`);
};
</script>

<style scoped lang="scss">
.item {
  width: 199px;
  height: 250px;
  padding: 20px;
  border: 1px solid #d9d9d9;
  margin-right: -1px;
  margin-top: -1px;

  img {
    width: 200px;
    height: 198px;
  }
  .contes {
    margin-top: 10px;
    flex: 1;

    .text {
      font-size: 16px;
      line-height: 16px;
      color: #989898;
    }
  }
}
</style>
