<template>
  <div class="vab-ad">
    <el-carousel v-if="adList" height="30px" direction="vertical" :autoplay="true" :interval="3000" indicator-position="none">
      <el-carousel-item v-for="(item, index) in adList" :key="index">
        <el-tag type="warning">Ad</el-tag>
        <a target="_blank" :href="item.url">{{ item.title }}</a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
  import {
    getList
  } from "@/api/ad";
  export default {
    data() {
      return {
        nodeEnv: process.env.NODE_ENV,
        adList: [],
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        /* const { data } = await getList(); */
        const {
          data
        } = [{
            title: "vue-admin-beautiful-pro beta版本已发布，点我提前体验",
            url: "http://beautiful.panm.cn/vue-admin-beautiful-pro",
          },
          {
            title: "作为一个程序员，我迄今为止最骄傲的事情：2020年7月10日，vue/cli4作者蒋豪群采纳了我的对sass-loader 9.0全局注入变量的文档修改建议，以后全世界都能看到我的名字了，这远比vue-admin-beautiful更让我有成就感，感谢shaonialife的帮助。",
            url: "https://github.com/vuejs/vue-cli/blob/master/docs/zh/guide/css.md",
          },
          {
            title: "vue-admin-beautiful前端讨论群-1：972435319",
            url: "//shang.qq.com/wpa/qunwpa?idkey=14f123ac6d4ef3122bbb60d4693f1d8c951a50be2296951efb12d5ab1642f36b",
          },
        ];
        this.adList = data;
      },
    },
  };
</script>
<style lang="scss" scoped>
  .vab-ad {
    height: 30px;
    padding-right: $base-padding;
    padding-left: $base-padding;
    line-height: 30px;
    cursor: pointer;
    background: #eef1f6;
    box-shadow: 0 -1px 2px rgba(0, 21, 41, 0.08) inset;

    a {
      color: #999;
    }
  }
</style>
