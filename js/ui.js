class Interfaz {
    
    constructor(){
        this.init();
    }

    init(){
        this.construirSelect();
    }

    async construirSelect(){
        const monedas = await api.obtenerMonedasAPI();
        //crear un select de opciones
        const select = document.querySelector('#criptomoneda');
        //despues ver si con el map puedo obtener lo mismo (dudaaaa)
        //iterar todos los resultados de la api
        for(const [key,value] of Object.entries(monedas.Data)){
            //añadir el symbol y el nombre como opciones
            const opcion = document.createElement('option');
            opcion.value = value.Symbol;
            opcion.appendChild(document.createTextNode(value.CoinName));
            select.appendChild(opcion);
        }
    }

    mostrarMensaje(mensaje,clases){
        const div = document.createElement('div');
        div.className = clases;
        div.appendChild(document.createTextNode(mensaje));
        //seleccionar mensajes
        const divMensaje = document.querySelector('.mensajes');
        divMensaje.appendChild(div);
        //mostrar contenido
        setTimeout(() => {
            document.querySelector('.mensajes div').remove();
        },3000);
    }

    //Imprime el resultado de la cotizacion
    mostrarResultado(resultado, moneda, crypto){
        //en caso de un resultado anterior ocultarlo
        const resultadoAnterior = document.querySelector('#resultado div');
        if(resultadoAnterior !== null){
            resultadoAnterior.remove();
        }
        const dataMoneda = resultado[crypto][moneda];
        //recortar digitos de precios
        let precio = dataMoneda.PRICE.toFixed(2),
            porcentaje = dataMoneda.CHANGEPCTDAY.toFixed(2),
            actualizadoFecha = new Date(dataMoneda.LASTUPDATE * 1000).toLocaleDateString();
        //construir el template
        let templateHTML = `
                            <div class="card bg-warning">
                                <div class="card-body text-light">
                                    <h2 class="card-title">Resultado:</h2>
                                    <p>El Precio de ${dataMoneda.FROMSYMBOL} a moneda ${dataMoneda.TOSYMBOL} es de: $${precio}</p>
                                    <p>Variación último día: %${porcentaje}</p>
                                    <p>Ultima Actualización: ${actualizadoFecha}</p>
                                </div>
                            </div>
                           `;
        //spinner 
        document.querySelector('.contenido-spinner').style.display = 'block';
        setTimeout(() => {
            document.querySelector('.contenido-spinner').style.display = 'none';
             //insertar el resultado
            document.querySelector('#resultado').innerHTML = templateHTML;
        },3000);
    }
}