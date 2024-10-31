/* ==========================
    CATEGORIAS
  ========================== */

import { handleGetProductsLocalStorage } from "../persistence/localstorage";
import { handleRenderList } from "../views/store";

let categoriaActiva = null;
const setCategoriaActiva = (categoriaIn) => {
    categoriaActiva = categoriaIn;
};
//Funcion para Filtrar Segun la Categoria
const handleFilterProductsByCategory = (categoriaIn) =>{
    const products = handleGetProductsLocalStorage();
    
    switch (categoriaIn) {
        case categoriaActiva:
            handleRenderList(products);
            break;
        case "Todo":
            handleRenderList(products);
            break;
        case "Hamburguesas":
        case "Papas":
        case "Gaseosas":
            const result = products.filter((el) => el.categoria === categoriaIn);
            handleRenderList(result);
            break;
        case "mayorPrecio":
            const resultMayorPrecio = products.sort((a,b)=> b.precio - a.precio);
            handleRenderList(resultMayorPrecio)
            break;
        case "menorPrecio":
            const resultMenorPrecio = products.sort((a,b)=> a.precio - b.precio);
            handleRenderList(resultMenorPrecio)
            break;
        default:
            break;
    }
}
  //Render de la vista categorias
export const renderCategorias = () => {
    //Tomamos los elementos de la lista
    const ulList = document.getElementById('listFilter');
    //Creamos esos elementos dentro de la lista
    ulList.innerHTML = `
        <li id="Todo">Todos los Productos</li>
        <li id="Hamburguesas">Hamburguesas</li>
        <li id="Papas">Papas</li>
        <li id="Gaseosas"> Gaseosas</li>
        <li id="mayorPrecio">Mayor Precio</li>
        <li id="menorPrecio">Menor Precio</li>
    `;

    //Añadimos el evento click para cada elemento
    const liElements = ulList.querySelectorAll("li");
    liElements.forEach((liElement) => {
        liElement.addEventListener("click", () =>{
            handleClick(liElement);
        })
    });
    //Verificamos y manejamos el estilo del elemento activo
    const handleClick = (element) =>{
        handleFilterProductsByCategory(element.id);
        liElements.forEach((el) => {
            if(el.classList.contains("liActive")){
                el.classList.remove("liActive");
            }else{
                if(element===el){
                    el.classList.add("liActive");
                }
            }
        })
    };
};