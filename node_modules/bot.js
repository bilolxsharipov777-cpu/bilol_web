const { Telegraf, Markup } = require('telegraf');

const BOT_TOKEN = '7993407351:AAEXWz5AmSl0HyPyOgO8VxkBEavKFGYpiIU';
const ADMIN_ID = '867717817';

const bot = new Telegraf(BOT_TOKEN);
const userState = {};

const getLangMenu = () => Markup.inlineKeyboard([
    [
        Markup.button.callback('🇺🇿 O\'zbekcha', 'lang_uz'),
        Markup.button.callback('🇷🇺 Русский', 'lang_ru'),
        Markup.button.callback('🇬🇧 English', 'lang_en')
    ]
]);

bot.start((ctx) => {
    const userId = ctx.from.id;
    if (!userState[userId]) userState[userId] = {};
    userState[userId].lang = 'uz';
    
    ctx.reply(
        "🌟 *Professional Web Development Agentligiga xush kelibsiz!*\n\n" +
        "🎁 O'yinni o'ynang, **chegirma yutib oling** va saytingizga chegirma asosida buyurtma bering! 🚀🔥\n\n" +
        "Iltimos, tilni tanlang:",
        { parse_mode: 'Markdown', ...getLangMenu() }
    );
});

bot.action('lang_uz', (ctx) => {
    const userId = ctx.from.id;
    if (!userState[userId]) userState[userId] = {};
    userState[userId].lang = 'uz';
    ctx.reply("🇺🇿 O'zbek tili tanlandi. Kerakli bo'limni tanlang 👇", { parse_mode: 'Markdown', ...getMainMenu('uz') });
});

bot.action('lang_ru', (ctx) => {
    const userId = ctx.from.id;
    if (!userState[userId]) userState[userId] = {};
    userState[userId].lang = 'ru';
    ctx.reply("🇷🇺 Русский язык выбран. Выберите раздел 👇", { parse_mode: 'Markdown', ...getMainMenu('ru') });
});

bot.action('lang_en', (ctx) => {
    const userId = ctx.from.id;
    if (!userState[userId]) userState[userId] = {};
    userState[userId].lang = 'en';
    ctx.reply("🇬🇧 English selected. Choose a section 👇", { parse_mode: 'Markdown', ...getMainMenu('en') });
});

function getMainMenu(lang) {
    if (lang === 'ru') {
        return Markup.keyboard([
            ['💻 Портфолио проектов', '⚙️ Услуги и Цены'],
            ['🎁 Сыграть и выиграть скидку!'],
            ['📞 Контакты', '📝 Заказать сайт'],
            ['🌐 Изменить язык']
        ]).resize();
    } else if (lang === 'en') {
        return Markup.keyboard([
            ['💻 Portfolio', '⚙️ Services & Pricing'],
            ['🎁 Play & Win Discount!'],
            ['📞 Contacts', '📝 Order a Website'],
            ['🌐 Change language']
        ]).resize();
    } else {
        return Markup.keyboard([
            ['💻 Qilingan ishlarim', '⚙️ Xizmatlar va Narxlar'],
            ['🎁 O\'yin: Chegirma yutib olish!'],
            ['📞 Aloqa va Murojaat', '📝 Buyurtma berish'],
            ['🌐 Tilni o\'zgartirish']
        ]).resize();
    }
}

bot.hears(['🌐 Tilni o\'zgartirish', '🌐 Изменить язык', '🌐 Change language'], (ctx) => {
    ctx.reply("Tilni o'zgartirish:", getLangMenu());
});

// --- PORTFOLIO ---
bot.hears(['💻 Qilingan ishlarim', '💻 Портфолио проектов', '💻 Portfolio'], (ctx) => {
    const text = "💻 *Mening muvaffaqiyatli yakunlagan professional loyihalarim:*\n\nQuyidagi tugmalar orqali saytlarni ochib ko'rishingiz mumkin! 🚀";
    const portfolioButtons = Markup.inlineKeyboard([
        [Markup.button.url('🌐 Asosiy Korporativ Sayt', 'https://fastidious-starburst-7aa5e3.netlify.app/')],
        [Markup.button.url('👔 A-Farid Kostyum-Shim Sayti', 'https://monumental-dieffenbachia-aac848.netlify.app/')],
        [Markup.button.url('🚖 Taksi Xizmati Platformasi', 'https://spontaneous-pothos-202271.netlify.app/')],
        [Markup.button.url('🔥 Portfolio Landing Page', 'https://fascinating-sundae-f41c81.netlify.app/')]
    ]);
    ctx.reply(text, { parse_mode: 'Markdown', ...portfolioButtons });
});

// --- ⚙️ XIZMATLAR VA NARXLAR ---
bot.hears(['⚙️ Xizmatlar va Narxlar', '⚙️ Услуги и Цены', '⚙️ Services & Pricing'], (ctx) => {
    const servicesKeyboard = Markup.inlineKeyboard([
        [Markup.button.callback('📈 Landing Page', 'srv_landing')],
        [Markup.button.callback('🚖 Taksi xizmati sayti', 'srv_taxi')],
        [Markup.button.callback('🛍 Onlayn do‘kon', 'srv_shop')],
        [Markup.button.callback('🏢 Kompaniya va Vizitka', 'srv_corporate')],
        [Markup.button.callback('👨‍💻 Shaxsiy Portfolio', 'srv_portfolio')],
        [Markup.button.callback('📚 O‘quv markazlari uchun', 'srv_courses')],
        [Markup.button.callback('🍽 Restoran va Kafelar', 'srv_restaurant')],
        [Markup.button.callback('🏡 Mehmonxona va Dachalar', 'srv_hotel')]
    ]);

    ctx.reply(
        "✨ *Biznesingizni internetda rivojlantirish markaziga xush kelibsiz!*\n\n" +
        "Internet asrida har qanday muvaffaqiyatli biznesning o‘z sayti bo‘lishi shart. " +
        "Quyidagi xizmatlardan birini tanlang va uning narxi hamda tayyor bo'lish muddatini bilib oling: 👇",
        { parse_mode: 'Markdown', ...servicesKeyboard }
    );
});

bot.action(/^srv_(.+)$/, (ctx) => {
    ctx.answerCbQuery();
    const type = ctx.match[1];
    
    let info = "";
    let serviceCode = "";

    if (type === 'landing') {
        info = "📈 *Landing Page (Sotuvchi sayt)*\n\n• *Tavsif:* Mahsulot yoki xizmatingizni tezkor sotuvchi reklama sayti.\n• *Tayyor bo'lish muddati:* 2–4 kun\n• *Narxi:* $50 dan boshlab";
        serviceCode = "order_landing";
    } else if (type === 'taxi') {
        info = "🚖 *Taksi xizmati sayti*\n\n• *Tavsif:* Namangan, Toshkent va boshqa yo'nalishlar uchun qulay buyurtma berish tizimi.\n• *Tayyor bo'lish muddati:* 5–7 kun\n• *Narxi:* $100 dan boshlab";
        serviceCode = "order_taxi";
    } else if (type === 'shop') {
        info = "🛍 *Onlayn do‘kon*\n\n• *Tavsif:* Mahsulotlaringizni internet orqali avtomatlashtirilgan holda sotish platformasi.\n• *Tayyor bo'lish muddati:* 7–10 kun\n• *Narxi:* $120 dan boshlab";
        serviceCode = "order_shop";
    } else if (type === 'corporate') {
        info = "🏢 *Kompaniya va Vizitka sayt*\n\n• *Tavsif:* Firmangiz haqida to'liq va jiddiy ma'lumot beruvchi korporativ sayt.\n• *Tayyor bo'lish muddati:* 3–5 kun\n• *Narxi:* $70 dan boshlab";
        serviceCode = "order_corporate";
    } else if (type === 'portfolio') {
        info = "👨‍💻 *Shaxsiy Portfolio*\n\n• *Tavsif:* Mutaxassislar uchun o'z xizmatlari va ishlarini ko'rsatish sayti.\n• *Tayyor bo'lish muddati:* 2–3 kun\n• *Narxi:* $40 dan boshlab";
        serviceCode = "order_portfolio";
    } else if (type === 'courses') {
        info = "📚 *O‘quv markazlari va Kurslar*\n\n• *Tavsif:* O'quvchilardan arizalar yig'ish va darslarni taqdim etish platformasi.\n• *Tayyor bo'lish muddati:* 5–7 kun\n• *Narxi:* $90 dan boshlab";
        serviceCode = "order_courses";
    } else if (type === 'restaurant') {
        info = "🍽 *Restoran va Kafelar*\n\n• *Tavsif:* QR-kodli zamonaviy onlayn menyu sayti.\n• *Tayyor bo'lish muddati:* 2–4 kun\n• *Narxi:* $50 dan boshlab";
        serviceCode = "order_restaurant";
    } else if (type === 'hotel') {
        info = "🏡 *Mehmonxona va Dachalar*\n\n• *Tavsif:* Rasmlarni ko'rish va joy band qilish (bron qilish) tizimi.\n• *Tayyor bo'lish muddati:* 5–7 kun\n• *Narxi:* $100 dan boshlab";
        serviceCode = "order_hotel";
    }

    const inlineKeyboard = Markup.inlineKeyboard([
        [Markup.button.callback('📝 Shu xizmatga buyurtma berish', serviceCode)]
    ]);

    ctx.reply(info, { parse_mode: 'Markdown', ...inlineKeyboard });
});

bot.action(/^order_(.+)$/, (ctx) => {
    ctx.answerCbQuery();
    const serviceType = ctx.match[1];
    const userId = ctx.from.id;
    if (!userState[userId]) userState[userId] = {};
    userState[userId].pendingService = serviceType;
    
    ctx.reply("📞 Ajoyib tanlov! Buyurtmani tasdiqlash uchun telefon raqamingizni yuboring:", Markup.keyboard([
        [Markup.button.contactRequest("📱 Telefon raqamni yuborish")],
        ['🔙 Ortga']
    ]).resize());
});

// --- 🎁 O'YIN: CHEGIRMA YUTIB OLISH ---
bot.hears(['🎁 O\'yin: Chegirma yutib olish!', '🎁 Сыграть и выиграть скидку!', '🎁 Play & Win Discount!'], (ctx) => {
    const userId = ctx.from.id;
    if (!userState[userId]) userState[userId] = {};

    if (userState[userId].hasPlayed) {
        return ctx.reply("⚠️ Siz bu o'yinni allaqachon o'ynagansiz! Har bir foydalanuvchiga faqat 1 ta imkoniyat beriladi. 🛑");
    }

    const winningBox = Math.floor(Math.random() * 3) + 1;
    userState[userId].winningBox = winningBox;

    const boxesKeyboard = Markup.inlineKeyboard([
        [
            Markup.button.callback('📦 1-Quti', 'box_1'),
            Markup.button.callback('📦 2-Quti', 'box_2'),
            Markup.button.callback('📦 3-Quti', 'box_3')
        ]
    ]);

    ctx.reply(
        "🎁 *Chegirma O'yini!*\n\n" +
        "Oldingizda 3 ta sirli quti bor. Ulardan birida **20% chegirma promokodi** yashiringan!\n" +
        "Omadli qutingizni tanlang (Faqat 1 ta urinish beriladi):",
        { parse_mode: 'Markdown', ...boxesKeyboard }
    );
});

bot.action(/^box_(\d+)$/, (ctx) => {
    ctx.answerCbQuery();
    const userId = ctx.from.id;
    const chosenBox = parseInt(ctx.match[1]);

    if (!userState[userId]) userState[userId] = {};

    if (userState[userId].hasPlayed) {
        return ctx.reply("⚠️ Siz allaqachon o'ynab bo'lgansiz!");
    }

    userState[userId].hasPlayed = true;
    const winningBox = userState[userId].winningBox;

    if (chosenBox === winningBox) {
        userState[userId].hasDiscount = true;
        ctx.reply(
            "🎉 *TABRIKLAYMIZ! Siz 20% chegirma yutib oldingiz!* 🏆🔥\n\n" +
            "Sizning shaxsiy promokodingiz: `VIP-2026-BILOL`\n" +
            "Bu kodni buyurtma berish vaqtida taqdim eting! 🚀",
            { parse_mode: 'Markdown' }
        );
    } else {
        ctx.reply(
            `😢 Afsus, bu quti bo'sh chiqdi (Yutug'li quti ${winningBox}-quti edi).\n` +
            "Afsuski urinishlar tugadi.",
            { parse_mode: 'Markdown' }
        );
    }
});

// --- 📞 ALOQA VA MUROJAAT ---
bot.hears(['📞 Aloqa va Murojaat', '📞 Контакты', '📞 Contacts'], (ctx) => {
    ctx.reply(
        "📬 *Biz bilan bog'lanish uchun ma'lumotlar:*\n\n" +
        "━━━━━━━━━━━━━━━━━━━\n" +
        "📞 *Telefon:* `+998 (99) 321-21-22`\n" +
        "💬 *Telegram Murojaat:* @sharipoov1\n" +
        "📸 *Instagram Profil:* [boburivlc__7](https://instagram.com/boburivlc__7)\n" +
        "📢 *Rasmiy Telegram Kanal:* [Bilol Web Developer](https://t.me/Bilolwebdeveloper)\n" +
        "━━━━━━━━━━━━━━━━━━━\n\n" +
        "💡 *Savollaringiz bo'lsa tugmalar orqali ma'lumot olishingiz mumkin!*",
        { parse_mode: 'Markdown', disable_web_page_preview: true }
    );
});

// --- BUYURTMA BERISH ---
bot.hears(['📝 Buyurtma berish', '📝 Заказать сайт', '📝 Order a Website'], (ctx) => {
    ctx.reply("👇 Buyurtmani rasmiylashtirish uchun telefon raqamingizni yuboring:", Markup.keyboard([
        [Markup.button.contactRequest("📱 Telefon raqamni yuborish")],
        ['🔙 Ortga']
    ]).resize());
});

bot.hears('🔙 Ortga', (ctx) => {
    const userId = ctx.from.id;
    const lang = userState[userId]?.lang || 'uz';
    ctx.reply("Asosiy menyu:", getMainMenu(lang));
});

bot.on('contact', async (ctx) => {
    const contact = ctx.message.contact;
    const user = ctx.message.from;
    const state = userState[ctx.from.id] || {};
    const service = state.pendingService ? `Tanlangan xizmat: ${state.pendingService}` : "Umumiy buyurtma";
    const discountInfo = state.hasDiscount ? "🎁 Yutgan chegirmasi: BOR (VIP-2026-BILOL)" : "Chegirma yutmagan";

    const adminMsg = `🚨 *Yangi buyurtma keldi!*\n\n👤 Ism: ${user.first_name}\n📞 Tel: +${contact.phone_number}\n🔗 Username: @${user.username || 'yoq'}\n📌 ${service}\n🏷 ${discountInfo}`;

    await bot.telegram.sendMessage(ADMIN_ID, adminMsg, { parse_mode: 'Markdown' });
    await ctx.reply("Rahmat! Ma'lumotlaringiz qabul qilindi. Tez orada bog'lanamiz! ✅");
});

bot.launch();
console.log("Bot mutlaqo bepul rejimda ishga tushdi! 🚀");

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));