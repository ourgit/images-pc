<template>
  <div class="item" @click="onDetails()">
    <div class="content">
      <video
        v-if="item.videoUrl"
        ref="myViodeo"
        :src="item.videoUrl"
        class="myViodeo"
        :controls="show"
        @mouseenter="onShow('true')"
        @mouseleave="onShow('false')"
        :style="{ height: 180 + 'px', width: show ? 100 + '%' : 180 + 'px' }"
      ></video>
      <div class="img" v-else>
        <img :src="item.coverImgUrl" alt="" />
      </div>
    </div>
    <div class="contes">
      <p class="text">
        {{
          ChineseAndEnglish == 0
            ? item.title
            : ChineseAndEnglish == 1
            ? item.englishTitle
            : item.vietnameseTitle
        }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { reactive, ref, toRefs } from "vue";
const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
  ChineseAndEnglish: {
    type: Number,
    default: 0,
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
  width: 199px;
  padding: 20px;
  border: 1px solid #d9d9d9;
  margin-right: -1px;
  margin-top: -1px;
  
  .content {
    display: flex;
    justify-content: center;
  }
  .img {
    img {
      width: 200px;
      height: auto;
    }
  }
  .contes {
    margin-top: 10px;
    .text {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      font-size: 16px;
      line-height: 16px;
      letter-spacing: 1px;
      color: #989898;
    }
  }
}
</style>
