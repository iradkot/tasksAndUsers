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
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

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

const ListItemComponents = ({ description, task_id, isEdited, setEditedItem, handleEditItem, handleDeleteItem }) => {
    const [descValue, setDescValue] = useState(description);
    const [ error, setError ] = useState('');
    const handleEditDescValue = useCallback((e) => setDescValue(e.target.value), []);
    const handleCancelPress = useCallback(() => {
        setDescValue(description);
        setEditedItem('')
    }, []);
    
    const LeftIcon = isEdited ? DoneIcon : EditIcon;
    const LeftCallback = isEdited ? () => handleEditItem({task_id, description: descValue}) : () => setEditedItem(task_id);
    const RightIcon = isEdited ? CloseIcon : DeleteIcon;
    const RightCallback = isEdited ? handleCancelPress : () => handleDeleteItem(task_id);
    return (
        <ListItem key={ task_id }>
            <IconButton edge="start" aria-label="edit" onClick={ LeftCallback }>
                <LeftIcon/>
            </IconButton>
            { isEdited ?
                <Input value={ descValue } onChange={ handleEditDescValue } error={ error }/>
                : <ListItemText
                    primary={ description + '-' + task_id }
                /> }
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={ RightCallback }>
                    <RightIcon/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}


function App() {
    const [ tasksData, setTaskData ] = useState([]);
    const [ editedItem, setEditedItem ] = useState('');
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
    
    const addTask = useCallback(async () => {
        try {
            const { data } = await apiRequests.addATask({ description });
            console.log({ data })
            await getAllTasks();
            setDescription('');
        } catch (e) {
            console.log({ e })
        }
    }, [ description ]);
    
    useEffect(() => {
        getAllTasks();
    }, []);
    
    const handleDeleteItem = useCallback(async (task_id) => {
        try {
            await apiRequests.deleteATask({ id: task_id });
            await getAllTasks();
        } catch (e) {
            console.log({ e });
        }
    }, []);
    
    const handleEditItem = useCallback(async ({ task_id, description }) => {
        try {
            await apiRequests.editATask({ description, id: task_id });
            await getAllTasks();
            setEditedItem('');
        } catch (e) {
            console.log({ e });
        }
    }, []);
    
    return (
        <Container>
            <TitleText>Tasks manager</TitleText>
            <AddTaskForm>
                <Input value={ description } onChange={ handleChangeDesc } label="Add task" error={ error }/>
                <IconButton aria-label="edit" onClick={ addTask }>
                    <AddCircleOutline/>
                </IconButton>
            </AddTaskForm>
            <List style={{ width: '80%' }}>
                { tasksData.map(({ description, task_id }) => (
                    <ListItemComponents description={ description } task_id={ task_id } key={ task_id }
                                        isEdited={ editedItem === task_id } handleDeleteItem={ handleDeleteItem }
                                        handleEditItem={ handleEditItem } setEditedItem={ setEditedItem }
                    />
                )) }
            </List>
        </Container>
    );
}

export default App;
