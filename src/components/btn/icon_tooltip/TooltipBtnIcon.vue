<template>
  <v-tooltip
    open-delay="500"
    bottom
    :color="objecto.color"
  >
    <template v-slot:activator="{ on, attrs }">
      <template v-if="!objecto.is_menu">
        <v-btn
          small
          icon
          v-bind="attrs"
          v-on="on"
          @click="callMetodo"
          :loading="objecto.loading"
          :disabled="objecto.loading"
        >
          <v-icon v-if="!objecto.fileInput" :color="objecto.color">
            {{ objecto.mdi }}
          </v-icon>
          <v-file-input
            :prepend-icon="objecto.mdi"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            @change="getFileInput"
            v-model="file_input"
            v-else
            hide-input
            truncate-length="15"
          ></v-file-input>
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon light>mdi-cached</v-icon>
            </span>
          </template>
        </v-btn>
      </template>
      <template v-else>
        <app-menu @call-method-menu="callMetodoMenu" :objecto="objecto">
        </app-menu>
      </template>
    </template>
    <span>{{ objecto.texto }}</span>
  </v-tooltip>
</template>
<script>
export default {
  name: "app-tooltip-btn-icon",
  props: {
    objecto: {
      type: Object,
      required: true,
      default: { is_menu: false},
    },
  },
  data() {
    return {
      file_input: null,
    };
  },
  watch: {},
  mounted() {
  },
  methods: {
    callMetodo() {
      if (!this.objecto.method || this.objecto.fileInput) return;
      this.$emit("call-method");
    },
    callMetodoMenu(value, tooltip) {
      this.$emit("call-method-menu", value, tooltip);
    },
    getFileInput() {
      if (!this.objecto.fileInput) return;
      this.$emit("call-file", this.file_input);
      this.$emit("call-method");
      setTimeout(() => {
        this.file_input = null;
      }, 50);
    },
  },
};
</script>
<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>