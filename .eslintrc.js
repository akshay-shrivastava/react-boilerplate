module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ['standard', 'plugin:react/recommended', 'plugin:flowtype/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      es6: true,
      experimentalObjectRestSpread: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['flowtype', 'react', 'import', 'jsx-a11y', 'standard'],
  settings: {
    react: {
      version: '16.8'
    },
    flowtype: {
      onlyFilesWithFlowAnnotation: false
    }
  },
  rules: {
    camelcase: 0,
    'jsx-quotes': ['error', 'prefer-single'],
    // https://www.npmjs.com/package/eslint-plugin-react
    'react/jsx-equals-spacing': ['warn', 'never'],
    'react/jsx-no-duplicate-props': ['warn', { ignoreCase: true }],
    'react/jsx-no-undef': 'error',
    'react/jsx-pascal-case': ['warn', { allowAllCaps: true }],
    'react/jsx-uses-react': 'warn',
    'react/jsx-uses-vars': 'warn',
    'react/no-danger-with-children': 'warn',
    'react/no-deprecated': 'error',
    'react/no-direct-mutation-state': 'warn',
    'react/no-is-mounted': 'warn',
    'react/react-in-jsx-scope': 'error',
    'react/require-render-return': 'warn',
    'react/style-prop-object': 'warn',
    'react/prefer-es6-class': 'warn',
    'react/jsx-closing-bracket-location': 'warn',
    'react/jsx-closing-tag-location': 'warn',
    'react/jsx-tag-spacing': 'warn',
    'react/jsx-curly-spacing': 'warn',
    'react/jsx-boolean-value': 'warn',
    'react/jsx-wrap-multilines': 'warn',
    'react/self-closing-comp': 'warn',
    'react/sort-comp': 'warn',

    // https://github.com/gajus/eslint-plugin-flowtype
    'flowtype/boolean-style': [2, 'boolean'],
    'flowtype/define-flow-type': 1,
    'flowtype/delimiter-dangle': [2, 'never'],
    'flowtype/generic-spacing': [2, 'never'],
    'flowtype/no-primitive-constructor-types': 2,
    'flowtype/no-types-missing-file-annotation': 2,
    'flowtype/no-weak-types': 2,
    'flowtype/object-type-delimiter': [2, 'comma'],
    'flowtype/require-valid-file-annotation': 2,
    'flowtype/semi': [2, 'always'],
    'flowtype/space-after-type-colon': [2, 'always'],
    'flowtype/space-before-generic-bracket': [2, 'never'],
    'flowtype/space-before-type-colon': [2, 'never'],
    'flowtype/type-id-match': [2, '^([A-Z][a-z0-9]+)+Type$'],
    'flowtype/union-intersection-spacing': [2, 'always'],
    'flowtype/use-flow-type': 1,
    'flowtype/valid-syntax': 1,
    // https://github.com/benmosher/eslint-plugin-import
    'import/prefer-default-export': 'warn',
    'import/no-webpack-loader-syntax': 'warn',
    'import/no-unresolved': 'error',
    'import/export': 'warn',
    'import/first': 'warn',
    'import/newline-after-import': 'warn',
    'import/no-named-default': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to']
      }
    ]
  }
}
