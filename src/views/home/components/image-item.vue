<template>
  <div class="item" @click="onDetails()">
    <div class="content">
      <img :src="item.coverImgUrl" alt="" />
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
  width: 199px;
  height: 250px;
  padding: 20px;
  border: 1px solid #d9d9d9;
  margin-right: -1px;
  margin-top: -1px;

  .content {
    position: relative;
    img {
      width: 200px;
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
