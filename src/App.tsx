import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { Layout } from './components'
import { Provider } from 'react-redux';
import { store } from "./redux/store"

const theme = createTheme({
  palette: { mode: 'light' },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif'
  },
  shape: { borderRadius: 12 }
})

function App() {
  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout />
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  )
}

export default App
