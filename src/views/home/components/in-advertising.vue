<template>
  <div class="advertising-item" @click="onPath()">
    <img :src="item.imgUrl" alt="" />
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
});
const onPath = () => {
  window.open(props.item.linkUrl);
};
</script>

<style lang="scss" scoped>
.advertising-item {
  width: 300px;
  height: 100px;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
