/* ==========================
    LOCALSTORAGE
  ========================== */

//Traer Productos LocalStorga
export const handleGetProductsLocalStorage = () =>{
    const products = JSON.parse(localStorage.getItem("products"));
    if(products){
        return products;
    } else{
        return [];
    }
};

//Guardar Productos en LocalStorage
export const setInLocalStorge = (productIn) =>{

    //Traer los Elementos
    let productosInLocal = handleGetProductsLocalStorage();
    const existingIndex = productosInLocal.findIndex(
        (productosInLocal) => productosInLocal.id === productIn.id
    );
    //Recibir un Producto
    if(existingIndex != -1){
        //Si Existe remplazarlo
        productosInLocal[existingIndex] = productIn;
    } else{
        //Si No Existe Guardarlo
        productosInLocal.push(productIn);
    }
    //Settear el nuevo arreglo
    localStorage.setItem("products", JSON.stringify(productosInLocal))
    
};