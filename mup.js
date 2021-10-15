require('dotenv').config();
module.exports = {
  servers: {
    one: {
      host: process.env.SSH_HOST,
      username: process.env.SSH_USER
    }
  },

  app: {
    name: process.env.DOMAIN.replaceAll('.', '-'),
    path: './rechords/app',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
      debug: false
    },

    env: {
      PORT: process.env.INTERNAL_PORT,
      ROOT_URL: 'https://' + process.env.DOMAIN,
      MONGO_URL: 'mongodb://localhost/meteor'
    },

    docker: {
      image: 'abernix/meteord:node-12-base',
    },

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

  hooks: {
    'pre.default.deploy': {
      localCommand:
        './scripts/clone_and_install_repo.sh'
    },
    'pre.meteor.deploy': {
      remoteCommand:
      // If no config exists, a default one is added to /etc/caddy/mup-sites
      'CONF="/etc/caddy/mup-sites/' + process.env.DOMAIN + '" && test -f "$CONF" || echo "' + process.env.DOMAIN + ' {\n\treverse_proxy :' + process.env.INTERNAL_PORT + '\n}" > $CONF && sudo systemctl restart caddy'
    }
  },

  mongo: {
    version: '3.4.1',
    servers: {
      one: {}
    }
  }
};
