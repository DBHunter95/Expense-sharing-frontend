import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class NavBar extends Component {
  state = {}

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu size='large' color={'Teal'} inverted widths={1}>
            <Menu.Item header>Expense Sharing App</Menu.Item>
        </Menu>
        <p id="intro">Welcome, This is a project to showcase RESTful API's built in a Flask application that access a postgresSQL database.
            The app is designed for people who want to keep track of shared expenses between individuals and groups. You can add yourself and your friends 
            as users, create groups with different users, and then log any purchases made. Every time a new transaction is added the app will automatically work out
            how much everyone owes/is owed and will update the database. You can check how much you owe people or they owe you in the "My outstanding payemnts section", 
            when the debt has been settled hit the "Paid" button and the system will update. Feel free to test it out!</p>
      </div>
    )
  }
}