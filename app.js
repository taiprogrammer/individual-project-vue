const vm = new Vue({
  el: "#app",
  data() {
    return {
      produtos: new Array(),
      produto: false,
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
        })
      console.log(this.produto);
    },
    closeModal() {
      this.produto = false;
    },
  },
  mounted() {
    this.getProducts();
  },
  filters: {
    priceNumber(value) {
      return value.toLocaleString('pt-BR', {
        style: "currency",
        currency: "BRL"
      });
    },
  },
});