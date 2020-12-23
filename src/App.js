import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import GroupsList from './components/myGroups';
import GroupForm from './components/GroupForm';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';
import UserDebts from './components/UserDebts';
import NavBar from './components/NavBar';

function App() {
  const [groups, setGroups]  = useState([]);
  const [users, setUsers]  = useState([]);
  const [transactions, setTransactions]  = useState([]);

  // Fetch data from postgres database to store in state
  useEffect(() => {
    fetch('/groups').then(response => response.json().then(data => {
      setGroups(data.groups);
    }));

  }, []);

  useEffect(() => {
    fetch('/users').then(response => response.json().then(data => {
      setUsers(data.users);
    }));

  }, []);

  useEffect(() => {
    fetch('/transactions').then(response => response.json().then(data => {
      setTransactions(data.transactions);
    }));

  }, []);


  // Display all the compenents
  return (
    <div className="grid-container">
      <div className="navbar"><NavBar /></div>
      <div className="groups">
        <h1>Groups</h1>
        <GroupForm />
        <GroupsList groups={groups}/>
      </div>
      <div className="users">
        <h1>Users</h1>
        <UserForm />
        <UserList users={users}/>
        <UserDebts users={users}/>
      </div>
      <div className="transaction-form">
        <h1>New Transaction</h1>
      <TransactionForm onNewTransaction={transaction => setTransactions(currentTransactions => [...currentTransactions, transaction])}/>
      </div>
      <div className="transaction-list">
        <h1>Previous Transactions</h1>
      <TransactionList className="transaction-list" transactions={transactions}/>
      </div>
    </div>
  );
}

export default App;


