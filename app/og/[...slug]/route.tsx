import { routeTitle, getRouteKeys } from '@/lib/routes';
import { makeOg } from '@/lib/og';
export const dynamic='force-static';
export const dynamicParams=false;
export function generateStaticParams(){return getRouteKeys().map(key=>({slug:key.split('/')}));}
export async function GET(_request:Request,{params}:{params:Promise<{slug:string[]}>}){return makeOg(routeTitle((await params).slug.join('/')));}
