const form = document.querySelector('form')
const search_input = document.getElementById("search")
const search_button = document.getElementById("search_button")
const card_render = document.getElementById("card_render")
const pizzas = [
  {
    id: 1,
    nombre: "pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },

  {
    id: 2,
    nombre: "pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },

  {
    id: 5,
    nombre: "pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];

function search_ID(array, id){
  return array.find(element => element.id === id);
}

function card_generator (product) {
  return `
      <section class="card_container">
        <img src="${product.imagen}" alt="">
        <div class="column">
          <h2>${product.nombre}</h2>
          <p>Pizza elaborada con masa madre, ${product.ingredientes.join(', ')}. Aromatizada con hierbas y especias.</p>
          <div class="details">
            <h3>$${product.precio}</h3>
            <button>Agregar al carrito</button>
            </div>
        </div>
      </section>
  `}

function error_generator1 (){
  return `
    <section class="error">
      <h2>ERROR</h2>
      <p>El ID ingresado no coincide con ninguna pizza del menú.</p>
      <p>Inténtelo nuevamente con un ID diferente.</p>
    </section>
  `}

function error_generator2 (){
    return `
      <section class="error">
        <h2>ERROR</h2>
        <p>Ingrese un ID para realizar la búsqueda en el menú.</p>
      </section>
    `} 

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = parseInt(search_input.value);
    const pizza = search_ID(pizzas, id);
    if (pizza) {
      card_render.innerHTML = card_generator(pizza);
      localStorage.setItem("lastPizza", JSON.stringify(pizza));
    } 
    else if (search_input.value === ''){
      card_render.innerHTML = error_generator2();
      }
    else {
      card_render.innerHTML = error_generator1();
    }
    search_input.value = '';
  });

document.addEventListener("DOMContentLoaded", () => {
    const lastPizza = localStorage.getItem("lastPizza");
    if (lastPizza) {
      const pizza = JSON.parse(lastPizza);
      card_render.innerHTML = card_generator(pizza);
    }
  });