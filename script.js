document.addEventListener("DOMContentLoaded", function() {
    // Verifica a existência dos botões de carrinho e favoritos
    const cartButton = document.getElementById("cart-button");
    const favoritesButton = document.getElementById("favorites-button");

    // Event listener para redirecionar para a página de carrinho
    if (cartButton) {
        cartButton.addEventListener("click", function() {
            window.location.href = "carrinho.html"; // Redireciona para a página de carrinho
        });
    }

    // Event listener para redirecionar para a página de favoritos
    if (favoritesButton) {
        favoritesButton.addEventListener("click", function() {
            window.location.href = "favoritos.html"; // Redireciona para a página de favoritos
        });
    }

    // Função para adicionar produtos ao carrinho e favoritos
    document.querySelectorAll('.item').forEach((itemElement) => {
        const nome = itemElement.querySelector('h1')?.innerText;
        const preco = itemElement.querySelector('.preco')?.innerText;
        const imagem = itemElement.querySelector('img')?.getAttribute('src');

        const produto = { nome, preco, imagem };

        const carrinhoIcone = itemElement.querySelector('.fa-bag-shopping');
        const favoritoIcone = itemElement.querySelector('.fa-heart');

        // Adiciona ao carrinho
        carrinhoIcone.addEventListener('click', () => {
            let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
            carrinho.push(produto);
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            alert(`${nome} foi adicionado ao carrinho!`);
        });

        // Adiciona aos favoritos
        favoritoIcone.addEventListener('click', () => {
            let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
            favoritos.push(produto);
            localStorage.setItem('favoritos', JSON.stringify(favoritos));
            alert(`${nome} foi adicionado aos favoritos!`);
        });
    });
});
