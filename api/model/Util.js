module.exports = new class Util
{
  dsn = {
    user: 'sa',
    password: process.env.SA_PASSWORD,
    database: process.env.DB_NAME,
    server: process.env.DB_HOST,
    port: +process.env.DB_PORT || 1433,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      trustServerCertificate: true,
      enableArithAbort: false,
    }
  }

  async dbConn()
  {
    const sql = require('mssql')
    
    try {
      return await sql.connect(this.dsn)
    } catch (err) {
      return void console.log(`db connection err: ${err}`)
    }
  }
}