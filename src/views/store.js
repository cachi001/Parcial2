/* ==========================
    STORE
  ========================== */

import {openModal} from "../views/modal";
import {handleGetProductsLocalStorage} from "../persistence/localstorage";

export let productActivo = null;
export const setProductoActivo = (producto) =>{
    productActivo = producto;
}

export const handleGetProductsToStore = () => {
    //Funcion que se encarga de Traer los Elementos y llamar al Render
    const products = handleGetProductsLocalStorage();
    handleRenderList(products);
}

//Se encarga de Filtrar y de Renderizar la seccion con todos sus respectivos elementos
export const handleRenderList = (productsIn) => {
    //Filtrado de Arrays por Categoria
    const burguers = productsIn.filter((el) =>
        el.categoria === "Hamburguesas"
    );
    const papas = productsIn.filter((el) =>
        el.categoria === "Papas"
    );
    const gaseosas = productsIn.filter((el) =>
        el.categoria === "Gaseosas"
    );
    //Renderiza los Elementos de la Seccion
    const renderProductGroup = (products, title) => {
        if (products.length > 0) {  // Corregido aquí
            const productosHTML = products.map((product, index) => {
                return `
                <div class="card-item" id="product-${product.categoria}-${index}"> 
                    <div>
                        <img src="${product.imagen}" alt="${product.nombre}" />
                    </div>
                    <div>
                        <h3>${product.nombre}</h3>
                    </div>
                    <div>
                        <p><b>Precio: </b> $${product.precio}</p>
                    </div>
                </div>
                `;
            });
            //Retorna la seccion con los Elementos dentro
            return `
                <section class="seccion-store">
                    <h2>${title}</h2>
                    <div class="container-product-store">
                        ${productosHTML.join("")}
                    </div>
                </section>
            `;
        } else {
            return "";
        }
    };
    const appContainer = document.getElementById("storeContainer");
    appContainer.innerHTML = `
        ${renderProductGroup(burguers, "Hamburguesas")}
        ${renderProductGroup(papas, "Papas")}
        ${renderProductGroup(gaseosas, "Gaseosas")}
    `;

    //Se añaden los Eventos de Manera Dinamica
    const addEvents = (productsIn, index) =>{
        if(productsIn){
            productsIn.forEach((product,index) => {
                const productContainer = document.getElementById(`product-${product.categoria}-${index}`);
                productContainer.addEventListener("click", () => {
                    setProductoActivo(product);
                    openModal();
                })
            });
        }
        
    }
    addEvents(burguers);
    addEvents(papas);
    addEvents(gaseosas);

};
