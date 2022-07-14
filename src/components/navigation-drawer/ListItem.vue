<template>
 <v-list-item :to="item.to">
  <!-- Cuando tiene hijos -->
  <v-list-item-content v-if="!item.icono">
   <v-list-item-icon>
    <v-icon :color="item.color">{{ item.icono }}</v-icon>
   </v-list-item-icon>
   <v-list-item-title>{{ item.descripcion }}</v-list-item-title>
  </v-list-item-content>

  <!-- Cuando no tiene hijos -->
  <v-list-item-icon v-else>
   <v-icon :color="item.color">{{ item.icono }}</v-icon>
  </v-list-item-icon>
  <v-list-item-title>{{ item.descripcion }}</v-list-item-title>

  <!-- <v-tooltip color="primary" right :open-delay="1000">
   <template v-slot:activator="{ on, attrs }">
    <v-list-item-title v-bind="attrs" v-on="on">{{ item.descripcion }}</v-list-item-title>
   </template>
   <span>{{ item.descripcion }}</span>
  </v-tooltip> -->
 </v-list-item>
</template>

<script>
export default {
 name: "app-list-item",
 props: {
  item: {
   type: Object,
   require: true,
  },
 },
};
</script>
