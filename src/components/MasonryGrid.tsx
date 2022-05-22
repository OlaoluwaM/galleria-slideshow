// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import { toDecimalInt, generateRandomId, concatenateClassNames } from '../utils';
import { Dispatch, SetStateAction, useEffect, useState, Children } from 'react';

type ColCount = number;
type Breakpoint = number;

type BreakpointColMap = {
  [Key in Breakpoint | 'default']: ColCount;
};
type BreakpointColMapWithoutDefault = Omit<BreakpointColMap, 'default'>;

interface MasonryProps {
  children: JSX.Element[];
  breakpointColMap: BreakpointColMap;
  customClassNames?: {
    wrapper?: string;
    columns?: string;
  };
}

const DEFAULT_CUSTOM_CLASS_NAMES = {
  wrapper: '',
  columns: '',
};

export default function Masonry(props: MasonryProps) {
  const {
    children,
    breakpointColMap,
    customClassNames = DEFAULT_CUSTOM_CLASS_NAMES,
  } = props;

  const { default: initialColCount, ...otherBreakpointColMap } = breakpointColMap;
  const [currentColCount, setColCount] = useState<ColCount>(initialColCount);

  useEffect(() => {
    let requestAnimationFrameHandle: number;

    const handleColCountCalculation = syncStateWithNewColCount.bind(
      null,
      setColCount,
      otherBreakpointColMap
    );

    window.addEventListener('resize', () => {
      requestAnimationFrameHandle = window.requestAnimationFrame(
        handleColCountCalculation
      );
    });

    return () => {
      window.removeEventListener('resize', handleColCountCalculation);
      window.cancelAnimationFrame(requestAnimationFrameHandle);
    };
  }, []);

  const childrenInColumns = calculateColumnForChildren(currentColCount, children);

  const masonryWrapperClassNames = concatenateClassNames(
    'masonry-wrapper',
    customClassNames.wrapper!
  );

  const columnClassNames = concatenateClassNames(
    'masonry-column',
    customClassNames.columns!
  );

  return (
    <div className={masonryWrapperClassNames}>
      {childrenInColumns.map((columnOfChildren, colIndex) => (
        <div className={columnClassNames} key={generateRandomId(colIndex)}>
          {columnOfChildren}
        </div>
      ))}
    </div>
  );
}

Masonry.propType = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  breakpointColMap: PropTypes.shape({ default: PropTypes.number }).isRequired,
  customClassNames: PropTypes.shape({
    wrapper: PropTypes.string,
    columns: PropTypes.string,
  }),
};

Masonry.defaultProps = {
  customClassNames: DEFAULT_CUSTOM_CLASS_NAMES,
};

function calculateColumnForChildren(currentColCount: ColCount, children: JSX.Element[]) {
  const arrOfColumns = Array.from({ length: currentColCount }, () => [] as JSX.Element[]);

  Children.forEach(children, (child, childIndex) => {
    const childDestinationColumnIndex = childIndex % arrOfColumns.length;
    arrOfColumns[childDestinationColumnIndex].push(child);
  });

  return arrOfColumns;
}

function syncStateWithNewColCount(
  colCountStateSetter: Dispatch<SetStateAction<ColCount>>,
  breakpointsColMap: BreakpointColMapWithoutDefault
) {
  const newColCount = calculateColumnCount(breakpointsColMap);
  colCountStateSetter(newColCount);
}

function calculateColumnCount(
  breakpointsColMap: BreakpointColMapWithoutDefault
): ColCount {
  const breakpointValues = getBreakpointValuesFromMap(breakpointsColMap);
  const indexOfMatchingBreakpoint = calculateIndexOfMatchingBreakpoint(breakpointValues);

  const matchingBreakpoint = breakpointValues.at(indexOfMatchingBreakpoint)!;
  const colCount = breakpointsColMap[matchingBreakpoint];

  return colCount;
}

function getBreakpointValuesFromMap(
  breakpointsColMap: BreakpointColMapWithoutDefault
): Breakpoint[] {
  // Sorting makes things easier to reason about
  const breakpointValues = Object.keys(breakpointsColMap)
    .sort((a, b) => toDecimalInt(a) - toDecimalInt(b))
    .map(toDecimalInt);

  return breakpointValues;
}

function calculateIndexOfMatchingBreakpoint(breakpointValues: Breakpoint[]): number {
  const breakpointMediaQueries = breakpointValues.map(convertBreakpointToMediaQueryMatch);
  const indexOfMatchingBreakpoint = breakpointMediaQueries.findIndex(
    queryMatch => queryMatch === true
  );

  const NOT_FOUND = -1;
  const indexOfLargestBreakpoint = -1;

  return indexOfMatchingBreakpoint === NOT_FOUND
    ? indexOfLargestBreakpoint
    : indexOfMatchingBreakpoint;
}

function convertBreakpointToMediaQueryMatch(breakpointValue: Breakpoint): boolean {
  const mediaQuery = window.matchMedia(`(max-width: ${breakpointValue}px)`);
  const isMediaQuerySatisfied = mediaQuery.matches;
  return isMediaQuerySatisfied;
}
