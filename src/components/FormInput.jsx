import React from 'react';
import { TextField, Fade, useTheme } from '@mui/material';
import { useController } from 'react-hook-form';

export const FormInput = ({ label, name, control, type = "text", delay = 0, fullWidth = true, helperText, 'aria-label': ariaLabel, ...props }) => {
    const theme = useTheme();
    const {
        field,
        fieldState: { error },
    } = useController({ name, control });

    return (
        <Fade in timeout={500} style={{ transitionDelay: `${delay}ms` }}>
            <TextField
                {...field}
                fullWidth={fullWidth}
                label={label}
                type={type}
                variant="standard"
                error={!!error}
                helperText={error ? error.message : helperText}
                aria-label={ariaLabel || label}
                sx={{
                    mb: error ? 0 : '24px',

                    '& .MuiInputLabel-root': {
                        position: 'static',
                        transform: 'none',
                        '&.MuiInputLabel-shrink': {
                            transform: 'none !important',
                        },

                        fontFamily: 'var(--font-geometria)',
                        fontWeight: 600,
                        color: theme.palette.lightText.main,
                        fontSize: '14px',
                        letterSpacing: '0.5px',
                        marginBottom: '-15px',

                        '&.Mui-focused': {
                            color: theme.palette.primary.main,
                        },
                    },

                    '& .MuiInputBase-root': {
                        borderRadius: '4px',
                        backgroundColor: '#f5f7f9',
                        padding: '5px 10px',

                        '&:before': { borderBottom: 'none' },
                        '&:after': { borderBottom: 'none' },

                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            backgroundColor: '#f0f2f4',
                        },
                        '&.Mui-focused': {
                            backgroundColor: 'white',
                            boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
                        },
                    },

                    '& .MuiInputBase-input': {
                        padding: 0,
                        height: 'auto',
                    },
                }}
                {...props}
            />
        </Fade>
    );
};