module.exports = async (req, res) =>
{
  const Fruits = require('./../../model/Fruits')
  return res.json((await Fruits.getOneBy('FruitId', req.params.id)) || null)
}