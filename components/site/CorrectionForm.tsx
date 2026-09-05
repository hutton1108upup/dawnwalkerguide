'use client';
import { useEffect, useState } from 'react';
import { track } from '@/lib/events';
export function CorrectionForm() {
  const [path,setPath]=useState(''); const [details,setDetails]=useState('');const [message,setMessage]=useState('');
  useEffect(()=>{setPath(new URLSearchParams(window.location.search).get('page')?.slice(0,300)||'');},[]);
  function prepare(event:React.FormEvent) { event.preventDefault(); const text=`Dawnwalker Guide — correction report\nPage: ${path}\n\nObservation and source:\n${details}\n\nPrepared: ${new Date().toISOString()}\n`;const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download='dawnwalker-correction.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);setMessage('Report downloaded. Nothing has been sent.');track('incorrect_report',{action:'local_download'}); }
  return <form className="report-form" onSubmit={prepare}><label>Page or topic<input className="input" required maxLength={300} value={path} onChange={e=>setPath(e.target.value)} placeholder="For example: /guides/time-limit/"/></label><label>What should be corrected?<textarea required minLength={10} maxLength={5000} value={details} onChange={e=>setDetails(e.target.value)} placeholder="Include the platform, game version, what happened, and a source URL if available."/></label><button type="submit" className="btn btn-primary">Download correction report</button><p role="status" className="muted">{message}</p></form>;
}
