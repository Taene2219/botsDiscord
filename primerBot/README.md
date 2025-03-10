Discord Bot MultiJuegos y Trivial

Este es un bot para Discord desarrollado con Node.js y la librería discord.js. El bot ofrece diversos juegos y dinámicas, como:

• Juego de Piedra, Papel o Tijeras • Adivina el número • Lanzar un dado • Cara o cruz • Ahorcado • Trivial con preguntas de videojuegos, Valorant y ciencia

El bot responde a comandos escritos en el chat y permite a los usuarios interactuar y competir acumulando puntuaciones.

Características Responde a saludos con el comando !HOLA. Muestra la lista de juegos disponibles con !juegos. Implementa juegos sencillos como: Piedra, Papel o Tijeras con !ppt [opción] Adivina el número (1-10) con !adivina [número] Lanzar un dado con !dado Cara o Cruz con !moneda Ahorcado con !ahorcado y adivinar letras con !letra [letra] Trivia interactiva con selección de categoría (videojuegos, valorant y ciencia) usando el comando !trivial [categoría]. Consulta de puntuación personal con !PUNTUACION. Prerrequisitos Node.js instalado en tu sistema. Tener una cuenta de Discord. Haber creado y configurado un bot en el Portal de Desarrolladores de Discord y obtener el token del bot. discord.js (se instala mediante npm). Instalación Clona el repositorio:

Entra en la carpeta del proyecto:

cd tuRepositorio

Instala las dependencias:

npm install

Configuración Abre el archivo principal del bot (por ejemplo, index.js o app.js).

Localiza la línea donde se inicia sesión con el token:

client.login('INTRODUCIR EL TOKEN');

Reemplaza 'INTRODUCIR EL TOKEN' por el token real de tu bot.

Asegúrate de tener configurados los permisos necesarios y de invitar el bot a tu servidor de Discord.

Uso Ejecuta el bot con el comando:

npm start o node index.js

Desde Discord, utiliza los siguientes comandos para interactuar con el bot:

• Saludo: Escribe !HOLA para recibir una respuesta de bienvenida.

• Juegos: Escribe !juegos para ver la lista de juegos disponibles.

Ejemplo de uso para Piedra, Papel o Tijeras: !ppt piedra Ejemplo de uso para Adivinar el número: !adivina 7 Ejemplo de uso para lanzar el dado: !dado Ejemplo de uso para cara o cruz: !moneda Para iniciar el juego de Ahorcado, escribe !ahorcado, y adivina letras con !letra [letra].

• Trivial: Para comenzar una ronda de trivial, escribe !trivial [categoría] (ej. !trivial videojuegos, !trivial valorant o !trivial ciencia). Responde a la pregunta en el chat para acumular puntos. Consulta tus puntos con el comando !PUNTUACION.

Contribuciones ¡Las contribuciones son bienvenidas! Si deseas mejorar el bot o agregar nuevas funcionalidades, siéntete libre de hacer un fork del repositorio y enviar tus pull requests.

Licencia Este proyecto se distribuye bajo la MIT License.

Con estos pasos e información, cualquier persona que revise el repositorio tendrá claro el propósito del bot, sus funcionalidades, y cómo configurarlo para probarlo o extenderlo. ¡Disfruta programando e interactuando con tu bot en Discord!
