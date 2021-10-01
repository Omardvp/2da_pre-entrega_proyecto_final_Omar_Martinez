// Creo el array de carrito de compras con let para poder pushear y agregar los objetos 
let carritoDeCompras = []

// Llamo mi contenedor de productos donde le digo que replique todas mis cards  
const contenedorProductos = document.getElementById('contenedor-productos');
// Y este todo lo que va a contener mi carrito 
const contenedorCarrito = document.getElementById('carrito-contenedor');

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');

// Llamo mi stock de productos que lo hice en el archivo aparte ("stock.js" que es un array de objetos)
mostrarProductos(stockProductos);

function mostrarProductos(array){
    // Recorro el array con un for each 
    array.forEach(producto => {
        // Le digo que lo replique en el contenedor de productos 
        let div = document.createElement('div'); /*creo un elemento "div" */
        div.classList.add('producto'); /* Le indico al elmento "div" que va a tener una clase */
        // Hago mi template con innetHTML con todos los elementos de los objetos
        div.innerHTML += `<div class="card">
                            <div class="card-image">
                                <img src=${producto.img}>
                                <span class="card-title">${producto.nombre}</span>
                                <a class="btn-floating halfway-fab waves-effect waves-light red" id=boton${producto.id}><i class="material-icons">add_shopping_cart</i></a>
                            </div>
                            <div class="card-content">
                                <p>${producto.desc}</p>
                                
                                <p> ${producto.precio}</p>
                            </div>`
        // Asigno la ubicacion de mis cards en "div"                     
        contenedorProductos.appendChild(div);
        // Creo el elemento que me busque por id 
        let boton = document.getElementById(`boton${producto.id}`)
        // Creo la funcion agregar al carrito diciendole que me escuche el evento click sobre el boton 
        boton.addEventListener('click',()=>{
            // mediante el boton le paso el parametro id que me lo llama si lo encuentra en la funcion que defini 
            agregarAlCarrito(producto.id)
        })

    });
}


function agregarAlCarrito(id) {
    // Creo la variable repetido con find para que el carrito cuando encunetre el mismo id lo sume em lugar de repetirlo
    let repetido = carritoDeCompras.find(productoR => productoR.id == id);
    if(repetido){
        // aca le digo con la variable repetido a la cantidad que ya tenia que es 1 le sume 1 
        repetido.cantidad =  repetido.cantidad + 1
        // creo el elemento para que aparezca actualizada la informacion 
        document.getElementById(`cantidad${repetido.id}`).innerHTML = `<p id=cantidad${repetido.id}>Cantidad:${repetido.cantidad}</p>`
        // Vuelvo a ejecutar la funcion para actualizar carrito 
        actualizarCarrito()
    }else{
        // Creo la variable productoAgregar conuna busqueda dentro de mi stock de productos con elmetodo find
      let productoAgregar = stockProductos.find(prod => prod.id == id);
    console.log(productoAgregar)
    // Cuando lo encuentre necesito que lo pushee a mi array de carritoDeCompras con el parametro
    // productoAgregar que va a ser un objeto   
    carritoDeCompras.push(productoAgregar);
    productoAgregar.cantidad = 1;

    // Creo el contenido que se vera en producto agregado 
    let div = document.createElement('div');
    div.classList.add('productoEnCarrito');
    div.innerHTML= `<p>${productoAgregar.nombre}</p>
                    <p>Precio:${productoAgregar.precio}</p>
                    <p id=cantidad${productoAgregar.id}>Cantidad:${productoAgregar.cantidad}</p>
                    <button id=eliminar${productoAgregar.id} class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>`

    contenedorCarrito.appendChild(div)  
    actualizarCarrito()
    // Creo el boton eliminar y lo agrego a mi div de producto agregado
    let botonEliminar = document.getElementById(`eliminar${productoAgregar.id}`)
    botonEliminar.addEventListener('click', ()=>{
        // Remuevo el "padre" mediante parent element 
        botonEliminar.parentElement.remove()
        // con el filtro le digo que me traiga todos los que son distintos al id que acabo 
        // de eliminar, de esta manera se actualiza y me muestra los que quedaron 
        carritoDeCompras = carritoDeCompras.filter(el => el.id != productoAgregar.id);
        // vuelvo a llamar a la funcion para que se actualize 
        actualizarCarrito();
        // Guardo en storage local 
        localStorage.setItem('tienda' , JSON.stringify(carritoDeCompras)) 
    })  
    }
    // Vuelvo a guardar para actualizar la funcion agregar al carrito 
    localStorage.setItem('tienda' , JSON.stringify(carritoDeCompras)) 
    
    
}

function actualizarCarrito() {
// Creo el metodo de array reduce, acumulador y elemento
   contadorCarrito.innerText = carritoDeCompras.reduce((acc , el)=> acc + el.cantidad,0);
// Calculo el total mmediante el mismo metodo reduce
   precioTotal.innerText = carritoDeCompras.reduce((acc, el) => acc + (el.precio * el.cantidad) , 0)
}

