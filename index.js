let contenido = document.getElementById("productos");
let carrito = JSON.parse(localStorage.getItem("carrito"))|| [];
let imprimir = () => {
     contenido.innerHTML = (productos.map(x =>{
      let{ id, nombre, descripcion, precio, foto}=x;
      let buscar = carrito.find(x=> x.id === id);
      let cantItem  = buscar === undefined ? 0: buscar.cantidad;
        return`<div class="col-lg-3 " style=" margin: 20px; object-fit: scale-down; ">
    <div class="card" style="width: 18rem;" >
  <img src="${foto}" class="card-img-top" alt="" style=" with:150px; height:200px;">
  <div class="card-body">
    <h5 class="card-title">${nombre}</h5>
    <p class="card-text">${descripcion}</p>
    <p class="card-text">${precio.toLocaleString('es-MX')}</p>
    <div style=" display: flex;">
    <i class="bi bi-bag-plus" onclick="aumentar(${id})"></i>
    <div id="${id}"> ${cantItem}</div>
    <i class="bi bi-bag-dash" onclick="disminuir(${id})"></i>
    </div>
    
  </div>
</div></div>
    `;
    })).join("")
}
imprimir();
productos.map((x) =>{
    console.log(x.nombre,x.precio);
})

let aumentar = (id) => {

  let item = id;
  
  console.log(item.id);

  let buscar = carrito.find(x => x.id== item.id);
  console.log(buscar);

  if(buscar == undefined){
    let pro ={
      id: item.id,
      cantidad: 1
    }
    carrito.push(pro);
  }
  else{
    buscar.cantidad=buscar.cantidad+1 ;
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  console.log(carrito);
  imprimir();
  actualizar();
}

let disminuir= (id) =>{
  let item = id;
  let buscar= carrito.find(x => x.id === item.id);
  console.log(buscar);
  if (buscar === undefined) return true;
  else if (buscar.cantidad > 0 ) buscar.cantidad-=1;
  carrito = carrito.filter( x => x.cantidad !== 0 );
  localStorage.setItem("carrito", JSON.stringify(carrito));
  imprimir();
  actualizar();
}

let actualizar = ()=>{
 let totalI= document.getElementById("total");
 let total= carrito.map(x =>x.cantidad).reduce((x,y)=> x+y,0);
 totalI.innerHTML= `${total}`;
}