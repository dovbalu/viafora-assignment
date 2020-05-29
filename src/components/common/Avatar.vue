<template>
  <div class="w-20 mr-4">
    <div class="group w-full rounded-full overflow-hidden  cursor-pointer">
      <span
        class="hidden text-white font-bold align-middle"
        >{{ fullName }}</span
      >
      <img
        :src="avatar"
        :alt="fullName"
        class="w-full h-full"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    avatar: {
      type: String,
      required: true,
      //in case user doesnt have avatar image, i didnt add default.svg to this repo though
      default: "@/assets/default.svg",
      note: "path to the user image"
    },
    fullName: {
      type: String,
      required: true,
      default: "Jon Doe",
      note: "user full name"
    }
  }
};
</script>
