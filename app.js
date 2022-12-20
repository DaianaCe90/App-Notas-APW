navigator.serviceWorker.register('sw.js');
const btnSave = document.querySelector('#btn-save');
const textArea = document.querySelector('#text-1');
let container = document.querySelector('.collection');
let lista = [];
// FORMATO:
//let lista = [ { nota: 'descripción de la nota', fecha: '17/11/2022'} ];


document.addEventListener('DOMContentLoaded', function() {
    let sideNav = document.querySelectorAll('.sidenav');
    let instanciaSide = M.Sidenav.init(sideNav  , {});

    let modal = document.querySelectorAll('.modal');
    let instanciaModal = M.Modal.init(modal, {});

    lista = leerNotas();
    renderizarNotas(lista);
});

/* - FUNCION 1:  Obtiene el texto del textArea y guarda en el texto en el array - */
btnSave.addEventListener('click', ()=>{
  let getFecha = new Date();
  //agregar fecha y hora
  let dia = getFecha.getDate() + '/' + (getFecha.getMonth()+1) + '/' + getFecha.getFullYear();
  let hora = getFecha.getHours() + ':' + getFecha.getMinutes() + ':' + getFecha.getSeconds(); 
  let fecha = dia + ', ' + hora;
 

  let idNuevo=0;
  if(lista.length>0){
    idNuevo=parseInt(lista[lista.length-1].id)+1;
  }
  let nota = {
    id: idNuevo,
    nota: textArea.value,
    fecha: fecha
  };
  console.log(nota);
  lista.push(nota);

  textArea.value = '';

  guardarNotas(lista);
})

/* -------- FUNCION 2: Recibe el array y lo guarda en el localStorage ------- */
function guardarNotas(array){
  listaCadena = JSON.stringify(array);
  if(localStorage) {
    localStorage.clear();
    localStorage.setItem('notasLocalS', listaCadena);
  } else {
    localStorage.setItem('notasLocalS', listaCadena)
  }
  renderizarNotas(array);
}

/* --------- FUNCION 3: Lee los datos del localStorage y lo retorna --------- */
function leerNotas(){

  if (localStorage.notasLocalS) {
    let notasC = localStorage.notasLocalS;
    let arrayC = JSON.parse(notasC);
    lista = arrayC;
    return lista;
  } else {
    return lista;
  }
}

/* -------- FUNCION 4: Recibe el array y lo renderiza en el container ------- */
function renderizarNotas(array){
  container.innerHTML = '';
  if (array.length > 0) {

    array.forEach(nota => {
      let li = document.createElement('li');
      li.className="noteBlock";
      let colIzq = document.createElement('div');
      colIzq.className="colIzq";
      let colDer = document.createElement('div');
      colDer.className="colDer";
      let rowUno = document.createElement('div');
      let rowDos = document.createElement('div');
      rowUno.innerHTML=nota.nota;
      rowDos.innerHTML=nota.fecha;
      colIzq.append(rowUno);
      colIzq.append(rowDos);
      li.append(colIzq);
      li.append(colDer);
      container.append(li);
      colDer.addEventListener('click', () =>{
        borrarNotas(nota.id);
      })
    });
  }
}

function borrarNotas(id){
  for(let i = 0;i<lista.length;i++){
    if(lista[i].id==id){
      lista.splice(i,1);
    }
  }
  guardarNotas(lista);
}

//Borrar Todas las notas

const btnBorrar = document.querySelector('#botonBorrar');
btnBorrar.addEventListener('click', () =>{
  lista = [];
  localStorage.removeItem('notasLocalS');
  renderizarNotas(lista);
})