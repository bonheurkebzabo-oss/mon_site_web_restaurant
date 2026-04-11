let menu = JSON.parse(localStorage.getItem("menu"))||[];
let orders = JSON.parse(localStorage.getItem("orders"))||[];
let user = null;

function save(){
localStorage.setItem("menu",JSON.stringify(menu));
localStorage.setItem("orders",JSON.stringify(orders));
}

function login(){
const u=document.getElementById("username").value;
const p=document.getElementById("password").value;

if(u==="admin" && p==="1234"){
user="admin";
document.getElementById("adminSection").style.display="block";
alert("Admin connecté");
}else{
alert("Utilisateur connecté");
}
}

function render(){
const m=document.getElementById("menu");
const o=document.getElementById("orders");
m.innerHTML=""; o.innerHTML="";

menu.forEach((d,i)=>{
let li=document.createElement("li");
li.innerHTML=`${d.name} - ${d.price} FCFA
<button onclick="orderDish(${i})">Commander</button>`;
m.appendChild(li);
});

orders.forEach((d,i)=>{
let li=document.createElement("li");
li.innerHTML=`${d.name} - ${d.price} FCFA
<button onclick="pay(${i})">Payer</button>`;
o.appendChild(li);
});

updateStats();
}

function addDish(){
let n=document.getElementById("name").value;
let p=document.getElementById("price").value;
if(!n||!p)return alert("Remplir");
menu.push({name:n,price:p});
save();render();
}

function orderDish(i){
orders.push(menu[i]);
save();render();
}

function pay(i){
alert("Paiement simulé effectué 💳");
orders.splice(i,1);
save();render();
}

function updateStats(){
let total=orders.reduce((sum,o)=>sum+parseInt(o.price),0);
document.getElementById("stats").innerText="Total commandes: "+orders.length+" | Revenus: "+total+" FCFA";
}

render();
