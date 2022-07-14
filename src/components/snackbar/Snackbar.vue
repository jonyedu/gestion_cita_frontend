<template>
  <v-snackbar v-if="content" v-model="is_visible" :color="color" :timeout="timeout" right top>
    {{ content }}

    <template v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="is_visible = false">
        X
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "app-snackbar",
  data() {
    return {
      is_visible: false,
    };
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    content: {
      required: true,
    },
    color: {
      type: String,
      required: false,
      default: "success",
    },
    timeout: {
      type: Number,
      required: false,
      default: 5000,
    },
  },
  watch: {
    is_visible(value) {
      if (!value) {
        this.$emit("requestClose", value);
        this.$store.state.app.snackbar.content = '';
        this.$store.state.app.snackbar.color = '';
        this.$store.state.app.snackbar.visible = false;
      }
    },
    visible(value) {
      if (value) {
        this.is_visible = value;
      }
    },
  },
  methods: {},
};
</script>
