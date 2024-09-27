import { ThemeProvider, createTheme } from '@mui/material';

import { AlertBox, ConnectForm, Header } from './components';

import './styles/App.css';

export default function App() {
    const theme = createTheme({
        typography: {
            fontFamily: 'MarkForMC',
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Header />
            <AlertBox />
            <main className='min-h-fit items-center justify-between align-middle mt-[40px] pt-12 pb-8 lg:px-24 sm:px-10'>
                <ConnectForm />
            </main>
        </ThemeProvider>
    );
}
