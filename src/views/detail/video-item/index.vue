<template>
  <div class="video" v-if="videoUrl">
    <video
      :style="{ height: 100 + '%', width: 100 + '%' }"
      :controls="show"
      playsinline="playsinline"
      @mouseenter="onShow('true')"
      @mouseleave="onShow('false')"
      :src="videoUrl"
    ></video>
  </div>
  <div class="not" v-else>
    <img src="@/assets/R-C.png" alt="" />
  </div>
</template>

<script setup>
import { reactive, ref, toRefs } from "vue";
const props = defineProps({
  videoUrl: {
    type: Array,
    default: "",
  },
});
const state = reactive({
  show: false,
});
const { show } = toRefs(state);
const onShow = (type) => {
  state.show = type;
};
</script>

<style lang="scss" scoped>
.video {
  margin-top: 30px;
  width: 900px;
  height: 600px;
}
.not {
  width: 100%;
  height: 800px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
