import { handleGetProductsLocalStorage } from "../persistence/localstorage";
import { handleRenderList } from "../views/store";
/* ==========================
    HEADER SEARCH BAR
========================== */
export const handleSearchProductbByName = () => {
    const inputHeader = document.getElementById("inputHeader");
    const products = handleGetProductsLocalStorage();

    const result = products.filter((el) => 
        el.nombre.toLowerCase().includes(inputHeader.value)
    )
    handleRenderList(result);
}