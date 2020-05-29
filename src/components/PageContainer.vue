<template>
  <div id="app" class="content-around mx-auto p-4">
    <div class="md:w-full lg:w-2/4">
      <CommentBlock :commentData="commentData" />
    </div>
  </div>
</template>

<script>
import CommentBlock from "@/components/CommentBlock/CommentBlock.vue";
import data from "@/data";

export default {
  name: "PageContainer",

  components: {
    CommentBlock
  },
  data() {
    return {
      commentData: {}
    };
  },
  created() {
    this.commentData = data;
  }
};
</script>
