<template>
  <div class="item" @click="onDetails()">
    <div class="content">
      <video
        ref="myViodeo"
        src="@/assets/1.mp4"
        class="myViodeo"
        :controls="show"
        @mouseenter="onShow('true')"
        @mouseleave="onShow('false')"
        :style="{ height: 180 + 'px', width: show ? 100 + '%' : 180 + 'px' }"
      ></video>
    </div>
    <div class="contes">
      <p class="text">{{ item.title }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { reactive, ref, toRefs } from "vue";
const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
});
const myViodeo = ref();
const state = reactive({
  show: false,
});
const { show } = toRefs(state);
let router = useRouter();
const onShow = (type) => {
  state.show = type;
};
const onDetails = () => {
  router.push(`/detail/${props.item.id}`);
};
</script>

<style scoped lang="scss">
.item {
  width: 200px;
  height: 250px;
  padding: 20px;
  border: 1px solid #d9d9d9;
  margin-right: -1px;
  margin-top: -1px;

  .content {
    display: flex;
    justify-content: center;
  }
  .contes {
    padding: 10px;
    .text {
      font-size: 16px;
      line-height: 16px;
      color: #989898;
    }
  }
}
</style>
