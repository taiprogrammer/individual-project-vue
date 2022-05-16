export default {
  name: "TimeWeather",
  data() {
    return {
      time: new Object(),
    };
  },
  methods: {
    getTime() {
      fetch("https://www.metaweather.com/api/location/455827/")
        .then((weather) => weather.json())
        .then((weather) => (this.time = weather));
      console.log(this.time);
    },
  },
  created() {
    this.getTime();
  },
};
