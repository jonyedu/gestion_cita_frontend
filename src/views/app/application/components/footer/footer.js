export default {
  name: "app-footer",
  data: () => ({
    //links: [],
    links: [
      {
        href: "https://www.facebook.com/celestial.omega.944",
        icono: "mdi-facebook",
        text: "Facebook",
        color: "light-blue darken-4",
      },
      {
        href: "https://www.youtube.com/channel/UCOjh_XOXLigAsMc3sMOKZlQ",
        icono: "mdi-youtube",
        text: "Youtube",
        color: "red",
      },
      {
        href: "https://www.instagram.com/celestialomegatv/",
        icono: "mdi-instagram",
        text: "Instagram",
        color: "accent",
      },
      {
        href: "https://api.whatsapp.com/send?phone=593997760413&text=Hola%20hermanos%20necesito%20oracion%20",
        icono: "mdi-whatsapp",
        text: "Whatsapp",
        color: "teal",
      },
    ],
  }),
  mounted() {
    //this.getRedSocial();
  },
  methods: {
    getRedSocial() {
      let that = this;
      let url = "/red_social";
      axios
        .get(url)
        .then(function (response) {
          that.links = response.data.redes_sociales;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};