import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Loading from './misc/Loading'
import { setAlerts } from '../redux/actions'
import { Link } from 'react-router-dom'

const [nameRef, quantityRef, unitRef, priceRef] = [React.createRef(), React.createRef(), React.createRef(), React.createRef()]

class Create extends React.Component
{
  componentDidMount()
  {
    const edit_id = +this.props.match.params.id

    this.setState({
      edit_id: edit_id > 0 ? edit_id : null
    })

    document.title = edit_id ? 'Edit Fruit' : 'Add a New Fruit'

    if ( ! edit_id )
      return

    fetch(`/api/fruits/${edit_id}`)
      .then(r => r.json())
      .then(item =>
      {
        if ( ! item || ! item.FruitId )
          throw new Error('404 - item not found')

        return item
      })
      .then(fruit => this.setState({
        fruit,
        name: fruit.FruitName,
        quantity: fruit.Quantity,
        unit: fruit.Unit,
        price: fruit.Price,
      }))
      .catch(err => this.props.history.replace('/'))
  }

  async submit(e)
  {
    e.preventDefault()

    const { name, quantity, unit, price, loading, edit_id } = this.state || {}

    if ( loading )
      return

    this.props.setAlerts(this.props.alerts.filter(err => 'insert' !== err.type), false)

    if ( ! name || ! name.trim() )
      return nameRef.current.focus()

    if ( ! ( quantity > 0 ) )
      return quantityRef.current.focus()

    if ( -1 == ['box','kg','pieces'].indexOf(String(unit).toLowerCase()) )
      return unitRef.current.focus()

    if ( ! ( price > 0 ) )
      return priceRef.current.focus()

    this.setState({ loading: 1 })

    const res = await fetch(`/api/fruits${ edit_id ? `/${edit_id}` : '' }`, {
      method: edit_id ? 'PATCH' : 'PUT',
      headers: {
        'content-type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ name, quantity, unit, price })
    })
      .then(r => r.json())
      .catch(err => ({ success: false }))

    if ( res && res.success ) {
      return this.props.history.push('/')
    } else {
      this.setState({ loading: undefined })
      this.props.setAlerts([{
        text: 'Error occurred, please verify your input and try again.',
        type: 'insert',
      }])
    }
  }

  render()
  {
    const { name, quantity, unit, price, loading, edit_id, fruit } = this.state || {}

    if ( edit_id && undefined === fruit ) 
      return <div className="m-auto max-w-md w-full p-4"><div className="flex items-center h-full h-12">
          <Loading className="table m-auto" />
        </div></div>

    return (
      <div className="m-auto max-w-md w-full p-4 flex-1">
        <h2 className="text-grey-darkest mb-6 pt-1">{ edit_id ? 'Edit Fruit' : 'Add to Inventory' }</h2>
        <div className="h-full">
          <div className="w-full">
            <form className="w-full" onSubmit={this.submit.bind(this)}>
              <p className="w-full">
                <label className="table text-sm w-full mb-3">
                  <strong className="mb-1 table text-grey-darkest">Fruit Name</strong>
                  <input className="border focus:border-indigo-dark focus:outline-none leading-tight px-3 py-2 rounded text-grey-darker w-full"
                    type="text"
                    value={name||''}
                    onChange={e => this.setState({ name: e.target.value })}
                    ref={nameRef}
                    disabled={!!loading} />
                </label>

                <label className="table text-sm w-full mb-3">
                  <strong className="mb-1 table text-grey-darkest">Quantity</strong>
                  <input className="border focus:border-indigo-dark focus:outline-none leading-tight px-3 py-2 rounded text-grey-darker w-full"
                    type="number"
                    value={quantity||''}
                    onChange={e => this.setState({ quantity: e.target.value })}
                    ref={quantityRef}
                    disabled={!!loading} />
                </label>

                <label className="table text-sm w-full mb-3">
                  <strong className="mb-1 table text-grey-darkest">Unit</strong>
                  <input className="border focus:border-indigo-dark focus:outline-none leading-tight px-3 py-2 rounded text-grey-darker w-full"
                    type="text"
                    value={unit||''}
                    placeholder="Box, KG, or Pieces"
                    onChange={e => this.setState({ unit: e.target.value })}
                    ref={unitRef}
                    disabled={!!loading} />
                </label>

                <label className="table text-sm w-full mb-3">
                  <strong className="mb-1 table text-grey-darkest">Price</strong>
                  <input className="border focus:border-indigo-dark focus:outline-none leading-tight px-3 py-2 rounded text-grey-darker w-full"
                    type="text"
                    value={price||''}
                    onChange={e => this.setState({ price: e.target.value })}
                    ref={priceRef}
                    disabled={!!loading} />
                </label>

                <label className="table text-sm w-full mb-2">
                  <input className={`border border-transparent cursor-pointer leading-tight px-3 py-2 rounded text-grey-darker text-white w-full focus:border-indigo-dark focus:bg-white focus:text-indigo-dark ${loading ? 'bg-grey' : 'bg-indigo hover:border-indigo-dark hover:bg-white hover:text-indigo-dark'}`}
                    type="submit"
                    value="Submit"
                    disabled={!!loading} />
                </label>
              </p>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  alerts: state.alerts,
}), dispatch => bindActionCreators({
  setAlerts,
}, dispatch))(Create)