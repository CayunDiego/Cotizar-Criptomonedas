const api = new API();
const ui = new Interfaz();

//Leer el formulario
const formulario = document.querySelector('#formulario');


formulario.addEventListener('submit', e => {
    e.preventDefault();
    //leer la moneda seleccionada
    const monedaSelect = document.querySelector('#moneda');
    const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value;
    //la criptomoneda seleccionada
    const criptomonedaSelect = document.querySelector('#criptomoneda');
    const criptomonedaSelecionada = criptomonedaSelect.options[criptomonedaSelect.selectedIndex].value;
    //comprobar que ambos campos tengan algo seleccionado
    if(monedaSeleccionada === '' || criptomonedaSelecionada === ''){
        //arrojar un a alerta de error
        ui.mostrarMensaje('Ambos campos son obligatorios','alert bg-danger text-center');
    } else {
        //todo bien, consultar la api
        api.obtenerValores(monedaSeleccionada, criptomonedaSelecionada)
            .then(data =>{
                ui.mostrarResultado(data.RAW, monedaSeleccionada, criptomonedaSelecionada);
            })
    }
});