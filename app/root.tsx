import type {LinksFunction, LoaderFunctionArgs, MetaFunction} from 'react-router';
import {Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteError, isRouteErrorResponse} from 'react-router';
import {Layout} from './components/Layout';
import styles from './styles/app.css?url';

export const links: LinksFunction = () => [{rel: 'stylesheet', href: styles}];
export const meta: MetaFunction = () => [
  {title: 'VORQELIA — Commerce, reimagined'},
  {name: 'description', content: 'An interactive commerce world built with React, Hydrogen and real-time 3D product experiences.'},
];

export async function loader({context}: LoaderFunctionArgs) { return {shop: context.storefront ? true : false}; }

export default function App() {
  return <html lang="en"><head><Meta/><Links/></head><body><Layout><Outlet/></Layout><ScrollRestoration/><Scripts/><LiveReload/></body></html>;
}

export function ErrorBoundary() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : 'Unexpected storefront error';
  return <main className="error-screen"><p>VORQELIA</p><h1>{message}</h1><a href="/">Return to world</a></main>;
}
