/**
 * Output stuff to the console.
 *
 * @param {string} message
 */
export function log(message: string): void {
  console.info(`\x1b[35m[${process.env.APP_NAME}] ${message}`);
}

/**
 * Trims slashes from a path.
 *
 * @param {string} path
 *
 * @return {string}
 */
export function stripSlashes(path: string): string {
  if (path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  if (path.startsWith('/')) {
    path = path.substring(1);
  }

  return path;
}
