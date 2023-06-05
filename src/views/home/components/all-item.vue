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
    <div class="pv-num">
      {{ views }}{{ item.pv }}
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { computed } from "vue"
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
  router.push(`/detail/${props.item.id}`);
};
const views = computed(() => {
  const pvLanguage = [
    {
      name: "浏览量",
    },
    {
      name: "views",
    },
    {
      name: "Số lượt xem",
    },
  ];
  switch (props.ChineseAndEnglish) {
    case 0:
      return pvLanguage[0].name
    case 1:
      return pvLanguage[1].name
    case 2:
      return pvLanguage[2].name
  }
});

</script>

<style scoped lang="scss">
.item {
  width: 280px;
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

  .pv-num {
    align-self: flex-end;
    margin-top: 10px;
    color: #989898;
  }

  .contes {
    margin-top: 10px;
    flex: 1;

    .text {
      font-size: 16px;
      letter-spacing: 1px;
      line-height: 16px;
      color: #989898;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
  }
}
</style>
