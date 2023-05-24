<template>
  <div v-if="imagesUrl.length != 0">
    <div class="item" v-for="(item, index) in imagesUrl" :key="index">
      <img :src="item" alt="" />
    </div>
  </div>
  <div class="not" v-else>
    <img src="@/assets/R-C.png" alt="" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  imagesUrl: {
    type: Array,
    default: [],
  },
});
</script>

<style scoped lang="scss">
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
</style>
