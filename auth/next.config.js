const {
  withModuleFederation,
  MergeRuntime,
} = require('@module-federation/nextjs-mf');

module.exports = {
  webpack: (config, options) => {
    const { buildId, dev, isServer, defaultLoaders, webpack } = options;
    const mfConf = {
      name: 'auth',
      library: { type: config.output.libraryTarget, name: 'auth' },
      filename: 'static/runtime/remoteEntry.js',
      remotes: {},
      exposes: {
        './SingIn': './utils/singIn',
        './GetToken': './utils/getToken',
      },
      shared: [],
    };

    // Configures ModuleFederation and other Webpack properties
    withModuleFederation(config, options, mfConf);

    config.plugins.push(new MergeRuntime());

    if (!isServer) {
      config.output.publicPath = 'http://localhost:3001/_next/';
    }

    return config;
  },
};
