const { withFederatedSidecar } = require('@module-federation/nextjs-mf');

module.exports = withFederatedSidecar({
  name: 'cockpit',
  filename: 'static/chunks/remoteEntry.js',
  exposes: {},
  shared: {
    react: {
      // Notice shared are NOT eager here.
      requiredVersion: false,
      singleton: true,
    },
  },
})({
  webpack5: true,
  webpack(config, options) {
    const { webpack } = options;
    config.experiments = { topLevelAwait: true };
    config.output.publicPath = 'auto';
    config.module.rules.push({
      test: /_app.js/,
      loader: '@module-federation/nextjs-mf/lib/federation-loader.js',
    });
    config.plugins.push(
      new webpack.container.ModuleFederationPlugin({
        remoteType: 'var',
        remotes: {
          next2: 'auth',
        },
        shared: {
          react: {
            // Notice shared ARE eager here.
            eager: true,
            singleton: true,
            requiredVersion: false,
          },
        },
      })
    );

    return config;
  },
});
