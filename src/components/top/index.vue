<template>
  <div class="header">
    <div class="contes">
      <div class="left" @click="onHome()">
        <span>欢迎来到大雄潮鞋</span>
      </div>
      <div class="right">
        <div class="batch" @click="onBatch()">批量</div>
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
  </div>
  <div class="inner-box">
    <div class="logo"></div>
    <div class="search">
      <input v-model="filter" placeholder="搜索商品" />
      <div class="request" @click="onSearch()">
        <div style="font-size: 18px" class="svg">
          <Search style="width: 18px; height: 32px; margin-right: 8px" />
        </div>
        <span>搜索</span>
      </div>
    </div>
    <div class="contact">
      <img src="@/assets/OIP-C.jpg" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { reactive, toRefs } from "vue";
let router = useRouter();

const emit = defineEmits(["clickTabs"]);
const state = reactive({
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
  filter: "",
});

const { filter, options } = toRefs(state);
//保存图片
const ADD = () => {
  // state.list.forEach((item) => {
  //   FileSaver.saveAs(item.image, "图片名称.jpg");
  // });
};
//搜索
const onSearch = () => {
  router.push({ name: "search", query: { filter: state.filter } });
};
//切换语言
const onOut = (item) => {
  emit("clickTabs", item.shift);
};
const onHome = () => {
  router.push("/home");
};
const onBatch = () => {
  router.push("/batch");
};
</script>

<style lang="scss" scoped>
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

    .right {
      display: flex;
      .batch {
        width: 100px;
        text-align: center;
        font-size: 18px;
        line-height: 50px;
        color: #333333;
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
    margin-left: 150px;
    img {
      width: 100px;
      height: 100px;
    }
  }
}
.hint {
  display: flex;
  flex-direction: column;
}
</style>
