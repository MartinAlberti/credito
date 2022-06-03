let intereses = 0;
let montoCuotas = 0;
let mensual = 0;
let montoTotal = 0;
let porcentaje = 0;
let repetir = false;
const historialOperaciones = [];
const array = [3, 5, 6];
let nombre = ""
let apellido = ""
let monto = document.querySelector("#grupo__monto").value
let cuotas = document.querySelector("#grupo__cuotas").value
let i = 1;
let nombreApellido = ""
const dateTime = luxon.DateTime;
let now = dateTime.now()
let fecha = now.toLocaleString(dateTime.DATETIME_SHORT)






const expresiones = {
    nombre: /^[a-z,.'-]+$/i,
    apellido: /^[a-z,.'-]+$/i,
    monto: /^\d{1,50}$/,
    cuotas: /^\d{1,50}$/
}
const inputs = document.querySelectorAll('#formulario input');

const campos = {
    nombre: false,
    apellido: false,
    monto: false,
    cuotas: false,

}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case "apellido":
            validarCampo(expresiones.apellido, e.target, 'apellido');
            break;
        case "monto":
            validarCampo(expresiones.monto, e.target, 'monto');
            break;
        case "cuotas":
            validarCampo(expresiones.cuotas, e.target, 'cuotas');
            break;

    }
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('animacionRojo');
        document.getElementById(`grupo__${campo}`).classList.add('animacionVerde');
        document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.remove('animacionVerde');
        document.getElementById(`grupo__${campo}`).classList.add('animacionRojo');
        campos[campo] = false;
    }
}
inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();;

    const terminos = document.getElementById('terminos');
    
    if (campos.nombre && campos.apellido && campos.monto  && campos.cuotas && terminos.checked) {
        document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        divHistorial.classList.add("hide")
        proceso()
        botonHistorial.classList.remove("hide")


    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');

    }
});

const botonHistorial = document.querySelector(".historial__btn")
const botonCredito = document.querySelector(".enviar")
botonCredito.addEventListener("click" , ()=>{
    location.href="#credito"
})
botonHistorial.addEventListener("click" , ()=>{
    location.href="#divHistorial"
})



mostrarHTML = (obj) => {
    cambioUl.innerHTML = `
    <li>USD: ${obj.USD} </li>
    <li>Euro: ${obj.Euro} </li>
    <li>Real: ${obj.Real} </li>
    <li>Yen: ${obj.Yen} </li>
    `
}

const obtenerDatosJson = () => {
    fetch("../data/data.json")
        .then((respuesta) => {
            return respuesta.json()
        })
        .then((dato) => {
            mostrarHTML(dato)
        })
        .catch((err) => {
            console.log("Mi error: ", err)
        })
}
obtenerDatosJson()

const cambioUl = document.querySelector(".cambioUl")



function proceso() {


    monto = parseInt(document.querySelector("#grupo__monto").value)
    cuotas = parseInt(document.querySelector("#grupo__cuotas").value)
    nombre = document.querySelector("#grupo__nombre").value
    nombre = nombre.toLocaleLowerCase()
    apellido = document.querySelector("#grupo__apellido").value
    apellido = apellido.toLowerCase()
    nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1)
    apellido = apellido.charAt(0).toUpperCase() + apellido.slice(1)
    nombreApellido = `${nombre} ${apellido}`


    if (cuotas <= 12) {
        porcentaje = 8;
    }
    if (cuotas > 12 && cuotas <= 24) {
        porcentaje = 10;
    }
    if (cuotas > 24) {
        porcentaje = 12;
    }


    function calcurarInteres() {
        if (cuotas <= 12)
            intereses = (((monto * 8) / 100) * cuotas);
    }
    if (cuotas > 10 && cuotas <= 24) {
        intereses = (((monto * 10) / 100) * cuotas);

    } else {
        intereses = (((monto * 12) / 100) * cuotas);
    }



    function interesMensual() {
        mensual = (intereses / cuotas).toFixed(2);
    }


    function calcularTotal() {

        montoTotal = (monto + intereses).toFixed(2);

    }


    function calcularCuotas() {

        montoCuotas = (montoTotal / cuotas).toFixed(2);
    }


    calcurarInteres();
    interesMensual();
    calcularTotal();
    calcularCuotas();

    intereses = intereses.toFixed(2)
    let MostrarNuevoCredito = document.querySelector(".nuevoCredito")
    MostrarNuevoCredito.classList.remove("hide")


    let mostrarFecha = document.querySelector(".mostrarFecha")
    mostrarFecha.textContent = fecha;

    let mostrarNombre = document.querySelector(".mostrarNombre")
    mostrarNombre.textContent = nombreApellido;

    let mostrarMonto = document.querySelector(".mostrarMonto")
    mostrarMonto.textContent = `Crédito: $${monto}`;

    let mostrarMensual = document.querySelector(".mostrarMensual")
    mostrarMensual.textContent = `Interés mensual (${porcentaje}%) : $${mensual}`;

    let mostrarIntereses = document.querySelector(".mostrarIntereses")
    mostrarIntereses.textContent = `Intereses totales: $${intereses}`;

    let mostrarTotal = document.querySelector(".mostrarTotal")
    mostrarTotal.textContent = `Total a abonar: $${montoTotal}`

    let mostrarCuotas = document.querySelector(".mostrarCuotas")
    mostrarCuotas.textContent = `Debe abonar ${cuotas} cuotas de $${montoCuotas}`




    function historialCreditos(operacionH, fechaH, nombreH, creditoH, cuotasH, mensualH, interesesH, totalH, montoCuotasH) {
        this.operacionH = i;
        this.fechaH = fecha;
        this.nombreH = nombreApellido;
        this.creditoH = monto;
        this.cuotasH = cuotas;
        this.mensualH = mensual;
        this.interesesH = intereses;
        this.totalH = montoTotal;
        this.montoCuotasH = montoCuotas;


    }


    const nuevoCredito = new historialCreditos((i, fecha, nombreApellido, monto, cuotas, mensual, intereses, montoTotal, montoCuotas))
    historialOperaciones.unshift(nuevoCredito)
    // console.log(historialOperaciones)

    function historialTexto() {

        const {
            operacionH,
            fechaH,
            nombreH,
            creditoH,
            cuotasH,
            mensualH,
            interesesH,
            totalH,
            montoCuotasH
        } = nuevoCredito


        const historialOperacion = document.createElement("li")
        historialOperacion.classList.add("historialOperacion")
        historialOperacion.textContent = `Operacion n° ${operacionH}`

        const historialFecha = document.createElement("li")
        historialFecha.classList.add("historialFecha")
        historialFecha.textContent = `${fechaH}`

        const historialNombre = document.createElement("li")
        historialNombre.classList.add("historialNombre")
        historialNombre.textContent = nombreH

        const historialMonto = document.createElement("li")
        historialMonto.classList.add("historialMonto")
        historialMonto.textContent = `Crédito: $${creditoH}`

        const historialMensual = document.createElement("li")
        historialMensual.classList.add("historialMensual")
        historialMensual.textContent = `Interés mensual (${porcentaje}%) : $${mensualH}`

        const historialIntereses = document.createElement("li")
        historialIntereses.classList.add("historialIntereses")
        historialIntereses.textContent = `Intereses totales: $${interesesH}`

        const historialTotal = document.createElement("li")
        historialTotal.classList.add("historialTotal")
        historialTotal.textContent = `Total a abonar: $${totalH}`

        const historialCuotas = document.createElement("li")
        historialCuotas.classList.add("historialCuotas")
        historialCuotas.textContent = `Debe abonar ${cuotasH} cuotas de $${ montoCuotasH}`



        const cardBody = document.createElement("ul")
        cardBody.classList.add("cardBody")
        cardBody.classList.add("shadow")
        const divHistorial = document.querySelector("#divHistorial")


        cardBody.appendChild(historialOperacion)
        cardBody.appendChild(historialFecha)
        cardBody.appendChild(historialNombre)
        cardBody.appendChild(historialMonto)
        cardBody.appendChild(historialMensual)
        cardBody.appendChild(historialIntereses)
        cardBody.appendChild(historialTotal)
        cardBody.appendChild(historialCuotas)
        divHistorial.appendChild(cardBody)


        localStorage.setItem(`operacion ${i}`, JSON.stringify(nuevoCredito))
    }

    botonHistorial.addEventListener("click", historialHide)
    historialTexto()
    i += 1

}
function historialHide(){
    divHistorial.classList.remove("hide")
}