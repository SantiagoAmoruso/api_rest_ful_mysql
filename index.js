import express from 'express';
const app = express();
const port = 3000;
const __dirname = import.meta.dirname;

app.use(express.json())

app.get ('/', (req, res) => {
    res.send('Api_rest_ful_MySQL')
})

app.post('/',(req,res) => {
    res.send('post')
})

app.put('/',(req,res) => {
    res.send('put')
})

app.delete('/', (req,res) => {
    res.send('delete')
})

app.use((req,res) => {res.status(404),send('pagina inexistente')})

app.listen(port, console.log('servidor http://Localhost: ${PORT}'))