import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React, { ReactNode, useMemo } from "react";

interface AppContextState {

}

interface AppContextValue extends AppContextState {

}

const AppContext = React.createContext({} as AppContextValue);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {

  const theme = useMemo(() => {
    if ( getComputedStyle(document.body).color === 'rgb(255, 255, 255)' ) {
      return darkTheme
    }
    return lightTheme
  }, [])

  return (
    <AppContext.Provider
      value={{}}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export default AppContext;

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#fbc308',
    },
    mode: 'dark'
  }
})

const lightTheme = createTheme({
  palette: {
    
  }
})