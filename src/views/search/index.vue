<template>
  <div class="home">
    <div class="header">
      <div class="contes">
        <div class="left">
          <span>欢迎来到大雄潮鞋</span>
        </div>
        <div class="dropdown">
          <div class="dropbtn">
            <img src="@/assets/img/language.png" alt="" />
          </div>
          <div class="dropdown-content">
            <span
              v-for="(item, index) in options"
              :key="index"
              @click="onOut(item)"
              >{{ item.name }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="inner-box">
      <div class="logo">
        <img
          src="https://img2.tuguaishou.com/ips_templ_preview/9d/cd/08/lg_2997371_1589445573_5ebd03c599455.jpg!w220?auth_key=1684798200-0-0-9966045b0fcca1b546bb00937b80834d&v=1554825700"
          alt=""
        />
      </div>
      <div class="search">
        <input v-model="filter" placeholder="搜索商品" />
        <div class="request">
          <div style="font-size: 18px" class="svg">
            <Search style="width: 18px; height: 32px; margin-right: 8px" />
          </div>

          <span @click="getSearchList()">搜索</span>
        </div>
      </div>
      <div class="contact" @click="ADD()">联系我们</div>
    </div>

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
      <div v-show="status == 0">
        <all-item
          v-for="item in list.productList"
          :key="item.id"
          :item="item"
        ></all-item>
      </div>
      <div v-show="status == 1">
        <new-item
          v-for="item in list.newProductList"
          :key="item.id"
          :item="item"
        ></new-item>
      </div>

      <div v-show="status == 2">
        <video-item
          v-for="item in list.productList"
          :key="item.id"
          :item="item"
        ></video-item>
      </div>
      <div v-show="status == 3">
        <image-item
          v-for="item in list.productList"
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

<script setup lang="ts">
import FileSaver from "file-saver";
import { reactive, toRefs, onMounted } from "vue";
import AllItem from "./components/all-item.vue";
import NewItem from "./components/new-item.vue";
import ImageItem from "./components/image-item.vue";
import videoItem from "./components/video.item.vue";
import { getSearch } from "@/api/search/index.ts";
import { useRoute } from "vue-router";
let route = useRoute();
const state = reactive({
  currentPage: 1,
  totalPage: 0,
  filter: "" as any,
  list: [] as any,
  tabsList: [] as any,
  tList1: [
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
  tList2: [
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
  ],
  options: [
    {
      name: "Chinese",
      shift: 0,
    },
    {
      name: "English",
      shift: 1,
    },
  ],
  language: 0,
  status: 0,
});
const { currentPage, totalPage, filter, options, tabsList, status, list } =
  toRefs(state);
const getSearchList = () => {
  state.filter = route.query.filter;
  getSearch({ currentPage, filter: state.filter }).then((res) => {
    state.list = res;
  });
};
const onChange = () => {
  getSearchList();
};
const onSize = () => {
  getSearchList();
};

//切换语言
const onOut = (item) => {
  console.log(item.shift);
  switch (item.shift) {
    case 0:
      state.tabsList = state.tList1;
      break;
    case 1:
      state.tabsList = state.tList2;
      break;
  }
};
//切换tabs
const onTabs = (status) => {
  state.status = status;
};
//保存图片
const ADD = () => {
  // state.list.forEach((item) => {
  //   FileSaver.saveAs(item.image, "图片名称.jpg");
  // });
};

onMounted(() => {
  state.tabsList = state.tList1;
  getSearchList();
});
</script>

<style lang="scss" scoped>
.home {
  .header {
    border-bottom: 1px solid #dcdfe6;
    .contes {
      margin: 0 auto;
      width: 1200px;
      height: 50px;
      display: flex;
      align-items: center;
      font-size: 12px;
      justify-content: space-between;
      .left {
        span {
          padding: 10px;
        }
      }
      .dropdown {
        /* 下拉按钮样式 */
        .dropbtn {
          color: black;
          padding: 10px;
          font-size: 16px;
          border: none;
          cursor: pointer;
        }
        /* 下拉内容（默认隐藏） */
        .dropdown-content {
          display: none;
          position: absolute;
          background-color: #f9f9f9;
          border-radius: 10px;
          min-width: 160px;
          box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
          z-index: 1;
        }

        .dropdown-content span {
          color: black;
          padding: 12px 16px;
          text-decoration: none;
          display: block;
        }

        .dropdown-content span:hover {
          background-color: #f1f1f1;
        }
      }
      & > :hover .dropdown-content {
        display: block;
      }
    }
  }

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
    }
    .active {
      color: #fff;
      background-color: #ff3333;
    }
  }
  .inner-box {
    margin: 0 auto;
    height: 120px;
    width: 1200px;
    display: flex;
    align-items: center;
    .logo {
      img {
        height: 80px;
      }
    }
    .search {
      height: 40px;
      margin-left: 100px;
      border: 2px solid #ff3333;
      width: 700px;
      display: flex;
      input {
        margin-left: 20px;
        border: none;
        outline: none;
        width: 560px;
      }
      .request {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #ff3333;
        width: 120px;
        color: #fff;
        height: 40px;
        .svg {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
    .contact {
      padding: 14px 30px;
      background-color: #d74b00;
      border-color: #d74b00;
      margin-left: 50px;
      color: #fdfdfd;
    }
  }

  .box {
    width: 1200px;
    margin: 20px auto;
    div {
      display: flex;
      flex-wrap: wrap;
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
