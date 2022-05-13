import PropTypes from 'prop-types';
import designTokens from '../configs/design-tokens.json';

import { isOptional } from '../types';
import { useEffect, useState } from 'react';
import { includedInCollection, objSet } from '../utils';
import { LS_THEME_KEY, THEME_ATTRIBUTE } from '../constants';
import { ThemeProvider, DefaultTheme as StyleGuide } from 'styled-components';

type ThemeVariant = 'dark' | 'light';

type ColorThemes = {
  readonly [Key in ThemeVariant]: StyleGuide['color'];
};

type ThemeUpdaterFn = (newThemeChoice: ThemeVariant) => void;

const incompleteStyleGuide: isOptional<StyleGuide, 'color'> = {
  font: {
    weight: designTokens.font.weights,
  },
};

const colorThemes: ColorThemes = {
  light: designTokens.color,
  dark: {
    bg: designTokens.color.fg,
    fg: designTokens.color.bg,
    gray: designTokens.color.gray,
  },
};

interface GlobalThemeProviderProps {
  children: JSX.Element;
}
export default function GlobalThemeProvider({
  children,
}: GlobalThemeProviderProps): JSX.Element {
  const [selectedTheme, setSelectedTheme] = useState<ThemeVariant>(getDefaultTheme);

  useEffect(() => {
    const { themeObserver, themeObserverTarget, themeObserverConfig } =
      createThemeObserver(setSelectedTheme);

    themeObserver.observe(themeObserverTarget, themeObserverConfig);

    return () => {
      themeObserver.disconnect();
    };
  }, []);

  // NOTE: This can be memoized fi necessary
  const completeStyleGuide = generateStyleGuideWithSelectedTheme(selectedTheme);

  return <ThemeProvider theme={completeStyleGuide}>{children}</ThemeProvider>;
}

GlobalThemeProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

interface ThemeObserverComponents {
  themeObserver: MutationObserver;
  themeObserverConfig: MutationObserverInit;
  themeObserverTarget: HTMLHtmlElement;
}
function createThemeObserver(
  themeStateUpdaterFn: ThemeUpdaterFn
): ThemeObserverComponents {
  const themeObserverTarget = getThemeNode();
  const themeObserverConfig = getThemeObserverConfig();
  const augmentedThemeStateUpdater =
    themeStateUpdaterWithMutationData(themeStateUpdaterFn);

  const themeObserver = new MutationObserver(augmentedThemeStateUpdater);
  return { themeObserver, themeObserverTarget, themeObserverConfig };
}

function getThemeObserverConfig(): MutationObserverInit {
  const observerConfig: MutationObserverInit = {
    attributeFilter: [THEME_ATTRIBUTE],
  };

  return observerConfig;
}

function generateStyleGuideWithSelectedTheme(
  selectedTheme: ThemeVariant = 'light'
): StyleGuide {
  const selectedPalette = colorThemes[selectedTheme];
  const styleGuideWithSelectedPalette = objSet(
    incompleteStyleGuide,
    'color',
    selectedPalette
  );

  return styleGuideWithSelectedPalette as Readonly<StyleGuide>;
}

function themeStateUpdaterWithMutationData(
  themeSetter: ThemeUpdaterFn
): MutationCallback {
  return (mutationRecords: MutationRecord[]) => {
    const recordOfLatestThemeMutation = mutationRecords[0];
    const targetNode = recordOfLatestThemeMutation.target as HTMLHtmlElement;

    const newThemeValue = targetNode.getAttribute(THEME_ATTRIBUTE);
    if (!newThemeValue || !isThemeVariantString(newThemeValue)) return;
    themeSetter(newThemeValue);
  };
}

function getDefaultTheme(): ThemeVariant {
  let lastChosenThemeVariant = getPersistedThemeChoice();
  if (!lastChosenThemeVariant) lastChosenThemeVariant = getUserThemePreference();
  return updateTheme(lastChosenThemeVariant);
}

function getPersistedThemeChoice(): ThemeVariant | null {
  const valueInLS = localStorage.getItem(LS_THEME_KEY);
  if (!valueInLS) return null;

  const isThemeVariant = isThemeVariantString(valueInLS);
  if (isThemeVariant) return valueInLS;
  return null;
}

function isThemeVariantString(str: string): str is ThemeVariant {
  const valuesAllowed = ['dark', 'light'] as const;
  const doesStrMatchAllowedValues = includedInCollection(valuesAllowed, str);
  return doesStrMatchAllowedValues;
}

function getUserThemePreference(): ThemeVariant {
  const defaultThemeVariant: ThemeVariant = 'light';
  const browserSupportsDarkMode = isDarkModeSupported();
  if (!browserSupportsDarkMode) return defaultThemeVariant;

  const userPrefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (userPrefersDarkTheme) return 'dark';
  return 'light';
}

function isDarkModeSupported(): boolean {
  const NO_DARK_MODE_SUPPORT = 'not all';
  const browserSupportsDarkMode =
    window.matchMedia('(prefers-color-scheme)').media !== NO_DARK_MODE_SUPPORT;

  return browserSupportsDarkMode;
}

export function updateTheme(newThemeChoice: ThemeVariant): ThemeVariant {
  const themeNode: HTMLHtmlElement = getThemeNode();
  themeNode.setAttribute(THEME_ATTRIBUTE, newThemeChoice);

  persistCurrentTheme(newThemeChoice);
  return newThemeChoice;
}

function getThemeNode(): HTMLHtmlElement {
  const themeNode = document.querySelector('html')!;
  return themeNode;
}

function persistCurrentTheme(currentTheme: ThemeVariant): void {
  localStorage.setItem(LS_THEME_KEY, currentTheme);
}
