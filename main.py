from aiogram import Bot, Dispatcher, F
from aiogram.filters import Command
from aiogram.types import Message, InlineKeyboardMarkup, InlineKeyboardButton

TOKEN = "7993407351:AAEXWz5AmSl0HyPyOgO8VxkBEavKFGYpiIU"

bot = Bot(token=TOKEN)
dp = Dispatcher()  # Mana shu qator yozilgan bo'lishi shart!
@dp.message(Command("kanalga_tashash"))

async def send_to_channel(message: Message):
    web_app_keyboard = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="🌐 Saytni ochish",
                    web_app={"url": "https://t.me/BILOLwebdeveloper_bot/bilol_app"}
                )
            ]
        ]
    )
    
    await bot.send_message(
        chat_id="@kanal_usernamingiz", 
        text="🚀 Professional web development xizmatlari! Saytimizga o'tib buyurtma bering:",
        reply_markup=web_app_keyboard
    )