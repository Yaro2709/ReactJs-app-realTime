const express = require('express');
const cors = require('cors');
const PORT = 5000;
//Способ управления событиями в NodeJs
const events = require('events');

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
app.get('/get-messages', (req, res) => {
    //Какой-то пользователь отправил сообщение и мы уведомляем
    emitter.once('newMessage', (message) => {
        //Вовращаем ответ на клиент
        res.json(message)
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
