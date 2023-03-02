let contenido = document.getElementById("productos");
let carrito = JSON.parse(localStorage.getItem("carrito"))|| [];
var t;
let imprimir = () => {
     contenido.innerHTML = (carrito.map(x =>{
      let{ id, cantidad}=x;
      let buscar = productos.find(x=> x.id === id);
let price=buscar.precio*cantidad;
        return`<div class="col-lg-3 " style=" margin: 20px; object-fit: scale-down; ">
    <div class="card" style="width: 18rem;" >
  <img src="${buscar.foto}" class="card-img-top" alt="" style=" with:150px; height:200px;">
  <div class="card-body">
    <h5 class="card-title">${buscar.nombre}</h5>
    <p class="card-text">${buscar.descripcion}</p>
    <p class="card-text">${price.toLocaleString('eu-es')}</p>
    <div style=" display: flex;">
    <i class="bi bi-bag-plus" onclick="aumentar(${id})"></i>
    <div id="${id}"> ${cantidad}</div>
    <i class="bi bi-bag-dash" onclick="disminuir(${id})"></i>
    </div>
    
  </div>
</div></div>

    `;
    })).join("")
}
imprimir();


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
    total_compra();
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
    total_compra();
  }
  
  let actualizar = ()=>{
   let totalI= document.getElementById("total");
   let total= carrito.map(x =>x.cantidad).reduce((x,y)=> x+y,0);
   totalI.innerHTML= `${total}`;

  }

  let total_compra=()=>{
    total=document.getElementById("total_c")
   let tc= carrito.map(x=>{
        let buscar = productos.find(w=> w.id === x.id);
           return buscar.precio*x.cantidad;
    }).reduce((x,y)=> x+y,0).toLocaleString('es-MX');
    total.innerHTML=`${tc}`;
  }

  total_compra();