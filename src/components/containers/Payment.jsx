import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Grid, Typography, Fade, useTheme } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PaymentIcon from '@mui/icons-material/Payment';
import { PaymentMethodCard } from '../PaymentMethodCard';
import { CardInput } from '../CardInput';

const paymentMethods = [
  {
    id: 1,
    icon: <CreditCardIcon />,
    title: 'VISA',
    subtitle: 'Карта Visa/MasterCard',
    bgColor: '#d5e3f0',
    ariaLabel: 'Обрати спосіб оплати Visa/MasterCard',
  },
  {
    id: 2,
    title: 'Приват24',
    subtitle: 'Приват24',
    bgColor: '#8b5fb5',
    ariaLabel: 'Обрати спосіб оплати Приват24',
  },
  {
    id: 3,
    icon: <PhoneAndroidIcon />,
    subtitle: 'Термінали України',
    bgColor: '#d5e3f0',
    ariaLabel: 'Обрати спосіб оплати через Термінали України',
  },
  {
    id: 4,
    icon: <AccountBalanceWalletIcon />,
    title: 'WebMoney',
    subtitle: 'WebMoney',
    bgColor: '#d5e3f0',
    logoAfterTitle: true,
    ariaLabel: 'Обрати спосіб оплати WebMoney',
  },
  {
    id: 5,
    icon: <PaymentIcon />,
    subtitle: 'PayPal',
    bgColor: '#d5e3f0',
    ariaLabel: 'Обрати спосіб оплати PayPal',
  },
];

export default function Payment({ arrowPosition, control, handleSubmit, onSubmit, errors, trigger }) {
  const theme = useTheme();
  const [selectedMethod, setSelectedMethod] = useState(2);
  const [focusedMethod, setFocusedMethod] = useState(null);

  const handleKeyDown = (event, methodId) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setSelectedMethod(methodId);
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        py: 1,
        px: 0,
        '@media (min-width: 600px)': {
          px: 0,
        },
      }}
      aria-label="Форма оплати"
    >
      <Box
        sx={{
          border: '1px solid',
          borderColor: theme.palette.lightBorder.main,
          borderRadius: 3,
          py: 1,
          px: 2,
          backgroundColor: 'white',
          position: 'relative',
          boxShadow: '0 8px 32px rgba(102, 126, 234, 0.15)',

          '&::before, &::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            width: 0,
            height: 0,
            left: { lg: arrowPosition ? `${arrowPosition}px` : '134px' },
            transform: 'translate(-50%, -100%)',
            zIndex: 10,

          },

          '&::before': {
            borderLeft: { lg: '15px solid transparent' },
            borderRight: { lg: '15px solid transparent' },
            borderBottom: { lg: `15px solid ${theme.palette.lightBorder.main}` },

          },

          '&::after': {
            transform: { lg: 'translate(-50%, -92%)' },
            borderLeft: { lg: '15px solid transparent' },
            borderRight: { lg: '15px solid transparent' },
            borderBottom: { lg: '15px solid white' },
          }

        }}
      >
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6, lg: 7 }}>
            <Typography
              variant="h6"
              sx={{
                m: 1,
                textAlign: { xs: 'center', md: 'left' },
                fontFamily: 'var(--font-geometria)',
                fontWeight: 600,
                color: theme.palette.lightText.main,
                fontSize: '14px',
                letterSpacing: '0.5px',
              }}
              id="payment-methods-heading"
            >
              Спосіб оплати
            </Typography>

            <Grid
              container
              spacing={2}
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              role="group"
              aria-labelledby="payment-methods-heading"
            >
              {paymentMethods.map((method, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={4}
                  key={method.id}
                >
                  <Fade in timeout={400} style={{ transitionDelay: `${index * 50}ms` }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <PaymentMethodCard
                        icon={method.icon}
                        title={method.title}
                        subtitle={method.subtitle}
                        logoAfterTitle={method.logoAfterTitle}
                        active={selectedMethod === method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        onFocus={() => setFocusedMethod(method.id)}
                        onBlur={() => setFocusedMethod(null)}
                        onKeyDown={(e) => handleKeyDown(e, method.id)}
                        ariaLabel={method.ariaLabel}
                        ariaPressed={selectedMethod === method.id}
                        isFocused={focusedMethod === method.id}
                        tabIndex="0"
                        role="button"
                      />
                    </Box>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 5 }}>
            <Fade in timeout={600} style={{ transitionDelay: '300ms' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: { xs: 'center', md: 'flex-end' },
                  width: '100%',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: { xs: 'center', md: 'right' },
                    width: { xs: '100%', sm: '330px' },
                    maxWidth: '330px',
                    fontFamily: 'var(--font-geometria)',
                    fontWeight: 600,
                    color: theme.palette.lightText.main,
                    fontSize: '14px',
                    letterSpacing: '0.5px',
                    mb: 2,
                    pr: { md: 4, sm: 0 },
                    '@media (min-width: 900px)': {
                      textAlign: 'left',
                    },
                  }}
                  id="payment-details-heading"
                >
                  Введіть наступні дані
                </Typography>

                <Box
                  sx={{
                    width: { xs: '100%', sm: '330px' },
                    maxWidth: '330px',
                    background: theme.palette.lightBorder.main,
                    borderRadius: 3,
                    p: 2,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                  }}
                  role="form"
                  aria-labelledby="payment-details-heading"
                >
                  <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'white',
                        fontWeight: 500,
                        mb: 0.5,
                        fontSize: '14px'
                      }}
                      id="card-number-label"
                    >
                      Номер карти
                    </Typography>
                    <Box sx={{
                      display: 'flex',
                      gap: 1,
                    }}>
                      <CardInput
                        name="card1"
                        control={control}
                        placeholder="0000"
                        maxLength={4}
                        nextFieldName="card2"
                        trigger={trigger}
                        aria-label="Перші 4 цифри номера картки"
                        inputMode="numeric"
                        pattern="[0-9]{4}"
                      />
                      <CardInput
                        name="card2"
                        control={control}
                        placeholder="0000"
                        maxLength={4}
                        nextFieldName="card3"
                        trigger={trigger}
                        aria-label="Другі 4 цифри номера картки"
                        inputMode="numeric"
                        pattern="[0-9]{4}"
                      />
                      <CardInput
                        name="card3"
                        control={control}
                        placeholder="0000"
                        maxLength={4}
                        nextFieldName="card4"
                        trigger={trigger}
                        aria-label="Треті 4 цифри номера картки"
                        inputMode="numeric"
                        pattern="[0-9]{4}"
                      />
                      <CardInput
                        name="card4"
                        control={control}
                        placeholder="0000"
                        maxLength={4}
                        nextFieldName="expiry"
                        trigger={trigger}
                        aria-label="Останні 4 цифри номера картки"
                        inputMode="numeric"
                        pattern="[0-9]{4}"
                      />
                    </Box>

                    <Box sx={{
                      display: 'flex',
                      gap: { xs: 2, sm: 6 },
                      mt: { xs: 1, md: 3 },
                    }}>
                      <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: { xs: '1 1 100%', sm: '1' }
                      }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'white',
                            fontWeight: 500,
                            mb: 0.5,
                            fontSize: '14px'
                          }}
                          id="expiry-label"
                        >
                          Термін дії
                        </Typography>
                        <CardInput
                          name="expiry"
                          control={control}
                          placeholder="MM/YY"
                          maxLength={5}
                          trigger={trigger}
                          id="expiry-input"
                          aria-labelledby="expiry-label"
                        />
                      </Box>

                      <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: { xs: '1 1 100%', sm: '1' }
                      }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'white',
                            fontWeight: 500,
                            mb: 0.5,
                            fontSize: '14px'
                          }}
                          id="cvv-label"
                        >
                          CVC/CVV
                        </Typography>
                        <CardInput
                          name="cvv"
                          control={control}
                          placeholder="***"
                          type="password"
                          maxLength={3}
                          id="cvv-input"
                          aria-labelledby="cvv-label"
                          aria-describedby={errors.cvv ? "cvv-error" : undefined}
                          inputMode="numeric"
                          pattern="[0-9]{3}"
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Fade>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}