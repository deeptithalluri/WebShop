
import { GraphQLClient } from "graphql-request";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const ALL_PRODUCTS_QUERY = `query products {
  allProducts {
    name
    id
    description
    price
    productId
    updatedAt
    productImage {
      url
    }
    currency
  }
}`;

const PRODUCT_QUERY = `query product($filter: ProductModelFilter) {
  product(filter: $filter) {
    id
    name
    description
    price
    currency
    productImage {
      url
    }
  }
}
`

export const getAllProducts = async () => {
  const response = await request({ query: ALL_PRODUCTS_QUERY })
  return response.allProducts
}

export const getProductById = async (id) => {
  const response = await request({
    query: PRODUCT_QUERY, variables: {
      filter: {
        id: {
          eq: id
        }
      }
    }
  })
  return response.product
}

export function request({ query, variables, preview }) {
  const endpoint = `https://graphql.datocms.com/`;
  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${publicRuntimeConfig.DATO_CMS_KEY}`
    }
  });
  return client.request(query, variables);
}