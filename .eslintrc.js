module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  env: {
    node: true,
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "next/core-web-vitals",
  ],
  rules: {
    // 'React' must be in scope when using JSX 에러 해결 (Next.js)
    "react/react-in-jsx-scope": "off",
    // ts파일에서 tsx구문 허용 (Next.js)
    "react/jsx-filename-extension": [1, { extensions: [".ts", ".tsx"] }],
    "import/prefer-default-export": "off",
    "import/no-named-as-deault": "off",
    "react/function-component-definition": "off",
    "prefer-destructuring": "off",
    "react/destructuring-assignment": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "react/jsx-props-no-spreading": "off",
    "consistent-return": "off",
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "jsx-a11y/label-has-associated-control": "off",
  },
};
