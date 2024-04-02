// 파일시스템/경로 모듈
const fs = require("node:fs");
const path = require("node:path");
// 디스코드봇 기본코드, Collection 클래스
// Collection : Key, Value 형식의 클래스로 명령어 저장에 사용됨
const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
// 환경변수
require("dotenv").config();

// 클라이언트 객체 생성
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// 클라이언트 객체에 커맨드 추가
client.commands = new Collection();

// 명령어 파일 동적 검색
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// 클라이언트 토큰으로 디스코드 로그인
client.login(process.env.DISCORD_TOKEN);
