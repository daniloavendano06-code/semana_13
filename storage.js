const STORAGE_KEY = "autodrive_vehiculos";

export function guardarVehiculos(vehiculos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vehiculos));
}

export default function cargarVehiculos() {
    const datos = localStorage.getItem(STORAGE_KEY);
    return datos ? JSON.parse(datos) : [];
}