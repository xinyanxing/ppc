let mysql = require("mysql")
let pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "11111",
  database: "dbtest"
})//数据库连接配置

function query(sql, callback) {
  console.log('sql')
  console.log(sql)
  pool.getConnection(function (err, connection) {
    connection.query(sql, function (err, rows) {
      callback(err, rows)
      connection.release()
    })
  })
}//对数据库进行增删改查操作的基础

export { query }