<template>
  <div class="item" @click="onDetails()">
    <div class="content">
      <video v-if="item.videoUrl" ref="myViodeo" :src="item.videoUrl" class="myViodeo" :controls="show"
        @mouseenter="onShow('true')" @mouseleave="onShow('false')"
        :style="{ height: 180 + 'px', width: show ? 100 + '%' : 180 + 'px' }"></video>
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
    <div class="pv-num">
     {{ views }} {{ item.pv }}
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { reactive, ref, toRefs ,computed} from "vue";
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
  height: 250px;
  padding: 20px;
  border: 1px solid #d9d9d9;
  margin-right: -1px;
  margin-top: -1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .pv-num {
    align-self: flex-end;
    color: #989898;
  }

  .content {
    display: flex;
    justify-content: center;
  }

  .img {
    img {
      width: auto;
      height: 198px;
    }
  }

  .contes {
    padding: 10px;

    .text {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      letter-spacing: 1px;
      font-size: 16px;
      line-height: 16px;
      color: #989898;
    }
  }
}
</style>
