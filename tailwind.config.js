const designTokens = require('./src/configs/design-tokens.json');

function mapDesignTokenFontSizes() {
  const { sizes: fontSizes } = designTokens.font;
  const sizeNames = Object.keys(fontSizes);

  const fontSizesMap = sizeNames.reduce((finalObj, sizeName) => {
    const currentFontSizeInfo = fontSizes[sizeName];
    const otherSizeProperties = pickObjPropsToAnotherObj(
      currentFontSizeInfo,
      ['value'],
      true
    );

    // eslint-disable-next-line no-param-reassign
    finalObj[sizeName] = [currentFontSizeInfo.value, { ...otherSizeProperties }];
    return finalObj;
  }, {});

  return fontSizesMap;
}

function pickObjPropsToAnotherObj(initialObject, targetProperties, excludeProperties) {
  const desiredPropertyKeys = extractSetFromCollection(
    Object.keys(initialObject),
    targetProperties,
    excludeProperties
  );

  const objWithDesiredProperties = desiredPropertyKeys.reduce((filteredObj, propName) => {
    // eslint-disable-next-line no-param-reassign
    filteredObj[propName] = initialObject[propName];
    return filteredObj;
  }, {});

  return objWithDesiredProperties;
}

function extractSetFromCollection(collectionOne, collectionTwo, excludeSubset = false) {
  return collectionOne.filter(elem => {
    const elemIsInSubset = collectionTwo.includes(elem);
    return excludeSubset ? !elemIsInSubset : elemIsInSubset;
  });
}

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: designTokens.color,
      fontFamily: {
        primary: [designTokens.font.family, 'sans-serif'],
      },
      fontSizes: mapDesignTokenFontSizes(),
      weight: designTokens.font.weights,
    },
  },
  plugins: [],
};
