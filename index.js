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
        const connection = await pool.getConnection()
        const [rows] = await connection.query(sql)
        connection.release()
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
        rows[0] ? res.json(rows[0]):res.status(404).send('user no existe')
        console.log(rows[0])
        
    }catch(error){
        res.status(500).send('error con la consulta')
    }
})

app.post('/users/body', async(req,res) => {
    const values = req.body
    // console.log(values)
    const sql = 'insert into users SET ?'  
   try{
        const connection = await pool.getConnection()
        const [rows] = await connection.query(sql, [values])
        connection.release()
        res.status(500).send('nuevo usuario')
        console.log(rows)
        
    }catch(error){
        console.log(error)
        res.status(500).send('error con la consulta')
    }
})

app.put('/users/:id', async(req,res) => {
    const id =req.params.id
    const new_values = req.body
    const sql = "update users set ? where id_users = ? "
    try{
        const connection = await pool.getConnection()
        const [rows] = await connection.query(sql, [new_values, id]);
        connection.release();
        (rows.affectedRows == 0 )? res.status(404).send('user no existe'):res.send('datos actualizados')
        
    }catch(error){
        //console.log(error)
        res.status(500).send('error con la consulta'+ error)
    }
})

app.delete('/users/:id', async(req,res) => {
     const id =req.params.id
     const sql = "delete * from users where id.users = ?"

      try{
        const connection = await pool.getConnection()
        const [rows] = await connection.query(sql, [id]);
        connection.release();
        (rows.affectedRows == 0 )? res.status(404).send('user no existe'):res.send('user eliminado')
        
    }catch(error){
        //console.log(error)
        res.status(500).send('error con la consulta'+ error)
    }
})

app.use((req,res) => {res.status(404),send('pagina inexistente')})

app.listen(port, console.log('servidor http://Localhost: ${PORT}'))