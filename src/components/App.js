import { ThemeProvider } from "@material-ui/styles";

import Header from "./ui/Header.component";

import theme from "./ui/Theme";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Header />
		</ThemeProvider>
	);
}

export default App;
