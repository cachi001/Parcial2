/* ==========================
    POPUPS
  ========================== */
import {productActivo, setProductoActivo} from "./store";
const buttonCancel = document.getElementById("buttonCancel");
        buttonCancel.addEventListener("click", () => {
        closeModal();
})

//Funciones para abrir y cerrar modal
export const openModal = () => {
    const modal = document.getElementById("modalPopUP");
    modal.style.display = "flex";

    const buttonDelete = document.getElementById("buttonDelete");
    if (productActivo) {
        buttonDelete.style.display = "block";
    }else{
        buttonDelete.style.display = "none";
    }
    if(productActivo){
        const nombre = document.getElementById("nombre"),
        imagen = document.getElementById("img"),
        precio = document.getElementById("precio"),
        categoria = document.getElementById("categoria");
        nombre.value = productActivo.nombre;
        imagen.value = productActivo.imagen;
        precio.value = productActivo.precio;
        categoria.value = productActivo.categoria;
    }
}

export const closeModal = () => {
    const modal = document.getElementById("modalPopUP");
    modal.style.display = "none";
    setProductoActivo(null)
    resetModal();
}
const resetModal = () =>{
    const nombre = document.getElementById("nombre"),
        imagen = document.getElementById("img"),
        precio = document.getElementById("precio"),
        categoria = document.getElementById("categoria");
    nombre.value = "";
    imagen.value = "";
    precio.value = "";
    categoria.value = "Seleccione una Categoria"

}