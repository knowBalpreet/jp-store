const axios = require('axios');
const fs = require('fs');
const { api } = require('./config');
const { Pool } = require('pg');

const routes = ['posts', 'comments', 'albums', 'photos', 'todos', 'users']
const getData = async (route) => {
  const data = await axios.get(`${api}/${route}`)
  return data.data
}

const getAllData = async () => {
  try {
    const data = await Promise.all(routes.map(route => getData(route)))
    return {data, err: null}
  } catch (err) {
    return {data: null, err}
  }

}

const insertInTable = async (route, data, client) => {
  return new Promise((resolve, reject) => {
    const fields = Object.keys(data[0])
    let insertQueries = []
    let objFields = []
    let index = 1
    data.forEach(row => {
      let insertQuery = []
      // Doing this way to preserve order
      fields.forEach(field => {
        if (row[field].constructor === String){
          insertQuery.push(`'${row[field]}'`)
        }else if(row[field].constructor === Object) {
          insertQuery.push(`$${index}`)
          objFields.push(row[field])
          index += 1
        }else{
          insertQuery.push(row[field])
        }
      })
  
      insertQueries.push(`(${insertQuery.join(', ')})`)
    })
    let query = `
      INSERT INTO ${route}_kb (${fields.join(', ')})
      VALUES ${insertQueries.join(', ')}
    `
    client.query(query, objFields, (err, res) => {
      if (!err){
        console.log({success: true, error: null})
        resolve({success: true, error: null})
      }else{
        reject({success: false, error: err})
      }
    })
    
  })
}

const putInDb = async (data) => {
  try {
    const client = new Pool({
      user: 'fchhltfc',
      host: 'satao.db.elephantsql.com',
      database: 'fchhltfc',
      password: 'vcyFNRGGWwzAIXdQPiTMXcEXz5nYAYLV',
      port: 5432,
    })
  
    const query = fs.readFileSync("./create_tables.sql", "utf8")
    await client.query(query)
    // Removing Promise.all because of too many connections for role "fchhltfc"

    // const responseData = await Promise.all(
    //   data.map((table, key) => {
    //     return insertInTable(routes[key], table, client)
    //   })
    //   )
    let responseData = []
    for (let i = 0; i < data.length; i++) {
      let response = await insertInTable(routes[i], data[i], client); 
      responseData.push(response)
    }
    await client.end()
    let error = null
    const success = responseData.every(table=> table.success)
    if (!success) {
      error = responseData.map(table => table.err).join(',')
    }
    return {success, error}
  
  } catch (e) {
    return {success:false, error: e}
  }

}
module.exports = { getAllData, putInDb }