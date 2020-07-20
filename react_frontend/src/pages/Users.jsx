import React, { useCallback, useEffect, useState } from 'react';
import { Link, } from "react-router-dom";
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
const AddUserForm = styled.div`
  display: flex;
`;

const ListItemComponents = ({ userData, user_id, isEdited, setEditedItem, handleEditItem, handleDeleteItem }) => {
    const [ editedUserData, setEditedUserData ] = useState(userData);
    const [ error, setError ] = useState('');
    const handleEditUserData = (dataKey) => (e) => {
        setEditedUserData({ ...editedUserData, [dataKey]: e.target.value });
    };
    const handleCancelPress = useCallback(() => {
        setEditedUserData(userData);
        setEditedItem('')
    }, []);
    
    const LeftIcon = isEdited ? DoneIcon : EditIcon;
    const LeftCallback = isEdited ? () => handleEditItem({
        user_id,
        newUserObject: editedUserData
    }) : () => setEditedItem(user_id);
    const RightIcon = isEdited ? CloseIcon : DeleteIcon;
    const RightCallback = isEdited ? handleCancelPress : () => handleDeleteItem(user_id);
    return (
        <ListItem key={ user_id }>
            <IconButton edge="start" aria-label="edit" onClick={ LeftCallback }>
                <LeftIcon/>
            </IconButton>
            { Object.keys(editedUserData).map((key) =>
                <div style={ { flex: 1 } }>
                    { isEdited ?
                        <Input value={ editedUserData[key] }
                               type={ key === 'birth_date' ? 'date' : key === 'email' ? 'email' : 'text' }
                               onChange={ handleEditUserData(key) } error={ error }/>
                        : <ListItemText
                            primary={ `${ editedUserData[key] }` }
                        /> }
                </div>
            ) }
            { !isEdited && <Link to={ `/tasks/${ user_id }` }>Go to tasks</Link> }
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={ RightCallback }>
                    <RightIcon/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

const emptyUserObj = { email: null, name: null, surname: null, birth_date: null }

function Users() {
    const [ usersData, setUserData ] = useState([]);
    const [ editedItem, setEditedItem ] = useState('');
    const [ newUserObject, setNewUserObject ] = useState(emptyUserObj);
    const [ error, setError ] = useState('');
    const handleChangeNewUserInput = (keyName) => (e) => setNewUserObject({
        ...newUserObject,
        [keyName]: e.target.value
    });
    
    const getAllUsers = useCallback(async () => {
        try {
            const { data } = await apiRequests.getAllUsers();
            setUserData(data);
        } catch (e) {
            console.log({ e })
        }
    }, []);
    
    const addUser = useCallback(async () => {
        try {
            const { data } = await apiRequests.addAUser(newUserObject);
            await getAllUsers();
            setNewUserObject({ ...emptyUserObj });
        } catch (e) {
            console.log({ e })
        }
    }, [ newUserObject ]);
    
    useEffect(() => {
        getAllUsers();
    }, []);
    
    const handleDeleteItem = useCallback(async (user_id) => {
        try {
            await apiRequests.deleteAUser({ id: user_id });
            await getAllUsers();
        } catch (e) {
            console.log({ e });
        }
    }, []);
    
    const handleEditItem = useCallback(async ({ user_id, newUserObject }) => {
        try {
            await apiRequests.editAUser({ newUserObject, id: user_id });
            await getAllUsers();
            setEditedItem('');
        } catch (e) {
            console.log({ e });
        }
    }, []);
    
    return (
        <Container>
            <TitleText>Users manager</TitleText>
            <AddUserForm>
                { Object.keys(newUserObject).map((key) =>
                    <Input key={ key } type={ key === 'birth_date' ? 'date' : key === 'email' ? 'email' : 'text' }
                           value={ newUserObject[key] || '' } onChange={ handleChangeNewUserInput(key) } label={ key }
                           error={ error }/>) }
                <IconButton aria-label="edit" onClick={ addUser }>
                    <AddCircleOutline/>
                </IconButton>
            </AddUserForm>
            <List style={ { width: '80%' } }>
                { usersData.sort(({ user_id }, { user_id: user_id2 }) => user_id - user_id2).map(({ user_id, ...userData }) => (
                    <ListItemComponents userData={ userData } user_id={ user_id } key={ user_id }
                                        isEdited={ editedItem === user_id } handleDeleteItem={ handleDeleteItem }
                                        handleEditItem={ handleEditItem } setEditedItem={ setEditedItem }
                    />
                )) }
            </List>
        </Container>
    );
}

export default Users
