<template>
  <v-avatar :size="size">
    <img v-if="file != null" :src="file" alt="Avatar" />
    <img v-else :src="$store.state.app.avatar" alt="Avatar" />
  </v-avatar>
</template>
<script>
export default {
  name: "app-avatar",
  props: {
    file: {
      type: String,
      default: "",
      required: true,
    },
    size: {
      type: Number,
      default: 50,
      required: false,
    },
  },
};
</script>
