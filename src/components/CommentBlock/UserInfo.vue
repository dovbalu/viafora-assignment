<template>
  <div class="flex items-end space-x-2">
    <TextLabelWithHandlers fontVariant="bold">{{
      fullName
    }}</TextLabelWithHandlers>
    <!--    didnt do it here, but would make a separate common component for the pill-->
    <div
      class="rounded-full py-0 px-4 bg-gray-800 text-xs text-white uppercase"
    >
      {{ role }}
    </div>
  </div>
</template>

<script>
import TextLabelWithHandlers from "@/components/common/TextLabelWithHandlers";
export default {
  components: { TextLabelWithHandlers },
  props: {
    fullName: {
      type: String,
      required: true,
      default: "Jon Doe",
      note: "user full name"
    },
    role: {
      type: String,
      required: false,
      note: "user title"
    }
  }
};
</script>
