import React, { useCallback, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Users from './pages/Users';
import Tasks from './pages/Tasks';

const App = () => {
    const [ selectedUser, setSelectedUser ] = useState('');
    const handleSelectingUser = useCallback((userId) => {
        setSelectedUser(userId);
    }, []);
    return (
        <Router>
            <Switch>
                <Route path="/tasks/:userId">
                    <Tasks/>
                </Route>
                <Route path="/">
                    <Users/>
                </Route>
            </Switch>
        </Router>
    )
}

export default App
