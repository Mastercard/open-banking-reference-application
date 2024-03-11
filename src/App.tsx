import { ThemeProvider, createTheme } from '@mui/material';
import Header from './components/Header/Header';
import Modal from './components/Modal/Modal';
import './styles/App.css';
import ConnectForm from './components/ConnectForm/ConnectForm';

export default function App() {
    const theme = createTheme({
        typography: {
            fontFamily: 'MarkForMC',
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Header />
            <Modal />
            <main className='min-h-fit items-center justify-between align-middle mt-[40px] pt-12 pb-8 lg:px-24 sm:px-10'>
                <ConnectForm />
            </main>
        </ThemeProvider>
    );
}
