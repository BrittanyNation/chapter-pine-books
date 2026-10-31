
const BOOKS=[
 {id:'salt-road',title:'The Salt Road Home',author:'Maren Ellison',genre:'Fiction',rating:4.8,pages:342,badge:'Staff pick',blurb:'A ferry captain returns to her island hometown to save the family bakery and face the brother she left behind.',prices:{Paperback:16,Hardcover:27,Ebook:8},hue:'#7A2E3A'},
 {id:'midnight-atlas',title:'A Midnight Atlas',author:'Theo Castellan',genre:'Fiction',rating:4.6,pages:388,badge:'New in',blurb:'Two mapmakers in rival cities draw the same impossible island on the same night.',prices:{Paperback:17,Hardcover:28,Ebook:9},hue:'#22304A'},
 {id:'garden-small-hours',title:'The Garden in Small Hours',author:'June Okafor',genre:'Poetry',rating:4.9,pages:112,badge:'Staff pick',blurb:'Quiet poems about night gardens, grief, and starting again in spring.',prices:{Paperback:14,Hardcover:22,Ebook:7},hue:'#5B7553'},
 {id:'how-bridges-stand',title:'How Bridges Stand',author:'Priya Raman',genre:'Nonfiction',rating:4.7,pages:296,badge:'Book club',blurb:'The hidden engineering inside the bridges we cross every day, told in plain words.',prices:{Paperback:19,Hardcover:30,Ebook:11},hue:'#8A6D3B'},
 {id:'clockwork-fox',title:'The Clockwork Fox',author:'Wren Halloway',genre:'Kids',rating:4.9,pages:184,badge:'Ages 8 to 12',blurb:'A young inventor and a mechanical fox race to repair the town clock before the harvest fair.',prices:{Paperback:11,Hardcover:19,Ebook:6},hue:'#B65D2E'},
 {id:'field-notes-migration',title:'Field Notes on Migration',author:'Alma Reyes',genre:'Nonfiction',rating:4.5,pages:264,badge:'New in',blurb:'A season following birds, rivers, and the people who watch over both.',prices:{Paperback:18,Hardcover:29,Ebook:10},hue:'#3F6B6F'},
 {id:'paper-lanterns',title:'Paper Lanterns Over Elm Street',author:'Sofia Lindqvist',genre:'Fiction',rating:4.4,pages:318,badge:'Book club',blurb:'Three neighbours, one street festival, and the letters they finally send.',prices:{Paperback:16,Hardcover:26,Ebook:8},hue:'#8C4A6B'},
 {id:'little-baker-moon',title:'The Little Baker of Moon Lane',author:'Wren Halloway',genre:'Kids',rating:4.8,pages:96,badge:'Picture book',blurb:'A small baker who only works by moonlight learns to share her mornings. For ages 4 to 8.',prices:{Paperback:10,Hardcover:18,Ebook:5},hue:'#445E8A'},
 {id:'verses-for-commuters',title:'Verses for the Morning Train',author:'June Okafor',genre:'Poetry',rating:4.3,pages:88,badge:'New in',blurb:'Short poems sized for one train ride each, about cities waking up.',prices:{Paperback:12,Hardcover:20,Ebook:6},hue:'#6B5B8A'},
];
const KEY='chapterPineCartV1', WKEY='chapterPineWishV1';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const money=n=>'$'+n.toFixed(2);
function getCart(){try{return JSON.parse(localStorage.getItem(KEY))||[]}catch(e){return[]}}
function setCart(c){localStorage.setItem(KEY,JSON.stringify(c));renderCartCount();renderDrawer();}
function getWish(){try{return JSON.parse(localStorage.getItem(WKEY))||[]}catch(e){return[]}}
function setWish(w){localStorage.setItem(WKEY,JSON.stringify(w))}
function cartCount(){return getCart().reduce((a,i)=>a+i.qty,0)}
function cartSubtotal(){return getCart().reduce((a,i)=>{const b=BOOKS.find(x=>x.id===i.id);return a+(b?b.prices[i.format]*i.qty:0)},0)}
function renderCartCount(){$$('.cart-count').forEach(e=>e.textContent=cartCount())}
function toast(msg){const t=$('#toast');if(!t)return;t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)}
function addToCart(id,format,qty){const c=getCart();const ex=c.find(i=>i.id===id&&i.format===format);if(ex)ex.qty+=qty;else c.push({id,format,qty});setCart(c);toast('Added to your bag');}
// Shop page
let genre='All',query='',sort='featured';
function renderShop(){
 const el=$('#book-grid');if(!el)return;
 let list=BOOKS.filter(b=>(genre==='All'||b.genre===genre)&&(b.title+' '+b.author).toLowerCase().includes(query.toLowerCase()));
 if(sort==='price-low')list=[...list].sort((a,b)=>a.prices.Paperback-b.prices.Paperback);
 if(sort==='price-high')list=[...list].sort((a,b)=>b.prices.Paperback-a.prices.Paperback);
 if(sort==='title')list=[...list].sort((a,b)=>a.title.localeCompare(b.title));
 if(sort==='rating')list=[...list].sort((a,b)=>b.rating-a.rating);
 $('#result-count').textContent=list.length+' book'+(list.length===1?'':'s')+' found';
 el.innerHTML=list.length?list.map(b=>{const w=getWish().includes(b.id);return `<article class="card"><div class="cover" style="background:${b.hue}"><span>${b.title}</span></div><div class="card-body"><span class="badge">${b.badge}</span><h3>${b.title}</h3><div class="author">by ${b.author} · ${b.genre} · ★ ${b.rating}</div><p>${b.blurb}</p><div class="price">from ${money(b.prices.Paperback)}</div><div class="card-actions"><button class="btn small" data-add="${b.id}">Add paperback</button><button class="btn small alt" style="background:#fff;border:1px solid var(--navy);color:var(--navy)" data-view="${b.id}">Details</button><button class="wish" data-wish="${b.id}" aria-pressed="${w}">${w?'♥ Saved':'♡ Save'}</button></div></div></article>`}).join(''):'<div class="empty">No books match that search. Try a different title, author, or genre.</div>';
 el.querySelectorAll('[data-add]').forEach(btn=>btn.onclick=()=>addToCart(btn.dataset.add,'Paperback',1));
 el.querySelectorAll('[data-view]').forEach(btn=>btn.onclick=()=>openModal(btn.dataset.view));
 el.querySelectorAll('[data-wish]').forEach(btn=>btn.onclick=()=>{let w=getWish();if(w.includes(btn.dataset.wish))w=w.filter(x=>x!==btn.dataset.wish);else w.push(btn.dataset.wish);setWish(w);renderShop();});
}
function openModal(id){const b=BOOKS.find(x=>x.id===id);if(!b)return;const m=$('#modal');$('#modal-title').textContent=b.title;$('#modal-meta').textContent=`by ${b.author} · ${b.genre} · ${b.pages} pages · ★ ${b.rating}`;$('#modal-blurb').textContent=b.blurb;const sel=$('#modal-format');sel.innerHTML=Object.entries(b.prices).map(([f,p])=>`<option value="${f}">${f} — ${money(p)}</option>`).join('');$('#modal-price').textContent=money(b.prices.Paperback);sel.onchange=()=>$('#modal-price').textContent=money(b.prices[sel.value]);$('#modal-add').onclick=()=>{addToCart(id,sel.value,parseInt($('#modal-qty').value,10)||1);closeModal();};m.classList.add('open');}
function closeModal(){$('#modal')?.classList.remove('open')}
// Drawer
function renderDrawer(){const d=$('#drawer-items');if(!d)return;const c=getCart();if(!c.length){d.innerHTML='<p>Your bag is empty.</p>';}else{d.innerHTML=c.map((i,idx)=>{const b=BOOKS.find(x=>x.id===i.id);return `<p><b>${b.title}</b> (${i.format})<br>${money(b.prices[i.format])} × ${i.qty} = <b>${money(b.prices[i.format]*i.qty)}</b> <button data-dec="${idx}">−</button> <button data-inc="${idx}">+</button> <button data-rem="${idx}">Remove</button></p>`}).join('');}const st=$('#drawer-total');if(st)st.textContent=money(cartSubtotal());d.querySelectorAll('[data-inc]').forEach(b=>b.onclick=()=>{const c=getCart();c[+b.dataset.inc].qty++;setCart(c);renderShop&&0});d.querySelectorAll('[data-dec]').forEach(b=>b.onclick=()=>{const c=getCart();c[+b.dataset.dec].qty=Math.max(0,c[+b.dataset.dec].qty-1);setCart(c.filter(x=>x.qty>0))});d.querySelectorAll('[data-rem]').forEach(b=>b.onclick=()=>{setCart(getCart().filter((_,i)=>i!==+b.dataset.rem))});}
document.addEventListener('DOMContentLoaded',()=>{
 renderCartCount();renderShop();renderDrawer();
 $$('.chip').forEach(ch=>ch.onclick=()=>{$$('.chip').forEach(x=>x.setAttribute('aria-pressed','false'));ch.setAttribute('aria-pressed','true');genre=ch.dataset.genre;renderShop();});
 $('#search')?.addEventListener('input',e=>{query=e.target.value;renderShop()});
 $('#sort')?.addEventListener('change',e=>{sort=e.target.value;renderShop()});
 $('#open-cart')?.addEventListener('click',()=>{$('#drawer').classList.add('open');renderDrawer()});
 $('#close-cart')?.addEventListener('click',()=>$('#drawer').classList.remove('open'));
 $('#drawer')?.addEventListener('click',e=>{if(e.target.id==='drawer')$('#drawer').classList.remove('open')});
 $('#close-modal')?.addEventListener('click',closeModal);
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();$('#drawer')?.classList.remove('open')}});
 // Cart page
 renderCartPage();
 $('#checkout-form')?.addEventListener('submit',onCheckout);
 $('#promo-apply')?.addEventListener('click',applyPromo);
 // Newsletter / visit forms
 $('#newsletter-form')?.addEventListener('submit',e=>{e.preventDefault();const em=$('#nl-email').value.trim();const err=$('#nl-err');if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)){err.textContent='Please enter a valid email address.';return}err.textContent='';$('#nl-ok').textContent='You are on the list. Your first letter arrives this Friday.';e.target.reset();});
});
let discount=0;
function totals(){const sub=cartSubtotal();const disc=sub*discount;const ship=sub===0?0:(sub-disc>=50?0:4.95);return{sub,disc,ship,total:sub-disc+ship}}
function renderCartPage(){const el=$('#cart-items');if(!el)return;const c=getCart();if(!c.length){el.innerHTML='<div class="empty">Your bag is empty. <a href="index.html">Browse books</a> to add some.</div>';}else{el.innerHTML=`<table><tr><th>Book</th><th>Format</th><th>Qty</th><th>Total</th><th></th></tr>${c.map((i,idx)=>{const b=BOOKS.find(x=>x.id===i.id);return `<tr><td><b>${b.title}</b><br><span class="author">${b.author}</span></td><td>${i.format}<br>${money(b.prices[i.format])}</td><td><div class="qty"><button data-cdec="${idx}" aria-label="Decrease">−</button><span>${i.qty}</span><button data-cinc="${idx}" aria-label="Increase">+</button></div></td><td><b>${money(b.prices[i.format]*i.qty)}</b></td><td><button data-crem="${idx}">Remove</button></td></tr>`}).join('')}</table>`;el.querySelectorAll('[data-cinc]').forEach(b=>b.onclick=()=>{const cc=getCart();cc[+b.dataset.cinc].qty++;setCart(cc);renderCartPage()});el.querySelectorAll('[data-cdec]').forEach(b=>b.onclick=()=>{const cc=getCart();cc[+b.dataset.cdec].qty--;setCart(cc.filter(x=>x.qty>0));renderCartPage()});el.querySelectorAll('[data-crem]').forEach(b=>b.onclick=()=>{setCart(getCart().filter((_,i)=>i!==+b.dataset.crem));renderCartPage()});}
 const t=totals();$('#sum-sub').textContent=money(t.sub);$('#sum-disc').textContent='-'+money(t.disc);$('#sum-ship').textContent=t.ship===0?(t.sub>0?'Free':money(0)):money(t.ship);$('#sum-total').textContent=money(t.total);}
function applyPromo(){const code=$('#promo').value.trim().toUpperCase();const msg=$('#promo-msg');if(code==='PINEREAD10'){discount=0.10;msg.textContent='Code applied: 10% off your books.';msg.className='ok-msg';}else{discount=0;msg.textContent='That code was not recognised. Try PINEREAD10.';msg.className='err-msg';}renderCartPage();}
function onCheckout(e){e.preventDefault();let ok=true;const req=[['co-name',v=>v.trim().length>=2,'Please enter your full name.'],['co-email',v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),'Please enter a valid email.'],['co-address',v=>v.trim().length>=6,'Please enter your delivery address.'],['co-card',v=>v.replace(/\s/g,'').length>=12,'Please enter a card number (sample only, 12 or more digits).']];req.forEach(([id,fn,msg])=>{const f=$('#'+id);const er=$('#err-'+id);if(!fn(f.value)){er.textContent=msg;ok=false}else er.textContent='';});if(!getCart().length){$('#co-err').textContent='Your bag is empty — add a book before checking out.';ok=false}else $('#co-err').textContent='';if(!ok)return;const t=totals();const ref='CP-'+Math.random().toString(36).slice(2,8).toUpperCase();const order={ref,total:t.total,items:getCart(),email:$('#co-email').value};localStorage.setItem('chapterPineLastOrder',JSON.stringify(order));localStorage.removeItem(KEY);discount=0;renderCartCount();renderCartPage();$('#checkout-wrap').style.display='none';const conf=$('#confirmation');conf.style.display='block';conf.innerHTML=`<h2>Thank you — order confirmed</h2><p>Your order reference is <b>${ref}</b>.</p><p>Total charged (sample): <b>${money(t.total)}</b>. A confirmation was prepared for <b>${order.email}</b>.</p><p>Books are packed within one business day. This is a portfolio demo, so no real payment was taken and no books will ship.</p><p><a class="btn" href="index.html">Keep browsing</a></p>`;conf.scrollIntoView({behavior:'smooth'});}
