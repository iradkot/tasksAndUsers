import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Input from './components/Input';

const Container = styled.div`
  width: 100%;;
  height: 100vh;
  display: grid;
  justify-content: center;
  
`;

const TitleText = styled.h1`
  width: max-content;
`;

function App() {
    const [ description, setDescription ] = useState('');
    const [ error, setError ] = useState('');
    const handleChangeDesc = useCallback((e) => setDescription(e.target.value), [])
    return (
        <Container>
            <TitleText>Tasks manager</TitleText>
            <Input value={ description } onChange={ handleChangeDesc } label="Add task" error={error}/>
        </Container>
    );
}

export default App;
