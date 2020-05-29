import { mount } from "@vue/test-utils";
import Vue from 'vue';
import CommentBlock from "@/components/CommentBlock/CommentBlock.vue";
import commentData from "@/data";
import CommentActions from "@/components/CommentBlock/CommentActions";

describe("CommentBlock.vue", () => {
  let view = null;
  const mock = jest.fn();
  const createMockComponent = props => {
    jest.mock("moment", () => () => ({ fromNow: () => "a day ago" }));
    return mount(CommentBlock, {
      propsData: { commentData: props }
    });
  };

  beforeEach(() => {
    window.alert = mock;
    view = createMockComponent(commentData);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("renders CommentBlock", () => {
    it("renders CommentBlock correctly when correct props are provided", () => {
      expect(view).toMatchSnapshot();
    });
    it("renders 'Loading...' when props are missing", () => {
      view = createMockComponent({...commentData, user: {}});
      expect(view).toMatchSnapshot();
    });
    it("renders default image for avatar if not provided", () => {
      view = createMockComponent({...commentData, user: {...commentData.user, avatar: undefined}});
      expect(view.find('img').attributes('src')).toBe('@/assets/default.svg');
    });
  });
  describe("UI interactions - ", () => {
    const testMethod = (method, selector) => {
      const spy = jest.spyOn(CommentBlock.methods, method);
      view = createMockComponent(commentData);
      view.find(`[data-test="${selector}"]`).trigger("click");
      expect(spy).toHaveBeenCalled();
    };
    it("click on reply triggers reply method", () => {
      testMethod("handleReply", "reply");
    });
    it("click on upvote triggers handleUpvote method", () => {
      testMethod("handleUpvote", "upvote");
    });
    it("click on downvote triggers correct action", () => {
      testMethod("handleDownvote", "downvote");
    });

    it("mouseover/mouseleave causes reply block color scheme to change", async () => {
      const mouseOutScheme = view.findComponent(CommentActions).html();
      view.find('.comment-block').trigger("mouseover");
       await Vue.nextTick();
      const mouseOverScheme = view.findComponent(CommentActions).html();
      expect(mouseOutScheme).not.toEqual(mouseOverScheme);
      view.find('.comment-block').trigger("mouseleave");
      await Vue.nextTick();
      const mouseOutScheme2 = view.findComponent(CommentActions).html();
      expect(mouseOutScheme).toEqual(mouseOutScheme2);
    });
  });
});
