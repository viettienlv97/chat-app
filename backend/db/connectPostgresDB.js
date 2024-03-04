import pg from 'pg'
const {Pool} = pg
const client = {
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'viettien',
    database: 'postgres'
}

console.log(client);

const pool = new Pool(client)

await pool.connect()

try {
    const res = await pool.query('SELECT $1::text as message', ['Hello world!'])
    console.log(res.rows[0].message) // Hello world!
 } catch (err) {
    console.error(err);
 } finally {
    //await client.end()
 }

export default pool