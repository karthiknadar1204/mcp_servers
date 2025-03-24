import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create an MCP server
const server = new McpServer({
    name: "Weather data fetcher",
    version: "1.0.0"
  });


  //get weather data by city name
async function getWeatherByCity(city=''){
    if(city.toLowerCase() === 'patiala'){
        return {temp:20,humidity:50,wind:'10km/h'}
    }
    else if(city.toLowerCase() === 'delhi'){
        return {temp:25,humidity:60,wind:'15km/h'}
    }
    else{
        return {temp:15,humidity:40,wind:'5km/h'}
    }
}

  //tool to get weather data by city name
server.tool('getWeatherDataByCityName',{
    city:z.string(),
},async(city)=>{
    return {
        content:[{type:'text',text:JSON.stringify(await getWeatherByCity(city))}]
    }
})

// Start receiving messages on stdin and sending messages on stdout

async function init(){
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.log('Server is running...');
}

init();

// // This example demonstrated an MCP server using the stdio format
// // Cursor automatically runs this process for you
// // This uses a Node.js server, ran with `npx`
// {
//     "mcpServers": {
//       "server-name": {
//         "command": "npx",
//         "args": ["-y", "mcp-server"],
//         "env": {
//           "API_KEY": "value"
//         }
//       }
//     }
//   }