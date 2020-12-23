import React, { Component } from 'react';
import {List, Header} from 'semantic-ui-react';

class GroupsList extends Component {
    render() { 
        const {groups} = this.props;
        return ( 
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Members</th>
                        <th>ID</th>
                    </tr>
                {groups.map((group, index) => { 
                    return (
                        <tr key={group.id}>
                            <td>{group.name}</td>
                            <td>{group.members.map(member => {return <p key={member.name} style={{display:"inline"}}>{member.name} </p>})}</td>
                            <td>{group.id}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
         );
    }
}
 
export default GroupsList;