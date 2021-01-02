import React, { Component, useState } from 'react';
import { Input, Form, FormField, Button } from 'semantic-ui-react';


class TransactionForm extends Component {
    state = { 
        item: '',
        date: '',
        price: 0,
        buyer_id: 0,
        borrower_id: null,
        group_id: null,


    };

    // These update the state as the Form is filled out
    handleInputChange = e => {
        this.setState({ ...this.state, [e.target.name]: e.target.value });
    };

    handleIntegerChange = e => {
        this.setState({ ...this.state, [e.target.name]: parseInt(e.target.value) });
    };

    handlePriceChange = e => {
        this.setState({ ...this.state, [e.target.name]: parseFloat(e.target.value) });
    };

    // Once submit is clicked the information is taken from the state and sent to the API where the database is updated
    render() { 
        return (
            <Form>
            <Form.Field>
                <Input
                  placeholder="Item"
                  name="item"
                  onChange={this.handleInputChange}
                />
            </Form.Field>
            <Form.Field>
                <Input
                  placeholder="Date"
                  name="date"
                  onChange={this.handleInputChange}
                />
            </Form.Field>
            <Form.Field>
                <Input
                  placeholder="Price"
                  label="£"
                  name="price"
                  onChange={this.handlePriceChange}
                />
            </Form.Field>
            <Form.Field>
                <Input
                  placeholder="Buyer ID"
                  name="buyer_id"
                  onChange={this.handleIntegerChange}
                />
            </Form.Field>
            <Form.Field>
                <Input
                  placeholder="Borrower ID"
                  name="borrower_id"
                  onChange={this.handleIntegerChange}
                />
            </Form.Field>
            <Form.Field>
                <Input
                  placeholder="Group ID"
                  name="group_id"
                  onChange={this.handleIntegerChange}
                />
            </Form.Field>
            <Form.Field>
                <Button id="submit"
                  onClick={async () => {
                      const item=this.state.item;
                      const price=this.state.price;
                      const buyer_id=this.state.buyer_id;
                      const borrower_id=this.state.borrower_id;
                      const group_id=this.state.group_id;
                      const date=this.state.date;

                      const transaction = {"item": item, "price": price,
                      "buyer_id": buyer_id, "borrower_id": borrower_id,
                      "group_id": group_id, "date": date}

                      const response = await fetch("/api/transactions", {
                          method: "POST",
                          headers: {
                              "Content-Type": "application/json"
                          },
                          body: JSON.stringify(transaction)
                      });

                      if (response.ok) {
                          console.log("response worked!");
                          this.props.onNewTransaction(transaction);
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
 
export default TransactionForm;
