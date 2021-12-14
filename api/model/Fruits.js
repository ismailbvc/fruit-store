module.exports = new class Fruits
{
  COLUMNS = [ 'FruitId', 'FruitName', 'Quantity', 'Unit', 'Price' ]

  async getBy(field, value, limit=null, search='', operator='=')
  {
    if ( -1 == this.COLUMNS.indexOf(field) && field != 1 ) // also allow 1=1
      return []

    const conn = await Util.dbConn()

    try {
      const sql = require('mssql'), req = new sql.Request(conn)      
      req.input('value', value)
      req.input('search', `%${search}%`)

      const results = await req.query(`select ${limit ? `top ${limit} ` : ''}* from Fruits where ${field} ${operator} ${
        Array.isArray(value) ? `( select value from string_split(@value, ',') )` : '@value'
      }${
        search ? ' and (FruitName like @search)' : ''
      } order by FruitId desc`)
      conn.close()

      return results.recordset.map(this.parse.bind(this))
    } catch (err) {
      return void console.log(`query error: ${err}`)
    }
  }

  async getOneBy(...args)
  {
    return ((await this.getBy(...args, 1)) || []).shift()
  }

  parse(fruit)
  {
    fruit.FruitId = +fruit.FruitId
    fruit.Price = +fruit.Price
    fruit.Quantity = +fruit.Quantity
    fruit.FruitId = +fruit.FruitId
    return fruit
  }

  async insert( FruitName, Quantity, Unit, Price )
  {
    const conn = await Util.dbConn()

    try {
      const sql = require('mssql'), req = new sql.Request(conn)
      req.input('FruitName', FruitName)
      req.input('Quantity', Quantity)
      req.input('Unit', Unit)
      req.input('Price', Price)

      const status = await req.query(`insert into Fruits (FruitName, Quantity, Unit, Price)
        values (@FruitName, @Quantity, @Unit, @Price)`)
      conn.close()

      return !! status.rowsAffected
    } catch (err) {
      return void console.log(`query error: ${err}`)
    }
  }

  async update(id, update)
  {
    const conn = await Util.dbConn()

    try {
      const sql = require('mssql'), req = new sql.Request(conn)
      let stmt = 'update Fruits set '

      for ( let prop in update ) {
        if ( -1 == this.COLUMNS.indexOf(prop) )
          continue

        req.input(prop, update[prop])
        stmt += `${prop} = @${prop}, `
      }

      stmt = stmt.replace(/\, $/, '')
      stmt += ` where FruitId = ${Number(id)}`

      const status = await req.query(stmt)
      conn.close()

      return !! status.rowsAffected
    } catch (err) {
      return void console.log(`query error: ${err}`)
    }
  }

  async delete(id)
  {
    const conn = await Util.dbConn()

    try {
      const sql = require('mssql'), req = new sql.Request(conn)      
      req.input('id', id)
      const status = await req.query('delete from Fruits where FruitId = @id')
      conn.close()

      return !! status.rowsAffected
    } catch (err) {
      return void console.log(`query error: ${err}`)
    }
  }
}