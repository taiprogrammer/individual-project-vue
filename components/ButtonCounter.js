export default {
  name: "ButtonCounter",
  data() {
    return {
      counter: 0,
    };
  },
  template: `
        <div>
            <button @click="counter ++">Counter {{ counter }}</button>
        </div>
    `,
};
