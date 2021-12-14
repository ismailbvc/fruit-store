import React from 'react'

export default class about extends React.Component
{
  async componentDidMount()
  {
    document.title = 'About Us'
  }

  render()
  {
    return (
      <div className="m-auto max-w-md w-full p-4 flex-1">
        <div className="pt-1">
          <h2 className="text-grey-darkest mb-6">About Us</h2>

          <p>We are a local fruit store who deliver organic fruit for your health.</p>
        </div>
      </div>
    )
  }
}