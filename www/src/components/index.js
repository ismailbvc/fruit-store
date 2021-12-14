import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Header from './misc/Header'

import Home from './Home'
import About from './About'
import Create from './Create'

import { setAlerts } from '../redux/actions'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

class App extends React.Component
{
  render()
  {
    const alerts = this.props.alerts

    return (
      <Router>
        <Header {...this.props} />
        
        <Switch>
          <Route path='/' exact render={ props => <Home {...this.props} {...props} /> } />
          <Route path='/about-us' exact render={ props => <About {...this.props} {...props} /> } />
          <Route path='/new-item' exact render={ props => <Create {...this.props} {...props} /> } />
          <Route path='/edit-item/:id' exact render={ props => <Create {...this.props} {...props} /> } />
          <Route render={ props => <div className="text-center">404 - page not found</div> } />
        </Switch>

        <div className="fixed w-full" style={{ left: 4, bottom: 4, marginRight: 4, zIndex: 999, paddingRight: 8 }}>
          { alerts.filter(x => ! x.skip_main_ui).map((alert, i) =>
            <div style={{ background: '#403F3F' }} className="mt-1 flex items-center px-6 py-3 text-xs text-white w-full max-w-xl m-auto" key={Math.random()}>
              <p className="flex-1">{ alert.text }</p>
              <span className="cursor-pointer px-1 text-blue text-blue-light select-none" onClick={e =>(alerts.splice(i,1), this.props.setAlerts(alerts, false))}>
                { alert.dismiss_text || 'OK' }
              </span>
            </div>) }
        </div>
      </Router>
    )
  }
}

export default connect(state => ({
  alerts: state.alerts,
}), dispatch => bindActionCreators({
  setAlerts,
}, dispatch))(App)