"use client";
import { useState, useEffect } from "react";
import Papa from "papaparse";
import { motion } from "framer-motion";

interface Coordinates {
  lat: number;
  lon: number;
}

// Clase base para los servicios de coordenadas
export class CoordinatesService {
  async getCoordinates(city: string, country: string): Promise<Coordinates | null> {
    throw new Error("Método no implementado");
  }
}

// Servicio para obtener coordenadas usando la API de Nominatim
export class NominatimService extends CoordinatesService {
  async getCoordinates(city: string, country: string): Promise<Coordinates | null> {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${city},${country}&format=json`
      );
      const data = await response.json();
      if (data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon),
        };
      }
      return null;
    } catch (error) {
      console.error("Error en la llamada a la API de Nominatim:", error);
      return null;
    }
  }
}

// Servicio para obtener coordenadas desde un archivo CSV
export class CSVService extends CoordinatesService {
  private data: any[] = [];

  constructor() {
    super();
  }

  async loadCSV(): Promise<void> {
    const response = await fetch("/worldcities.csv");
    const csvText = await response.text();

    Papa.parse(csvText, {
      header: true,
      complete: (results: Papa.ParseResult<any>) => {
        this.data = results.data;
      },
    });
  }

  async getCoordinates(city: string, country: string): Promise<Coordinates | null> {
    if (this.data.length === 0) {
      await this.loadCSV();
    }

    const cityData = this.data.find(
      (item) =>
        item.city_ascii && item.country &&
        item.city_ascii.toLowerCase() === city.toLowerCase() &&
        item.country.toLowerCase() === country.toLowerCase()
    );

    if (cityData) {
      return {
        lat: parseFloat(cityData.lat),
        lon: parseFloat(cityData.lng),
      };
    }
    return null;
  }
}

// Función para calcular la distancia entre dos coordenadas
export const calculateDistance = (coord1: Coordinates, coord2: Coordinates): number => {
  const R = 6371;
  const dLat = deg2rad(coord2.lat - coord1.lat);
  const dLon = deg2rad(coord2.lon - coord1.lon);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(coord1.lat)) * Math.cos(deg2rad(coord2.lat)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const deg2rad = (deg: number): number => deg * (Math.PI / 180);


export default function Home() {
  const [city1, setCity1] = useState("");
  const [country1, setCountry1] = useState("");
  const [city2, setCity2] = useState("");
  const [country2, setCountry2] = useState("");
  const [distance, setDistance] = useState<number | null>(null);
  const [serviceType, setServiceType] = useState("csv");

  const handleCompare = async () => {
    let service: CoordinatesService = serviceType === "api"
      ? new NominatimService()
      : new CSVService();

    const coords1 = await service.getCoordinates(city1, country1);
    const coords2 = await service.getCoordinates(city2, country2);

    if (coords1 && coords2) {
      setDistance(parseFloat(calculateDistance(coords1, coords2).toFixed(2)));
    } else {
      alert("No se pudieron obtener las coordenadas.");
    }
  };

  // Ejecutar pruebas solo en modo de desarrollo
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      ejecutarPruebas();
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        className="bg-white shadow-2xl rounded-lg p-8 max-w-md w-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-semibold text-center mb-6 text-blue-600">Comparar Distancia</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Ciudad 1</label>
          <input
            type="text"
            className="mt-1 block w-full p-3 border rounded-md"
            placeholder="Ejemplo: Lima"
            value={city1}
            onChange={(e) => setCity1(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">País 1</label>
          <input
            type="text"
            className="mt-1 block w-full p-3 border rounded-md"
            placeholder="Ejemplo: Perú"
            value={country1}
            onChange={(e) => setCountry1(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Ciudad 2</label>
          <input
            type="text"
            className="mt-1 block w-full p-3 border rounded-md"
            placeholder="Ejemplo: Londres"
            value={city2}
            onChange={(e) => setCity2(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">País 2</label>
          <input
            type="text"
            className="mt-1 block w-full p-3 border rounded-md"
            placeholder="Ejemplo: Reino Unido"
            value={country2}
            onChange={(e) => setCountry2(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Método</label>
          <select
            className="mt-1 block w-full p-3 border rounded-md"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
          >
            <option value="api">API</option>
            <option value="csv">CSV</option>
          </select>
        </div>

        <motion.button
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600"
          onClick={handleCompare}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Comparar Distancia
        </motion.button>

        {distance !== null && (
          <motion.p
            className="mt-4 text-lg text-center font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Distancia: {distance} km
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}

// Funciones de prueba
async function ejecutarPruebas() {
  console.log("Ejecutando pruebas...");

  // Prueba de éxito
  await testCasoExito();

  // Prueba de ciudad inexistente
  await testCiudadInexistente();

  // Prueba de la misma ciudad dos veces
  await testMismaCiudadDosVeces();

  console.log("Pruebas finalizadas.");
}

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

async function testCiudadInexistente() {
  console.log("Prueba de caso extremo: Ciudad inexistente 'Atlantis, Mythland'");

  const service = new CSVService();
  const coords = await service.getCoordinates("Atlantis", "Mythland");

  if (!coords) {
    console.log("Prueba exitosa: No se encontraron coordenadas para 'Atlantis, Mythland'");
  } else {
    console.error("Error: Se encontraron coordenadas para una ciudad inexistente.");
  }
}

async function testMismaCiudadDosVeces() {
  console.log("Prueba de caso extremo: Misma ciudad dos veces 'Lima, Perú'");

  const service = new CSVService();
  const coords1 = await service.getCoordinates("Lima", "Perú");
  const coords2 = await service.getCoordinates("Lima", "Perú");

  if (coords1 && coords2) {
    const distancia = calculateDistance(coords1, coords2);
    if (distancia === 0) {
      console.log("Prueba exitosa: La distancia entre la misma ciudad es 0 km");
    } else {
      console.error(`Error: La distancia no fue 0, sino ${distancia.toFixed(2)} km`);
    }
  } else {
    console.error("Error: No se pudieron obtener las coordenadas para Lima, Perú.");
  }
}
