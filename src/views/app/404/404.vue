<template>
  <v-row class="text-center">
    <v-col>
      <v-img
        class="align-center"
        height="400px"
        :src="require('@/assets/images/menu/portada.jpg')"
      >
        <p class="text-h2 font-weight-black color-title">Whoops, 404</p>
        <p class="text-h6 color-sub-title">
          La página que estabas buscando no existe
        </p>
        <v-btn @click="showHome" color="error"> Volver al Inicio </v-btn>
      </v-img>
    </v-col>
  </v-row>
</template>
<script src="./404.js"></script>
<style src="./404.css"></style>
