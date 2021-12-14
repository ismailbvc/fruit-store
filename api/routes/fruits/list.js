module.exports = async (req, res) =>
{
  const Fruits = require('./../../model/Fruits')
      , args = []

  if ( req.query.unit ) {
    args.push('Unit', String(req.query.unit).trim())
  } else {
    args.push('1', 1) // select all fruits (where 1=1)
  }

  if ( String(req.query.search || '').trim() ) {
    // pagination, search
    args.push(null, String(req.query.search).trim())
  }

  const items = await Fruits.getBy(...args)

  return res.json(items)
}