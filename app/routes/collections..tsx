import type {LoaderFunctionArgs} from 'react-router';
import {useLoaderData, Link} from 'react-router';

const QUERY=`#graphql\nquery Collection($handle:String!){collection(handle:$handle){title description products(first:24){nodes{id title handle featuredImage{url altText width height} priceRange{minVariantPrice{amount currencyCode}}}}}}`;
export async function loader({params,context}:LoaderFunctionArgs){
 const handle=params.handle==='all' ? 'all' : params.handle!;
 const data=await context.storefront.query(QUERY,{variables:{handle}}).catch(()=>null);
 return {collection:data?.collection ?? null, handle};
}
export default function Collection(){const {collection,handle}=useLoaderData<typeof loader>(); return <main className="collection-page"><div className="collection-head"><p className="eyebrow">SHOP / {handle}</p><h1>{collection?.title ?? 'All products'}</h1><p>{collection?.description ?? 'A living catalog connected to Shopify.'}</p></div><div className="product-grid">{collection?.products.nodes?.map((p:any)=><Link className="product-card" key={p.id} to={`/products/${p.handle}`}><div className="product-media">{p.featuredImage&&<img src={p.featuredImage.url} alt={p.featuredImage.altText||p.title}/>}</div><div><h2>{p.title}</h2><p>{p.priceRange.minVariantPrice.currencyCode} {Number(p.priceRange.minVariantPrice.amount).toFixed(2)}</p></div></Link>)}</div></main>}
