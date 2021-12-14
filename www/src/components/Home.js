import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { setAlerts } from '../redux/actions'

import Loading from './misc/Loading'

class Home extends React.Component
{
  async componentDidMount()
  {
    document.title = 'Our Fruits'

    const fruits = await fetch('/api/fruits')
      .then(r => r.json())
      .then(fruits => Array.isArray(fruits) ? fruits : []).catch(err => [])

    this.setState({ fruits })
  }

  async delete(e, id)
  {
    e.preventDefault()

    if ( ! confirm('Are you sure?') )
      return

    this.props.setAlerts(this.props.alerts.filter(err => 'delete' !== err.type), false)
 
    const res = await fetch(`/api/fruits/${id}`, { method: 'DELETE' })
      .then(r => r.json())
      .catch(err => undefined)

    if ( res && res.success ) {
      const { fruits } = this.state
          , index = (fruits||[]).findIndex(f => f.FruitId == id)

      if ( -1 != index ) {
        fruits.splice(index, 1)
        this.setState({ fruits })
      }
    } else {
      this.props.setAlerts([{
        text: 'Error occurred, please try again.',
        type: 'delete',
      }])
    }
  }

  render()
  {
    const { fruits } = this.state || {}

    if ( undefined === fruits ) 
      return <div className="m-auto max-w-md w-full p-4"><div className="flex items-center h-full h-12">
          <Loading className="table m-auto" />
        </div></div>

    return (
      <div className="m-auto max-w-md w-full p-4 flex-1">
        <div className="pt-1">
          <h2 className="text-grey-darkest mb-6">Welcome to your local fruit store!</h2>

          <table className="table-fixed w-full text-base leading-normal mb-4" id="dash-table">
              <thead>
                  <tr className="bg-grey-light font-bold select-none text-grey-darker text-left tracking-wide uppercase text-xs break-words">
                      <th className="p-2">Name</th>
                      <th className="p-2">Quantity</th>
                      <th className="p-2">Unit</th>
                      <th className="p-2">Price</th>
                      <th className="p-2"></th>
                  </tr>
              </thead>
              <tbody>
                  { (fruits||[]).length > 0 ? fruits.map((fruit, i) => <tr className="text-xs break-words px-4 py-4 bg-grey-lighter" key={i}>
                      <td className="p-2">{fruit.FruitName}</td>
                      <td className="p-2">{fruit.Quantity}</td>
                      <td className="p-2">{fruit.Unit}</td>
                      <td className="p-2">${fruit.Price}</td>
                      <td className="p-2">
                          <Link className="text-indigo-dark cursor-pointer" to={`/edit-item/${fruit.FruitId}`}>Edit</Link>
                          &nbsp;&nbsp;
                          <a className="text-red-dark cursor-pointer action--delete cursor-pointer underline"
                            onClick={e => this.delete(e, fruit.FruitId)}>Delete</a>
                      </td>
                  </tr>) : <tr className="text-xs break-words px-4 py-4 bg-grey-lighter">
                      <td className="p-2" colSpan={5}><em className="m-auto table">No items found.</em></td>
                  </tr>}
              </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  alerts: state.alerts,
}), dispatch => bindActionCreators({
  setAlerts,
}, dispatch))(Home)