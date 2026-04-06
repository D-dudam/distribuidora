const produtos = [
  { id:1, nome:"Coca-Cola 2L", preco:11.99, img:"../assets/coca-cola.png" },
  { id:2, nome:"Heineken Lata 350ml", preco:5, img:"../assets/heineken-lata.png" },
  { id:3, nome:"Água Mineral 500ml", preco:2, img:"../assets/agua.png" },
  { id:4, nome:"Caixa Amstel - 350ml", preco:45, img:"../assets/amstel.png" },
  { id:5, nome:"Michelob Long Neck - 330ml", preco:9, img:"../assets/michelob.png" },
  { id:6, nome:"Heineken Long Neck - 330ml", preco:10, img:"../assets/heineken.png" },
  { id:7, nome:"Corona Long Neck - 330ml", preco:9.50, img:"../assets/corona.png" },
  { id:8, nome:"Red Bull", preco:13, img:"../assets/redbull.png" }
];

let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function salvarCarrinho() {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function renderProdutos() {
  const container = document.getElementById('produtos');
  container.innerHTML = '';

  produtos.forEach(p => {
    const div = document.createElement('div');
    div.className = 'card';

    div.innerHTML = `
      <img src="${p.img}">
      <h3>${p.nome}</h3>
      <p>R$ ${p.preco.toFixed(2)}</p>
      <button onclick="addCarrinho(${p.id})">Adicionar</button>
    `;

    container.appendChild(div);
  });
}

function addCarrinho(id) {
  const produto = produtos.find(p => p.id === id);
  const existente = carrinho.find(item => item.id === id);

  if (existente) {
    existente.qtd = (existente.qtd || 1) + 1;
  } else {
    carrinho.push({ ...produto, qtd:1 });
  }

  mostrarToast();
  salvarCarrinho();
  atualizarCarrinho();
  abrirCarrinho();
}

function aumentar(i){
  carrinho[i].qtd++;
  salvarCarrinho();
  atualizarCarrinho();
}

function diminuir(i){
  if(carrinho[i].qtd > 1){
    carrinho[i].qtd--;
  } else {
    carrinho.splice(i,1);
  }
  salvarCarrinho();
  atualizarCarrinho();
}

function removerItem(i){
  carrinho.splice(i,1);
  salvarCarrinho();
  atualizarCarrinho();
}

function limparCarrinho(){
  carrinho = [];
  salvarCarrinho();
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById('listaCarrinho');
  const contador = document.getElementById('contador'); // 👈 corrigido

  if (!lista) return;

  lista.innerHTML = '';

  let total = 0;
  let qtdTotal = 0;

  carrinho.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'item';

    const subtotal = item.preco * item.qtd;

    div.innerHTML = `
      <strong>${item.nome}</strong> (x${item.qtd}) - R$ ${subtotal.toFixed(2)}
      <div class="qty">
        <button onclick="diminuir(${index})">-</button>
        <button onclick="aumentar(${index})">+</button>
        <button onclick="removerItem(${index})" style="background:red;color:white;">X</button>
      </div>
    `;

    lista.appendChild(div);
    total += subtotal;
    qtdTotal += item.qtd;
  });

  const totalEl = document.getElementById('total');
  if (totalEl) totalEl.textContent = total.toFixed(2);

  if (contador) contador.textContent = qtdTotal;
}

function abrirCarrinho(){
  document.getElementById('carrinhoBox').classList.add('ativo');
  const nomeInput = document.getElementById('nome');
const enderecoInput = document.getElementById('endereco');

if (!nomeInput || !enderecoInput) {
  alert("Erro: campos não encontrados");
  return;
}

const nome = nomeInput.value;
const endereco = enderecoInput.value;

}

function fecharCarrinho(){
  document.getElementById('carrinhoBox').classList.remove('ativo');
}

function finalizarPedido() {
  const nome = document.getElementById('nome').value;
  const endereco = document.getElementById('endereco').value;

  if (!nome || !endereco) {
    alert("Preencha nome e endereço");
    return;
  }

  let mensagem = `🛒 *NOVO PEDIDO*\n\n`;
  mensagem += `👤 Cliente: ${nome}\n`;
  mensagem += `📍 Endereço: ${endereco}\n\n`;

  let total = 0;

  carrinho.forEach(item => {
    const subtotal = item.preco * item.qtd;
    total += subtotal;

    mensagem += `• ${item.nome} (x${item.qtd}) - R$ ${subtotal.toFixed(2)}\n`;
  });

  mensagem += `\n💰 Total: R$ ${total.toFixed(2)}`;

  // 🔥 ESSA LINHA RESOLVE O PROBLEMA DOS EMOJIS
  const mensagemFormatada = encodeURIComponent(mensagem);

  window.open(`https://wa.me/5561981737751?text=${mensagemFormatada}`);
}

function mostrarToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

document.addEventListener("DOMContentLoaded", () => {
  renderProdutos();
  atualizarCarrinho();
});

function toggleThemeMode(isDarkMode){
  if(isDarkMode){
    //Pegar divs e adicionar classe dark

  }else {
    //Retira classe dark

  }

}