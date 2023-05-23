<template>
  <div class="item" @click="onDetails()">
    <img :src="item.coverImgUrl" alt="" />
    <div class="contes">
      <div>
        <p>{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
});
let router = useRouter();
const onDetails = () => {
  router.push("/detail");
};
</script>

<style scoped lang="scss">
.item {
  width: 250px;
  height: 300px;
  padding: 24px;
  border: 1px solid #d9d9d9;
  margin-right: -1px;
  margin-top: -1px;
  border-collapse: collapse !important;
  img {
    width: 100%;
    height: 250px;
  }
  .contes {
    flex: 1;

    .text {
      font-size: 16px;
      line-height: 16px;
      color: #8888;
    }
  }
}
</style>
