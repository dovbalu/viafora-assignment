<template>
  <div class="flex items-center md:w-full lg:w-2/5 mt-2 space-x-4">
    <TextLabelWithHandlers
      :colorVariant="colorVariant"
      @click="handleReply()"
      class="cursor-pointer"
      data-test="reply"
      >reply</TextLabelWithHandlers
    >
    <TextLabelWithHandlers :colorVariant="colorVariant"
      >{{ replies }} replies</TextLabelWithHandlers
    >
    <!--    upvote/downvote: making chevron AND text clickable vs. only chevron clickable, for the sake of mobile users where using only chevron may be too small-->
    <TextLabelWithHandlers
      :colorVariant="colorVariant"
      @click="handleUpvote"
      class="cursor-pointer"
      data-test="upvote"
      ><span class="chevron up">⌃</span>{{ upvotes }}</TextLabelWithHandlers
    >
    <TextLabelWithHandlers
      :colorVariant="colorVariant"
      @click="handleDownvote"
      class="cursor-pointer"
      data-test="downvote"
      ><span class="chevron down">⌃</span>
      {{ downvotes }}</TextLabelWithHandlers
    >
  </div>
</template>

<script>
import TextLabelWithHandlers from "../common/TextLabelWithHandlers";
export default {
  components: { TextLabelWithHandlers },
  props: {
    colorVariant: {
      type: String,
      required: false,
      default: "light"
    },
    commentStats: {
      type: Object,
      required: true,
      default: () => ({
        upvotes: 0,
        downvotes: 0,
        replies: 0
      }),
      note: `
            {
                replies: Number,
                upvotes: Number,
                downvotes: Number,
            }
            `
    }
  },
  data() {
    const { upvotes = 0, downvotes = 0, replies = 0 } = this.commentStats;
    return {
      upvotes,
      downvotes,
      replies
    };
  },
  methods: {
    handleReply() {
      this.$emit("reply");
    },
    handleUpvote() {
      this.$emit("upvote");
    },
    handleDownvote() {
      this.$emit("downvote");
    }
  }
};
</script>
<style>
.chevron {
  display: inline-block;
}
.chevron.down {
  display: inline-block;
  @apply transform;
  @apply rotate-180;
}
</style>
