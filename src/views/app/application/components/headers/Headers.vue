<template>
  <v-app-bar
    id="default-app-bar"
    app
    absolute
    class="v-bar--underline"
    color="transparent"
    :clipped-left="$vuetify.rtl"
    :clipped-right="!$vuetify.rtl"
    height="55"
    flat
  >
    <v-app-bar-nav-icon
      class="hidden-lg-and-up"
      @click="setDrawerHeader(!getDrawerHeader)"
    />

    <div class="hidden-sm-and-down hidden-md-and-down">
      <v-btn
        class="ml-3 mr-4"
        elevation="1"
        fab
        small
        @click="setMiniHeader(!getMiniHeader)"
      >
        <v-icon>
          {{ getMiniHeader ? "mdi-format-list-bulleted" : "mdi-dots-vertical" }}
        </v-icon>
      </v-btn>
    </div>

    <v-toolbar-title class="font-weight-light text-h5" v-text="title" />

    <v-spacer />
    <app-avatar
      v-if="$store.getters['auth/getUser']"
      :file="$store.getters['auth/getUser'].profile_photo_path"
      :size="35"
    >
    </app-avatar>
    <v-menu
      bottom
      lefrt
      min-width="200"
      offset-y
      :offset-x="true"
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn min-width="0" text v-bind="attrs" v-on="on">
          <h5 v-if="$store.getters['auth/getUser']">
            {{ $store.getters["auth/getUser"].name }}
            <v-icon small>mdi-chevron-down</v-icon>
          </h5>
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item @click="showPerfil">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>

            <v-list-item-title>Perfil</v-list-item-title>
          </v-list-item>

          <v-divider class="mb-2 mt-2" />

          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>

            <v-list-item-title>Cerrar sesión</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
    <app-snackbar
      @requestClose="storeCloseSnackbar"
      :visible="$store.state.app.snackbar.visible"
      :content="$store.state.app.snackbar.content"
      :color="$store.state.app.snackbar.color"
    ></app-snackbar>
  </v-app-bar>
</template>
<script src="./headers.js"></script>
<style src="./headers.css"></style>
