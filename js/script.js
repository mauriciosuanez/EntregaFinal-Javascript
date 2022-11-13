const listAutos = [];
let paragolpes = [];

Swal.fire({
    title: 'Ingresaste a MS Paragolpes.',
    text: 'Aquí podrás encontrar los mejores paragolpes al mejor precio.',
    confirmButtonText: 'VER OFERTAS',
    backdrop: '#000000',
    showClass: {
    popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
    popup: 'animate__animated animate__fadeOutUp'
}
})

const traerParagolpesJson = async () => {
    const respuesta = await fetch('./js/listautos.json');S
    const dataJson = await respuesta.json();
    return dataJson;
}

traerParagolpesJson().then(data=>   {
    autos = data;
});

const items = document.getElementById('items');

// Función para borrar ítems del carrito//

document.addEventListener('click',function(e){
    if(e.target && e.target.name== 'removeElement'){
        let remove = document.getElementsByName('removeElement');
        listAutos.splice(parseInt(e.target.id), 1);
        localStorage.removeItem('paragolpes');
        localStorage.setItem('paragolpes',JSON.stringify(listAutos));
        items.innerHTML = "";
        let suma = 0;
        listAutos.forEach((x,index)=>{
            suma = suma - x.precio;
            items.innerHTML += "<div class='row col-lg-9'><div class='col-lg-5'><img src= "+ x.file +"  style='width: 80px; height: 70px' class='card-img-top'>"+ x.title + "</div><div class='col-lg-2 mt-3 fw-bolder'> $"+ x.precio + " </div><div class='col-lg-2'>  <button class='btn-eliminar mb-2 mt-3' value="+x.id+" name='removeElement' id="+index+">Eliminar</button></div></div>";
        })
    
        if(suma == 0){
            totalItems.style.display = 'none';
            comprarItems.style.display = 'none';
        }
        else{
            totalItems.innerHTML = "<b> Precio total: $" +Math.abs(suma)+"</b>";
            comprarItems.innerHTML = "<div><button id='comprar-btn' class='btn-comprar'>Finalizar compra</button></div>";
    
        }
    
        if(items.innerHTML == "")
            document.getElementById("footer-carrito").style.display  = "inline";
    
    
    }
});

let totalItems = document.getElementById('total-items');
let comprarItems = document.getElementById('comprar-btn');

//Alert para confirmar o cancelar compra//

comprarItems.addEventListener("click", () => {
    Swal.fire({
        title: '¿Querés finalizar la compra?',
        text: "Tu carrito está listo.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, quiero comprar.'
    }).then((result) => {
        if (result.isConfirmed) {
        totalItems.style.display = 'none';
        comprarItems.style.display = 'none';
        document.getElementById("footer-carrito").style.display  = "inline";
        localStorage.removeItem('paragolpes')
        listAutos.splice(0, listAutos.length);
        items.innerHTML = "";
            Swal.fire(
            'Tu compra fue realizada con éxito.',
            'Gracias por confiar en MS PARAGOLPES.',
            'success',
        )
        }
    })
})


//Función para agregar ítems en el carrito//

document.querySelectorAll("#btn-comprar").forEach((e) => {
    e.addEventListener("click", () => {
        items.innerHTML = "";
        totalItems.style.display = 'inline';
        comprarItems.style.display = 'inline';
        let result = paragolpes.find(x=>x.id == e.value);
        listAutos.push(result);
        localStorage.setItem('paragolpes',JSON.stringify(listAutos));
        let list= JSON.parse(localStorage.getItem ('paragolpes'));
        let suma = 0;

        list.forEach((x,index)=>{
            suma = suma + x.precio;
            items.innerHTML += "<div class='row col-lg-9'><div class='col-lg-5'><img src= "+ x.file +"  style='width: 80px; height: 70px' class='card-img-top'>"+ x.title + "</div><div class='col-lg-2 mt-3 fw-bolder'> $"+ x.precio + " </div><div class='col-lg-2'>  <button class='btn-eliminar mb-2 mt-3' value="+x.id+" name='removeElement' id="+index+">Eliminar</button></div></div>";

        })
        totalItems.innerHTML = "<b>Precio total: $" +Math.abs(suma)+"</b>";
        comprarItems.innerHTML = "<div><button class='btn-comprar' id='comprar-btn'>Finalizar compra</button></div>";

        if(localStorage != null)
                document.getElementById("footer-carrito").style.display = "none";


        });
});


