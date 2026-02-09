module.exports = {
  apps: [
    {
      name: "growth-tech",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      cwd: "/var/www/growth-tech",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
