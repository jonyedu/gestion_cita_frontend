<template>
  <v-card>
    <v-card-title class="blue lighten-2 color_title">
      <v-icon color="white" left>{{ icono }}</v-icon>
      <span> {{ title }} </span>
    </v-card-title>
    <v-form ref="form">
      <v-container>
        <v-row>
          <slot name="body"></slot>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>
<script>
export default {
  name: "app-card",
  props: {
    title: {
      required: true,
      type: String,
    },
    icono: {
      required: false,
      default: "mdi-card-text-outline",
      type: String,
    },
  },
  data: () => ({}),
  methods: {
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
<style >
.v-card__subtitle,
.v-card__text,
.v-card__title {
  padding: 10px !important;
}
.color_title {
  color: rgb(255, 255, 255);
}
</style>