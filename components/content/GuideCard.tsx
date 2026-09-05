import Link from 'next/link';
import type { Article } from '@/content/types';
import { VerifiedBadge } from './Trust';
export function GuideCard({ article }: { article: Article }) { return <Link href={`/${article.category}/${article.slug}/`} className="guide-card"><VerifiedBadge status={article.verificationStatus}/><h3>{article.title}</h3><p>{article.description}</p><div className="card-meta">Reviewed {article.updated} <span aria-hidden="true">·</span> {article.category === 'fixes' ? 'Performance' : 'Guide'}</div></Link>; }
