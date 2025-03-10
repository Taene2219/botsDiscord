const { Client, GatewayIntentBits } = require('discord.js');

// Crear instancia del bot con los intents necesarios
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, // Permite que el bot funcione en servidores
        GatewayIntentBits.GuildMessages, // Permite leer mensajes en canales
        GatewayIntentBits.MessageContent // Permite leer el contenido de los mensajes
    ]
});

// Bot listo
client.once('ready', () => {
    console.log(`¡Conectado como ${client.user.tag}!`);

    // ID del canal
    const generalChannel = client.channels.cache.get("ID DEL CANAL DE DISCORD");
});

// responder a mensajes
client.on('messageCreate', (message) => {
    if (message.content.toUpperCase()=== '!HOLA') {
        message.channel.send('Gracias por saludar amigo');
    }
});

// Responder a mensajes del usuario
client.on('messageCreate', (message) => {
    if (message.author.bot) return; // Evita que el bot se responda a sí mismo

    const userMessage = message.content.toLowerCase();

    if (userMessage === '!juegos') {
        message.channel.send(
            '**Juegos disponibles:**\n' +
            '1️⃣ **Piedra, Papel o Tijeras** → `!ppt [opción]`\n' +
            '2️⃣ **Adivina el número (1-10)** → `!adivina [número]`\n' +
            '3️⃣ **Lanzar un dado (1-6)** → `!dado`\n' +
            '4️⃣ **Cara o Cruz** → `!moneda`\n' +
            '5️⃣ **Ahorcado** → `!ahorcado`\n'
        );
    } else if (userMessage.startsWith('!ppt ')) {
        jugarPiedraPapelTijeras(message);
    } else if (userMessage.startsWith('!adivina ')) {
        jugarAdivinaNumero(message);
    } else if (userMessage === '!dado') {
        lanzarDado(message);
    } else if (userMessage === '!moneda') {
        lanzarMoneda(message);
    } else if (userMessage === '!ahorcado') {
        iniciarAhorcado(message);
    }
});

// Juego de Piedra, Papel o Tijeras
function jugarPiedraPapelTijeras(message) {
    const opciones = ['piedra', 'papel', 'tijeras'];
    const eleccionUsuario = message.content.split(' ')[1]?.toLowerCase();
    const eleccionBot = opciones[Math.floor(Math.random() * opciones.length)];

    if (!opciones.includes(eleccionUsuario)) {
        return message.channel.send(' Opción inválida. Usa `!ppt piedra`, `!ppt papel` o `!ppt tijeras`.');
    }

    let resultado;
    if (eleccionUsuario === eleccionBot) {
        resultado = '¡Empate!';
    } else if (
        (eleccionUsuario === 'piedra' && eleccionBot === 'tijeras') ||
        (eleccionUsuario === 'papel' && eleccionBot === 'piedra') ||
        (eleccionUsuario === 'tijeras' && eleccionBot === 'papel')
    ) {
        resultado = '¡Ganaste! 🎉';
    } else {
        resultado = 'Perdiste 😭';
    }

    message.channel.send(` **Tú elegiste:** ${eleccionUsuario}\n **Yo elegí:** ${eleccionBot}\n➡️ **Resultado:** ${resultado}`);
}

//  Juego de Adivinar el Número
function jugarAdivinaNumero(message) {
    const numeroAleatorio = Math.floor(Math.random() * 10) + 1;
    const numeroUsuario = parseInt(message.content.split(' ')[1]);

    if (isNaN(numeroUsuario) || numeroUsuario < 1 || numeroUsuario > 10) {
        return message.channel.send('Debes elegir un número entre 1 y 10. Usa `!adivina [número]`.');
    }

    if (numeroUsuario === numeroAleatorio) {
        message.channel.send(` ¡Increíble! Adivinaste el número **${numeroAleatorio}**. ¡Eres un crack!`);
    } else {
        message.channel.send(` Nope, mi número era **${numeroAleatorio}**. ¡Sigue intentándolo! `);
    }
}

// 🎮 Juego de Lanzar un Dado (1-6)
function lanzarDado(message) {
    const resultado = Math.floor(Math.random() * 6) + 1;
    message.channel.send(` Lanzaste el dado y salió un **${resultado}**.`);
}

//Juego de Cara o Cruz
function lanzarMoneda(message) {
    const resultado = Math.random() < 0.5 ? 'Cara' : 'Cruz';
    message.channel.send(` Lanzaste una moneda y salió **${resultado}**.`);
}

// Juego de Ahorcado
const palabrasAhorcado = ["javascript", "discord", "bot", "programacion", "servidor","reaparición", "jugabilidad", "desarrollador", "combos", "personaje", "nivel", "misión", "guardado", "multijugador", "estrategia"];
let palabraAhorcado = '';
let progresoAhorcado = [];
let intentosAhorcado = 6;
let letrasUsadas = [];

function iniciarAhorcado(message) {
    palabraAhorcado = palabrasAhorcado[Math.floor(Math.random() * palabrasAhorcado.length)];
    progresoAhorcado = Array(palabraAhorcado.length).fill('_');
    intentosAhorcado = 6;
    letrasUsadas = [];

    message.channel.send(
        ` ¡Comienza el juego del Ahorcado!\n` +
        `Palabra: ${progresoAhorcado.join(' ')}\n` +
        `Tienes **${intentosAhorcado}** intentos. Adivina una letra con \`!letra [letra]\``
    );
}

client.on('messageCreate', (message) => {
    if (message.content.startsWith('!letra ')) {
        if (!palabraAhorcado) return message.channel.send(' No hay ningún juego de ahorcado activo. Usa `!ahorcado` para empezar.');

        const letra = message.content.split(' ')[1].toLowerCase();
        if (letrasUsadas.includes(letra)) return message.channel.send(' Ya usaste esa letra.');

        letrasUsadas.push(letra);

        if (palabraAhorcado.includes(letra)) {
            for (let i = 0; i < palabraAhorcado.length; i++) {
                if (palabraAhorcado[i] === letra) {
                    progresoAhorcado[i] = letra;
                }
            }
            if (!progresoAhorcado.includes('_')) {
                return message.channel.send(`🎉 ¡Ganaste! La palabra era **${palabraAhorcado}**.`);
            }
        } else {
            intentosAhorcado--;
            if (intentosAhorcado === 0) {
                return message.channel.send(`💀 ¡Perdiste! La palabra era **${palabraAhorcado}**.`);
            }
        }
        message.channel.send(`Palabra: ${progresoAhorcado.join(' ')} | Intentos restantes: **${intentosAhorcado}**`);
    }
});
const categories = {
    'videojuegos':[
        {
            question: "¿Cuál fue el primer videojuego de la saga 'The Legend of Zelda'?",
            options: ["Ocarina of Time", "Breath of the Wild", "Link's Awakening", "The Legend of Zelda"],
            answer: "The Legend of Zelda"
        },
        {
            question: "¿Qué personaje es conocido como el fontanero de Nintendo?",
            options: ["Link", "Donkey Kong", "Mario", "Samus"],
            answer: "Mario"
        },
        {
            question: "¿En qué juego puedes encontrar al personaje llamado Master Chief?",
            options: ["Call of Duty", "Halo", "Destiny", "Gears of War"],
            answer: "Halo"
        },
        {
            question: "¿Qué videojuego es conocido por la frase 'It's dangerous to go alone! Take this.'?",
            options: ["Super Mario Bros.", "The Legend of Zelda", "Metroid", "Donkey Kong"],
            answer: "The Legend of Zelda"
        },
        {
            question: "¿En qué juego de carreras puedes conducir vehículos llamados 'Karts'?",
            options: ["Need for Speed", "Mario Kart", "Gran Turismo", "F1 2020"],
            answer: "Mario Kart"
        },
        {
            question: "¿Cuál es el nombre del creador de la saga 'Super Mario'?",
            options: ["Shigeru Miyamoto", "Hideo Kojima", "Satoru Iwata", "Yoshiaki Koizumi"],
            answer: "Shigeru Miyamoto"
        },
        {
            question: "¿En qué juego juegas como un 'Vault Dweller'?",
            options: ["Fallout", "The Elder Scrolls", "Borderlands", "Diablo"],
            answer: "Fallout"
        },
        {
            question: "¿Cuál es el nombre de la protagonista de 'Tomb Raider'?",
            options: ["Aloy", "Samus Aran", "Lara Croft", "Chun-Li"],
            answer: "Lara Croft"
        },
        {
            question: "¿En qué videojuego se luchan dos personajes llamados Ryu y Ken?",
            options: ["Tekken", "Mortal Kombat", "Street Fighter", "Soulcalibur"],
            answer: "Street Fighter"
        },
        {
            question: "¿En qué serie de juegos luchas contra monstruos gigantes conocidos como 'Titans'?",
            options: ["Monster Hunter", "Dark Souls", "Bloodborne", "Attack on Titan: The Game"],
            answer: "Attack on Titan: The Game"
        },
        {
            question: "¿Qué juego se juega principalmente en un mundo abierto con criaturas llamadas 'Pokémon'?",
            options: ["Digimon World", "Pokémon", "Final Fantasy", "Yu-Gi-Oh!"],
            answer: "Pokémon"
        },
        {
            question: "¿Qué juego cuenta la historia de un hombre llamado Joel y una niña llamada Ellie?",
            options: ["Horizon Zero Dawn", "The Last of Us", "Red Dead Redemption", "Uncharted"],
            answer: "The Last of Us"
        },
        {
            question: "¿En qué juego puedes crear y administrar tu propio parque de dinosaurios?",
            options: ["SimCity", "Planet Coaster", "Jurassic World Evolution", "Zoo Tycoon"],
            answer: "Jurassic World Evolution"
        },
        {
            question: "¿Cuál es el nombre del personaje principal de la saga 'Assassin's Creed'?",
            options: ["Ezio Auditore", "Altair Ibn-La'Ahad", "Connor Kenway", "Desmond Miles"],
            answer: "Ezio Auditore"
        },
        {
            question: "¿En qué juego luchas contra el personaje llamado Bowser?",
            options: ["Sonic", "Super Mario", "Luigi's Mansion", "Donkey Kong"],
            answer: "Super Mario"
        },
        {
            question: "¿Qué título es conocido como el juego de 'batalla real' más popular?",
            options: ["Apex Legends", "PUBG", "Fortnite", "Call of Duty: Warzone"],
            answer: "Fortnite"
        },
        {
            question: "¿En qué juego se juega como un robot llamado 'Robo' que tiene que salvar el mundo?",
            options: ["Metroid", "Mega Man", "Ratchet & Clank", "Robo Recall"],
            answer: "Mega Man"
        },
        {
            question: "¿En qué juego de terror te enfrentas a criaturas llamadas 'Zombies' y tratas de sobrevivir?",
            options: ["Resident Evil", "Silent Hill", "Dead Rising", "Left 4 Dead"],
            answer: "Resident Evil"
        },
        {
            question: "¿En qué juego puedes encontrar a personajes como Geralt de Rivia?",
            options: ["The Witcher", "Dragon Age", "Skyrim", "Dark Souls"],
            answer: "The Witcher"
        },
        {
            question: "¿Qué saga de juegos se ambienta en el 'Mundo de los Muertos' en México?",
            options: ["Horizon Zero Dawn", "God of War", "Call of Duty: Black Ops", "Guacamelee!"],
            answer: "Guacamelee!"
        },
        {
            question: "¿Cuál es el nombre del videojuego donde los jugadores deben construir y sobrevivir en un mundo lleno de bloques?",
            options: ["Terraria", "Fortnite", "Minecraft", "Roblox"],
            answer: "Minecraft"
        },
        {
            question: "¿Qué juego es conocido por el famoso 'Hadouken'?",
            options: ["Street Fighter", "Tekken", "Mortal Kombat", "King of Fighters"],
            answer: "Street Fighter"
        }
    ],

    'valorant': [

        {
            question: "¿Cuál es la habilidad de Brimstone que lanza una lluvia de fuego?",
            options: ["Orbital Strike", "Incendiary", "Skyfire", "Molotov"],
            answer: "Orbital Strike"
        },
        {
            question: "¿Qué habilidad de Sage le permite poner una barrera en el camino?",
            options: ["Barrier Orb", "Healing Orb", "Slow Orb", "Resurrection"],
            answer: "Barrier Orb"
        },
        {
            question: "¿Qué agente tiene la habilidad 'Hot Hands'?",
            options: ["Phoenix", "Jett", "Sova", "Raze"],
            answer: "Phoenix"
        },
        {
            question: "¿Qué habilidad de Astra puede usar para crear una zona que ralentiza a los enemigos?",
            options: ["Gravity Well", "Nova Pulse", "Nebula", "Cosmic Divide"],
            answer: "Gravity Well"
        },
        {
            question: "¿Qué habilidad de KAY/O permite anular las habilidades de los enemigos?",
            options: ["Null/Cmd", "Flash/Drive", "Frag/Drone", "Suppressor"],
            answer: "Null/Cmd"
        },
        {
            question: "¿Qué agente de *Valorant* tiene la habilidad llamada 'Dimensional Shift'?",
            options: ["Yoru", "Omen", "Phoenix", "Sage"],
            answer: "Omen"
        },
        {
            question: "¿Cuál es la habilidad definitiva de Sova?",
            options: ["Hunter's Fury", "Recon Bolt", "Shock Dart", "Arrow Barrage"],
            answer: "Hunter's Fury"
        },
        {
            question: "¿Qué habilidad de Reyna le permite curarse a sí misma?",
            options: ["Dismay", "Devour", "Cloak", "Dismiss"],
            answer: "Devour"
        },
        {
            question: "¿En qué mapa de *Valorant* se encuentra el sitio B en la zona de 'B Long'?",
            options: ["Bind", "Ascent", "Breeze", "Icebox"],
            answer: "Bind"
        },
        {
            question: "¿Qué agente tiene la habilidad 'Sky Smoke'?",
            options: ["Brimstone", "Omen", "Astra", "Viper"],
            answer: "Brimstone"
        },
        {
            question: "¿Qué agente tiene la habilidad 'Paranoia' que atraviesa las paredes y ciega a los enemigos?",
            options: ["Omen", "Breach", "Phoenix", "Brimstone"],
            answer: "Omen"
        },
        {
            question: "¿Qué agente de *Valorant* tiene la habilidad 'Nightfall'?",
            options: ["Reyna", "Breach", "KAY/O", "Sova"],
            answer: "KAY/O"
        },
        {
            question: "¿Cuál es el nombre real de la agente 'Viper'?",
            options:["Sarah Gaunt", "Sierra Ochoa", "Jett Min", "Melina Jovanovic"],
            answer: "Melina Jovanovic"
        },
        {
            question: "¿Qué agente tiene la habilidad 'Toxins'?",
            options: ["Viper", "Astra", "Omen", "Phoenix"],
            answer: "Viper"
        },
        {
            question: "¿En qué mapa de *Valorant* puedes encontrar el sitio B en la zona de A?",
            options: ["Ascent", "Icebox", "Bind", "Breeze"],
            answer: "Ascent"
        },
        {
            question: "¿Qué agente puede colocar un 'Horizon Orb'?",
            options: ["Sova", "Astra", "Cypher", "Omen"],
            answer: "Astra"
        },
        {
            question: "¿Qué agente tiene la habilidad 'Blaze'?",
            options: ["Phoenix", "Brimstone", "Raze", "Sova"],
            answer: "Phoenix"
        },
        {
            question: "¿Qué es la habilidad 'Ultimate' de Killjoy?",
            options: ["Lockdown", "Nanoswarm", "Lockdown Turret", "Lockdown Bot"],
            answer: "Lockdown"
        },
        {
            question: "¿Qué agente de *Valorant* tiene el rasgo de origen alemán?",
            options: ["Sova", "Astra", "Brimstone", "Killjoy"],
            answer: "Killjoy"
        },
        {
            question: "¿Qué arma de *Valorant* tiene una característica especial en la que dispara disparos automáticos a medida que se mantiene presionado el botón de fuego?",
            options: ["Spectre", "Odin", "Vandal", "Guardian"],
            answer: "Odin"
        },
        {
            question: "¿Cuál es el nombre de la habilidad definitiva de Sova?",
            options: ["Hunter's Fury", "Recon Bolt", "Shrouded Step", "Hunter's Mark"],
            answer: "Hunter's Fury"
        },
        {
            question: "¿Qué agente tiene la habilidad 'Gravity Well'?",
            options: ["Omen", "Astra", "Breach", "KAY/O"],
            answer: "Astra"
        },
        {
            question: "¿Qué habilidad de Viper puede utilizarse para bloquear la visión de los enemigos?",
            options: ["Toxic Screen", "Snake Bite", "Viper's Pit", "Poison Cloud"],
            answer: "Toxic Screen"
        },
        {
            question: "¿Qué agente tiene la habilidad 'Aftershock'?",
            options: ["Sova", "Breach", "Brimstone", "Jett"],
            answer: "Breach"
        },
        {
            question: "¿Qué agente es conocido por su habilidad 'Blade Storm'?",
            options: ["Phoenix", "Jett", "Reyna", "Sage"],
            answer: "Jett"
        },
        {
            question: "¿Qué habilidad de Sage revive a los jugadores caídos?",
            options: ["Resurrection", "Healing Orb", "Barrier Orb", "Slow Orb"],
            answer: "Resurrection"
        },
        {
            question: "¿Qué agente tiene la habilidad 'Paranoia'?",
            options: ["Phoenix", "Omen", "Breach", "Brimstone"],
            answer: "Omen"
        },
        {
            question: "¿En qué mapa de *Valorant* se encuentra la zona de 'A Hook'?",
            options: ["Bind", "Ascent", "Icebox", "Breeze"],
            answer: "Bind"
        },
        {
            question: "¿Qué es lo que hace la habilidad 'Snake Bite' de Viper?",
            options: ["Curar a los aliados", "Crear una pared de fuego", "Hacer daño por veneno y ralentizar", "Teleportarse"],
            answer: "Hacer daño por veneno y ralentizar"
        },
        {
            question: "¿Qué agente tiene la habilidad de colocar una cámara de vigilancia llamada 'Spycam'?",
            options: ["Cypher", "Sova", "Killjoy", "Astra"],
            answer: "Cypher"
        },
        {
            question: "¿Qué habilidad de Raze explota en una zona cercana causando daño significativo?",
            options: ["Boom Bot", "Paint Shells", "Blast Pack", "Satchel Charge"],
            answer: "Paint Shells"
        },
        {
            question: "¿Cuál es la habilidad de Yoru que le permite teleportarse?",
            options: ["Gatecrash", "Dimensional Shift", "Fakeout", "Blindside"],
            answer: "Gatecrash"
        }
    ],

    'ciencia': [
        {
            question: "¿Qué año llegó el hombre a la luna?",
            options: ["1969", "1979", "1959", "1989"],
            answer: "1969"
        },
        {
            question: "¿Cuál es el animal terrestre más rápido?",
            options: ["León", "Elefante", "Guepardo", "Caballo"],
            answer: "Guepardo"
        }
    ]
};

let playerScores = {};

// Comando de trivia
client.on('messageCreate', async (message) => {
    if (message.author.bot) return; // Ignora los mensajes de otros bots

    const content = message.content.toLowerCase();

    // Comienza el juego de trivia con selección de categoría
    if (content.startsWith('!trivial')) {
        const args = content.split(' ');
        args.shift(); // Elimina el comando '!TRIVIAL'

        // Verifica si la categoría es válida
        const category = args.join('').toLowerCase();
        if (!categories[category]) {
            return message.channel.send('Categoría no válida. Las categorías disponibles son: ' + Object.keys(categories).join(', '));
        }

        // Selecciona una pregunta aleatoria de la categoría elegida
        const questions = categories[category];
        const question = questions[Math.floor(Math.random() * questions.length)];
        const questionText = `${question.question}\nOpciones:\n${question.options.join('\n')}`;

        // Envía la pregunta y espera la respuesta
        message.channel.send(questionText);

        // Espera por la respuesta del jugador
        const filter = (response) => response.author.id === message.author.id;
        const collector = message.channel.createMessageCollector({ filter, time: 15000 });

        collector.on('collect', (response) => {
            // Verifica si la respuesta es correcta
            if (response.content.toUpperCase() === question.answer.toUpperCase()) {
                // Actualiza la puntuación
                if (!playerScores[message.author.id]) {
                    playerScores[message.author.id] = 0;
                }
                playerScores[message.author.id] += 1;
                message.channel.send(`¡Correcto! Tu puntuación es ahora: ${playerScores[message.author.id]} puntos.`);
            } else {
                message.channel.send(`Incorrecto. La respuesta correcta era: ${question.answer}`);
            }

            // Termina la recolección
            collector.stop();
        });

        collector.on('end', (collected, reason) => {
            if (reason === 'time') {
                message.channel.send('¡Se acabó el tiempo! No pudiste responder a tiempo.');
            }
        });
    }

    // Comando para ver la puntuación
    if (content.toUpperCase() === '!PUNTUACION') {
        if (!playerScores[message.author.id]) {
            message.channel.send('Aún no tienes puntuaciones. ¡Juega un poco de trivia!');
        } else {
            message.channel.send(`Tu puntuación es: ${playerScores[message.author.id]} puntos.`);
        }
    }
});


// Iniciar sesión con el token)
client.login('INTRODUCIR EL TOKEN');
