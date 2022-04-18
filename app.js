const vm = new Vue({
  el: "#app",
  data() {
    return {
      produtos: new Array(),
      produto: false,
      carrinho: new Array(),
      carrinhoTotal: 0,
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
    closeModal() {
      this.produto = false;
    },
    addItem(item) {
      this.carrinho.push(item);
      this.carrinhoTotal++;
    },
  },
  mounted() {
    this.getProducts();
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
