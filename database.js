var mysql = require('mysql')

var con = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "",
          database: "covidmap",
          multipleStatements: true
        });
        
con.connect(function(err){  //checks database for user and adds
  console.log('SQL CONNECTED')
})

//npm run devStart  //start server
