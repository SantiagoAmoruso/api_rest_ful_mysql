import mysql from 'mysql2/promise'
const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'tienda',
    conectionlimit : 5
})

pool.getConnection()
.then(Connection =>{
    console.log('conexiom exitosa')
    Connection.release
})
.catch(error =>{
    console.log('error de conexion')
})
export default pool