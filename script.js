// 🔥 Données locales
let menu = JSON.parse(localStorage.getItem("menu")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];
let user = null;

// 💾 Sauvegarde
function save() {
  localStorage.setItem("menu", JSON.stringify(menu));
  localStorage.setItem("orders", JSON.stringify(orders));
}

// 🔐 Connexion Firebase (admin)
function login() {
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      user = "admin";
      document.getElementById("adminSection").style.display = "block";
      alert("Connexion admin réussie 🔥");
    })
    .catch(error => {
      alert("Erreur: " + error.message);
    });
}

// 📋 Affichage
function render() {
  const m = document.getElementById("menu");
  const o = document.getElementById("orders");

  m.innerHTML = "";
  o.innerHTML = "";

  // MENU
  menu.forEach((d, i) => {
    let li = document.createElement("li");
    li.innerHTML = `${d.name} - ${d.price} FCFA 
    <button onclick="orderDish(${i})">Commander</button>`;
    m.appendChild(li);
  });

  // COMMANDES
  orders.forEach((d, i) => {
    let li = document.createElement("li");
    li.innerHTML = `${d.name} - ${d.price} FCFA 
    <button onclick="pay(${i})">Payer</button>`;
    o.appendChild(li);
  });

  updateStats();
}

// ➕ Ajouter plat (admin)
function addDish() {
  let n = document.getElementById("name").value;
  let p = document.getElementById("price").value;

  if (!n || !p) return alert("Remplis tous les champs");

  menu.push({ name: n, price: p });
  save();
  render();
}

// 🛒 Commander
function orderDish(i) {
  orders.push(menu[i]);
  save();
  render();
}

// 💳 Paiement
function pay(i) {
  alert("Paiement effectué 💳");
  orders.splice(i, 1);
  save();
  render();
}

// 📊 Statistiques
function updateStats() {
  let total = orders.reduce((sum, o) => sum + parseInt(o.price), 0);
  document.getElementById("stats").innerText =
    "Total commandes: " + orders.length +
    " | Revenus: " + total + " FCFA";
}

// 🚀 Lancer affichage
render();
