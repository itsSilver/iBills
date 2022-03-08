module.exports = {
  apps: [
    {
      name: 'Live Blockchain',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'dev',
    },
  ],
}
