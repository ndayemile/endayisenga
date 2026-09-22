const menuBtn=document.getElementById("menuBtn");
const navLinks=document.getElementById("navLinks");
const header=document.getElementById("header");
const typing=document.getElementById("typing");
const words=["Network Technician","Systems Administrator","Web Developer","Technology Enthusiast"];
let wi=0,ci=0,deleting=false;

menuBtn.addEventListener("click",()=>{
  navLinks.classList.toggle("show");
  menuBtn.innerHTML=navLinks.classList.contains("show")
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>navLinks.classList.remove("show")));

function typeEffect(){
  const word=words[wi];
  typing.textContent=deleting?word.substring(0,ci-1):word.substring(0,ci+1);
  if(!deleting) ci++; else ci--;
  if(!deleting && ci===word.length){deleting=true;setTimeout(typeEffect,1200);return}
  if(deleting && ci===0){deleting=false;wi=(wi+1)%words.length}
  setTimeout(typeEffect,deleting?55:90);
}
typeEffect();

window.addEventListener("scroll",()=>{
  header.classList.toggle("scrolled",window.scrollY>30);
  let current="";
  document.querySelectorAll("section[id]").forEach(s=>{
    if(window.scrollY>=s.offsetTop-180) current=s.id;
  });
  document.querySelectorAll(".nav-links a").forEach(a=>{
    a.classList.toggle("active",a.getAttribute("href")==="#"+current);
  });
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      entry.target.querySelectorAll("em[data-width]").forEach(bar=>{
        bar.style.width=bar.dataset.width+"%";
      });
    }
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const glow=document.querySelector(".cursor-glow");
window.addEventListener("mousemove",e=>{
  glow.style.left=e.clientX+"px";
  glow.style.top=e.clientY+"px";
});

document.getElementById("year").textContent=new Date().getFullYear();
