<template>
  <el-dialog
    custom-class="shareDialog"
    :title="'文件分享链接'"
    :visible.sync="isShow"
    @close="
      () => {
        $emit('closeDialog');
        showItem = {};
      }
    "
  >

    <p>{{ showItem.url }}</p>


  </el-dialog>
</template>

<script>
// 剪切板插件
import ClipboardJS from "clipboard";
new ClipboardJS(".btn");

export default {
  name: "shareDialog",
  data() {
    return {
      // 是否显示分享框
      isShow: this.isShareDialogShow,
      // 用于展示的数据
      showItem: {},
    };
  },
  props: {
    // 是否显示分享框
    isShareDialogShow: {
      type: Boolean,
      default() {
        return false;
      },
    },
    // 分享的文件对象
    shareItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    // 请求
    // 根据vid请求对应的url
    async getVideoUrl() {
      let res = await this.$request(
        "/eduoss/fileoss/getPlayAuth?isList=" + this.shareItem.videoId,
        "",
        "post"
      );
      return res.data.data.urlList[0].url;
    },
  },
  watch: {
    async isShareDialogShow(current) {
      this.isShow = current;
      if (current == true) {
        if (
          this.shareItem.filetype == "audio" ||
          this.shareItem.filetype == "video"
        ) {
          // 如果是音频或视频类型 则重新获取url 以保证url有效期
          let url = await this.getVideoUrl();
          this.showItem = this.shareItem;
          this.showItem.url = url;
        } else {
          this.showItem = this.shareItem;
        }
      }
    },
  },
  computed: {},
};
</script>

<style scoped>
.el-button {
  padding: 10px 60px;
  border-radius: 20px;
  margin-top: 20px;
}

.urlInput {
  display: block;
  width: 90%;
  height: 35px;
  border-radius: 7px;
  outline: none;
  border: 1px solid #ccc;
  color: rgb(87, 87, 87);
  padding: 0 10px;
}
</style>
