// Variables
const btnEnviar = document.querySelector('#send');
const formulario = document.querySelector('#enviar-email')
const btnEliminar = document.querySelector('#delete');

// Variables de input 
const email = document.querySelector('#mail')
const asunto = document.querySelector('#affair')
const mensaje = document.querySelector('#mesage')
const er = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;


// EventListener
eventListener();

function eventListener() {

    // Cuando la app arranca se ejecuta este codigo
    document.addEventListener('DOMContentLoaded', inciarApp);

    // Campos del formmulario 
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    // Enviar email
    btnEnviar.addEventListener('click', enviarEmail);

    // Reset btn
    btnEliminar.addEventListener('click', resetForm);

}

// funciones
function inciarApp() {

    btnEnviar.disabled = true;
    btnEnviar.style.opacity = "0.4";
    btnEnviar.style.cursor = "not-allowed";
}

// Valida el formulario
function validarFormulario(e) {


    if (e.target.value.length > 0) {

        // Eliminar los errores
        const error = document.querySelector('.error')

        if (error) {

            error.remove();
        }

        e.target.style.borderColor = 'green'


    } else {

        e.target.style.borderColor = 'red';

        mostrarError('Todos los campos son obligatorios');
    }

    if (e.target.type === 'email') {


        if (er.test(e.target.value)) {

            const error = document.querySelector('.error')


            if (error) {

                error.remove();
            }

            e.target.style.borderColor = 'green'


        } else {

            e.target.style.borderColor = 'red'
            mostrarError('Email no valido')


        }


    }


    if (er.test(email.value) && asunto.value != '' && mensaje.value != '') {

        btnEnviar.disabled = false;
        btnEnviar.style.opacity = "1";
        btnEnviar.style.cursor = "pointer";



    } else {


        btnEnviar.disabled = true;
        btnEnviar.style.opacity = "0.4";
        btnEnviar.style.cursor = "not-allowed";

    }


}


function mostrarError(mensaje) {

    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('mensaje-error', 'error');

    const errores = document.querySelectorAll('.mensaje-error');

    if (errores.length == 0) {
        formulario.appendChild(mensajeError);

    }


}

// Envia el email
function enviarEmail(e) {

    // e.preventDefault();

    console.log('enviando')
    // Mostrar el espinner
    const spinner = document.querySelector('#spinner')
    spinner.style.display = 'flex'


    // DEspuesd e 3 segundos ocultamos el spinner y mostramos mensaje
    setTimeout(() => {

        spinner.style.display = 'none'

        // Mensaje que dice que se envio correctamente
        const parrafo = document.createElement('p');
        parrafo.textContent ='El mensaje se envio correctamente'
        parrafo.classList.add('envio-correcto');

        formulario.appendChild(parrafo);

        // Eliminar el parrafo de envio
        setTimeout(() => {

            parrafo.remove();

            resetForm();

        }, 4000)

    }, 3000);
}

// Funcion que resetea el fonrmulario
function resetForm(){

    formulario.reset();
    inciarApp();
}