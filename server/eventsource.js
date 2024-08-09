const express = require('express');
const cors = require('cors');
const PORT = 5000;
//Способ управления событиями в NodeJs
const events = require('events')

//Создаем EventEmitter, который помогает регестрировать события
const emitter = new events.EventEmitter();

//Экземпляр приложения из express
const app = express()

//Используем cors
app.use(cors())
//Парсер json
app.use(express.json())

//Получение сообщений
//Указываем маршрут и колбэк (который получает запрос - req и ответ - res)
app.get('/connect', (req, res) => {
    //Статус код и заголовки:
    res.writeHead(200, {
        'Connection': 'keep-alive',             //Держать подключение
        'Content-Type': 'text/event-stream',    //Обмен - строковый
        'Cache-Control': 'no-cache, no-transform',            //Не кэшировать
    })
    //Подписываемся на событие
    emitter.on('newMessage', (message) => {
        //Возвращаем сообщение на клиент
        res.write(`data: ${JSON.stringify(message)} \n\n`)
    })
})

//Отправка сообщений
//Указываем маршрут и колбэк (который получает запрос - req и ответ - res)
app.post('/new-messages', ((req, res) => {
    //Достаем сообщение из тела запроса
    const message = req.body;
    //Передаем сообщение
    emitter.emit('newMessage', message)
    //Возвращаем код запроса (успешно)
    res.status(200)
}))


app.listen(PORT, () => console.log(`server started on port ${PORT}`))
