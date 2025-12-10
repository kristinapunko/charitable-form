import { Button, useTheme } from '@mui/material'
import React from 'react'

const FormButton = ({ onClick, text, type = "button", 'aria-label': ariaLabel, }) => {
    const theme = useTheme();
    return (
        <Button
            type={type}
            variant="contained"
            onClick={onClick}
            sx={{
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center',
                borderRadius: 2,
                px: 12,
                py: 1,
                fontWeight: 600,
                fontSize: '20px',
                textTransform: 'none',
                background: `linear-gradient(90deg, ${theme.palette.customGradient.start} 0%, ${theme.palette.customGradient.end} 100%)`,
                boxShadow: '0 4px 20px rgba(255, 75, 92, 0.3)',
                color: 'white',
                transition: 'all 0.3s ease',
                '&:hover': {
                    background: 'linear-gradient(90deg, #ff5e6e 0%, #9b6fc5 100%)',
                    boxShadow: '0 8px 30px rgba(255, 75, 92, 0.4)',
                },
                '&:focus-visible': {
                    outline: `2px solid ${theme.palette.primary.main}`,
                    outlineOffset: '2px',
                }
            }}
            aria-label={ariaLabel || text}
        >
            {text}
        </Button>
    )
}

export default FormButton
