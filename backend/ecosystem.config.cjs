module.exports = {
  apps: [
    {
      name: 'ashirwad-website-backend',
      script: 'src/server.js',
      cwd: '/var/www/ashirwad-website/backend',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      }
    }
  ]
};

