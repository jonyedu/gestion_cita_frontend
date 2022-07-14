<template>
  <div class="spacer_mb">
    <v-skeleton-loader
      max-height="50"
      height="30"
      v-if="firstLoad"
      :loading="loading"
      type="card"
    >
    </v-skeleton-loader>
    <v-app-bar v-show="!firstLoad" elevation="0" color="white" dense>
      <v-spacer></v-spacer>
      <app-tooltip-btn-icon
        v-for="(tooltip, index) in tooltips"
        :key="index"
        :objecto="tooltip"
        @call-method-menu="callMetodoMenu"
        @call-method="tooltip.call_method(tooltip)"
        @call-file="getFileInput"
      >
      </app-tooltip-btn-icon>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  name: "app-group-btn",
  props: {
    firstLoad: {
      type: Boolean,
      required: false,
      default: false,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    tooltips: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  watch: {},
  methods: {
    getFileInput(file) {
      if (file == null) return;
      this.$emit("call-file", file);
    },
    callMetodoMenu(value, tooltip){
      value.call_method(tooltip);
    }
  },
};
</script>
<style>
.spacer_mb {
  margin-bottom: -15px;
  margin-top: -0px;
}
</style>