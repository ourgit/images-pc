<template>
  <div class="batch">
    <top @searchProduct="searchProduct"></top>
    <div class="box">
      <div class="list">
        <div class="pitch">
          <div class="pitch-left" @click="onShow()">
            <img src="@/assets/roaio.png" alt="" v-if="choice" />
            <img src="@/assets/ifroaio.png" alt="" v-else />
          </div>
          <div class="share b" @click="shareToFacebook()">分享</div>
          <div class="save b" @click="save()">保存</div>
        </div>
        <div v-if="productList.length !== 0">
          <div
            class="item"
            v-for="(item, index) in productList"
            :key="item.id"
            @click="onDetail(item)"
          >
            <div class="left" @click="onSelected(item)">
              <img src="@/assets/roaio.png" alt="" v-if="item.selected" />
              <img src="@/assets/ifroaio.png" alt="" v-else />
            </div>
            <div class="module">
              <img :src="item.coverImgUrl" alt="" />
            </div>
            <div class="right">
              <span>{{ item.title }}</span>
            </div>
          </div>
        </div>
        <div v-else class="have">
          <img src="@/assets/R-C.png" alt="" />
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { getProductList } from "@/api/product/index.ts";
import { reactive, toRefs, onMounted, computed } from "vue";
import top from "./top/index.vue";
import { useRouter } from "vue-router";
import FileSaver from "file-saver";
let router = useRouter();
const state = reactive({
  currentPage: 1,
  totalPage: 0,
  productList: [] as any,
  newProductList: [] as any,
  filter: "",
  show: false,
});
const { productList, show, currentPage, totalPage } = toRefs(state);
const ProductList = () => {
  getProductList({ page: state.currentPage, filter: state.filter }).then(
    (res) => {
      res.newProductList.forEach((item) => {
        item.imagesUrl = item.imagesUrl ? JSON.parse(item.imagesUrl) : [];
      });
      res.productList.forEach((item) => {
        item.imagesUrl = item.imagesUrl ? JSON.parse(item.imagesUrl) : [];
      });
      state.newProductList = res.newProductList;
      state.productList = res.productList;
      state.totalPage = res.pages;
    }
  );
};
const searchProduct = (filter) => {
  state.filter = filter;
  ProductList();
};
const onChange = () => {
  ProductList();
};
const onSize = () => {
  ProductList();
};
const onSelected = (item) => {
  item.selected = !item.selected;
};
const onShow = () => {
  state.show = !state.show;
  state.productList.forEach((item) => {
    item.selected = state.show;
  });
};
const onDetail = (item) => {
  router.push(`/detail/${item.id}`);
};

//分享
const shareToFacebook = () => {
  const list = state.productList.filter((item) => item.selected);
  list.forEach((item) => {
    new Promise((role, rolt) => {
      setTimeout(() => {
        const url =
          "https://www.facebook.com/sharer/sharer.php?u=" +
          encodeURIComponent(
            `https://p.xcx100.info/img-sites#/detail/${item.id}`
          );
        window.open(url, "_blank");
      }, 1000);
    });
  });
};
const save = () => {
  const list = state.productList.filter((item) => item.selected);
  list.forEach((item, index) => {
    item.imagesUrl.forEach((i) => {
      new Promise((role, rolt) => {
        setTimeout(() => {
          FileSaver.saveAs(i, `图片${index}.jpg`);
        }, 1000);
      });
    });
  });
};
const choice = computed(() => {
  return state.productList.every((item) => item.selected == true);
});
onMounted(() => {
  ProductList();
});
</script>

<style lang="scss" scoped>
.box {
  margin: 20px auto;
  width: 1200px;
  min-height: 400px;
  display: flex;

  .list {
    width: 800px;
    box-shadow: -4px 4px 20px 2px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    .pitch {
      display: flex;
      align-items: center;
      height: 50px;
      border-bottom: 1px solid #f6f6f6;
      .pitch-left {
        width: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        .img {
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }
      }

      .b {
        width: 50px;
        font-size: 16px;
        color: #333333;
        margin-left: 10px;
      }
    }
    .have {
      text-align: center;
    }
    .item {
      display: flex;
      margin: 10px 0;
      .left {
        width: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        .img {
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }
      }
      .module {
        img {
          width: 100px;
          height: 100px;
        }
      }
      .right {
        margin-left: 10px;
        flex: 1;
        font-size: 18px;
        color: #333333;
      }
    }
  }
  .btn {
    margin: 20px auto;
    min-width: 200px;
    width: 200px;
  }
}
</style>
