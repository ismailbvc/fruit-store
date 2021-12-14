module.exports = async (req, res) =>
{
  const Fruits = require('./../../model/Fruits')
      , { name: FruitName, quantity: Quantity, unit: Unit, price: Price } = req.body || {}

  if ( String(FruitName || '').trim() < 2 )
    return res.status(400).json(null)

  if ( ! ( +Quantity >= 0 ) )
    return res.status(400).json(null)

  if ( String(Unit || '').trim() < 2 )
    return res.status(400).json(null)

  if ( ! ( +Price >= 0 ) )
    return res.status(400).json(null)

  // data integrity enforced in sql server, so further validation takes place there
  return res.json({ success: await Fruits.insert(FruitName.trim(), +Quantity, Unit.trim(), +Price) })
}