export function naiveRelativeToAbsolutePathConverter(relativePath: string): string {
  const ABSOLUTE_PATH_LEADING_SLASH = '/' as const;
  const RELATIVE_PATH_LEADING_SLASH = './';
  return relativePath.replace(RELATIVE_PATH_LEADING_SLASH, ABSOLUTE_PATH_LEADING_SLASH);
}

export function removeTrailingSlash(url: string): string {
  const TRAILING_SLASH_REGEX = /\/$/;
  const urlWithoutTrailingSlash = url.replace(TRAILING_SLASH_REGEX, '');
  return urlWithoutTrailingSlash;
}
