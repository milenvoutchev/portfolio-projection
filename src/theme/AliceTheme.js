import { createTheme } from '@material-ui/core/styles';

const AliceTheme = createTheme({
    palette: {
        primary: {
            light: '#6BC0C5',
            main: '#1ebea5',
            dark: '#0A7C6A',
            contrastText: '#fff',
        },
        common: {
            portfolio: "#8884d8",
            contributions: "#ffc658",
            returns: "#82ca9d",
        },
    },
});

export default AliceTheme;
