import cargarVehiculos, { guardarVehiculos } from "./storage.js";

const formulario = document.getElementById("formVehiculo");
const modeloInput = document.getElementById("modelo");
const precioInput = document.getElementById("precio");

const contenedor = document.getElementById("listaVehiculos");

const totalAutos = document.getElementById("totalAutos");
const totalInversion = document.getElementById("totalInversion");

let vehiculos = cargarVehiculos();

renderizar();

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const modelo = modeloInput.value.trim();
    const precio = Number(precioInput.value);

    if (!modelo || precio <= 0 || isNaN(precio)) {
        alert("Complete todos los campos correctamente.");
        return;
    }

    const nuevoVehiculo = {
        modelo: modelo,
        precio: precio
    };

    vehiculos.push(nuevoVehiculo);

    guardarVehiculos(vehiculos);
    renderizar();
    formulario.reset();
});

function renderizar() {
    contenedor.textContent = "";

    const tarjetas = vehiculos.map((vehiculo, index) => {
        const iva = vehiculo.precio * 0.15;
        const precioFinal = vehiculo.precio + iva;

        const tarjeta = document.createElement("div");
        tarjeta.classList.add("card-auto");

        const titulo = document.createElement("h3");
        titulo.textContent = vehiculo.modelo;

        const precioBase = document.createElement("p");
        precioBase.textContent = `Precio Base: $${vehiculo.precio.toFixed(2)}`;

        const impuesto = document.createElement("p");
        impuesto.textContent = `IVA 15%: $${iva.toFixed(2)}`;

        const total = document.createElement("p");
        total.textContent = `Precio Final: $${precioFinal.toFixed(2)}`;

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";

        botonEliminar.addEventListener("click", () => {
            vehiculos.splice(index, 1);
            guardarVehiculos(vehiculos);
            renderizar();
        });

        tarjeta.appendChild(titulo);
        tarjeta.appendChild(precioBase);
        tarjeta.appendChild(impuesto);
        tarjeta.appendChild(total);
        tarjeta.appendChild(botonEliminar);

        return tarjeta;
    });

    tarjetas.forEach((tarjeta) => {
        contenedor.appendChild(tarjeta);
    });

    actualizarMetricas();
}

function actualizarMetricas() {
    totalAutos.textContent = vehiculos.length;

    let inversion = 0;

    vehiculos.forEach((vehiculo) => {
        inversion += vehiculo.precio;
    });

    totalInversion.textContent = `$${inversion.toFixed(2)}`;
}