import React, { Component } from 'react';
import {Button, Icon} from 'semantic-ui-react';

class TransactionList extends Component {
    // Sends Delete request with the id from the transaction
    handleDelete = (id) => (
        async () => {
            const response = await fetch(`/transactions/${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                console.log("response worked!");
            }
            window.location.reload();
        }
    );
    // inherits the transaction list as props from App.js and formats them appriately    
    render() { 
        const {transactions} = this.props;
        return (
            <table id="table">
                <tbody>
                    <tr>
                        <th>ITEM</th>
                        <th>PRICE</th>
                        <th>BUYER</th>
                        <th>GROUP</th>
                        <th>BORROWER</th>
                        <th>DATE</th>
                        <th>DELETE</th>
                    </tr>
            {transactions.map((transaction, index) => {
                const { id, item, borrower_name, buyer_name, group_name, price, date } = transaction
                return (
                    <tr key={id}>
                        <td>{item}</td>
                        <td>£{price}</td>
                        <td>{buyer_name}</td>
                        <td>{group_name}</td>
                        <td>{borrower_name}</td>
                        <td>{date}</td>
                        <td><Button size="mini" onClick={this.handleDelete(transaction.id)} icon='delete' basic color="red"></Button></td>
                    </tr>
                )
            })}
            </tbody>
            </table> 
         );
    }
}
 
export default TransactionList;