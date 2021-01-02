import React, { Component } from 'react';
import {Form, List, Button} from 'semantic-ui-react';

class UserDebts extends Component {
    state ={
        chosenID: null,
        displayDebts: false
    };

    // Is called when a debt is settled and the user hits paid
    // Settling debts are treated as normal transactions and uses the /transactions API 
    // Set's the amount to double the debt as it will be halved as part of the API process
    handlePay = (payer, payee, amount) => (
        async () => {

            const item="Payment";
            const price=(amount*2);
            const buyer_id=parseInt(payer);
            const borrower_id=parseInt(payee);

            const response = await fetch("/api/transactions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "item": item, "price": price,
                                       "buyer_id": buyer_id, "borrower_id": borrower_id,
                                     })
            });

            if (response.ok) {
                console.log("response worked!");
            }
            window.location.reload();
        }
    );
    
    //Displays Users
    formatUserMenu() {
        const {users} = this.props;
        const UserMenu = users.map(user => {
            const container={};

            container.key = user.id;
            container.text = user.name;
            container.value = user.id;

            return container;
        })

        return (
            UserMenu  
        );
    }

    //locates user by ID
    findUser(id) {
        const {users} = this.props;
        for (var i=0; i < users.length; i++) {
            if (users[i].id == id) {
                return users[i]; 
            }
        }
    }

    // Is called when user wishes to view individual debts, is kept hidden by default in state
    displayDebts = () => {
        this.setState({
            displayDebts: true
        })
    }

    // Used to access the individual debts when requested
    handleInputChange = value => {
        this.setState({ chosenID: value });
    };

    render() { 
        let debts= null;
        let chosenUser = this.findUser(this.state.chosenID);

        // This section is for displaying individual user debts
        // if statement is so it is only shown when requested and so it doesn't glitch if the user has no debts i.e if chosenUser.outstanding = null
        // For each debt determines who owe's who and displays the result accordingly, this also effects how the id's are passed to the handlPay handler.
        if (this.state.displayDebts && chosenUser.outstanding) {
            debts = (
                <List>
                    {Object.keys(chosenUser.outstanding).map((key, i) => {
                        return (
                            <div key={i}>
                            {chosenUser.outstanding[key] > 0 &&
                            <List.Item>
                                {this.findUser(key).name} owes {chosenUser.name} £{chosenUser.outstanding[key]}  -----
                                <Button onClick={this.handlePay(key,chosenUser.id,chosenUser.outstanding[key])} size="tiny" color="green">Paid</Button>
                            </List.Item>
                            }
                            {chosenUser.outstanding[key] < 0 &&
                            <List.Item>
                                {chosenUser.name} owes {this.findUser(key).name} £{-chosenUser.outstanding[key]}  :
                                <Button onClick={this.handlePay(chosenUser.id,key,-chosenUser.outstanding[key])} size="tiny" color="green">Paid</Button> 
                            </List.Item>
                            }
                            </div>
                        )
                    })}
                </List>
            )
        }
        //This is the menu for searching individual debts
        return (
            <div>
                <Form style={{paddingTop:"5px"}}>
                    <Form.Group inline>
                    <Form.Select
                        label='My Outstanding Payments:' 
                        options={this.formatUserMenu()} 
                        placeholder='Select User' 
                        onChange={(e, {value}) => this.handleInputChange(value)}
                    />
                    <Form.Button onClick={this.displayDebts}>Show</Form.Button>
                    </Form.Group>
                </Form>
                {debts}
            </div>
        );
    }
}
 
export default UserDebts;
