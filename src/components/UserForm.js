import React, { Component, useState } from 'react';
import { Input, Form, FormField, Button } from 'semantic-ui-react';

class GroupFrom extends Component {
    state = { 
        name: ''
    };
    // Updates the state as form is filled out
    // When Submit is clicked the info is taken from the state
    handleInputChange = e => {
        this.setState({ name: e.target.value });
    };

    render() { 
        return (
            <Form >
            <Form.Group inline>
                <Form.Input 
                  label="Add User:"
                  placeholder="User name"
                  onChange={this.handleInputChange}
                />
                <Form.Button  id="submit"
                  onClick={async () => {
                      const name=this.state.name;
                      const response = await fetch("/api/users", {
                          method: "POST",
                          headers: {
                              "Content-Type": "application/json"
                          },
                          body: JSON.stringify({ "name": name })
                      });

                      if (response.ok) {
                          console.log("response worked!");
                      }
                      window.location.reload();
                  }}
                  >
                  Submit
                  </Form.Button>
            </Form.Group>
        </Form>
          );
    }
}
 
export default GroupFrom;
