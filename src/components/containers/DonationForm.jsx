import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Fade,
  Slide,
  useMediaQuery,
  Collapse,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { theme } from '../../style/theme';
import Payment from './Payment';
import PanToolIcon from '@mui/icons-material/PanTool';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HelpOption from '../HelpCard';
import PersonTypeSwitcher from '../PersonTypeSwitcher';
import PersonalDataForm from './PersonalDataForm';
import FormButton from '../FormButton';

const schema = yup.object().shape({
  firstName: yup.string().required("Введіть ім'я"),
  lastName: yup.string().required("Введіть прізвище"),
  email: yup.string().email("Некоректний формат email").required("Введіть email"),
  country: yup.string().required("Введіть країну"),

  card1: yup.string().length(4, "4 цифри").required("Обов'язково"),
  card2: yup.string().length(4, "4 цифри").required("Обов'язково"),
  card3: yup.string().length(4, "4 цифри").required("Обов'язково"),
  card4: yup.string().length(4, "4 цифри").required("Обов'язково"),

  expiry: yup
    .string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Формат MM/YY")
    .required("Обов'язково"),

  cvv: yup
    .string()
    .matches(/^\d{3}$/, "3 цифри")
    .required("Обов'язково"),

});

const helpOptions = [
  {
    id: 1,
    icon: PanToolIcon,
    title: 'Зробити',
    description: 'Практична допомога',
    ariaLabel: 'Обрати практичну допомогу'
  },
  {
    id: 2,
    icon: AccountBalanceWalletIcon,
    title: 'Фінансова допомога',
    description: 'Грошова підтримка',
    ariaLabel: 'Обрати фінансову допомогу'
  },
  {
    id: 3,
    icon: CheckroomIcon,
    title: 'Матеріальна допомога',
    description: 'Речова підтримка',
    ariaLabel: 'Обрати матеріальну допомогу'
  },
  {
    id: 4,
    icon: FavoriteIcon,
    title: 'Волонтерство',
    description: 'Добровільна робота',
    ariaLabel: 'Обрати волонтерство'
  }
];

export default function DonationForm() {
  const [type, setType] = useState("physical");
  const [selectedCard, setSelectedCard] = useState(2);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [arrowLeft, setArrowLeft] = useState(null);
  const { control, handleSubmit, trigger, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      firstName: '', lastName: '', country: 'Україна', city: '', state: '',
      email: '', address: '', phone: '', postalCode: '',
      cardNumber: '', expiryDate: '', cvc: '', amount: 100
    }
  });

  const onSubmit = (data) => {
    console.log('Дані форми:', data);
    alert('Форму успішно відправлено! Дякуємо за допомогу.');
  };

  const handleCardClick = (id) => {
    setSelectedCard(id);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const el = document.getElementById(`help-option-${selectedCard}`);
      const parent = document.getElementById('help-options-container');

      if (el && parent) {
        const rect = el.getBoundingClientRect();
        const parentRect = parent.getBoundingClientRect();
        const center = rect.left - parentRect.left + (rect.width / 2);
        setArrowLeft(center);
      } else {
        setArrowLeft(350);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [selectedCard]);

  useEffect(() => {
    handleCardClick(selectedCard);
  }, []);

  return (
    <ThemeProvider theme={theme}>

      <Container
        maxWidth={false}
        sx={{
          maxWidth: '1400px',

          '@media (min-width: 2200px)': {
            maxWidth: '1900px',
          },
          '@media (max-width: 600px)': {
            paddingLeft: 0,
            paddingRight: 0,
          },

        }}
        role="main"
        aria-labelledby="main-form-heading"
      >
        <Fade in timeout={800}>
          <Paper
            elevation={10}
            sx={{
              borderRadius: 2,
              overflow: 'hidden',
              background: 'white',
            }}
          >
            <Box sx={{ p: { xs: 3 } }}>
              <Slide direction="down" in timeout={600}>
                <Typography
                  id="main-form-heading"
                  variant="h2"
                  align="center"
                  sx={{
                    fontFamily: 'var(--font-gilroy)',
                    fontWeight: 800,
                    mt: 1,
                    color: theme.palette.darkText.main,
                    letterSpacing: '-0.5px',
                    mb: 3,
                    fontSize: { xs: '2rem', md: '3.7rem' }
                  }}
                >
                  Заповніть форму
                </Typography>
              </Slide>
              <PersonTypeSwitcher
                type={type}
                setType={setType}
                id="person-type-switcher"
                aria-label="Перемикач типу особи"
              />

              <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mb: { xs: 1, md: 4 }, ml: { md: 14 }, mr: { md: 6 } }} aria-label="Форма надання допомоги">
                <Collapse in={type === "physical"} timeout={500}>
                  <Box
                    sx={{
                      opacity: type === "physical" ? 1 : 0,
                      transform: type === "physical" ? 'scale(1)' : 'scale(0.95)',
                      transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
                    }}
                    aria-label="Особисті дані"
                  >
                    {type === "physical" && (
                      <PersonalDataForm control={control} errors={errors} />
                    )}

                  </Box>
                </Collapse>

                <Slide direction="down" in timeout={600}>
                  <Typography
                    variant="h2"
                    align="center"
                    sx={{
                      fontFamily: 'var(--font-gilroy)',
                      fontWeight: 800,
                      mt: 1,
                      color: theme.palette.darkText.main,
                      letterSpacing: '-0.5px',
                      mb: { xs: 1, md: 3 },
                      fontSize: { xs: '2rem', md: '3.7rem' }
                    }}
                  >
                    Види допомоги
                  </Typography>
                </Slide>

                <Slide direction="down" in timeout={600}>
                  <Typography
                    variant="h6"
                    align="center"
                    sx={{
                      fontFamily: 'var(--font-gilroy)',
                      fontWeight: 300,
                      color: theme.palette.darkText.main,
                      letterSpacing: '0.5px',
                      mb: 3,
                      fontSize: '16px'
                    }}
                  >
                    Ви можете змінити вид допомоги
                  </Typography>
                </Slide>

                <Grid
                  container
                  spacing={1}
                  sx={{ paddingLeft: 2 }}
                  id="help-options-container"
                  role="radiogroup"
                  aria-labelledby="help-types-heading"
                  aria-describedby="help-description"
                >
                  {helpOptions.map((option, index) => (
                    <>
                      <Grid key={option.id} size={{ xs: 12, sm: 6, md: 3 }}>
                        <Fade in timeout={600} style={{ transitionDelay: `${index * 100}ms` }}>
                          <Box>
                            <HelpOption
                              id={`help-option-${option.id}`}
                              icon={option.icon}
                              title={option.title}
                              active={selectedCard === option.id}
                              onClick={() => handleCardClick(option.id)}
                              ariaLabel={option.ariaLabel}
                              role="radio"
                              aria-checked={selectedCard === option.id}
                            />
                          </Box>
                        </Fade>
                      </Grid>

                      {isMobile && selectedCard === option.id && option.id === 2 && (
                        <Grid item xs={12}>
                          <Payment
                            selectedMethod={2}
                            arrowPosition={arrowLeft}
                            control={control}
                            handleSubmit={handleSubmit}
                            onSubmit={onSubmit}
                            errors={errors}
                            trigger={trigger}
                          />
                        </Grid>
                      )}
                    </>
                  ))}
                </Grid>

                {!isMobile && selectedCard === 2 && (
                  <Slide
                    direction="right"
                    in={selectedCard === 2}
                    timeout={500}
                    mountOnEnter
                    unmountOnExit
                  >
                    <Box
                      sx={{ width: '100%' }}
                      aria-label="Форма оплати"
                    >
                      <Payment
                        selectedMethod={2}
                        arrowPosition={arrowLeft}
                        control={control}
                        handleSubmit={handleSubmit}
                        onSubmit={onSubmit}
                        errors={errors}
                        trigger={trigger}
                      />
                    </Box>
                  </Slide>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8, mb: 2 }}>
                  <FormButton
                    type="submit"
                    text="Допомогти"
                    aria-label="Надіслати форму допомоги"
                  />
                </Box>
              </Box>
            </Box>
          </Paper>
        </Fade>
      </Container>

    </ThemeProvider>
  );
}
