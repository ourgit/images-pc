<template>
  <div class="home">
    <top @clickTabs="clickTabs"></top>
    <div class="tabs">
      <div
        class="tabs-name"
        :class="[status == item.status ? ' active' : '']"
        v-for="(item, index) in tabsList"
        :key="index"
        @click="onTabs(item.status)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="box">
      <div v-show="status == 0" class="arrange">
        <all-item
          v-for="item in productList"
          :key="item.id"
          :item="item"
          :ChineseAndEnglish="ChineseAndEnglish"
        ></all-item>
      </div>
      <div v-show="status == 1" class="arrange">
        <new-item
          v-for="item in newProductList"
          :key="item.id"
          :item="item"
          :ChineseAndEnglish="ChineseAndEnglish"
        ></new-item>
        <div v-if="newProductList == 0" class="out">亲~~~今天暂无上新</div>
      </div>
      <div v-show="status == 2" class="arrange">
        <video-item
          v-for="item in productList"
          :key="item.id"
          :item="item"
          :ChineseAndEnglish="ChineseAndEnglish"
        ></video-item>
      </div>
      <div v-show="status == 3" class="arrange">
        <image-item
          v-for="item in productList"
          :key="item.id"
          :item="item"
        ></image-item>
      </div>
    </div>
    <div class="btn">
      <el-pagination
        layout="prev, pager, next, jumper"
        :page-count="totalPage"
        v-model:currentPage="currentPage"
        @current-change="onChange()"
        @size-change="onSize()"
      />
    </div>
  </div>
</template>

<script setup>
import top from "@/components/top/index.vue";
import { reactive, toRefs, onMounted, watch } from "vue";
import AllItem from "./components/all-item.vue";
import NewItem from "./components/new-item.vue";
import ImageItem from "./components/image-item.vue";
import videoItem from "./components/video.item.vue";
import { getSearch } from "@/api/search/index.ts";
import { useRoute, useRouter } from "vue-router";
let route = useRoute();
let router = useRouter();
import { onBeforeRouteUpdate } from "vue-router";
onBeforeRouteUpdate((to) => {
  state.filter = to.query.filter;
  getSearchList();
});
const state = reactive({
  currentPage: 1,
  totalPage: 0,

  productList: [],
  newProductList: [],
  tabsList: [
    {
      name: "全部",
      status: 0,
    },
    {
      name: "新品",
      status: 1,
    },
    {
      name: "小视频",
      status: 2,
    },
    {
      name: "图片",
      status: 3,
    },
  ],
  status: 0,
  ChineseAndEnglish: 0,
});
const {
  currentPage,
  totalPage,

  tabsList,
  status,
  newProductList,
  productList,
  ChineseAndEnglish,
} = toRefs(state);
const getSearchList = () => {
  getSearch({ page: state.currentPage, filter: state.filter }).then((res) => {
    res.newProductList.forEach((item) => {
      item.imagesUrl = item.imagesUrl ? JSON.parse(item.imagesUrl) : [];
    });
    res.productList.forEach((item) => {
      item.imagesUrl = item.imagesUrl ? JSON.parse(item.imagesUrl) : [];
    });
    state.newProductList = res.newProductList;
    state.productList = res.productList;
    state.totalPage = res.pages;
  });
};
const onChange = () => {
  getSearchList();
};
const onSize = () => {
  getSearchList();
};

//切换语言
const clickTabs = (shift) => {
  const tList1 = [
    {
      name: "全部",
      status: 0,
    },
    {
      name: "新品",
      status: 1,
    },
    {
      name: "小视频",
      status: 2,
    },
    {
      name: "图片",
      status: 3,
    },
  ];
  const tList2 = [
    {
      name: "all",
      status: 0,
    },
    {
      name: "New Products",
      status: 1,
    },
    {
      name: "video",
      status: 2,
    },
    {
      name: "picture",
      status: 3,
    },
  ];
  const tList3 = [
    {
      name: "Tất cả",
      status: 0,
    },
    {
      name: "Lên mới",
      status: 1,
    },
    {
      name: "video",
      status: 2,
    },
    {
      name: "Hình ảnh",
      status: 3,
    },
  ];
  switch (shift) {
    case 0:
      state.tabsList = tList1;
      state.ChineseAndEnglish = 0;
      break;
    case 1:
      state.tabsList = tList2;
      state.ChineseAndEnglish = 1;
      break;
    case 2:
      state.tabsList = tList3;
      state.ChineseAndEnglish = 2;
      break;
  }
};
//切换tabs
const onTabs = (status) => {
  state.currentPage = 1;
  getSearchList();
  state.status = status;
};

onMounted(() => {
  state.filter = route.query.filter;
  getSearchList();
});
</script>

<style lang="scss" scoped>
.home {
  .tabs {
    width: 1200px;
    margin: 0 auto;
    border: 1px solid #e2e2e2;
    background: #fbfbfb;

    display: flex;
    align-items: center;
    .tabs-name {
      font-size: 16px;
      padding: 10px 20px;
      color: #4b4b4b;
    }
    .active {
      color: #fff;
      background-color: #8cd9b3;
    }
  }

  .box {
    width: 1200px;
    margin: 20px auto;
    .arrange {
      display: flex;
      flex-wrap: wrap;
      .out {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: center;
      }
    }
  }
}
.btn {
  margin-top: 100px;
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
</style>
