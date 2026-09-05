'use client';

import { useState } from 'react';
import type { ArticleVideo } from '@/content/types';

export function YouTubeVideo({ video }: { video: ArticleVideo }) {
  const [loaded, setLoaded] = useState(false);
  const watchUrl = `https://www.youtube.com/watch?v=${video.id}`;
  return <figure className="article-video">
    <div className="video-frame">
      {loaded ? <iframe
        src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0`}
        title={video.title}
        allow="encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      /> : <div className="video-placeholder">
        <p className="eyebrow">Official gameplay video</p>
        <p>{video.title}</p>
        <button type="button" className="btn btn-outline" onClick={() => setLoaded(true)}>Load YouTube video</button>
        <small>Loading connects to YouTube. Promotional footage includes story and combat scenes.</small>
      </div>}
    </div>
    <figcaption>{video.caption} <a href={watchUrl} target="_blank" rel="noreferrer">Watch on YouTube ↗</a> · <a href={video.source.url} target="_blank" rel="noreferrer">Official source ↗</a>{loaded && <> · <button type="button" className="text-button" onClick={() => setLoaded(false)}>Unload video</button></>}</figcaption>
  </figure>;
}
