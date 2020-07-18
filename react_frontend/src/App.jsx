import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';

import * as apiRequests from './api/requests';
import Input from './components/Input';

const Container = styled.div`
  width: 100%;
  min-width: max-content;
  height: 100vh;
      display: flex;
    flex-direction: column;
    align-items: center;
`;

const TitleText = styled.h1`
  width: max-content;
`;
const AddTaskForm = styled.div`
  display: flex;
`;

function App() {
    const [ tasksData, setTaskData ] = useState([]);
    const [ description, setDescription ] = useState('');
    const [ error, setError ] = useState('');
    const handleChangeDesc = useCallback((e) => setDescription(e.target.value), []);
    
    const getAllTasks = useCallback(async () => {
        try {
            const { data } = await apiRequests.getAllTasks();
            setTaskData(data);
        } catch (e) {
            console.log({ e })
        }
    }, []);
    
    useEffect(() => {
        getAllTasks();
    }, []);
    
    return (
        <Container>
            <TitleText>Tasks manager</TitleText>
            <AddTaskForm>
                <Input value={ description } onChange={ handleChangeDesc } label="Add task" error={ error }/>
                <IconButton edge="start" aria-label="edit">
                    <AddCircleOutline/>
                </IconButton>
            </AddTaskForm>
            <List>
                { tasksData.map(({ description, task_id }) => (
                    <ListItem key={ task_id }>
                        <IconButton edge="start" aria-label="edit">
                            <EditIcon/>
                        </IconButton>
                        <ListItemText
                            primary={ description + '-' + task_id }
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete">
                                <DeleteIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )) }
            </List>
        </Container>
    );
}

export default App;
