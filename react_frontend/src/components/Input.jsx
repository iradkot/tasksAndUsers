import React from 'react';
import TextField from '@material-ui/core/TextField';

const Input = ({ error, label, value, onChange }) => (
    <TextField id={ label } value={ value } onChange={ onChange }
               label={ label } error={ !!error } helperText={ error }/>
);

export default Input;
