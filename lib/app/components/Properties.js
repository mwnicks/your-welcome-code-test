import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Relay from 'react-relay';
import { Property } from './';

const ascOrder = 'asc';
const descOrder = 'desc';

const idKey = 'id';
const addressKey = 'address';

export class PropertiesList extends Component {
  constructor(props) {
    super(props);
    this.handleKeyChange = this.handleKeyChange.bind(this);
    this.handleOrderChange = this.handleOrderChange.bind(this);
  }

  handleKeyChange(event) {
    const updateSortKey = this.props.updateSortKey;
    updateSortKey(event.target.value);
  }

  handleOrderChange(event) {
    const updateSortOrder = this.props.updateSortOrder;
    updateSortOrder(event.target.value);
  }

  renderCurrentFilters() {
    const { sortKey, sortOrder } = this.props;
    return (
      <p className="info">
        Sorting by: {sortKey} {sortOrder}
      </p>
    );
  }

  renderSortKey() {
    const sortKey = this.props.sortKey;
    console.log(sortKey); // eslint-disable-line no-console
    return (
      <div className="sort-key control">
        <p className="lead">
          Select Sort Key
        </p>

        <form>
          <input
            type="radio"
            value={`${idKey}`}
            checked={sortKey === idKey}
            onChange={this.handleKeyChange}
          />
          <span className="label">{idKey}</span>

          <input
            type="radio"
            value={`${addressKey}`}
            checked={sortKey === addressKey}
            onChange={this.handleKeyChange}
          />
          <span className="label">{addressKey}</span>
        </form>
      </div>
    );
  }

  renderSortOrder() {
    const sortOrder = this.props.sortOrder;
    console.log(sortOrder); // eslint-disable-line no-console
    return (
      <div className="sort-order control">
        <p className="lead">
          Select Sort Order
        </p>

        <form>
          <input
            type="radio"
            value={`${ascOrder}`}
            checked={sortOrder === ascOrder}
            onChange={this.handleOrderChange}
          />
          <span className="label">{ascOrder}</span>

          <input
            type="radio"
            value={`${descOrder}`}
            checked={sortOrder === descOrder}
            onChange={this.handleOrderChange}
          />
          <span className="label">{descOrder}</span>
        </form>
      </div>
    );
  }

  render() {
    const { viewer } = this.props;
    return (
      <div className="propertiesIndex">
        <div className="column-1 controls">
          {this.renderSortKey()}
          {this.renderSortOrder()}
        </div>

        <ul className="column-2 properties-list">
          <h1>Available Properties</h1>
          {this.renderCurrentFilters()}
          {viewer.properties.map((p, i) => <Property key={i} property={p} />)}
        </ul>
      </div>
    );
  }
}

export default Relay.createContainer(PropertiesList, {
  initialVariables: {
    sortKey: null,
    sortOrder: null,
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        properties(sortKey: $sortKey, sortOrder: $sortOrder) {
          ${Property.getFragment('property')}
        }
      }
    `,
  },
});

PropertiesList.propTypes = {
  sortKey: PropTypes.oneOf(['address', 'id']).isRequired,
  sortOrder: PropTypes.oneOf([ascOrder, descOrder]).isRequired,
  updateSortKey: PropTypes.func.isRequired,
  updateSortOrder: PropTypes.func.isRequired,
  viewer: PropTypes.object.isRequired,
};
