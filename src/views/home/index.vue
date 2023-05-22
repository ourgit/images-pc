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
    <div class="inner">
      <div class="box">
        <div class="logo">
          <img
            src="https://img2.tuguaishou.com/ips_templ_preview/9d/cd/08/lg_2997371_1589445573_5ebd03c599455.jpg!w220?auth_key=1684798200-0-0-9966045b0fcca1b546bb00937b80834d&v=1554825700"
            alt=""
          />
        </div>
        <div class="search">
          <input v-model="input" placeholder="搜索商品" />
          <div class="request">
            <div style="font-size: 18px" class="svg">
              <Search style="width: 18px; height: 32px; margin-right: 8px" />
            </div>

            <span>搜索</span>
          </div>
        </div>
        <div class="contact" @click="ADD()">联系我们</div>
      </div>
    </div>
    <div class="tabs">
      <div
        class="tabs-name active"
        v-for="(item, index) in tabsList"
        :key="index"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="box">
      <div class="item" @click="onDetails()">
        <img
          src="https://ts1.cn.mm.bing.net/th/id/R-C.17da406426a5f93be3f7140d3e96c6fb?rik=H%2fHyyA4C%2bNBYzA&riu=http%3a%2f%2fwww.dy1905.net%2fupfile%2f2020%2f07%2f15%2f2373_20200715113617_1927xs.jpg&ehk=7KHATTwcu9ZVCN3RMZH0OHDREOB%2bipzi57CEZpTfvlk%3d&risl=&pid=ImgRaw&r=0"
          alt=""
        />
        <div class="contes">
          <p class="name">￥9999</p>
          <p class="text">这是xxx这是xxx这是xxxx这是xxx 这是xxxx这是xx</p>
        </div>
      </div>
      <div class="item">
        <img
          src="https://ts1.cn.mm.bing.net/th/id/R-C.17da406426a5f93be3f7140d3e96c6fb?rik=H%2fHyyA4C%2bNBYzA&riu=http%3a%2f%2fwww.dy1905.net%2fupfile%2f2020%2f07%2f15%2f2373_20200715113617_1927xs.jpg&ehk=7KHATTwcu9ZVCN3RMZH0OHDREOB%2bipzi57CEZpTfvlk%3d&risl=&pid=ImgRaw&r=0"
          alt=""
        />

        <div class="contes">
          <p class="name">￥9999</p>
          <p class="text">这是xxx这是xxx这是xxxx这是xxx 这是xxxx这是xx</p>
        </div>
      </div>
      <div class="item">
        <img
          src="https://ts1.cn.mm.bing.net/th/id/R-C.17da406426a5f93be3f7140d3e96c6fb?rik=H%2fHyyA4C%2bNBYzA&riu=http%3a%2f%2fwww.dy1905.net%2fupfile%2f2020%2f07%2f15%2f2373_20200715113617_1927xs.jpg&ehk=7KHATTwcu9ZVCN3RMZH0OHDREOB%2bipzi57CEZpTfvlk%3d&risl=&pid=ImgRaw&r=0"
          alt=""
        />

        <div class="contes">
          <p class="name">￥9999</p>
          <p class="text">这是xxx这是xxx这是xxxx这是xxx 这是xxxx这是xx</p>
        </div>
      </div>
      <div class="item">
        <img
          src="https://ts1.cn.mm.bing.net/th/id/R-C.17da406426a5f93be3f7140d3e96c6fb?rik=H%2fHyyA4C%2bNBYzA&riu=http%3a%2f%2fwww.dy1905.net%2fupfile%2f2020%2f07%2f15%2f2373_20200715113617_1927xs.jpg&ehk=7KHATTwcu9ZVCN3RMZH0OHDREOB%2bipzi57CEZpTfvlk%3d&risl=&pid=ImgRaw&r=0"
          alt=""
        />

        <div class="contes">
          <p class="name">￥9999</p>
          <p class="text">这是xxx这是xxx这是xxxx这是xxx 这是xxxx这是xx</p>
        </div>
      </div>
      <div class="item">
        <img
          src="https://ts1.cn.mm.bing.net/th/id/R-C.17da406426a5f93be3f7140d3e96c6fb?rik=H%2fHyyA4C%2bNBYzA&riu=http%3a%2f%2fwww.dy1905.net%2fupfile%2f2020%2f07%2f15%2f2373_20200715113617_1927xs.jpg&ehk=7KHATTwcu9ZVCN3RMZH0OHDREOB%2bipzi57CEZpTfvlk%3d&risl=&pid=ImgRaw&r=0"
          alt=""
        />

        <div class="contes">
          <p class="name">￥9999</p>
          <p class="text">这是xxx这是xxx这是xxxx这是xxx 这是xxxx这是xx</p>
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
import FileSaver from "file-saver";
import { reactive, toRefs, onMounted } from "vue";
import { useRouter } from "vue-router";
let router = useRouter();
const state = reactive({
  currentPage: 1,
  totalPage: 10,
  input: "",
  list: [
    {
      image:
        "https://img.zcool.cn/community/01a6ea57027a2d32f875a94486c928.jpg@3000w_1l_2o_100sh.jpg",
    },
    {
      image:
        "https://img.zcool.cn/community/01d36d57027a2032f875a944b336d6.jpg@3000w_1l_2o_100sh.jpg",
    },
  ],
  tabsList: [],
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
});
const { currentPage, totalPage, input, options, tabsList } = toRefs(state);
const onChange = () => {
  console.log(state.currentPage, 111);
};
const onSize = () => {
  console.log(state.currentPage);
};
const onDetails = () => {
  router.push("/detail");
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

//保存图片
const ADD = () => {
  state.list.forEach((item) => {
    FileSaver.saveAs(item.image, "图片名称.jpg");
  });
};
onMounted(() => {
  state.tabsList = state.tList1;
  console.log(state.tabsList, state.tList1);
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
  .inner {
    .box {
      margin: 0 auto;
      height: 120px;
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
  .box {
    width: 1200px;
    margin: 20px auto;
    display: flex;
    flex-wrap: wrap;

    .item {
      width: 250px;
      height: 300px;
      padding: 24px;
      border: 1px solid #d9d9d9;
      margin-right: -1px;
      margin-top: -1px;
      border-collapse: collapse !important;
      img {
        width: 100%;
        height: 250px;
      }
      .contes {
        flex: 1;
        .name {
          font-size: 20px;
          margin-bottom: 5px;
          color: #333333;
        }
        .text {
          font-size: 16px;
          line-height: 16px;
          color: #8888;
        }
      }
    }
  }
  .btn {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }
}
</style>
