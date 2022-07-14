<template>
  <v-card>
    <v-card-actions class="blue lighten-2 color_title">
      <v-card-title> {{ title }} </v-card-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="show_card = !show_card">
        <v-icon>{{ show_card ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show_card">
        <v-container>
          <v-row>
            <slot name="body"></slot>
          </v-row>
        </v-container>
      </div>
    </v-expand-transition>
  </v-card>
</template>
<script>
export default {
  name: "app-card-expand",
  props: {
    title: {
      required: true,
      type: String,
    },
  },
  data: () => ({
    show_card: true,
  }),
  methods: {
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
<style >
.v-card__actions  {
  padding: 0px !important;
}
.color_title {
  color: rgb(255, 255, 255);
}
</style>