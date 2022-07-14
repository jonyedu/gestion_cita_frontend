<template>
  <v-footer id="default-footer" color="transparent" absolute app inset>
    <v-container>
      <v-row align="center">
        <v-col
          v-for="(link, i) in links"
          :key="i"
          class="ml-5 text-center"
          cols="2"
          md="auto"
        >
          <v-btn
            :color="link.color"
            class="ma-2 white--text"
            fab
            x-small
            :href="link.url"
            target="_blank"
            ><v-icon>{{ link.icono }} </v-icon>
          </v-btn>
          <br />
        </v-col>
        <v-spacer class="hidden-sm-and-down" />

        <v-col class="" cols="12" md="auto">
          <div class="text-body-1 font-weight-light pt-6 pt-md-0 text-center">
            &copy; {{ new Date().getFullYear() }}, Derechos Reservados
            <a target="_blank" href="https://viamatica.com/" class="text-decoration-none"
              ><strong>VIAMATICA</strong>
            </a>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>
<script src="./footer.js"></script>
<style src="./footer.css"></style>
