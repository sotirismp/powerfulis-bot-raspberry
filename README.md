# PowerfulisBot (Raspberry Pi Edition)

A Telegram bot to remotely control and monitor a PC (e.g., turn on/off, restart, check status, and take webcam photos) via a Raspberry Pi. Built with Node.js and designed for secure, owner-only access.

## Features

- **Turn ON/OFF/Restart PC**: Remotely power on, shut down, or restart your PC.
- **Ping**: Check if the PC is online.
- **Photo**: Take a photo using a connected webcam and receive it via Telegram.
- **Owner-only access**: Only the configured Telegram user can control the bot.

## Requirements

- Node.js (v16+ recommended)
- A Raspberry Pi (or any Linux machine)
- Telegram account & bot token
- PC with Wake-on-LAN enabled (for ON command)

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/sotirismp/powerfulis-bot-raspberry
   cd powerfulis-bot-raspberry
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Configure environment variables:**
   Create a `.env` file in the root directory with the following variables:

   ```env
   TOKEN=your_telegram_bot_token
   OWNER=your_telegram_username
   CHAT_ID=your_telegram_chat_id
   PC_IP=your_pc_ip_address
   SH_PATH=/path/to/sh/scripts
   NTBA_FIX_350=true
   ```

   - `TOKEN`: Telegram bot token from BotFather
   - `OWNER`: Your Telegram username (without @)
   - `CHAT_ID`: Your Telegram chat ID (can be found via @userinfobot)
   - `PC_IP`: The IP address of the PC to control
   - `SH_PATH`: Path to shell scripts for turning on the PC (e.g., Wake-on-LAN)

4. **(Optional) Prepare shell scripts:**
   - Place your Wake-on-LAN or other control scripts in the specified `SH_PATH`.
   - Example: `s.sh` for turning on the PC.

## Usage

- **Start the bot:**

  ```sh
  npm start
  ```

  Or for development with auto-reload:

  ```sh
  npm run dev
  ```

- **Interact via Telegram:**
  - Send `/start` to see available commands.
  - Use inline buttons or type commands directly.

## Available Commands

| Command  | Description              |
| -------- | ------------------------ |
| /start   | Show available commands  |
| /ping    | Check if PC is ON        |
| /on      | Turn ON the PC           |
| /off     | Turn OFF the PC          |
| /restart | Restart the PC           |
| /photo   | Take a photo from webcam |

## Dependencies

- [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)
- [express](https://expressjs.com/)
- [node-webcam](https://github.com/chuckfairy/node-webcam)
- [ping](https://www.npmjs.com/package/ping)
- [dotenv](https://www.npmjs.com/package/dotenv)

## Security

- Only the configured `OWNER` and `CHAT_ID` can control the bot.
- Messages from other users or chats are ignored.
- Commands are rate-limited by message expiry (5 seconds).

## License

ISC

---

_Made with ❤️ for Raspberry Pi automation._
