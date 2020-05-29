<template>
  <span :class="getClasses()" @click="handleClick()">
    <slot></slot>
  </span>
</template>

<script>
export default {
  props: {
    fontSize: {
      type: String,
      required: false,
      default: "small",
      note: "small | medium | large"
    },
    fontVariant: {
      type: String,
      required: false,
      default: "normal",
      note: "normal | bold"
    },
    colorVariant: {
      type: String,
      required: false,
      default: "dark",
      note: "light | dark"
    }
  },
  methods: {
    handleClick() {
      this.$emit('click');
    },
    getClasses() {
      const classes = {
        fontSize: {small: 'text-sm', medium: 'text-base', large: 'text-lg'},
        fontVariant: {normal: 'font-normal', bold: 'font-bold'},
        colorVariant: {dark: 'text-black', 'light': 'text-gray-500'},
      }
      return  Object.entries(this.$props).reduce((cls, [key, value]) => (cls+=classes[key][value])+' ', '')
    }
}

};
</script>
