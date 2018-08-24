import { GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'Property',
  description: 'A property',
  fields: () => ({
    address: {
      type: GraphQLString,
      description: 'the address of the property',
      resolve: ({ address }) => address,
    },
    id: {
      type: GraphQLString,
      description: 'the unique id of the property',
      resolve: ({ id }) => id,
    },
    location: {
      type: GraphQLString,
      description: 'The longitude and latitude of the property',
      resolve: ({ location }) => `${location.long}:${location.lat}`,
    },
  }),
});
