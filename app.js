const vm = new Vue({
  el: "#app",
  data() {
    return {
      produtos: new Array(),
      produto: false,
      carrinho: new Array(),
      cart: false,
    };
  },
  methods: {
    getProducts() {
      fetch("./api/produtos.json")
        .then((produtos) => produtos.json())
        .then((produtos) => {
          this.produtos = produtos;
        });
    },
    getProduto(id) {
      fetch(`./api/${id}/dados.json`)
        .then((produto) => produto.json())
        .then((produto) => {
          this.produto = produto;
        });
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    closeModal({ target, currentTarget }) {
      if (target === currentTarget) {
        this.produto = false;
      }
    },
    addItem() {
      this.produto.estoque--;
      const { id, nome, preco, img } = this.produto;
      this.carrinho.push({ id, nome, preco, img });
    },
    getCart() {
      this.cart = true;
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    closeCart() {
      this.cart = false;
    },
    removeItemFromCart(index) {
      this.carrinho.splice(index, 1);
      if (this.carrinho.length <= 0) {
        this.cart = false;
      }
    },
    checkLocalStorage() {
      if (window.localStorage.carrinho) {
        this.carrinho = JSON.parse(window.localStorage.carrinho);
      }
    },
  },
  computed: {
    getCartLength() {
      return this.carrinho.length;
    },
    getTotalPrice() {
      return 6000;
    },
  },
  created() {
    this.getProducts();
    this.checkLocalStorage();
  },
  watch: {
    carrinho() {
      window.localStorage.carrinho = JSON.stringify(this.carrinho);
    },
  },
  filters: {
    priceNumber(value) {
      return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
  },
});
