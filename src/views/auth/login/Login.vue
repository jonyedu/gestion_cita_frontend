<template>
  <v-app>
    <v-main id="login">
      <v-container fill-height>
        <v-row>
          <v-col md="7" class="p-0">
            <v-card-text class="login-wrapper">
              <div class="login-logo" id="registro">
                <v-img class="logo" src="@/assets/images/logo_icon.png"></v-img>
              </div>
              <v-form>
                <!-- Usuario o Email -->
                <v-text-field
                  :error-count="form.error.email ? form.error.email.length : 0"
                  :error-messages="form.error.email"
                  v-model="user.email"
                  prepend-icon="mdi-email"
                  label="Correo Electronico o Usuario"
                  type="email"
                  @keyup.enter="login"
                ></v-text-field>
                <!-- Contraseña -->
                <v-text-field
                  :error-count="form.error.password ? form.error.password.length : 0"
                  :error-messages="form.error.password"
                  :append-icon="
                    request_config.password_visible ? 'mdi-eye' : 'mdi-eye-off'
                  "
                  @click:append="
                    request_config.password_visible =
                      !request_config.password_visible
                  "
                  :type="request_config.password_visible ? 'text' : 'password'"
                  v-model="user.password"
                  prepend-icon="mdi-lock"
                  label="Contraseña"
                  @keyup.enter="login"
                ></v-text-field>
                <v-checkbox
                  v-model="user.remember_me"
                  label="¿Permanecer Conectado?"
                  hide-details="hide-details"
                ></v-checkbox>
                <v-btn
                  class="mt-5"
                  color="red darken-2"
                  @click="login"
                  :loading="request_config.loading"
                  block="block"
                  >Iniciar Sesión</v-btn
                >
                <v-btn
                  class="mt-1"
                  color="blue"
                  @click="showForgotPassword"
                  block="block"
                  >¿Olvido su Contraseña?</v-btn
                >
              </v-form>
            </v-card-text>
          </v-col>
          <v-col md="5" id="login-img" class="p-0 h-100">
            <div class="img-fit">
              <video
                width="320"
                height="240"
                autoplay=""
                loop=""
                muted=""
                poster="@/assets/video/login-video.png"
              >
                <source src="@/assets/video/video-login.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <app-footer />
    <app-snackbar
      @requestClose="storeCloseSnackbar"
      :visible="$store.state.app.snackbar.visible"
      :content="$store.state.app.snackbar.content"
      :color="$store.state.app.snackbar.color"
    ></app-snackbar>
  </v-app>
</template>

<script src="./login.js"></script>
<style lang="scss" src="./login.scss"></style>
