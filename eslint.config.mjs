// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

//TODO: Add your custom rules here as necessary
export default withNuxt({
  rules: {
    "vue/require-default-prop": "off",
    "vue/no-multiple-template-root": "off",
    "vue/html-self-closing": "off",
    "@typescript-eslint/no-dynamic-delete": "off",
  },
});
