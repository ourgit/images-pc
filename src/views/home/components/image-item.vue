<template>
  <div class="item" @click="onDetails()">
    <div class="content">
      <img
        src="https://ts1.cn.mm.bing.net/th/id/R-C.17da406426a5f93be3f7140d3e96c6fb?rik=H%2fHyyA4C%2bNBYzA&riu=http%3a%2f%2fwww.dy1905.net%2fupfile%2f2020%2f07%2f15%2f2373_20200715113617_1927xs.jpg&ehk=7KHATTwcu9ZVCN3RMZH0OHDREOB%2bipzi57CEZpTfvlk%3d&risl=&pid=ImgRaw&r=0"
        alt=""
      />
      <div class="btn">
        <div class="left">{{ item.imagesUrl.length }}</div>
        <div class="right">
          <el-icon size="24"><Download /></el-icon>
          <el-icon size="24"><Share /></el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const props = defineProps({ item: { type: Object, default: {} } });
let router = useRouter();

const onDetails = () => {
  router.push(`/detail/${props.item.id}`);
};
</script>

<style scoped lang="scss">
.item {
  width: 200px;
  height: 250px;
  padding: 20px;
  border: 1px solid #d9d9d9;
  margin-right: -1px;
  margin-top: -1px;

  .content {
    position: relative;
    img {
      width: 100%;
      height: 250px;
    }
    .btn {
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 999;
      padding: 5px 10px;
      width: 92%;
      color: #d9d9d9;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
