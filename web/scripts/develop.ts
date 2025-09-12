import Terminal from '@stackpress/lib/Terminal';
import bootstrap from '../config/develop.js';

async function main() {
  const cli = new Terminal([]);
  const server = await bootstrap();
  //start the server
  server.create().listen(3000, () => {
    cli.control.system('Server is running on port 3000');
    cli.control.system('------------------------------');
  });
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});

