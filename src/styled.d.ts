import 'styled-components';

interface Shade {
  [colorName: string | number]: string;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      bg: string;
      fg: string;
      gray: Shade;
    };

    readonly font: {
      weight: {
        [Weight in 'bold' | 'regular']: string;
      };
    };
  }
}
