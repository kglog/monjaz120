export default {
  globals: {
    browser: true,
    node: true,
  },
  rules: {
    // يخلي تحذير unused vars بس تنبيه عشان ما يوقفك
    'no-unused-vars': 'warn',
    // لو ودك تخلي تحذير react/react-in-jsx-scope ما يزعجك
    'react/react-in-jsx-scope': 'off',
  },
};
