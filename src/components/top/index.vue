<template>
  <div class="home">
    <div class="top">
      <div class="header">
        <div class="left">
          <img src="" alt="" />
        </div>
        <!--     -->
        <div class="right">
          <div v-for="(item, index) in list" :key="index" class="item">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const state = reactive({
  show: false,
  list: [
    {
      name: "首页",
      text: "#select1",
    },
    {
      name: "模块",
      text: "#select2",
    },

    {
      name: "产品",
      text: "#select3",
    },
    {
      name: "关于",
      text: "#select4",
    },
    {
      name: "联系我们",
      text: "#select5",
    },
  ],
  pitch: 0,
});

const { show, list } = toRefs(state);
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 55px;
  background: #fff;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.2);
  .top {
    margin: 0 auto;
    width: 1200px;
    z-index: 99;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 55px;

      .left {
        img {
          height: 45px;
          width: 150px;
        }
      }
      .right {
        display: flex;
        color: #000;
        .item {
          padding: 18px 24px;
          color: #000;
          font-size: 18px;
        }
        .active {
          border-bottom: 2px solid #2b70fd;
          color: #2b70fd;
        }
      }
    }
  }
}
</style>
