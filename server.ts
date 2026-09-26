import {createRequestHandler} from '@shopify/hydrogen/oxygen';
import * as build from 'virtual:react-router/server-build';
import {createAppLoadContext} from './app/lib/context';

export default {async fetch(request: Request, env: Env, executionContext: ExecutionContext){
 const context=await createAppLoadContext(request,env,executionContext);
 return createRequestHandler({build,getLoadContext:()=>context})(request);
}};
