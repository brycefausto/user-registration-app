import app from '../server/app'

/*
 * The express server plugin is used to run the express server with vite
 */
const expressServerPlugin = () => ({
  name: 'configure-server',
  configureServer(server) {
    server.middlewares.use('/', app);
  }
});

export default expressServerPlugin