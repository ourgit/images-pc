<template>
  <div class="item">
    <img src="@/assets/vue.svg" />
    <span>测试测试测试测试测试测试测试</span>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
});
</script>

<style lang="scss" scoped>
.item {
  margin: 10px 0;
  display: flex;
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
