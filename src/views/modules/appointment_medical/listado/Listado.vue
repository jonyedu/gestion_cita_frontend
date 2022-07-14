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
    <!-- Filtro Busqueda -->
    <v-col cols="12">
      <v-skeleton-loader
        max-height="100"
        height="75"
        v-if="app.firstLoad"
        :loading="table.loading_table"
        type="card"
      >
      </v-skeleton-loader>
      <app-card-expand :title="'Criterio de Búsqueda'" v-show="!app.firstLoad">
        <template v-slot:body>
          <v-col cols="4">
            <v-text-field
              @input="onSearch"
              v-model="form.submit.search"
              label="Descripción"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-select
              item-text="item_text"
              item-value="item_value"
              v-model="form.submit.select"
              :items="form.cmb.estado.items_estados"
              label="Seleccione Estado"
              @input="onSearch"
            ></v-select>
          </v-col>
        </template>
      </app-card-expand>
    </v-col>
    <!-- Tabla -->
    <v-col cols="12">
      <v-skeleton-loader
        v-if="app.firstLoad"
        :loading="table.loading_table"
        type="table"
      >
      </v-skeleton-loader>

      <v-card v-show="!app.firstLoad">
        <v-data-table
          v-model="form.submit.selected"
          :headers="table.headers"
          :items="table.pet_medical_appointments"
          :options.sync="form.submit.options"
          :server-items-length="app.total"
          :loading="table.loading_table"
          :items-per-page="5"
          show-select
          item-key="pet_medical_appointment_id"
        >
          <!-- Cuando no haya data -->
          <template v-slot:no-data>
            <v-btn
              :loading="table.loading_table"
              @click="onSearch"
              fab
              small
              color="primary"
            >
              <v-icon>mdi-backup-restore</v-icon>
            </v-btn>
          </template>
          <!-- Donde muestra el icono de modificar y eliminar -->
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small color="primary" class="mr-2" @click="showEdit(item)">
              mdi-pencil
            </v-icon>
            <v-icon small color="red" @click="showDestroy(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
    <!-- Dialogo -->
    <v-dialog v-model="app.show_dialog" width="500">
      <v-card>
        <v-card-title class="text-h6 red darken-1">
          Confirmar Eliminación
        </v-card-title>

        <v-card-text>
          ¿Está seguro en eliminar el item:
          <strong>{{ app.name }}</strong> ?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="hideDestroy">
            <v-icon left> mdi-minus-circle </v-icon> Cancelar
          </v-btn>
          <v-btn color="teal" @click="destroy">
            <v-icon left> mdi-delete </v-icon> Eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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