import { Grid, Fade, Box, Button, useTheme } from "@mui/material";
import { FormInput } from "../FormInput";
import { useRef } from "react";

export default function PersonalDataForm({ control, errors }) {
    const theme = useTheme();
    const inputRef = useRef();

    const handleClick = () => {
        inputRef.current.click();
    };

    const handleChange = (event) => {
        const files = Array.from(event.target.files);
    };
    return (
        <Grid container spacing={4} sx={{ mb: 6 }}>
            <Grid size={{ xs: 12, md: 5 }} >
                <Grid container spacing={1}>
                    <Grid size={{ xs: 6 }}>
                        <FormInput
                            label="Ім'я"
                            name="firstName"
                            control={control}
                            delay={100}
                            rules={{ required: "Ім'я обов'язкове" }}
                            nextFieldName="lastName"
                        />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <FormInput
                            label="Фамілія"
                            name="lastName"
                            control={control}
                            delay={150}
                            rules={{ required: "Фамілія обов'язкова" }}
                            nextFieldName="company"
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <FormInput
                            label="Назва компанії, організація"
                            name="company"
                            control={control}
                            delay={200}
                            nextFieldName="email"
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <FormInput
                            label="Email-адрес"
                            name="email"
                            type="email"
                            control={control}
                            delay={300}
                            rules={{
                                required: "Email обов'язковий",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Невірний формат email"
                                }
                            }}
                            nextFieldName="phone"
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <FormInput
                            label="Номер телефону"
                            name="phone"
                            type="tel"
                            control={control}
                            delay={250}
                            nextFieldName="country"
                        />
                    </Grid>
                    
                </Grid>

            </Grid>

            <Grid
                size={{ xs: 12, md: 2 }}
                sx={{
                    display: 'flex',
                    alignItems: 'start'
                }}
            >
                <Fade in timeout={600} style={{ transitionDelay: '350ms' }}>
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'start',
                            pt: { md: '70%' },
                        }}
                    >

                        <input
                            ref={inputRef}
                            id="logo-upload"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleChange}
                        />
                        <Button
                            sx={{
                                color: theme.palette.primary.main,
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '14px',
                                p: 0,
                                letterSpacing: '0.5px',
                            }}
                            disableRipple
                            onClick={handleClick}
                            aria-label="Завантажити логотип"
                        >
                            + Логотип
                        </Button>
                    </Box>
                </Fade>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
                <Grid container spacing={1}>

                    <Grid size={{ xs: 12 }}>
                        <FormInput
                            label="Країна"
                            name="country"
                            control={control}
                            delay={400}
                            nextFieldName="city"
                        />
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                        <FormInput
                            label="Місто"
                            name="city"
                            control={control}
                            delay={450}
                            nextFieldName="state"
                        />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <FormInput
                            label="Штат, район"
                            name="state"
                            control={control}
                            delay={500}
                            nextFieldName="address"
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <FormInput
                            label="Адреса"
                            name="address"
                            control={control}
                            delay={600}
                            nextFieldName="postalCode"
                        />
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                        <FormInput
                            label="Поштовий індекс"
                            name="postalCode"
                            control={control}
                            delay={550}
                        />
                    </Grid>
                </Grid>
            </Grid>

        </Grid>
    );
}


