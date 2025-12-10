import React from 'react';
import { Card, Box, Typography, useTheme } from '@mui/material';

const HelpOption = ({
    icon: Icon,
    title,
    active = false,
    onClick,
    'aria-label': ariaLabel,
}) => {
    const theme = useTheme();

    const iconBackgroundColor = theme.palette.lightBorder.main
    const borderColor = theme.palette.lightBorder.main

    const handleKeyDown = (event) => {
        if (event.key === ' ' || event.key === 'Enter') {
          event.preventDefault();
          if (!disabled && onClick) {
            onClick(event);
          }
        }
      };
    return (
        <Card
            onClick={onClick}
            onKeyDown={handleKeyDown}
             aria-label={ariaLabel || title}
            sx={{
                cursor: 'pointer',
                border: 'none',
                transition: 'all 0.3s ease',
                boxShadow: 'none',
                display: 'flex',
                alignItems: 'center',
                p: { xs: 0.5, md: 1.5 },
                '&:hover': { transform: 'scale(1.05)' },
            }}
        >
            <Box
                sx={{
                    width: { xs: '60px', lg: '80px' },
                    height: { xs: '60px', lg: '80px' },
                    minWidth: { xs: '60px', lg: '80px' },
                    minHeight: { xs: '60px', lg: '80px' },
                    flexShrink: 0,
                    borderRadius: 3,
                    backgroundColor: active ? '#8b5fb5' : 'white',
                    border: active ? 'none' : `2px solid ${borderColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                    transition: 'all 0.3s ease',
                }}
            >
                <Icon sx={{ fontSize: { xs: 20, lg: 38 }, color: active ? 'white' : iconBackgroundColor }} />
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontWeight: 800,
                        color: active ? '#2c3e50' : '#b3c3e7',
                        fontSize: { xs: '12px', lg: '18px' },
                        lineHeight: 1.2,
                    }}
                >
                    {title}
                </Typography>
            </Box>
        </Card>

    );
};

export default HelpOption;