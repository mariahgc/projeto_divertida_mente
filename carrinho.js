function carregarCarrinho() {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const tbody = document.getElementById("cart-body")
  let total = 0
  tbody.innerHTML = ""  // Limpa a tabela

  // Verifica se o carrinho está vazio
  if (cart.length === 0) {
    const row = document.createElement("tr")
    row.innerHTML = `<td colspan="5" class="empty-cart">Carrinho vazio</td>`
    tbody.appendChild(row)
  } else {
    cart.forEach((item, index) => {
      const precoNum = parseFloat(item.price.replace("R$", "").replace(",", "."))
      const subtotal = precoNum * item.quantity
      total += subtotal

      const row = document.createElement("tr")
      row.innerHTML = `
        <td class="product-identification">
          <img src="${item.image}" alt="${item.name}" class="cart-product-image">
          <strong class="cart-product-title">${item.name}</strong>
        </td>
        <td><span class="cart-product-price">${item.price}</span></td>
        <td>
          <input type="number" value="${item.quantity}" min="1" class="product-qtd-input" onchange="atualizarQuantidade(${index}, this.value)">
        </td>
        <td><span class="cart-product-subtotal">R$${subtotal.toFixed(2).replace(".", ",")}</span></td>
        <td>
          <button onclick="removerProduto(${index})" class="remove-product-button">Remover</button>
        </td>
      `
      tbody.appendChild(row)
    })
  }

  // Atualiza o total
  document.getElementById("cart-total").innerText = "R$" + total.toFixed(2).replace(".", ",")
}

function atualizarQuantidade(index, novaQtd) {
  let cart = JSON.parse(localStorage.getItem("cart")) || []
  cart[index].quantity = parseInt(novaQtd)

  if (cart[index].quantity <= 0) {
    alert("A quantidade não pode ser zero ou negativa!");
    return;
  }

  localStorage.setItem("cart", JSON.stringify(cart))
  carregarCarrinho()
}

function removerProduto(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || []
  cart.splice(index, 1)
  localStorage.setItem("cart", JSON.stringify(cart))
  carregarCarrinho()
}

function finalizarCompra() {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  if (cart.length === 0) {
    alert("Seu carrinho está vazio!")
    return
  }

  alert("Compra finalizada! Obrigado :)")
  localStorage.removeItem("cart")
  carregarCarrinho()
}

window.onload = carregarCarrinho
