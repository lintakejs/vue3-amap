export function guid() {
  return Date.now().toString(10) + '' + Math.random().toString(10).substr(2, 5);
}