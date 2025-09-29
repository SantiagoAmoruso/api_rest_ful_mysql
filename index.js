import express from 'express';
import pool from './config/conexion.js'
const app = express();
const port = 3000;
const __dirname = import.meta.dirname;

app.use(express.json())

app.get ('/', (req, res) => {
    res.send('Api_rest_ful_MySQL')
})

app.get('/users', async(req,res) =>{
    const sql = 'select * from users'
    try{
        const Connection = await pool.getConnection()
        const [rows] = await Connection.query(sql)
        Connection.release()
        res.json(rows)
    }catch(error){
        res.status(500).send('error con la consulta')
    }
    
})

app.get('/users/:id', async(req, res) => {
    const id = req.params.id
    const sql = 'select * from users where id_users = ?'  
   
    try{
        const connection = await pool.getConnection()
        const [rows] = await connection.query(sql, [id])
        connection.release()
        res.json(rows)
    }catch(error){
        res.status(500).send('error con la consulta')
    }
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