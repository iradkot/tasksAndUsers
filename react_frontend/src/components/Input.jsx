import React from 'react';
import TextField from '@material-ui/core/TextField';

const Input = ({ error, label, value, onChange, type, ...rest }) => {
    return (
        <TextField id={ label } value={ value } onChange={ onChange }
                   fullWidth
                   type={ type}
                   InputLabelProps={{ shrink: true }}
                   label={ label } error={ !!error } helperText={ error }
                   {...rest}
        />
    );
};

export default Input;
