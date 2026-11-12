const CACHE="nrp-2306549c";
const SHELL=["./","index.html","manifest.webmanifest","icons/icon-192.png","icons/icon-512.png","icons/apple-touch-icon.png","icons/favicon-32.png"];
const CDN=[];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL).then(()=>Promise.all(CDN.map(u=>fetch(u,{mode:"cors"}).then(r=>r.ok&&c.put(u,r)).catch(()=>{}))))));self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  const r=e.request; if(r.method!=="GET") return;
  const u=new URL(r.url);
  if(r.mode==="navigate"){ e.respondWith(fetch(r).then(res=>{const c=res.clone(); caches.open(CACHE).then(x=>x.put("index.html",c)); return res;}).catch(()=>caches.match("index.html"))); return; }
  if(u.origin===location.origin || /cdn\.jsdelivr\.net|fonts\.(googleapis|gstatic)\.com/.test(u.host)){
    e.respondWith(caches.match(r).then(hit=>{ const net=fetch(r).then(res=>{ if(res && (res.ok||res.type==="opaque")) caches.open(CACHE).then(x=>x.put(r,res.clone())); return res; }).catch(()=>hit); return hit||net; }));
  }
});
