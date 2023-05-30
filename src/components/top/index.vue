<template>
  <div class="header">
    <div class="contes" @mouseenter="onMover()" @mouseleave="onMouse()">
      <div class="left" @click="onHome()">
        <span>{{ reform.title }}</span>
      </div>
      <div class="right">
        <div class="batch" @click="onBatch()">{{ reform.batch }}</div>
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
        <span>{{ reform.search }}</span>
      </div>
    </div>
    <div class="contact">
      <img
        :src="item.rqCode"
        alt=""
        v-for="item in contactList"
        :key="item.id"
        @click="OnPath(item)"
      />
    </div>
  </div>
  <el-dialog v-model="dialogVisible" :title="reform.batch" width="550px">
    <div class="box">
      <div class="list">
        <div class="pitch">
          <div class="pitch-left" @click="onShow()">
            <img src="@/assets/roaio.png" alt="" v-if="choice" />
            <img src="@/assets/ifroaio.png" alt="" v-else />
          </div>
        </div>
        <div v-if="productList.length !== 0">
          <div class="item" v-for="(item, index) in productList" :key="item.id">
            <div class="left" @click="onSelected(item)">
              <img src="@/assets/roaio.png" alt="" v-if="item.selected" />
              <img src="@/assets/ifroaio.png" alt="" v-else />
            </div>
            <div class="module" @click="onDetail(item)">
              <img :src="item.coverImgUrl" alt="" />
            </div>
            <div class="right" @click="onDetail(item)">
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
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="shareToFacebook()" type="warning">{{
          reform.share
        }}</el-button>
        <el-button type="primary" @click="save()">
          {{ reform.DownloadVideo }}</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { getProductList } from "@/api/product/index.ts";
import { getContact } from "@/api/contact/index.ts";
import { getTitle } from "@/api/title/index.ts";
import { reactive, toRefs, onMounted, computed, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import FileSaver from "file-saver";

import { ElMessage } from "element-plus";
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
    {
      name: "Vietnamese",
      shift: 2,
    },
  ],
  filter: "",
  dialogVisible: false,
  currentPage: 1,
  totalPage: 0,
  productList: [],
  newProductList: [],
  contactList: [],
  show: false,
  reform: {
    search: "搜索",
    DownloadVideo: "下载",
    share: "分享",
    batch: "批量",
    title: "精选潮牌",
  },
  title: "",
});

const {
  filter,
  options,
  dialogVisible,
  productList,
  currentPage,
  totalPage,
  show,
  contactList,
  reform,
} = toRefs(state);
//标题
const getTitleOb = () => {
  getTitle().then((res) => {});
};

//请求
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
//联系
const getContactObject = () => {
  getContact().then((res) => {
    state.contactList = res.contactList;
  });
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
//分享
const shareToFacebook = () => {
  const list = state.productList.filter((item) => item.selected);
  // list.forEach((item, index) => {
  //   const url =
  //     "https://www.facebook.com/sharer/sharer.php?u=" +
  //     encodeURIComponent(`https://p.xcx100.info/img-sites#/detail/${item.id}`);
  //   window.open(url, "_blank");
  // });
  // window.open(url, "_blank");
  let IdList = [];
  list.forEach((item) => {
    IdList.push(item.id);
  });
  if (IdList.length == 0) {
    return ElMessage({
      message: "请选择商品",
      type: "success",
    });
  } else {
    router.push({ path: `/share`, query: { list: IdList } });
  }
};

//下载/视频
const save = () => {
  const list = state.productList.filter((item) => item.selected);
  if (list.length == 0) {
    return ElMessage({
      message: "请选择商品",
      type: "success",
    });
  } else {
    const xhr = new XMLHttpRequest();
    list.forEach((item, index) => {
      FileSaver.saveAs(item.videoUrl, `video${index}.mp4`); // 下载文件的名称
      item.imagesUrl.forEach((i) => {
        new Promise((role, rolt) => {
          setTimeout(() => {
            FileSaver.saveAs(i, `图片${index}.jpg`);
          }, 1000);
        });
      });
    });
  }
};
const choice = computed(() => {
  return state.productList.every((item) => item.selected == true);
});
const onDetail = (item) => {
  router.push(`/detail/${item.id}`);
};
//搜索
const onSearch = () => {
  router.push({ name: "search", query: { filter: state.filter } });
};
//切换语言
const onOut = (item) => {
  switch (item.shift) {
    case 0:
      state.reform = {
        search: "搜索",
        DownloadVideo: "下载",
        share: "分享",
        batch: "批量",
        title: "精选潮牌",
      };
      break;
    case 1:
      state.reform = {
        search: "search",
        DownloadVideo: "Download",
        share: "share link",
        batch: "batch",
        title: "A selection of trendy brands",
      };
      break;
    case 2:
      state.reform = {
        search: "Tìm kiếm",
        DownloadVideo: "Tải về",
        share: "Chia sẻ liên kết",
        batch: "Số lượng lớn",
        title: "Lựa chọn các thương hiệu thời trang",
      };
      break;
  }
  emit("clickTabs", item.shift);
};
const onHome = () => {
  router.push("/home");
};
const onBatch = () => {
  ProductList();
  state.dialogVisible = true;
};
const OnPath = (item) => {
  window.open(item.contactUrl);
};
const onMover = () => {
  var body = document.querySelector("body");
  body.style.cursor = "pointer";
};
const onMouse = () => {
  var body = document.querySelector("body");
  body.style.cursor = "default";
};
onBeforeMount(() => {
  getContactObject();
});

onMounted(() => {});
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
        color: #39ac73;
      }
    }

    .right {
      display: flex;
      .batch {
        text-align: center;
        font-size: 18px;
        line-height: 50px;
        color: #888888;
        margin-right: 10px;
      }
      .dropdown {
        /* 下拉按钮样式 */
        .dropbtn {
          color: black;
          padding: 10px;
          font-size: 16px;
          border: none;
          // cursor: pointer;
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
    border: 2px solid #8cd9b3;
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
      background-color: #8cd9b3;
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
    margin-left: 100px;
    display: flex;
    img {
      margin-left: 20px;
      width: 100px;
      height: 100px;
    }
  }
}
.hint {
  display: flex;
  flex-direction: column;
}

.el-dialog__body {
  padding: 20px !important;
}
.box {
  display: flex;
  height: 500px;
  overflow-y: auto;
  z-index: 9999;
  .list {
    width: 800px;

    .pitch {
      display: flex;
      align-items: center;
      height: 35px;
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
