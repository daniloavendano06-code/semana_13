import cargarVehiculos, { guardarVehiculos } from "./storage.js";

const formulario = document.getElementById("formVehiculo");
const tipoVehiculoInput = document.getElementById("tipoVehiculo");
const modeloVehiculoInput = document.getElementById("modeloVehiculo");
const precioInput = document.getElementById("precio");

const contenedor = document.getElementById("listaVehiculos");

const totalAutos = document.getElementById("totalAutos");
const totalInversion = document.getElementById("totalInversion");

let vehiculos = cargarVehiculos();

const modelos = {
    "Sedán": ["Toyota Corolla", "Honda Civic"],
    "SUV": ["Toyota RAV4", "Honda CR-V"],
    "Pickup": ["Toyota Hilux", "Ford Ranger"],
    "Hatchback": ["Volkswagen Golf", "Ford Fiesta"],
    "Camioneta": ["Chevrolet Tahoe", "Ford Expedition"],
    "Deportivo": ["Ford Mustang", "Chevrolet Camaro"],
    "Eléctrico": ["Tesla Model 3", "Nissan Leaf"],
    "Híbrido": ["Toyota Prius", "Hyundai Ioniq"],
    "Minivan": ["Toyota Sienna", "Honda Odyssey"]
};

renderizar();

function formatoMoneda(valor) {
    return valor.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

tipoVehiculoInput.addEventListener("change", () => {
    modeloVehiculoInput.textContent = "";

    const opcionInicial = document.createElement("option");
    opcionInicial.value = "";
    opcionInicial.textContent = "Seleccione modelo";
    modeloVehiculoInput.appendChild(opcionInicial);

    const tipoSeleccionado = tipoVehiculoInput.value;

    if (!tipoSeleccionado) return;

    modelos[tipoSeleccionado].forEach((modelo) => {
        const opcion = document.createElement("option");
        opcion.value = modelo;
        opcion.textContent = modelo;
        modeloVehiculoInput.appendChild(opcion);
    });
});

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const tipo = tipoVehiculoInput.value;
    const modelo = modeloVehiculoInput.value;
    const precio = Number(precioInput.value);

    if (!tipo || !modelo || precio <= 0 || isNaN(precio)) {
        alert("Seleccione tipo, modelo y escriba un precio válido.");
        return;
    }

    const nuevoVehiculo = {
        tipo: tipo,
        modelo: modelo,
        precio: precio
    };

    vehiculos.push(nuevoVehiculo);

    guardarVehiculos(vehiculos);
    renderizar();
    formulario.reset();

    modeloVehiculoInput.textContent = "";

    const opcionInicial = document.createElement("option");
    opcionInicial.value = "";
    opcionInicial.textContent = "Seleccione modelo";
    modeloVehiculoInput.appendChild(opcionInicial);
});

function renderizar() {
    contenedor.textContent = "";

    const tarjetas = vehiculos.map((vehiculo, index) => {
        const iva = vehiculo.precio * 0.15;
        const precioFinal = vehiculo.precio + iva;

        const tarjeta = document.createElement("div");
        tarjeta.classList.add("card-auto");

        const titulo = document.createElement("h3");
        titulo.textContent = vehiculo.tipo;

        const modeloAuto = document.createElement("p");
        modeloAuto.textContent = `Modelo: ${vehiculo.modelo}`;

        const precioBase = document.createElement("p");
        precioBase.textContent = `Precio Base: $${formatoMoneda(vehiculo.precio)}`;

        const impuesto = document.createElement("p");
        impuesto.textContent = `IVA 15%: $${formatoMoneda(iva)}`;

        const total = document.createElement("p");
        total.textContent = `Precio Final: $${formatoMoneda(precioFinal)}`;

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";

        botonEliminar.addEventListener("click", () => {
            vehiculos.splice(index, 1);
            guardarVehiculos(vehiculos);
            renderizar();
        });

        tarjeta.appendChild(titulo);
        tarjeta.appendChild(modeloAuto);
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

    totalInversion.textContent = `$${formatoMoneda(inversion)}`;
}