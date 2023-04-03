export function valida(input){
    //Se accede al tipo de data atribute
    const tipoDeInput = input.dataset.tipo;
    
    
    //Se accede al objeto
    if(validadores[tipoDeInput]){ //Aquí se debio haber válidado si el validadores[tipoDeInput] estaba en el arreglo tipoDeErrores
        validadores[tipoDeInput](input)
    }

    //Para que sirve el atributo validity y como usarlo con $0
    console.log(input.validity.valid);
    if(input.validity.valid){ //Validando el input seleccionado
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML="";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML=mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores =[
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",

];


//Como crear un objeto y maneras de resolverlo
//Cuando usar los corchetes [] para entrar a un objeto y cuando el operador punto (.)
//formar de un for
const mensajesDeError = {
    nombre:{
        valueMissing: "El campo nombre no puede estar vació"
    },
    email:{
        valueMissing: "Este campo correo no puede estar vacio",
        typeMismatch: "El correo no es válido"
    },
    password: {
        valueMissing: "El campo contraseña no puede estar vacío",
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe conteer una letra minúscula, una letra mayúscula, un número y no puede conetener caracteres especiales"
    },
    nacimiento: {
        valueMissing: "Este campo nacimiento no puede estar vacio",
        customError: "Debes tener al menos 18 años"
    },
    numero: {
        valueMissing: "Este campo de telefono no puede estar vacío",
        patternMismatch: "El formato requerido es XX-XXXX-XXXX 10 números"
    },
    direccion:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La dirección debe contener entre 10 a 40 caracteres"
    },
    ciudad:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La ciudad debe contener entre 10 a 40 caracteres"
    },
    estado:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El estado debe contener entre 10 a 40 caracteres"
    },
};


//crecion ce objetos
const validadores = {
    nacimiento: (input) => validarNacimiento(input), //Es una función que llama a otra función
};

function mostrarMensajeDeError (tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
        if(input.validity[error]){
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })
    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje ="";
    if(!mayorDeEdad(fechaCliente)){
        mensaje ="Debes tener al menos 18 años"
    }

    input.setCustomValidity(mensaje);

}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
      fecha.getUTCFullYear() + 18,
      fecha.getUTCMonth(),
      fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
}