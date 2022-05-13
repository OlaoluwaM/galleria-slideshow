import Header from './components/Header';
import GlobalThemeProvider from './providers/theme';

export default function App() {
  return (
    <GlobalThemeProvider>
      <Header />
    </GlobalThemeProvider>
  );
}
