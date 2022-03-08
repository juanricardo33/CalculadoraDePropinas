// Variables y selectores
const campoCompra = document.querySelector("#precioProducto");
const campoPersonas = document.querySelector("#numberOfPeople");
const divNumberPerson = document.querySelector("#divNumberPerson");
const valueCustom = document.querySelector("#custom");
const form = document.querySelector(".formulario")
const percentButtons = document.querySelectorAll("form input[name='botonPorciento']");
const porcentajePorPersona = document.querySelector("#tipAmountPerson");
const totalPorPersona = document.querySelector("#totalPerson");
const btnReset = document.querySelector("input[value='Reset']")
let totalCompra;
let numeroDePersonas;
let tipAmount;
let tipAmountPerson;
let totalPerson;

//Eventos
eventListeners()
function eventListeners(){
    //se ejecuta cuando la app arranca
    document.addEventListener("DOMContentLoaded", iniciarApp);

    campoCompra.addEventListener("blur", validarCampos);
    campoPersonas.addEventListener("blur", validarCampos);
    valueCustom.addEventListener(("blur"), validarCampos);
    valueCustom.addEventListener("click", validarCampos);
    btnReset.addEventListener("click", resetForm)
    //percentButtons.addEventListener("click", validarTip)
    for (const percentButton of percentButtons ){
        percentButton.addEventListener("click", validarTip)
    }
}

//funciones
//Desabilita el boton reset
function iniciarApp(){
    btnReset.classList.add("disable");
    btnReset.classList.remove("enable")
    btnReset.disabled = true;
}
function validarCampos(e){
    //Validar si los datos ingresados son diferentes a texto y que sea mayor a 0
   if (e.target.value.length > 0 && !isNaN(e.target.value) ){
    e.target.parentElement.classList.remove("borderError");
    e.target.parentElement.classList.add("valido");
    if (e.target.id == "precioProducto"){
        totalCompra =  parseInt(e.target.value);
        calc();
    }
    if (e.target.id == "numberOfPeople"){
        numeroDePersonas = parseInt(e.target.value);
        calc();
    }
    if (e.target.id == "custom"){
        tipAmount = parseInt(e.target.value);
        unselect();
        calc();
    }
   }else{
       e.target.parentElement.classList.remove("valido");
       e.target.parentElement.classList.add("borderError")
       if (e.target.id == "numberOfPeople"){
        mostrarError("Ingrese un dato valido");
       }
   }
}
function validarTip(e){
    if (e.target.name == "botonPorciento"){
        tipAmount = parseInt(e.target.id);
        valueCustom.parentElement.classList.remove("borderError", "valido");
        valueCustom.value = ""
        calc();
    }
}
function mostrarError(mensaje){
    const mensajeError = document.createElement("h5");
    mensajeError.textContent = mensaje;
    mensajeError.classList.add("textError");

    const errores = document.querySelectorAll(".textError");
    if(errores.length === 0){
        divNumberPerson.appendChild(mensajeError);
    }
    setTimeout(() => {
        mensajeError.remove();
    }, 2000);
}
/*Funcion temporal borrar si no se usa*/
function eliminarError(){
    const errores = document.querySelectorAll(".textError");
    if (errores.length > 0 ){
        console.log();
    }
}
//Eliminamos la seleccion de los botones Check
function unselect(){
    document.querySelectorAll('[name=botonPorciento]').forEach((x) => x.checked=false);
  }
/*Funcion temporal de validacion*/
function calc(e){
    console.log(tipAmount);
    console.log(totalCompra);
    console.log(numeroDePersonas);
    if (typeof tipAmount !== "undefined" && typeof totalCompra !== "undefined" && typeof numeroDePersonas !== "undefined"){
        //Propina por persona
        let tip = tipAmount/100;
        tipAmountPerson = (totalCompra*tip)/numeroDePersonas;
        //Total por persona
        totalPerson = (totalCompra+(tipAmountPerson*numeroDePersonas))/numeroDePersonas;
        mostrarDatos();
    }
}
function mostrarDatos() {
    //Mostrar informacion en pantalla
    porcentajePorPersona.textContent = "$ "+ tipAmountPerson.toFixed(2);
    totalPorPersona.textContent = "$ "+ totalPerson.toFixed(2);
    //Habilitar el boton reset
    btnReset.disabled = false;
    btnReset.classList.remove("disable")
    btnReset.classList.add("enable")
}

//resetear el formulario
function resetForm(){
    form.reset();
    porcentajePorPersona.textContent = "0";
    totalPorPersona.textContent = "0";
    const validoBill = document.querySelector("#iconDollar");
    const validoPeople = document.querySelector("#iconPerson");
    validoBill.classList.remove("valido");
    validoPeople.classList.remove("valido");
    iniciarApp();

}