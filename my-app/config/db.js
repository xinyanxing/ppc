let mysql = require("mysql")

let pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "111111",
  database: "testDemo"
});//数据库连接配置

let query = function (sql, callback) {
  console.log('callback......')
  console.log(sql)
  pool.getConnection(function (err, conn) {
    console.log('callback.ssss.....')
    console.log(conn)
    if (err) {
      callback(err, null, null);
    } else {
      conn.query(sql, function (err, results, fields) {
        //释放连接  
        conn.release();
        //事件驱动回调  
        callback(err, results, fields);
      });
    }
  });
};
const shownow = () => {
  console.log('aaaaaaaaaa')
  return { 'aa': 'bb' }
};
exports.query = query;


