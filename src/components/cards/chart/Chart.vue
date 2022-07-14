<template>
 <v-hover>
  <template v-slot:default="{ hover }">
   <v-card  :elevation="hover ? 24 : 6" :height="height">
    <v-card-title>{{ title }}</v-card-title>
    <v-card-subtitle v-if="subTitle != ''">{{ subTitle }}</v-card-subtitle>
    <v-card-subtitle>
     <slot name="input"></slot>
    </v-card-subtitle>
    <v-card-text>
     <v-container>
      <v-row>
       <slot></slot>
      </v-row>
     </v-container>
    </v-card-text>
   </v-card>
  </template>
 </v-hover>
</template>
<script>
export default {
 name: "app-card-chart",
 props: {
  title: {
   required: true,
   type: String,
  },
  height: {
   type: Number,
  },
  subTitle: {
   required: false,
   type: String,
   default: "",
  },
 },
 data: () => ({
  show_card: true,
 }),
 methods: {},
};
</script>
<style></style>
