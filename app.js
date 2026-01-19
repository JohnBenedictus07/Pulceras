console.log("Funcionando"); /* Mensaje de confirmacion */
var tipo_fondo = parseInt(Math.floor(Math.random() * 2) + 1);
console.log(tipo_fondo)

// Función para cargar los datos de las citas (citas.json)
function traer_citas() {

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET', 'citas.json', true); // Petición a 'citas.json'
    xhttp.send();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            // Lógica de las citas
            let RNG = Math.floor(Math.random() * 30);
            let datos = JSON.parse(this.responseText);
            let res = document.querySelector('#caja_texto--activar');
            res.innerHTML = '';

            // Nota: Es mejor usar datos.length en lugar de un número fijo (30)
            for (let i = 0; i < datos.length; i++) {
                if (i == RNG) {
                    res.innerHTML += `
                    <h2 class="texto">${datos[i].texto}</h2>
                    <p class="referencia">${datos[i].referencia}</p>
                    `;
                }
            }
        }
    }
}
// Función para aplicar el fondo aleatorio desde 'fondo.json'
function aplicar_fondo_aleatorio() {

    const xhttpFondo = new XMLHttpRequest();

    xhttpFondo.open('GET', 'fondo.json', true); // Petición a 'fondo.json'
    xhttpFondo.send();

    xhttpFondo.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            const datosFondo = JSON.parse(this.responseText);
            const fondoElemento = document.getElementById('fondo-activar');

            if (tipo_fondo == 1) {
                // 1. Generar un índice aleatorio 
                // Usamos .length para ser flexibles
                const RNG_COLOR = Math.floor(Math.random() * datosFondo.colores.length);

                // 2. Seleccionar y aplicar el degradado
                const colorSeleccionado = datosFondo.colores[RNG_COLOR];
                fondoElemento.style.backgroundImage = colorSeleccionado;

                console.log("Fondo aplicado:", colorSeleccionado);
            }
            else if (tipo_fondo == 2) {
                const RNG_IMAGEN = Math.floor(Math.random() * datosFondo.imagenes.length);
                const imagen_seleccionada = datosFondo.imagenes[RNG_IMAGEN];
                fondoElemento.style.backgroundImage = `url('fondos/${imagen_seleccionada}')`;
                console.log("Fondo aplicado:", imagen_seleccionada);
            }

        }
    }
}

// Llama a las funciones.
traer_citas();
aplicar_fondo_aleatorio();