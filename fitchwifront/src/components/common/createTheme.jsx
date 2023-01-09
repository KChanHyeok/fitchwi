import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#ff0456",
      // light: main값을 통해 계산됨
      // dark: main값을 통해 계산됨
      // contrastText: main값을 통해 계산됨
    },
    secondary: {
      main: "#ffd2e2",
    },
    third: {
      main: "000000",
    },
  },
});
