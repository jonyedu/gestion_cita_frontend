<template>
 <v-navigation-drawer
  id="default-drawer"
  v-model="$store.state.app.drawer_header"
  :dark="getDark"
  :right="$vuetify.rtl"
  :src="drawerImage ? getImage : ''"
  :mini-variant.sync="getMiniHeader"
  mini-variant-width="80"
  app
  width="260"
 >
  <template v-if="drawerImage" #img="props">
   <v-img :key="getImage" :gradient="getGradient" v-bind="props" />
  </template>

  <div>
   <v-list-item @click="showMain" class="mb-0 justify-space-between pl-3">
    <v-list-item-avatar>
     <v-img :src="require('@/assets/images/logo_icon.png')" />
    </v-list-item-avatar>

    <v-list-item-content class="pl-2">
     <v-list-item-title class="text-h6">
      <strong class="fs-1 mr-1 font-weight-black">Benemerita</strong>

      <span class="red--text">ERP</span>
     </v-list-item-title>
    </v-list-item-content>
   </v-list-item>

   <v-divider class="mx-3 mb-2" />

   <v-list>
    <template v-for="(modulo, i) in modulos">
     <!-- Cuando no tiene hijos -->
     <app-list-item
      v-if="!modulo.childrens.length"
      :item="modulo"
      :key="`modulo-${i}`"
     ></app-list-item>

     <!-- Cuando tiene hijos -->
     <app-list-item-group
      v-else
      :item="modulo"
      :key="`grupo-${i}`"
     ></app-list-item-group>

    </template>
   </v-list>
  </div>

  <div class="pt-12" />
 </v-navigation-drawer>
</template>
<script src="./drawer.js"></script>
<style src="./drawer.css"></style>
