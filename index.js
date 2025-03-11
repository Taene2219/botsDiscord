require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const OpenAI = require('openai');

// Clave de API de OpenAI, creamos una constante para no tener que escribir continuamengte el código
const apiKey = 'ClaveAPIOpenAi';

// Creamos la  instancia de OpenAI
const openai = new OpenAI({
    apiKey: apiKey
});
// Creamos instancia del bot de Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Bot listo
client.once('ready', () => {
    console.log(`¡Conectado como ${client.user.tag}!`);
});

// Responder a mensajes
client.on('messageCreate', async (message) => {
    if (message.author.bot) return; // Evita responder a otros bots
//Un saludito de cortesía
    if (message.content.toUpperCase() === '/HOLA') {
        message.channel.send('Hola');
//Llamamos a la ia
    } else if (message.content.startsWith('/ia')) {
        const prompt = message.content.slice(3).trim();
        if (!prompt) {
            message.reply('Escribe algo después de `/ia` para hacer una pregunta.');
            return;
        }

        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }]
            });

            const respuesta = response.choices[0].message.content;
            message.reply(respuesta);
        } catch (error) {
            console.error("Error al generar la respuesta:", error);
            if (error.code === 'no hay cuota suficiente, haby que actualizar el plan de pago de open ai') {
                message.reply('Has excedido tu cuota de uso de la API. Por favor, revisa tu plan y detalles de facturación.');
            } else {
                message.reply('Ocurrió un error al generar la respuesta.');
            }

        }
    } else {
        console.log("No se encontró el comando. Verifica el mensaje.");
    }
});

// Iniciar sesión con el token)
client.login('TOKEN DE DISCORD');
