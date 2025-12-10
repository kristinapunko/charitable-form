import React from 'react';
import { Card, Box, Typography, useTheme } from '@mui/material';

export const PaymentMethodCard = ({
    icon: IconComponent,
    title,
    subtitle,
    active = false,
    onClick,
    logoAfterTitle = false,
    'aria-label': ariaLabel,
    isFocused, 
    onFocus,
    onBlur,
    onKeyDown,
    role,
    tabIndex,
    ariaPressed,
}) => {
    const theme = useTheme();
    const activeBgColor = theme.palette.secondary.main;  
    const inactiveBgColor = theme.palette.lightBorder.main; 

    const renderIcon = () => {
        if (!IconComponent) return null;

        if (typeof IconComponent === 'string') {
            return (
                <Box
                    component="img"
                    src={IconComponent}
                    alt={title || subtitle}
                    sx={{
                        height: 30,
                        width: 30,
                    }}
                />
            );
        }

        if (React.isValidElement(IconComponent)) {
            return React.cloneElement(IconComponent, { 
                sx: { 
                    color: 'white', 
                    fontSize: 30 
                } 
            });
        }
        
        return null;
    };
    const hasSubtitle = title && subtitle;

    return (
        <Card
            onClick={onClick}
            aria-label={ariaLabel}
            tabIndex={tabIndex || 0} 
            role={role || 'button'}
            aria-pressed={ariaPressed}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            sx={{
                cursor: 'pointer',
                borderRadius: 2,
                backgroundColor: active ? activeBgColor : inactiveBgColor,
                border: 'none',
                transition: 'all 0.3s ease',
                boxShadow: active
                    ? '0 6px 20px rgba(139, 95, 181, 0.3)'
                    : '0 2px 8px rgba(0,0,0,0.05)',
                width: { xs: '100%', sm: '145px' },
                height: '60px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',   
                p: 1.5,
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: active
                        ? '0 8px 24px rgba(139, 95, 181, 0.4)'
                        : '0 4px 12px rgba(0,0,0,0.1)',
                },
                '&:focus-visible': {
                    outline: `2px solid ${theme.palette.primary.main}`, 
                    outlineOffset: '2px',
                },
            }}
        >
            <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: 1,
                width: '100%',
            }}>
                {IconComponent && !logoAfterTitle && renderIcon()}

                {(title) && (
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontWeight: 600,
                            fontSize: '18px',
                            lineHeight: 1.1,
                            color: 'white',
                            textAlign: 'center',
                            flex: (!IconComponent || hasSubtitle) ? 'initial' : 1,
                        }}
                    >
                        {title}
                    </Typography>
                )}

                {IconComponent && logoAfterTitle && renderIcon()}
            </Box>

            { subtitle && (
                <Typography
                    variant="body2"
                    sx={{
                        fontSize: '12px',
                        color: 'rgba(255,255,255,0.9)',
                        lineHeight: 1,
                        mt: 0.5,
                        textAlign: 'center',
                        width: '100%',
                    }}
                >
                    {subtitle}
                </Typography>
            )}
        </Card>
    );
};