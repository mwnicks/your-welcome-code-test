const ascOrder = 'asc';

function chunk(str) {
  const chunkedStr = [];
  let x = 0;
  let y = -1;
  let n = 0;
  let i;
  let j;

  while (i = (j = str.charAt(x)).charCodeAt(0)) {
    const m = (i === 46 || (i >= 48 && i <= 57));
    if (m !== n) {
      chunkedStr[y += 1] = '';
      n = m;
    }
    chunkedStr[y] += j;
    x += 1;
  }
  return chunkedStr;
}

function naturalCompare(a, b) {
  const chunkedA = chunk(a);
  const chunkedB = chunk(b);

  for (let x = 0; chunkedA[x] && chunkedB[x]; x += 1) {
    if (chunkedA[x] !== chunkedB[x]) {
      const c = Number(chunkedA[x]);
      const d = Number(chunkedB[x]);
      if (!isNaN(c) && !isNaN(d)) {
        return c - d;
      }
      return (chunkedA[x] > chunkedB[x]) ? 1 : -1;
    }
  }
  return chunkedA.length - chunkedB.length;
}

const naturalSort = ({ properties, sortKey = 'address', sortOrder = ascOrder }) =>
  properties.sort((a, b) => {
    if (sortOrder === ascOrder) {
      return naturalCompare(a[sortKey], b[sortKey]);
    }
    return naturalCompare(b[sortKey], a[sortKey]);
  });

export default naturalSort;
