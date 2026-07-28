import asyncio
from aiogram import Bot, Dispatcher, F
from aiogram.filters import Command
from aiogram.types import Message, InlineKeyboardMarkup, InlineKeyboardButton

TOKEN = "7993407351:AAEXWz5AmSl0HyPyOgO8VxkBEavKFGYpiIU"

# 1. Avval bularni yaratamiz:
bot = Bot(token=TOKEN)
dp = Dispatcher()

# 2. Keyin handlerlarni yozamiz:
@dp.message(Command("kanalga_tashash"))
async def send_to_channel(message: Message):
    ...
    @dp.message(Command("start"))
async def start_command(message: Message):
    await message.answer("Salom! Botimiz ishga tushdi. 🚀")

# 3. Eng oxirida botni ishga tushiramiz:
async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())