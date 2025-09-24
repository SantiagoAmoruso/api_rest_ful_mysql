import express from 'express';
const app = express();
const port = 3000;
const __dirname = import.meta.dirname;


//raiz
app.get('/', (req, res) =>{
    res.send('api, rest ful con datos desde un array')
})

app.listen(PORT, console.log('servidor http://Localhost: ${PORT}'))