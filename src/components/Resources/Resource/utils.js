/*
 *  Hash encoded images to reduce memory usage in our component's state.
 *  The hash is used on the 64-bit encoded images to give them a small but
 *    unique representation in the component's state.
 */
export function hashCode(s) {
  let h;
  for (let i = 0; i < s.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    h = Math.imul(31, h) + s.charCodeAt(i) | 0;
  }
  return h;
}

/*
 *  Convert a delta to a list of hashed images.
 */
export function getImageHashesFromDelta(del) {
  return del.filter((op) => !!op.insert.image && op.insert.image.startsWith('data:image/'))
    .map((op) => hashCode(op.insert.image));
}

/*
 *  Get the difference between two arrays, including duplicates.
 *  https://stackoverflow.com/questions/39810641/get-difference-between-two-arrays-including-duplicates
 */
export function difference(a, b) {
  return [...b.reduce((acc, v) => acc.set(v, (acc.get(v) || 0) - 1),
    a.reduce((acc, v) => acc.set(v, (acc.get(v) || 0) + 1), new Map()))]
    .reduce((acc, [v, count]) => acc.concat(Array(Math.abs(count)).fill(v)), []);
}

/*
 *  Async version of Array.prototype.forEach
 */
export async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index += 1) {
    // eslint-disable-next-line no-await-in-loop
    await callback(array[index], index, array);
  }
}
