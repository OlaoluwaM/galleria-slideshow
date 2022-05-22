import Header from './components/Header';
import Gallery from './features/gallery/index';
import GlobalThemeProvider from './providers/theme';

export default function App() {
  return (
    <GlobalThemeProvider>
      <Header />
      <main>
        <Gallery />
      </main>
    </GlobalThemeProvider>
  );
}
