module.exports = async (req, res) =>
{
  const Fruits = require('./../../model/Fruits')
      , fruit = await Fruits.getOneBy('FruitId', +req.params.id)

  if ( ! fruit )
    return res.status(404).json(null)

  const { name: FruitName, quantity: Quantity, unit: Unit, price: Price } = req.body || {}

  if ( String(FruitName || '').trim() < 2 )
    return res.status(400).json(null)

  if ( ! ( +Quantity >= 0 ) )
    return res.status(400).json(null)

  if ( String(Unit || '').trim() < 2 )
    return res.status(400).json(null)

  if ( ! ( +Price >= 0 ) )
    return res.status(400).json(null)

  // data integrity enforced in sql server, so further validation takes place there
  return res.json({ success: await Fruits.update(fruit.FruitId, {
    FruitName: FruitName.trim(),
    Quantity: +Quantity,
    Unit: Unit.trim(),
    Price: +Price,
  }) })
}