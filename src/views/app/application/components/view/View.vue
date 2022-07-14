<template>
  <v-main>
    <v-divider></v-divider>
    <v-container>
      <transition>
        <router-view />
      </transition>
    </v-container>
  </v-main>
</template>
<script src="./view.js"></script>
<style src="./view.css"></style>