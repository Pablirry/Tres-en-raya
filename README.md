# Tres en Raya (Tic Tac Toe)

## Descripción
Tres en Raya es un juego clásico donde dos jugadores se turnan para marcar un espacio en una cuadrícula de 3x3. El objetivo es alinear tres de sus marcas (X o O) en línea, ya sea horizontal, vertical o diagonalmente. Este proyecto incluye una versión moderna y estilizada del juego, que permite jugar contra una inteligencia artificial o contra otro jugador.

## Características
- Interfaz de usuario moderna y atractiva.
- Opción para jugar contra un oponente humano o contra una IA que utiliza el algoritmo Minimax para tomar decisiones óptimas.
- Visualización del puntaje actual y de los jugadores.
- Código modular y fácil de entender, con componentes separados para el tablero, las casillas y el marcador.

## Estructura del Proyecto
```
tres-en-raya
├── src
│   ├── App.tsx             # Componente principal que gestiona el estado del juego.
│   ├── components
│   │   ├── Board.tsx       # Componente que renderiza el tablero del juego.
│   │   ├── Square.tsx      # Componente que representa una casilla individual.
│   │   └── Scoreboard.tsx  # Componente que muestra el puntaje y la información de los jugadores.
│   ├── ai
│   │   └── minimax.ts      # Implementación del algoritmo Minimax para la IA.
│   ├── styles
│   │   └── main.css        # Estilos CSS para la aplicación.
│   └── types
│       └── index.ts        # Tipos e interfaces de TypeScript utilizados en la aplicación.
├── package.json             # Configuración de npm y dependencias del proyecto.
├── tsconfig.json            # Configuración de TypeScript.
└── README.md                # Documentación del proyecto.
```

## Instalación
1. Clona el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
   ```
2. Navega al directorio del proyecto:
   ```
   cd tres-en-raya
   ```
3. Instala las dependencias:
   ```
   npm install
   ```

## Ejecución
Para iniciar la aplicación, utiliza el siguiente comando:
```
npm start
```
Esto abrirá la aplicación en tu navegador predeterminado.

## Contribuciones
Las contribuciones son bienvenidas. Si deseas mejorar el proyecto, por favor abre un issue o envía un pull request.

## Licencia
Este proyecto está bajo la Licencia MIT.