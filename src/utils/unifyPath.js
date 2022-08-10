// Discard leading and trailing slashes
export const unifyPath = (path) => {
  return path.replace(/\/$/, '').replace(/^\//, '')
}
