<template>
 <v-row>
  <!-- Seccion de los botones -->
  <v-col cols="12">
   <app-group-btn
    :firstLoad="app.firstLoad"
    :loading="table.loading_table"
    :tooltips="app.tooltips"
   >
   </app-group-btn>
  </v-col>

  <!-- Tabla -->
  <v-col cols="12">
   <v-skeleton-loader v-if="app.firstLoad" :loading="table.loading_table" type="table">
   </v-skeleton-loader>

   <v-card v-show="!app.firstLoad">
    <v-data-table
     v-model="form.submit.selected"
     :headers="table.headers"
     :items="table.modulos"
     :options.sync="form.submit.options"
     :server-items-length="app.total_modulo"
     :loading="table.loading_table"
     :items-per-page="5"
     item-key="modulo_id"
    >
     <!-- El header -->
     <template v-slot:top>
      <v-toolbar flat>
       <v-toolbar-title>List Client</v-toolbar-title>
      </v-toolbar>
     </template>
     <!-- Cuando no haya data -->
     <template v-slot:no-data>
      <v-btn :loading="table.loading_table" @click="onSearch" fab small color="primary">
       <v-icon>mdi-backup-restore</v-icon>
      </v-btn>
     </template>
    </v-data-table>
   </v-card>
  </v-col>
  <!-- Snackbar -->
  <app-snackbar
   @requestClose="storeCloseSnackbar"
   :visible="$store.state.app.snackbar.visible"
   :content="$store.state.app.snackbar.content"
   :color="$store.state.app.snackbar.color"
  ></app-snackbar>
  <!-- scroll -->
  <app-scroll />
 </v-row>
</template>
<script src="./listado.js"></script>
<style src="./listado.css"></style>
