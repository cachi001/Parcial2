import Swal from "sweetalert2";
import { handleGetProductsToStore, handleRenderList } from "./src/views/store";
import { handleGetProductsLocalStorage, setInLocalStorge } from "./src/persistence/localstorage";
import { productActivo } from "./src/views/store";
import { renderCategorias } from "./src/services/categorias";
import { openModal, closeModal } from "./src/views/modal"; // Asegúrate de que el archivo de utilidades esté bien definido
import { handleSearchProductbByName } from "./src/services/searchbar";

document.addEventListener("DOMContentLoaded", () => {
/* ==========================
    APLICACION
========================== */
    handleGetProductsToStore();
    renderCategorias();

/* ==========================
    HEADER
========================== */
    const buttonAdd = document.getElementById("buttonAddElement");
    buttonAdd.addEventListener("click", () => {
        openModal();
    });

    const buttonAcept = document.getElementById("buttonAcept");
    buttonAcept.addEventListener("click", () => {
        handleSaveOrModifyElements();
    });
    //Funcion para Guardar o Modificar elementos
    const handleSaveOrModifyElements = () => {
        const nombre = document.getElementById("nombre").value,
            imagen = document.getElementById("img").value,
            precio = document.getElementById("precio").value,
            categoria = document.getElementById("categoria").value;
        let object = null;

        if (productActivo) {
            object = {
                ...productActivo,
                nombre,
                imagen,
                precio,
                categoria,
            };
        } else {
            object = {
                id: new Date().toISOString(),
                nombre,
                imagen,
                precio,
                categoria,
            };
        }
        Swal.fire({
            title: "Correcto!",
            text: "Producto Guardado Correctamente",
            icon: "success"
        });
        setInLocalStorge(object);
        closeModal();
    };

    const buttonCancel = document.getElementById("buttonCancel");
    buttonCancel.addEventListener("click", () => {
        closeModal();
    });

    const buttonSearch = document.getElementById("buttonSearch");
    buttonSearch.addEventListener("click", () => {
        handleSearchProductbByName();
    });
    const buttonDelete = document.getElementById("buttonDelete");
    buttonDelete.addEventListener("click", () => {
        handleDeleteProduct();
    });
    
    const handleDeleteProduct = () =>{
        Swal.fire({
            title: "¿Desea Eliminar Elemento?",
            text: "Si lo eliminas sera permanente",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar"
        }).then((result) => {
            if (result.isConfirmed) {
                const products = handleGetProductsLocalStorage();
                const result = products.filter((el) => 
                    el.id != productActivo.id
                )
                //Settear el nuevo arreglo
                localStorage.setItem("products", JSON.stringify(result))
                const newProducts = handleGetProductsLocalStorage();
                handleRenderList(newProducts);
                closeModal();
            } else{
                closeModal();
            }
        });
    }
});