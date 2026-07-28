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