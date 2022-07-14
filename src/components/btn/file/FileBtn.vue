<template>
 <v-toolbar flat>
  <v-btn block color="primary" rounded dark :loading="isSelecting" @click="handleFileImport">
   {{ title }}
   <v-icon right dark> mdi-cloud-upload </v-icon>
  </v-btn>

  <input ref="uploader" :multiple="multiple" class="d-none" type="file" @change="onFileChanged" />
 </v-toolbar>
</template>
<script>
export default {
 name: "app-file-btn",
 props: {
  value: {},
  multiple: {
   type: Boolean,
   require: false,
   default: false,
  },
  title: {
   type: String,
   required: false,
   default: "Adjuntar",
  },
 },
 data() {
  return {
   isSelecting: false,
   selectedFile: null,
  };
 },
 watch: {},
 methods: {
  handleFileImport() {
   this.isSelecting = true;

   window.addEventListener(
    "focus",
    () => {
     this.isSelecting = false;
    },
    { once: true }
   );

   // Trigger click on the FileInput
   this.$refs.uploader.click();
  },
  onFileChanged(event) {
   const files = event.target.files;
   if (!this.multiple) return this.$emit("input", files[0]);

   let items = [];
   for (const file of files) {
    items.push(file);
   }

   this.$emit("input", items);
  },
 },
};
</script>
<style>
.spacer_mb {
 margin-bottom: -15px;
 margin-top: -0px;
}
</style>
