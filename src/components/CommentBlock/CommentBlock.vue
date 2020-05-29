<template>
  <div>
    <div
      class="comment-block border-b-2 border-gray-300 hover:darker"
      v-if="fullName && comment"
      :key="id"
      @mouseover="colorVariant = 'dark'"
      @mouseleave="colorVariant = 'light'"
    >
      <div
        class="flex p-4"
        @mouseover="hover = true"
        @mouseleave="hover = false"
      >
        <Avatar :fullName="fullName" :avatar="avatar" />
        <div class="flex flex-col ">
          <div class="flex space-x-1">
            <UserInfo :fullName="fullName" :role="role" />
            <TextLabelWithHandlers colorVariant="light" v-if="timePosted">
              &#8226; {{ timePosted }}</TextLabelWithHandlers
            >
          </div>
          <div class="mt-2">
            <TextLabelWithHandlers data-test="comment-content">{{ text }}</TextLabelWithHandlers>
            <CommentActions
              :commentStats="comment"
              :colorVariant="colorVariant"
              @reply="handleReply"
              @upvote="handleUpvote"
              @downvote="handleDownvote"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import UserInfo from "@/components/CommentBlock/UserInfo";
import CommentActions from "@/components/CommentBlock/CommentActions";
import TextLabelWithHandlers from "@/components/common/TextLabelWithHandlers";
import Avatar from "@/components/common/Avatar";
import moment from "moment";

export default {
  name: "CommentBlock",
  components: { UserInfo, TextLabelWithHandlers, Avatar, CommentActions },
  props: {
    commentData: {
      type: Object,
      required: true,
      default: () => ({
        user: {},
        comment: {}
      }),
      note: `
            {
                comment: Object,
                user: Object
            }
            `
    }
  },
  data() {
    const {
      comment: { text = "", timePosted, id } = {},
      comment,
      user: { fullName, avatar, role } = {}
    } = this.commentData || {};
    return {
      text,
      fullName,
      avatar,
      role,
      //in real life i'd transform the data in Vuex or parent component and wouldn't ask CommentBlock to do it :)
      timePosted: moment.unix(timePosted).fromNow(),
      id,
      colorVariant: "light",
      comment
    };
  },
  methods: {
    handleReply() {
      alert(`reply on comment id=${this.id}`);
    },
    handleUpvote() {
       alert(`upvote comment id=${this.id}`);
    },
    handleDownvote() {
      alert(`downvote comment id=${this.id}`);
    }
  }
};
</script>
<style>
.comment-block:first-child {
  @apply border-t-2;
}
</style>
