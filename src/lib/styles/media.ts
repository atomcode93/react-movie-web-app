import { css, ThemedCssFunction } from 'styled-components';

const sizes = {
  desktop: 1920,
  laptop: 1366,
  tablet: 1123,
  smallTablet: 900,
  phone: 776,
  smallPhone: 480,
};

export const media = (Object.keys(sizes) as (keyof typeof sizes)[]).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css.call(undefined, ...args)};
    }
  `;
  return acc;
}, {} as { [key in keyof typeof sizes]: ThemedCssFunction<any> },
);
