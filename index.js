const { getAllData, putInDb }  = require("./helper");
(async() => {
  
  const {data, err} = await getAllData()
  if (!err) {
    const {success, error} = await putInDb(data)
    if (success) {
      console.log('Successfully inserted to database')
    }else{
      console.error('Some error occured : ', error)
      
    }
  } else {
    console.error('Some error occured : ', err)
  }

})()