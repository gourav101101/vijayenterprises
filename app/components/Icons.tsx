export function Arrow({ diagonal = false, className = '' }: { diagonal?: boolean; className?: string }) {
  return <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? 'M5 19 19 5M5 5h14v14' : 'M4 12h16m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.5" /></svg>;
}
export function ServiceIcon({ type, size=28 }: { type:string; size?:number }) {
  return <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">{type === 'bolt' ? <path d="m18 3-12 16h9l-1 10 12-17h-9z"/> : type === 'tower' ? <><path d="m9 29 7-21 7 21M11 23h10M13 17h6M16 8v-5M7 5a12 12 0 0 0 0 15M25 5a12 12 0 0 1 0 15M11 8a7 7 0 0 0 0 9M21 8a7 7 0 0 1 0 9"/></> : type === 'sun' ? <><circle cx="16" cy="16" r="6"/><path d="M16 2v5m0 18v5M2 16h5m18 0h5M6 6l4 4m12 12 4 4M6 26l4-4M22 10l4-4"/></> : <><path d="m3 11 13-7 13 7-13 7zM3 17l13 7 13-7M3 23l13 7 13-7"/></>}</svg>;
}
