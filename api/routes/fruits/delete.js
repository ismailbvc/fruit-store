module.exports = async (req, res) =>
{
  const Fruits = require('./../../model/Fruits')
      , fruit = await Fruits.getOneBy('FruitId', +req.params.id)

  if ( ! fruit ) // deleted already
    return res.json({ success: true })

  // data integrity enforced in sql server, so validation takes place there
  return res.json({ success: await Fruits.delete(fruit.FruitId) })
}