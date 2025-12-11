import React from 'react';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

export const CardInput = ({
    label,
    name,
    control,
    placeholder = '',
    type = 'text',
    maxLength,
    nextFieldName,
    trigger,
    id,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    ...props
}) => {
    const inputId = id || `${name}-input`;

    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    id={inputId}
                    aria-label={ariaLabel || label || placeholder}
                    aria-labelledby={ariaLabelledby}
                    aria-describedby={
                        error?.message ? `${inputId}-error` : ariaDescribedby
                    }
                    onChange={(e) => {
                        if (name === "expiry") {
                            let val = e.target.value.replace(/[^\d]/g, "");
                            if (val.length >= 2) {
                                val = val.substring(0, 2) + "/" + val.substring(2);

                                if (val.length >= maxLength && nextFieldName) {
                                    const nextInput = document.getElementsByName(nextFieldName);
                                    if (nextInput[0]) {
                                        nextInput[0].focus();
                                    }
                                }
                            }

                            field.onChange(val);
                            trigger(name);
                            return;
                        }

                        const value = e.target.value.replace(/\D/g, '');
                        field.onChange(value);
                        trigger(name);

                        if (value.length >= maxLength && nextFieldName) {
                            const nextInput = document.getElementsByName(nextFieldName);
                            if (nextInput[0]) {
                                nextInput[0].focus();
                            }
                        }
                    }}
                    label={label}
                    placeholder={placeholder}
                    type={type}
                    error={!!error}
                    helperText={error?.message}
                    fullWidth
                    variant="outlined"
                    size="small"
                    inputProps={{
                        maxLength,
                        type: type === 'text' ? 'tel' : type,
                        style: {
                            padding: '6px 10px',
                            height: 'auto',
                            textAlign: 'center',
                        },
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: 'white',
                            borderRadius: 1,
                            height: { xs: 38, md: 38 },
                            padding: 0,

                            '&:hover fieldset': {
                                borderColor: '#8b5fb5 !important',
                            },
                        },
                        '& .MuiOutlinedInput-input': {
                            color: '#2c3e50',
                            padding: { xs: '0 1px', md: '0 10px' },
                        },
                    }}
                    {...props}
                />
            )}
        />
    );
};