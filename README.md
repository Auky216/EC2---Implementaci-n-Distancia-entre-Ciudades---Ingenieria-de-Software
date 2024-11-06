## Integrantes

- Adrian Auqui Perez
- Jose Barrenchea Merino

## Test Cases

### 1. Prueba de éxito: Cálculo de distancia entre dos ciudades válidas
| Descripción       | Prueba que se puede calcular la distancia entre dos ciudades válidas (Lima, Perú y Londres, Reino Unido) utilizando datos del archivo CSV. |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| **Precondición**  | El archivo `worldcities.csv` debe contener las coordenadas de Lima y Londres.                                                             |
| **Pasos de prueba** | 1. Crear una instancia de `CSVService`.<br>2. Obtener coordenadas de "Lima, Perú".<br>3. Obtener coordenadas de "Londres, Reino Unido".<br>4. Calcular la distancia entre las dos coordenadas. |
| **Datos de prueba** | Ciudad 1: Lima, Perú<br>Ciudad 2: Londres, Reino Unido                                                                                   |
| **Resultado esperado** | La distancia se calcula correctamente y se muestra en la consola como `Distancia calculada con éxito: X km`.                       |

### 2. Prueba de caso extremo: Ciudad inexistente
| Descripción       | Verifica que el sistema maneje adecuadamente una ciudad que no existe en el archivo `worldcities.csv`.                                    |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| **Precondición**  | El archivo `worldcities.csv` no contiene datos para "Atlantis, Mythland".                                                                 |
| **Pasos de prueba** | 1. Crear una instancia de `CSVService`.<br>2. Intentar obtener las coordenadas de "Atlantis, Mythland".                                |
| **Datos de prueba** | Ciudad: Atlantis, Mythland                                                                                                               |
| **Resultado esperado** | La consola muestra `Prueba exitosa: No se encontraron coordenadas para 'Atlantis, Mythland'`, indicando que no se encontraron coordenadas. |

### 3. Prueba de caso extremo: Misma ciudad dos veces
| Descripción       | Verifica que el cálculo de distancia para la misma ciudad dos veces resulte en una distancia de 0 km.                                     |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| **Precondición**  | El archivo `worldcities.csv` debe contener las coordenadas de "Lima, Perú".                                                               |
| **Pasos de prueba** | 1. Crear una instancia de `CSVService`.<br>2. Obtener las coordenadas de "Lima, Perú" dos veces.<br>3. Calcular la distancia entre ambas coordenadas. |
| **Datos de prueba** | Ciudad 1: Lima, Perú<br>Ciudad 2: Lima, Perú                                                                                             |
| **Resultado esperado** | La consola muestra `Prueba exitosa: La distancia entre la misma ciudad es 0 km`, confirmando que la distancia es 0.                 |




## Getting Started
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
