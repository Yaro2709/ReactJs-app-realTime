const ws = require('ws');

//Создаем сервер и прописываем его конфигурацию
const wss = new ws.Server({
    port: 5000,
}, () => console.log(`Server started on 5000`))

//Подписываемся на событие подключение
wss.on('connection', function connection(ws) {
    //Отправлено какой-то сообщение
    ws.on('message', function (message) {
        //Переганяем в json объект
        message = JSON.parse(message)
        switch (message.event) {
            //Отправлено сообщение
            case 'message':
                broadcastMessage(message)
                break;
            //Подключение
            case 'connection':
                broadcastMessage(message)
                break;
        }
    })
})

function broadcastMessage(message, id) {
    //Все клиенты, которые подключены к серверу
    wss.clients.forEach(client => {
        //Каждый клиент получает солбщение
        client.send(JSON.stringify(message))
    })
}
