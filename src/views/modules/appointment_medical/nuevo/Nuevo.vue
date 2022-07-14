<template>
 <v-row>
  <!-- Seccion de los botones -->
  <v-col cols="12">
   <app-group-btn
    :firstLoad="app.firstLoad"
    :tooltips="app.tooltips"
    @call-file="form.submit.file = $event"
   >
   </app-group-btn>
  </v-col>

  <!-- Caja de Texto  -->
  <v-col cols="12">
   <app-card ref="card" :title="'Maintenance Pet'">
    <template v-slot:body>
     <!-- pet_id -->
     <v-col md="6" cols="12" v-show="false">
      <v-text-field
       prepend-icon="mdi-file-sign"
       v-model="form.submit.pet_id"
       label="Modulo ID"
      ></v-text-field>
     </v-col>

     <!-- pet -->
     <v-col cols="12" sm="6" md="6">
      <v-autocomplete
       clearable
       label="Pet"
       prepend-icon="mdi-ethereum"
       :loading="app.cmb.pet.is_loading"
       :search-input.sync="app.cmb.pet.search"
       :items="app.cmb.pet.items"
       :error-count="form.error.pet_id ? form.error.pet_id.length : 0"
       :error-messages="form.error.pet_id"
       item-text="name"
       v-model="app.cmb.pet.select"
       @change="form.submit.pet_id = $event != null ? $event.pet_id : null"
       return-object
      >
      </v-autocomplete>
     </v-col>

     <!-- registration_date -->
     <v-col cols="12" sm="6" md="6">
      <v-text-field
       v-model="form.submit.registration_date"
       :error-count="form.error.registration_date ? form.error.registration_date.length : 0"
       :error-messages="form.error.registration_date"
       label="Registration Date"
       prepend-icon="mdi-page-layout-sidebar-right"
      ></v-text-field>
     </v-col>

     <!-- registration_time -->
     <v-col cols="12" sm="6" md="6">
      <v-text-field
       v-model="form.submit.registration_time"
       :error-count="form.error.registration_time ? form.error.registration_time.length : 0"
       :error-messages="form.error.registration_time"
       label="Registration Time"
       prepend-icon="mdi-page-layout-sidebar-right"
      ></v-text-field>
     </v-col>

     <!-- turn -->
     <v-col cols="12" sm="6" md="6">
      <v-text-field
       v-model="form.submit.turn"
       :error-count="form.error.turn ? form.error.turn.length : 0"
       :error-messturns="form.error.turn"
       label="Turn"
       prepend-icon="mdi-page-layout-sidebar-right"
      ></v-text-field>
     </v-col>
    </template>
   </app-card>
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
<script src="./nuevo.js"></script>
<style src="./nuevo.css"></style>
