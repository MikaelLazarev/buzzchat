/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

const path = require('path');
const { override, addBabelPlugins, babelInclude } = require('customize-cra');

module.exports = override(
    ...addBabelPlugins('@babel/plugin-proposal-class-properties'),
    babelInclude([
      path.resolve(__dirname, 'node_modules/react-native-elements'),
      path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
      path.resolve(__dirname, 'node_modules/react-native-ratings'),
      path.resolve(__dirname, 'src'),
    ])
);
