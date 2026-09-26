import type {LoaderFunctionArgs} from 'react-router';
import {useLoaderData} from 'react-router';
import {InteractiveWorld} from '../components/InteractiveWorld';

const QUERY = `#graphql
  query HomeProducts($country: CountryCode, $language: LanguageCode) @inContext(country: $country, language: $language) {
    products(first: 8, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        id
        title
        handle
        featuredImage { url altText width height }
        priceRange { minVariantPrice { amount currencyCode } }
      }
    }
  }
`;

export async function loader({context}: LoaderFunctionArgs) {
  const data = await context.storefront.query(QUERY).catch((error: Error) => {
    console.error('VORQELIA home catalog:', error);
    return {products: {nodes: []}};
  });
  return {products: data.products.nodes};
}

export default function Index() {
  const {products} = useLoaderData<typeof loader>();
  return <InteractiveWorld products={products} />;
}
