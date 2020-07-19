import React, { useState, useCallback } from 'react';
import Users from './pages/Users';
import Tasks from './pages/Tasks';

const App = () => {
    const [ selectedUser, setSelectedUser ] = useState('');
    const handleSelectingUser = useCallback((userId) => {
        setSelectedUser(userId);
    }, []);
    if(selectedUser) return <Tasks selectedUser={selectedUser} />
    return <Users handleSelectingUser={handleSelectingUser} />
}

export default App
