import MediaButtons from './components/MediaButton';
import GlobalThemeProvider from './providers/theme';

export default function App() {
  return (
    <GlobalThemeProvider>
      <div>
        <MediaButtons />
      </div>
    </GlobalThemeProvider>
  );
}
