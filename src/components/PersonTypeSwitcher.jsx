import { Box, Button, useTheme } from "@mui/material";
import React from "react";

export default function PersonTypeSwitcher({ type, setType, 'aria-label': ariaLabel, id }) {
    const theme = useTheme();

    const isPhysicalActive = type === "physical";
    const isLegalActive = type === "legal";
    const handleKeyDown = (event, targetType) => {

        if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault();
            if (setType) {
                setType(targetType);
                announceSelection(targetType);
            }
        }
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            if (setType) {
                setType("physical");
                announceSelection("physical");
            }
        }

        if (event.key === 'ArrowRight') {
            event.preventDefault();
            if (setType) {
                setType("legal");
                announceSelection("legal");
            }
        }
    }
    return (
        <Box
            id={id}
            role="radiogroup"
            aria-label={ariaLabel || "Тип особи"}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: { xs: 2, md: 6 },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    borderRadius: '4px',
                    border: `2px solid ${theme.palette.darkText.main}`,
                    overflow: 'hidden',
                    boxShadow: '0 2px 5px rgba(44, 62, 80, 0.1)',
                }}
            >
                <Button
                    disableRipple
                    aria-checked={isPhysicalActive}
                    tabIndex={isPhysicalActive ? 0 : -1}
                    onClick={() => setType("physical")}
                    onKeyDown={(e) => handleKeyDown(e, "physical")}
                    sx={{
                        fontFamily: 'var(--font-geometria)',
                        textTransform: 'none',
                        fontWeight: 300,
                        fontSize: '15px',
                        px: 2,
                        borderRadius: 0,
                        backgroundColor: isPhysicalActive ? theme.palette.darkText.main : 'white',
                        color: isPhysicalActive ? 'white' : theme.palette.darkText.main,
                        transition: 'background-color 0.3s ease',
                        borderRight: '2px solid white',
                        '&:hover': {
                            backgroundColor: '#1a242f',
                            color: 'white',
                            boxShadow: 'none',
                        },
                        '&:focus-visible': {
                            outline: `2px solid ${theme.palette.primary.main}`,
                            outlineOffset: '2px',
                        }
                    }}
                    aria-label="Фізична особа"
                >
                    Фіз. особа
                </Button>

                <Button
                    disableRipple
                    role="radio"
                    aria-checked={isLegalActive}
                    tabIndex={isLegalActive ? 0 : -1}
                    onClick={() => setType("legal")}
                    onKeyDown={(e) => handleKeyDown(e, "legal")}
                    sx={{
                        fontFamily: 'var(--font-geometria)',
                        textTransform: 'none',
                        fontWeight: 300,
                        fontSize: '15px',
                        px: 2,
                        borderRadius: 0,
                        backgroundColor: isLegalActive ? theme.palette.darkText.main : 'white',
                        color: isLegalActive ? 'white' : theme.palette.darkText.main,
                        transition: 'background-color 0.3s ease',
                        '&:hover': {
                            backgroundColor: '#1a242f',
                            color: 'white',
                            boxShadow: 'none',
                        },
                        '&:focus-visible': {
                            outline: `2px solid ${theme.palette.primary.main}`,
                            outlineOffset: '2px',
                        }
                    }}
                    aria-label="Юридична особа"
                >
                    Юр. особа
                </Button>
            </Box>
        </Box>
    );
}

