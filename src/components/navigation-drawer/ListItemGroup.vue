<template>
 <v-list-group
  no-action
  :sub-group="item.icono == '' ? true : false"
  :expand="item.icono == '' ? true : false"
 >
  <template v-slot:prependIcon v-if="item.icono != ''">
   <v-icon :color="item.color"> {{ item.icono }} </v-icon>
  </template>
  <template v-slot:activator>
   <v-list-item-content>
    <v-list-item-title>
     {{ item.descripcion }}
    </v-list-item-title>
   </v-list-item-content>
  </template>
  <template v-for="(grupo, j) in item.childrens">
   <!-- //! Cuando no tiene sub grupo -->
   <app-list-item v-if="!grupo.childrens.length" :item="grupo" :key="`modulo-${j}`"></app-list-item>

   <!-- //! Cuando tiene sub grupo -->
   <app-list-item-group v-else :key="`grupo-${j}`" :item="grupo"> </app-list-item-group>
  </template>
 </v-list-group>
</template>

<script>
export default {
 name: "app-list-item-group",
 props: {
  item: {
   type: Object,
   require: true,
  },
 },
};
</script>
