import React, { Component, useState } from 'react';
import { Input, Form, FormField, Button, Label } from 'semantic-ui-react';


class GroupForm extends Component {
    state = { 
        name: '',
        selected_user: 0,
        members: []
    };

    handleInputChange = e => {
        this.setState({ name: e.target.value });
    };

    handleClick = () => {
        var new_user=this.state.selected_user;
        this.setState({ members: [...this.state.members, new_user]});
    }


    handleAddUser = e => {
        this.setState({ selected_user: parseInt(e.target.value)});
    }
    // Works in the same way as other forms
    // The User's for the group are added one by one using the plus icon
    // each added user is stored in the state under members and displayed for the user to see
    render() { 
        return (
            <Form>
            <Form.Field>
                <Input
                  label = "New Group:"
                  placeholder="Group name"
                  onChange={this.handleInputChange}
                />
            </Form.Field>
            <Form.Field>
                <Input
                  action={{ 
                    icon: "plus square", 
                    onClick: () => this.handleClick() 
                    }} 
                    placeholder="Add Users"
                    label="Users:"
                    onChange={this.handleAddUser} />
            </Form.Field>
            <Form.Field inline>
                <Label size="large">Selected Users:{this.state.members.map(member => {return <p key={member} style={{display:"inline"}}>{member} </p>})}</Label>
                <Button fuild style={{float:"right", marginRight: "0px"}} id="submit"
                  onClick={async () => {
                      const name=this.state.name;
                      const members=this.state.members;
                      const response = await fetch("/groups", {
                          method: "POST",
                          headers: {
                              "Content-Type": "application/json"
                          },
                          body: JSON.stringify({ "name": name, "users": members})
                      });

                      if (response.ok) {
                          console.log("response worked!");
                      }
                      window.location.reload();
                  }}
                  >
                  Submit
                  </Button>
            </Form.Field>
        </Form>
          );
    }
}
 
export default GroupForm;