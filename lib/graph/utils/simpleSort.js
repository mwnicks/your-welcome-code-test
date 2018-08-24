import { sortBy } from 'lodash';

const simpleSort = ({ properties, sortKey = 'address' }) =>
  sortBy(properties, p => p[sortKey]);

export default simpleSort;
