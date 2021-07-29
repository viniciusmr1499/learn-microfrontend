const {
  withModuleFederation,
  MergeRuntime,
} = require('@module-federation/nextjs-mf');
const path = require('path');

module.exports = {
  webpack: (config, options) => {
    const { buildId, dev, isServer, defaultLoaders, webpack } = options;
    const mfConf = {
      name: 'cockpit',
      library: { type: config.output.libraryTarget, name: 'cockpit' },
      filename: 'static/runtime/remoteEntry.js',
      remotes: {
        // For SSR, resolve to disk path (or you can use code streaming if you have access)
        auth: isServer
          ? path.resolve(
              __dirname,
              '../auth/.next/server/static/runtime/remoteEntry.js'
            )
          : 'auth', // for client, treat it as a global
      },
      exposes: {},
      shared: [],
    };

    // Configures ModuleFederation and other Webpack properties
    withModuleFederation(config, options, mfConf);

    config.plugins.push(new MergeRuntime());

    if (!isServer) {
      config.output.publicPath = 'http://localhost:3000/_next/';
    }

    return config;
  },
};
