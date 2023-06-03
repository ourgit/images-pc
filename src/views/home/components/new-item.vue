<template>
  <div class="item" @click="onDetails()">
    <img :src="item.coverImgUrl" alt="" />
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
let router = useRouter();
const onDetails = () => {
  router.push("/detail");
};
</script>

<style scoped lang="scss">
.item {
  width: 280px;
  height: 250px;
  padding: 20px;
  border: 1px solid #d9d9d9;
  margin-right: -1px;
  margin-top: -1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: auto;
    height: 198px;
  }
  .contes {
    flex: 1;
    margin-top: 10px;
    .text {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      font-size: 16px;
      letter-spacing: 1px;
      line-height: 16px;
      color: #989898;
    }
  }
}
</style>
