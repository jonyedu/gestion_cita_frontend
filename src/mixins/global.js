export const global = {
    /**
     * Get the name of the targeted location
     *
     * @param {Node} node - HTML node
     * @returns {string} Name of the location
     */
    getLocationName(node) {
        var item = node.attributes;
        const tooltip = new Object();
        tooltip.name = item.name.value;
        tooltip.total = item.total ? item.total.value : 0;
        tooltip.misiones = item.misiones ? JSON.parse(item.misiones.value) : [];
        return tooltip;
    },

    /**
     * Get the name of the selected location
     *
     * @param {Object} map - Map of component
     * @param {string} locationId - Id of selected location
     * @returns {string} Name of the selected location
     */
    getSelectedLocationName(map, locationId) {
        return locationId && map.locations.find(location => location.id === locationId).name
    },
    /**
     * Get convertir un base64 a File
     *
     * @param {Object} dataurl - Map of component
     * @param {string} filename - Id of selected location
     * @returns {file} File
     */
    convertBasa64ToFile(dataurl, filename) {

        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    },
    //Metodo para convertir un File a base64 
    convertFileToBasa64(file) {
        if (file == undefined) return;
        return new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                resolve(reader.result);
            };
            reader.onerror = function (error) {
                console.error('Error: ', error);
            };

        });


    },

    //Metodo para Convertir la Primera letra de una Palabra en Mayuscula
    toCapitalFirstWords: palabra => {
        if (palabra != null) {
            var valor = palabra.toString();
            return valor.charAt(0).toUpperCase() + valor.slice(1).toLowerCase();
        } else {
            return (valor = "");
        }
    },

    //Metodo para Convertir la Primera letra de una Oracion en Mayuscula
    toCapitalFirstAllWords: palabra => {
        if (palabra != null) {
            var pieces = palabra.split(" ");
            for (var i = 0; i < pieces.length; i++) {
                var j = pieces[i].charAt(0).toUpperCase();
                pieces[i] = j + pieces[i].substr(1).toLowerCase();
            }
            return pieces.join(" ");
        } else {
            return (pieces = "");
        }
    },

    //Metodo para poner abreviar una palabra y concatenar con la segunda
    countWords: palabra => {
        if (palabra != null || palabra != undefined) {
            var texto_area_dividido = palabra.split(" ");
            var no_palabra = texto_area_dividido.length;
            return no_palabra;
        } else {
            return 0;
        }
    },

    //Metodo para poner abreviar una palabra y concatenar con la segunda
    pluck(arr, key) {
        return arr.map(i => i[key]);
    },


    //Metodo para poner abreviar una palabra y concatenar con la segunda
    toAbbreviationFirstWordConcatenatesSecond: palabra => {
        if (palabra != null || palabra != undefined) {
            //Obtengo la posicion de la 2 palabra, para luego concatenar con la abreviatura
            var posicion_palabra_obtener = +palabra.indexOf(' ');

            //valido que la posicion se haya obtenido
            var texto_area_dividido = palabra.split(" ");
            var no_palabra = texto_area_dividido.length;
            if (no_palabra == 1) return palabra;

            //si la pabara es 2
            if (no_palabra == 2) {
                //Obtengo la abrebiatura de la primera palabra
                var abreviatura_1re_palabra = palabra.substr(0, 1);
                //obtengo la segunda palabra
                var palabra_obtenida = palabra.substr(posicion_palabra_obtener + 1);
                //concateno las palabras
                var descripcion = `${abreviatura_1re_palabra}. ${palabra_obtenida}`;
            } else if (no_palabra == 3) {
                //Obtengo la posicion de la 2 palabra, para luego concatenar con la abreviatura
                var posicion_2da_palabra_obtener = +palabra.lastIndexOf(' ');
                //Obtengo la abreviatura de la primera palabra
                abreviatura_1re_palabra = palabra.substr(0, 1);
                //Obtengo la abrebiatura de la segunda palabra
                var abreviatura_2da_palabra = palabra.substr(posicion_palabra_obtener + 1, 1);
                //obtengo la tercera palabra
                var palabra_obtenida = palabra.substr(posicion_2da_palabra_obtener + 1);
                //concateno las palabras
                descripcion = `${abreviatura_1re_palabra}. ${abreviatura_2da_palabra}. ${palabra_obtenida}`;
            }

            return descripcion;
        } else {
            return '';
        }
    },

};