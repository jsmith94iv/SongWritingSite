// navbar scroll shadow
window.addEventListener("scroll",()=>{
  document.querySelector("header").style.boxShadow=scrollY>20?"0 2px 8px #0003":"none";
});
// year
document.getElementById("year").textContent=new Date().getFullYear();
// hero reel
const reel=document.getElementById("reel");
document.getElementById("playBtn").onclick=()=>{
  reel.paused?(reel.play(),playBtn.textContent="⏸ Pause"):(reel.pause(),playBtn.textContent="▶ 30-sec reel");
};
// dummy catalog (replace w/ real metadata)
const catalog=[
{title:"Ghost in the WiFi",genre:"alt-rock",snippet:"assets/snippets/guitar1.mp3",lyrics:"I talk to the ghost in the WiFi…"},
{title:"Velvet Static",genre:"shoegaze",snippet:"assets/snippets/velvet.mp3",lyrics:"Your love is velvet static on my skin…"},
{title:"Teflon Heart",genre:"trap",snippet:"assets/snippets/teflon.mp3",lyrics:"Teflon heart, bullets slide off me…"},
{title:"Cheap Champagne",genre:"pop",snippet:"assets/snippets/champagne.mp3",lyrics:"We get drunk on cheap champagne dreams…"},
{title:"Coffee & Old Strings",genre:"acoustic",snippet:"assets/snippets/coffee.mp3",lyrics:"Coffee stains on my old guitar strings…"}
];
function renderCatalog(list){
  const grid=document.getElementById("catalogGrid");
  grid.innerHTML="";
  list.forEach(s=>{
    const card=document.createElement("div");card.className="card";
    card.innerHTML=`
    <h4>${s.title}</h4>
    <span class="tag">${s.genre}</span>
    <p>${s.lyrics}</p>
    <audio controls preload="none"><source src="${s.snippet}" type="audio/mpeg"></audio>
    <button class="btn ghost">License / Co-write</button>`;
    grid.appendChild(card);
  });
}
renderCatalog(catalog);
// filter
document.querySelectorAll(".filters button").forEach(b=>{
  b.onclick=()=>{
    document.querySelector(".filters .active").classList.remove("active");
    b.classList.add("active");
    const g=b.dataset.filter;
    renderCatalog(g==="all"?catalog:catalog.filter(s=>s.genre===g));
  };
});
// portfolio (reuse same data)
document.getElementById("portfolioGrid").innerHTML=catalog.map(s=>`
  <div class="card">
    <h4>${s.title}</h4>
    <audio controls preload="none"><source src="${s.snippet}" type="audio/mpeg"></audio>
  </div>`).join("");
// contact form → netlify (or emailjs)
document.getElementById("contactForm").addEventListener("submit",e=>{
  e.preventDefault();
  fetch("/",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams(new FormData(e.target))})
  .then(()=>{alert("Message sent! I’ll reply within 24 h.");e.target.reset()})
  .catch(()=>alert("Sorry, error. Email me directly: james@songcraft.com"));
});