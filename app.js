const vm = new Vue({
  el: "#app",
  data() {
    return {
      produtos: new Array(),
      produto: false,
      carrinho: new Array(),
      cart: false,
      mensagemAlerta: "Item adicionado",
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
      const toast = document.getElementById("alerta");
      this.produto.estoque--;
      const { id, nome, preco, img, estoque } = this.produto;
      this.carrinho.push({ id, nome, preco, img, estoque });
      toast.style.display = "block";
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
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
    closeToast() {
      const toast = document.getElementById("alerta");
      toast.style.display = "none";
    },
  },
  computed: {
    getCartLength() {
      return this.carrinho.length;
    },
    getTotalPrice() {
      const price = this.carrinho.map((item) => item.preco);
      const totalPrice = price.reduce((prev, current) => prev + current, 0);
      return totalPrice;
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
