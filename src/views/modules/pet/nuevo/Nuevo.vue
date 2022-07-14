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

     <!-- people -->
     <v-col cols="12" sm="6" md="6">
      <v-autocomplete
       clearable
       label="People"
       prepend-icon="mdi-ethereum"
       :loading="app.cmb.people.is_loading"
       :search-input.sync="app.cmb.people.search"
       :items="app.cmb.people.items"
       :error-count="form.error.people_id ? form.error.people_id.length : 0"
       :error-messages="form.error.people_id"
       item-text="name"
       v-model="app.cmb.people.select"
       @change="form.submit.people_id = $event != null ? $event.people_id : null"
       return-object
      >
      </v-autocomplete>
     </v-col>

     <!-- pet_type -->
     <v-col cols="12" sm="6" md="6">
      <v-autocomplete
       clearable
       label="Pet Type"
       prepend-icon="mdi-ethereum"
       :loading="app.cmb.pet_type.is_loading"
       :search-input.sync="app.cmb.pet_type.search"
       :items="app.cmb.pet_type.items"
       :error-count="form.error.pet_type_id ? form.error.pet_type_id.length : 0"
       :error-messages="form.error.pet_type_id"
       item-text="descripcion"
       v-model="app.cmb.pet_type.select"
       @change="form.submit.pet_type_id = $event != null ? $event.pet_type_id : null"
       return-object
      >
      </v-autocomplete>
     </v-col>

     <!-- name -->
     <v-col cols="12" sm="6" md="6">
      <v-text-field
       v-model="form.submit.name"
       :error-count="form.error.name ? form.error.name.length : 0"
       :error-messages="form.error.name"
       label="Name"
       prepend-icon="mdi-page-layout-sidebar-right"
      ></v-text-field>
     </v-col>

     <!-- age -->
     <v-col cols="12" sm="6" md="6">
      <v-text-field
       v-model="form.submit.age"
       :error-count="form.error.age ? form.error.age.length : 0"
       :error-messages="form.error.age"
       label="Age"
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
