import {useRouteError, isRouteErrorResponse} from 'react-router';
export default function CatchAll(){return <main className="error-screen"><p>VORQELIA</p><h1>Page not found</h1><a href="/">Return to world</a></main>}
export function ErrorBoundary(){const e=useRouteError(); return <main className="error-screen"><h1>{isRouteErrorResponse(e)?e.status:'Error'}</h1><a href="/">Return to world</a></main>}
