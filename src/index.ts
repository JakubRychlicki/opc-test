import { OPCUAClient } from 'node-opcua-client';
import { config } from './config.js';
import { fetchFromOcp } from './opc.js';
import { insertCollectedDataIntoDb } from './opc-to-db.ts';
import { saveToFile, sleep } from './utils/helpers.js';

async function fetchAndInsert() {
  try {
    for (const ocp of config.opcServers) {
      console.log(`Creating OPC UA client for ${ocp.endpointUrl}...`);

      const client = OPCUAClient.create(ocp.opcClientOptions);

      console.log('Client created. Attempting to connect...');

      const collectedData = await fetchFromOcp({
        client,
        endpointUrl: ocp.endpointUrl,
        nodesToBrowse: ocp.nodesToBrowse as unknown as string[],
        log: () => {},
      });

      if (config.debug.saveJson) {
        await saveToFile(collectedData);
      }

      await insertCollectedDataIntoDb(collectedData, () => {});
    }
  } catch (err: any) {
    console.error('Fatal error:', err.message);
    console.error(err.stack);
  }
}

async function main() {
  const {
    debug: { fetchLimit, timeoutBetweenFetches },
  } = config;

  if (fetchLimit) {
    for (let i = 0; i < fetchLimit; i++) {
      console.log(`Performing #${i} fetch...`);
      await fetchAndInsert();
      await sleep(timeoutBetweenFetches);
      console.log(`Finished #${i} fetch!`);
    }
  } else {
    console.log('Starting infinite loop...');
    while (1) {
      await fetchAndInsert();
      await sleep(timeoutBetweenFetches);
    }
  }

  console.log('Goodbye');
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  console.log('Something when wrong, stopping application...');
  process.exit(1);
});
