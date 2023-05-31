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
    <div class="advertising">
      <in-advertising
        v-for="item in AdvertisingList"
        :key="item.id"
        :item="item"
      ></in-advertising>
    </div>
    <div class="box">
      <div class="left">
        <div
          class="tabs-name"
          v-for="(item, index) in categoryList"
          :key="index"
          :class="[item.id == categoryId ? 'active' : '']"
          @click="onCate(item)"
        >
          {{
            ChineseAndEnglish == 0
              ? item.name
              : ChineseAndEnglish == 1
              ? item.enName
              : item.viName
          }}
        </div>
      </div>
      <div class="right">
        <div v-show="status == 0" class="arrange">
          <all-item
            v-for="item in productList"
            :key="item.id"
            :item="item"
            :ChineseAndEnglish="ChineseAndEnglish"
          ></all-item>
          <div v-if="productList == 0" class="out">亲~~~暂无商品</div>
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
          <div v-if="productList == 0" class="out">亲~~~暂无商品</div>
        </div>
        <div v-show="status == 3" class="arrange">
          <image-item
            v-for="item in productList"
            :key="item.id"
            :item="item"
          ></image-item>
          <div v-if="productList == 0" class="out">亲~~~暂无商品</div>
        </div>
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
import { reactive, toRefs, onMounted } from "vue";
import AllItem from "./components/all-item.vue";
import NewItem from "./components/new-item.vue";
import ImageItem from "./components/image-item.vue";
import videoItem from "./components/video.item.vue";
import InAdvertising from "./components/in-advertising.vue";
import { getProductList } from "@/api/product/index.ts";
import { getAdvertising } from "@/api/advertising/index.ts";
import { getCategoryList } from "@/api/product/categories/index.ts";
import top from "@/components/top/index.vue";
const state = reactive({
  currentPage: 1,
  totalPage: 0,
  productList: [],
  newProductList: [],
  categoryList: [],
  status: 0,
  ChineseAndEnglish: 0,
  AdvertisingList: [],
  categoryId: 0,
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
});
const {
  currentPage,
  totalPage,
  tabsList,
  status,
  productList,
  newProductList,
  ChineseAndEnglish,
  categoryList,
  AdvertisingList,
  categoryId,
} = toRefs(state);
const onChange = () => {
  ProductList();
};
const onSize = () => {
  ProductList();
};
//广告
const getAdvertisingList = () => {
  getAdvertising().then((res) => {
    state.AdvertisingList = res.list;
  });
};
//商品分类
const getCategory = () => {
  getCategoryList().then((res) => {
    state.categoryList = res.list;
  });
};
//商品
const ProductList = () => {
  getProductList({
    page: state.currentPage,
    categoryId: state.categoryId,
  }).then((res) => {
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

//切换tabs
const onTabs = (status) => {
  state.currentPage = 1;
  state.status = status;
  state.categoryId = 0;
  ProductList();
};
//切换分类
const onCate = (item) => {
  state.currentPage = 1;
  state.categoryId = item.id;
  ProductList();
};
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
onMounted(() => {
  ProductList();
  getCategory();
  getAdvertisingList();
});
</script>

<style lang="scss" scoped>
.home {
  .tabs {
    width: 1200px;
    margin: 0 auto;
    border: 1px solid #e2e2e2;
    background: #f2f2f2;

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

  .advertising {
    width: 1200px;
    margin: 10px auto;
    height: 100px;
    overflow: hidden;
    //#acc
    display: flex;
    justify-content: space-between;
  }
  .box {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    .left {
      margin-top: -1px;
      margin-right: 10px;

      .tabs-name {
        background: #f2f2f2;
        padding: 0 20px;
        width: 180px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 45px;
        color: #737373;
      }
      .active {
        background: #79d2a6;
        color: #fff;
      }
    }

    .right {
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
}
.btn {
  margin-top: 100px;
  width: 1200px;
  margin: 20px auto;
  display: flex;
  justify-content: center;
}
</style>
