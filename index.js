// 디스코드봇 기본코드
const { Client, Events, GatewayIntentBits } = require("discord.js");

// 환경변수
require("dotenv").config();

// 클라이언트 객체 생성
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// 디스코드봇이 준비되면 실행하는 코드(실행 최초에만)
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! ${readyClient.user.tag}`);
});

// 클라이언트 토큰으로 디스코드 로그인
client.login(process.env.DISCORD_TOKEN);
