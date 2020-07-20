import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
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

import * as apiRequests from '../api/requests';
import Input from '../components/Input';

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

const ListItemComponents = ({ name, status, task_id, isEdited, setEditedItem, handleEditItem, handleDeleteItem, statuses }) => {
    const [ nameValue, setNameValue ] = useState(name);
    const [ statusValue, setStatusValue ] = useState(status);
    const [ error, setError ] = useState('');
    const handleEditNameValue = useCallback((e) => setNameValue(e.target.value), []);
    const handleEditStatusValue = useCallback((e) => setStatusValue(e.target.value), []);
    const handleCancelPress = useCallback(() => {
        setNameValue(name);
        setStatusValue(status);
        setEditedItem('')
    }, []);
    
    const LeftIcon = isEdited ? DoneIcon : EditIcon;
    const LeftCallback = isEdited ? () => handleEditItem({ task_id, name: nameValue }) : () => setEditedItem(task_id);
    const RightIcon = isEdited ? CloseIcon : DeleteIcon;
    const RightCallback = isEdited ? handleCancelPress : () => handleDeleteItem(task_id);
    return (
        <ListItem key={ task_id }>
            <IconButton edge="start" aria-label="edit" onClick={ LeftCallback }>
                <LeftIcon/>
            </IconButton>
            <div style={ { flex: 1 } }>
                { isEdited ?
                    <Input value={ nameValue } onChange={ handleEditNameValue } error={ error }/>
                    : <ListItemText
                        primary={ name }
                    /> }
            </div>
            <div style={ { flex: 1 } }>
                { isEdited ?
                    <Input defaultValue={ statusValue } onChange={ handleEditStatusValue } error={ error } select SelectProps={{
                        native: true,
                    }}>
                        {statuses.map((status) => (
                            <option key={status.name} value={status.name}>
                                {status.name}
                            </option>
                        ))}
                    </Input>
                    : <ListItemText
                        primary={ statusValue }
                    /> }
            </div>
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={ RightCallback }>
                    <RightIcon/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}


function Tasks() {
    const { userId } = useParams();
    const [ tasksData, setTaskData ] = useState([]);
    const [ statuses, setStatuses ] = useState([]);
    const [ editedItem, setEditedItem ] = useState('');
    const [ name, setName ] = useState('');
    const [ error, setError ] = useState('');
    const handleChangeName = useCallback((e) => setName(e.target.value), []);
    
    const getUserTasks = useCallback(async () => {
        try {
            const { data } = await apiRequests.getUserTasks(userId);
            setTaskData(data);
        } catch (e) {
            console.log({ e })
        }
    }, []);
    
    const getTasksStatuses = useCallback(async () => {
        try {
            const { data } = await apiRequests.getTasksStatuses();
            setStatuses(data);
        } catch (e) {
            console.log({ e })
        }
    }, []);
    
    const addTask = useCallback(async () => {
        try {
            const { data } = await apiRequests.addATask({ name });
            await getUserTasks();
            setName('');
        } catch (e) {
            console.log({ e })
        }
    }, [ name ]);
    
    useEffect(() => {
        getUserTasks();
        getTasksStatuses();
    }, []);
    
    const handleDeleteItem = useCallback(async (task_id) => {
        try {
            await apiRequests.deleteATask({ id: task_id });
            await getUserTasks();
        } catch (e) {
            console.log({ e });
        }
    }, []);
    
    const handleEditItem = useCallback(async ({ task_id, name }) => {
        try {
            await apiRequests.editATask({ name, id: task_id });
            await getUserTasks();
            setEditedItem('');
        } catch (e) {
            console.log({ e });
        }
    }, []);
    
    return (
        <Container>
            <TitleText>Tasks manager</TitleText>
            <AddTaskForm>
                <Input value={ name } onChange={ handleChangeName } label="Add task" error={ error }/>
                <IconButton aria-label="edit" onClick={ addTask }>
                    <AddCircleOutline/>
                </IconButton>
            </AddTaskForm>
            <List style={ { width: '80%' } }>
                { tasksData.sort(({ task_id }, { task_id: task_id2 }) => task_id - task_id2).map(({ name, status, task_id }) => (
                    <ListItemComponents name={ name } status={ status } task_id={ task_id } key={ task_id }
                                        isEdited={ editedItem === task_id } handleDeleteItem={ handleDeleteItem }
                                        handleEditItem={ handleEditItem } setEditedItem={ setEditedItem } statuses={statuses}
                    />
                )) }
            </List>
        </Container>
    );
}

export default Tasks;
