import React, { Component } from 'react';

class UserList extends Component {

    render() { 
        const {users} = this.props;
        return ( 
            <table id="table">
                <tbody>
                <tr>
                    <th>Name</th>
                    <th>ID</th>
                    <th>Total Owed</th>
                </tr>
                {users.map((user, index) => {
                    const {id, name, total_owed} = user
                    return (
                        <tr key={id}>
                            <td>{name}</td>
                            <td>{id}</td>
                            <td>£{total_owed.toFixed(2)}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
         );
    }
}
 
export default UserList;