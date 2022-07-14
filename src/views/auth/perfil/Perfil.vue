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
      <app-card ref="card" :title="'Datos Generales'" :icono="'mdi-account'">
        <template v-slot:body>
          <!-- Imagen -->
          <v-col v-if="app.file" class="text-center" cols="12">
            <app-avatar :file="app.file" :size="150"> </app-avatar>
          </v-col>
          <div style="width: 50%; margin: auto">
            <v-col md="6" cols="12" v-show="false">
              <v-text-field v-model="form.submit.id"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                prepend-icon="mdi-file-sign"
                v-model="form.submit.name"
                :counter="50"
                :error-count="form.error.name ? form.error.name.length : 0"
                :error-messages="form.error.name"
                label="Nombre"
                required
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                prepend-icon="mdi-account"
                v-model="form.submit.user_name"
                :counter="30"
                :error-count="form.error.user_name ? form.error.user_name.length : 0"
                :error-messages="form.error.user_name"
                label="Usuario"
                required
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                prepend-icon="mdi-mail"
                v-model="form.submit.email"
                :counter="30"
                :error-count="form.error.email ? form.error.email.length : 0"
                :error-messages="form.error.email"
                label="Correo Electrónico"
                required
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-file-input
                accept="image/png, image/jpeg, image/bmp"
                counter
                v-model="form.submit.profile_photo_path"
                show-size
                truncate-length="15"
              ></v-file-input>
            </v-col>
            <v-col cols="12">
              <v-text-field
                :append-icon="app.password_visible ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="app.password_visible = !app.password_visible"
                :type="app.password_visible ? 'text' : 'password'"
                prepend-icon="mdi-security"
                v-model="form.submit.password"
                :counter="30"
                :error-count="form.error.password ? form.error.password.length : 0"
                :error-messages="form.error.password"
                label="Contraseña"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                :append-icon="
                  app.confirm_password_visible ? 'mdi-eye' : 'mdi-eye-off'
                "
                @click:append="
                  app.confirm_password_visible = !app.confirm_password_visible
                "
                :type="app.confirm_password_visible ? 'text' : 'password'"
                prepend-icon="mdi-security"
                v-model="form.submit.confirm_password"
                :counter="30"
                :error-count="form.error.confirm_password ? form.error.confirm_password.length : 0"
                :error-messages="form.error.confirm_password"
                label="Confirmar Contraseña"
                required
              ></v-text-field>
            </v-col>
          </div>
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
<script src="./perfil.js"></script>
<style lang="scss" src="./perfil.scss"></style>