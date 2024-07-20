// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

//TODO: Add your custom rules here as necessary
export default withNuxt({
  rules: {
    "vue/require-default-prop": "off",
    "vue/no-multiple-template-root": "off",
  },
});
