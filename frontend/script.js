const produtos = [
  { id:1, nome:"Coca-Cola 2L", preco:10, img:"../assets/coca-cola.png" },
  { id:2, nome:"Heineken Lata 350ml", preco:5, img:"../assets/heineken-lata.png" },
  { id:3, nome:"Água 500ml", preco:2, img:"../assets/agua.png" },
  { id:4, nome:"Red Bull", preco:13, img:"../assets/redbull.png" }
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
}

function fecharCarrinho(){
  document.getElementById('carrinhoBox').classList.remove('ativo');
}

function finalizarPedido(){
  alert('Pedido enviado!');
}

renderProdutos();
atualizarCarrinho();
