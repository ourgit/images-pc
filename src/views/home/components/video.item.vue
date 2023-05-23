<template>
  <div class="item">
    <div class="content">
      <video
        controls
        ref="myViodeo"
        src="@/assets/1.mp4"
        class="myViodeo"
      ></video>
      <div class="contes">
        <p class="text">{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs } from "vue";
const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
});
const myViodeo = ref();
</script>

<style scoped lang="scss">
.item {
  width: 300px;
  height: 300px;
  padding: 24px;
  border: 1px solid #d9d9d9;
  margin-right: -1px;
  margin-top: -1px;

  .content {
    .myViodeo {
      width: 100%;
      height: 220px;
    }
    .contes {
      padding: 10px;
    }
  }
}
</style>
