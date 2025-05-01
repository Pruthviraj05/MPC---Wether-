import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from 'zod';

const server = new McpServer({
  name: 'Weather Data Fetcher',
  version: "1.0.0"
});

async function getWeatherData(city = '') {
  if (city.toLowerCase() === 'london') {
    return { temp: '30C', forecast: 'Chances of high rain' };
  }
  if (city.toLowerCase() === 'delhi') {
    return { temp: '40C', forecast: 'Chances of high warm winds' };
  }
  return { temp: 'null', error: 'Unable to get data' };
}

server.tool(
  'getWeatherDataByCityName',
  {
    city: z.string(),
  },
  async ({ city }) => {
    return {
      content: [
        { type: 'text', text: JSON.stringify(await getWeatherData(city)) },
      ],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main();
