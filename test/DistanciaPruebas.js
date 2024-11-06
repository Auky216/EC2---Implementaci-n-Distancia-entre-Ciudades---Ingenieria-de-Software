import { CSVService, NominatimService, calculateDistance } from '../src/app/page';

// Pruebas
async function testCasoExito() {
  console.log("Prueba de éxito: Iniciando prueba entre Lima, Perú y Londres, Reino Unido");

  const service = new CSVService();
  const coords1 = await service.getCoordinates("Lima", "Perú");
  const coords2 = await service.getCoordinates("Londres", "Reino Unido");

  if (coords1 && coords2) {
    const distancia = calculateDistance(coords1, coords2);
    console.log(`Distancia calculada con éxito: ${distancia.toFixed(2)} km`);
  } else {
    console.error("Error: No se pudieron obtener las coordenadas para una de las ciudades.");
  }
}

// Ejecutar todas las pruebas
async function ejecutarPruebas() {
  console.log("Ejecutando pruebas...");
  await testCasoExito();
  // Puedes agregar más pruebas aquí
  console.log("Pruebas finalizadas.");
}

// Llamar a la función para ejecutar todas las pruebas
ejecutarPruebas();
