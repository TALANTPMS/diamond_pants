const createState = ({
  key,
  showStatus = false,
  messages,
  options = [],
  requiresInput = false,
  next = null,
  autoNext = false,
  actionRedirect = false,
  video = null,
  fields = [],
  optionsClass = "",
}) => {
  if (!Array.isArray(fields)) {
    console.error(
      `Ошибка: поля для состояния ${key} должны быть массивом, но получено:`,
      fields
    );
    fields = [];
  }

  return {
    key,
    showStatus,
    messages,
    options,
    requiresInput,
    next,
    autoNext,
    actionRedirect,
    video,
    fields,
    optionsClass,
  };
};

const createOption = (label, value, next, optionsClass) => ({
  label,
  value,
  next,
  optionsClass,
});

const chatScenario = (() => {
  const states = {};

  const addState = (stateConfig) => {
    const state = createState(stateConfig);

    if (!state.fields) {
      if (state.key === "feedback" || "qusetion") {
        state.fields = ["name", "phone", "question", "city"];
      } else if (state.key === "city") {
        state.fields = ["city"];
      } else if (state.key === "question") {
        state.fields = ["question"];
      }
    }

    states[state.key] = state;
  };

  addState({
    key: "start",
    messages: [
      {
        type: "text",
        value:
          "<strong>Привет! Я Камила,</strong> виртуальный консультант франшизы <strong>«VINOPARK» 🍷 С радостью расскажу, как открыть ресторан в одной из самых эстетичных и стабильных ниш Казахстана</strong>",
      },
      {
        type: "text",
        value: `Мы создали не просто ресторан, а целую философию — место, где вино и кухня раскрывают друг друга. За 10 лет работы <strong>«VINOPARK»</strong> стал рестораном №1 для любителей вина в Шымкенте, а его винотека признана самой масштабной в городе. Теперь мы передаём эту проверенную модель партнёрам в других городах. <br><br>
          ✅ <strong>Уникальная концепция эногастрономии</strong> — гармония вина и блюд, которая выделяет нас на рынке и формирует лояльную аудиторию.<br>
          ✅ <strong>Крупнейшая винотека города</strong> — более 100 позиций со всего мира: от Франции и Италии до Чили и Новой Зеландии.<br>
          ✅ <strong>Готовая модель «под ключ»:</strong> инвестиции — от 90 млн ₸, чистая прибыль — от 6,6 млн ₸ в месяц, окупаемость — 16 месяцев.<br><br>
          <strong>Хотите узнать больше о франшизе? Выберите, что вас интересует! 👇</strong>`,
      },
    ],
    options: [
      createOption(
        "Какая у вас концепция и в чём уникальность?",
        "concept",
        "concept",
        "start"
      ),
      createOption(
        "Чем вы отличаетесь от конкурентов?",
        "competitors",
        "competitors",
        "start"
      ),
      createOption(
        "Насколько актуально запускать бизнес в этой нише?",
        "relevance",
        "relevance",
        "start start2"
      ),
      createOption(
        "Какие инвестиции нужны для старта?",
        "invest",
        "invest",
        "start start2"
      ),
      createOption(
        "Сколько я буду зарабатывать?",
        "pay",
        "pay",
        "start start2"
      ),
      createOption(
        "Из каких этапов будет состоять открытие?",
        "stages",
        "stages",
        "start start2"
      ),
      createOption(
        "Хочу задать свой вопрос",
        "question",
        "question",
        "start start2"
      ),
    ],
    optionsClass: "response-options response-options--main",
    video: "videos/start.mp4",
  });

  // --- CONCEPT ---

  addState({
    key: "concept",
    messages: [
      {
        type: "text",
        value: `Концепция <strong>«VINOPARK»</strong> строится вокруг философии эногастрономии — искусства гармоничного сочетания вина и еды. У нас вино не просто дополняет ужин, а является центральным элементом, который определяет атмосферу и формирует меню.<br><br>
          Главная гордость ресторана — наша винотека. Она официально признана самой масштабной в Шымкенте и насчитывает более 100 позиций: от виноградников Франции и Италии до Чили и Новой Зеландии.<br><br>
          В коллекции — известные мировые бренды напитков и сигар: Tignanello, Talbot, Chandon Brut, Moët & Chandon, Monte Cristo, Cohiba и другие.`,
      },
      {
        type: "text",
        value: `Сегодня <strong>«VINOPARK»</strong> — это 10 лет на рынке, 13 500+ живых подписчиков в Instagram, рейтинг 4.6 в 2ГИС и более 100 положительных отзывов ❤️<br><br>
          Мы передаем партнеру не просто бренд, а выверенную на практике систему, которая позволяет открыть в своём городе уникальное место — концепцию, под которую можно подобрать гостя любого вкуса и бюджета.`,
      },
      {
        type: "text",
        value: `Мы можем направить вам подробную презентацию франшизы, чтобы вы детально ознакомились с нашей концепцией и брендом. Хотите?`,
      },
    ],
    options: [
      createOption("Да", "yes", "contactOptions"),
      createOption("Нет", "no", "questionFranchise"),
    ],
  });

  // --- COMPETITORS ---

  addState({
    key: "competitors",
    messages: [
      {
        type: "text",
        value: `Мы отличаемся тем, что строим бизнес на реальных показателях, которые невозможно скопировать за один сезон:<br><br>
          ✅ <strong>10+ лет на рынке</strong> — проверенная модель, работающая в долгую.<br>
          ✅ <strong>Самая большая винотека в городе</strong> — более 100 видов вина и мировые бренды напитков.<br>
          ✅ <strong>13 500+ живых подписчиков в Instagram</strong> — сильный бренд и стабильный спрос.<br>
          ✅ <strong>Рейтинг 4.6 в 2ГИС и 100+ положительных отзывов</strong> — высокая лояльность гостей.<br>
          ✅ <strong>30+ сотрудников</strong> — отлаженная профессиональная команда.<br>
          ✅ <strong>Возврат гостей до 85%</strong> — клиенты приходят снова и снова.<br>
          ✅ <strong>Форматы на выбор:</strong> ресторан, летняя веранда, самовывоз, доставка до 60 минут.`,
      },
      {
        type: "text",
        value: `Именно этот комплекс — уникальная концепция, проверенный сервис, лояльная аудитория и широкие форматы обслуживания — формирует наше устойчивое преимущество на рынке 🍷`,
      },
      {
        type: "text",
        value: `Хотите получить фото и видео нашего ресторана и винотеки? Сможете оценить атмосферу и дизайн 🥰`,
      },
    ],
    options: [
      createOption("Да", "yes", "contactOptions2"),
      createOption("Нет", "no", "questionFranchise2"),
    ],
  });

  // --- RELEVANCE ---

  addState({
    key: "relevance",
    messages: [
      {
        type: "text",
        value: `Сейчас — лучшее время для запуска современного винного ресторана в Казахстане. Это подтверждается экономическими и потребительскими трендами:<br><br>
          <strong>Рост рынка общепита:</strong> оборот в 2024 году — 1 420–1 456 млрд тенге, рост 12–15% в сопоставимых ценах.<br><br>
          <strong>Высокая инвестиционная активность в отрасли</strong> — открываются новые заведения, спрос на премиум-сегмент стабильно растёт.<br><br>
          <strong>Рост доходов и урбанизация:</strong> доходы населения увеличились на 8–10% в 2024 году, городская плотность растёт, что напрямую стимулирует трафик в ресторанах.`,
      },
      {
        type: "text",
        value: `Винный сегмент имеет ещё одно важное преимущество — отсутствие сезонности. Гости приходят круглый год, а в плохую погоду приток клиентов увеличивается на 20–25% ☔🍷<br><br>
          Концепция эногастрономии — это растущий мировой тренд, и сейчас лучший момент, чтобы зайти в эту нишу первым в своём городе.`,
      },
      {
        type: "text",
        value: `Хотите получить подробный анализ рынка вашего города и узнать, насколько эта франшиза подходит именно вам?`,
      },
    ],
    options: [
      createOption("Да", "yes", "contactOptions3"),
      createOption("Нет", "no", "questionFranchise3"),
    ],
  });

  // --- INVEST ---

  addState({
    key: "invest",
    messages: [
      {
        type: "text",
        value: `Чтобы открыть ресторан <strong>«VINOPARK»</strong>, нужно от <strong>90 000 000 ₸</strong> — это полный стартовый комплект «под ключ».<br><br>
          В эту сумму уже входит паушальный взнос <strong>20 000 000 ₸</strong> за наш бренд, рецептуры, винную карту и сопровождение.<br><br>
          Ежемесячно вы платите только <strong>5% роялти</strong> с оборота и <strong>200 000 ₸</strong> маркетингового взноса, а вложенные средства окупаются в среднем за <strong>16 месяцев</strong> при рентабельности 15–20%.`,
      },
      {
        type: "text",
        value: `Из чего складываются инвестиции:<br><br>
          ✅ Ремонт помещения и входная группа<br>
          ✅ Торговое оборудование и инвентарь<br>
          ✅ Первоначальный закуп сырья и упаковки<br>
          ✅ Аренда и стартовые расходы<br>
          ✅ Винная коллекция от наших централизованных поставщиков<br><br>
          Эти вложения включают не только право работать под нашим именем, но и полный пакет запуска, который минимизирует ваши риски и ускоряет выход на прибыль 🤝`,
      },
      {
        type: "text",
        value: `Хотите получить финансовую модель, где подробно расписаны все инвестиционные затраты и план выхода на прибыль?`,
      },
    ],
    options: [
      createOption("Да", "yes", "contactOptions4"),
      createOption("Нет", "no", "questionFranchise4"),
    ],
  });

  // --- PAY ---

  addState({
    key: "pay",
    messages: [
      {
        type: "text",
        value: `Наша модель рассчитана на стрит-формат ресторана площадью от 300 м² на первой линии центральных улиц города. При такой конфигурации наши партнёры выходят на:<br><br>
          <strong>Средняя выручка:</strong> от 6 600 000 ₸ в месяц<br>
          <strong>Чистая прибыль:</strong> от 6 600 000 ₸ в месяц<br>
          <strong>Рентабельность:</strong> 15–20%<br>
          <strong>Окупаемость:</strong> 16 месяцев`,
      },
      {
        type: "text",
        value: `Доход стабильный круглый год — концепция не подвержена сезонности, а в плохую погоду трафик вырастет на 20–25%.<br><br>
          К этому добавляется возврат гостей до 85% — наши клиенты становятся постоянными, что обеспечивает прогнозируемую выручку ❤️`,
      },
      {
        type: "text",
        value: `Хотите получить подробные расчёты прибыли для вашего города? Мы учтем локальные особенности — аренду, спрос и средний чек.`,
      },
    ],
    options: [
      createOption("Да", "yes", "contactOptions5"),
      createOption("Нет", "no", "questionFranchise5"),
    ],
  });

  // --- STAGES ---

  addState({
    key: "stages",
    messages: [
      {
        type: "text",
        value: `Открытие ресторана <strong>«VINOPARK»</strong> по франшизе — это чёткий процесс, рассчитанный на 40–60 дней, где мы сопровождаем каждый шаг:<br><br>
          <span class="chat-list-item noMargin"><strong>Регистрация бизнеса</strong> — даём рекомендации по форме регистрации, налогообложению и открытию расчётного счёта.</span>
          <span class="chat-list-item noMargin"><strong>Поиск и ремонт помещения</strong> — помогаем с подбором, передаём 3D дизайн-проект ресторана с планом расстановки оборудования.</span>
          <span class="chat-list-item noMargin"><strong>Подбор и обучение персонала</strong> — обучение собственника и первого состава команды в течение 2 недель.</span>
          <span class="chat-list-item noMargin"><strong>Закуп продуктов и вина</strong> — передаём контакты проверенных поставщиков, централизованно поставляем вино — гарантия качества и цены.</span>
          <span class="chat-list-item noMargin"><strong>Запуск рекламы</strong> — за 2 недели до открытия настраиваем таргет, чтобы на момент старта у вас уже были первые клиенты.</span>
          <span class="chat-list-item noMargin"><strong>Праздничное открытие</strong> — наша выездная группа (управляющий и шеф-повар) лично приезжает к вам и полностью контролирует запуск.</span>`,
      },
      {
        type: "text",
        value: `После открытия мы остаёмся с вами: персональный менеджер по сопровождению, централизованный маркетинг, контент от мобилографа УК, подключение к iiko для контроля операционных показателей, работа с репутацией и тайные гости 🤝`,
      },
      {
        type: "text",
        value: `Хотите получить подробный план запуска бизнеса с детализацией по каждому этапу?`,
      },
    ],
    options: [
      createOption("Да", "yes", "contactOptions6"),
      createOption("Нет", "no", "questionFranchise6"),
    ],
  });

  // --- QUESTION ---

  addState({
    key: "question",
    messages: [
      {
        type: "text",
        value: "Что вас интересует?",
      },
    ],
    fields: ["question"],
    requiresInput: true,
    next: "contactOptions7",
  });

  // --- CONTACT OPTIONS ---

  addState({
    key: "contactOptions",
    messages: [
      {
        type: "text",
        value: "Где мы можем с вами связаться?",
      },
    ],
    options: [
      createOption("Telegram", "telegram", "phone"),
      createOption("WhatsApp", "whatsapp", "phone"),
    ],
  });

  addState({
    key: "contactOptions2",
    messages: [
      {
        type: "text",
        value: "Куда мы можем направить вам материалы?",
      },
    ],
    options: [
      createOption("Telegram", "telegram", "phone2"),
      createOption("WhatsApp", "whatsapp", "phone2"),
    ],
  });

  addState({
    key: "contactOptions3",
    messages: [
      {
        type: "text",
        value: "Куда мы можем направить вам анализ рынка?",
      },
    ],
    options: [
      createOption("Telegram", "telegram", "phone3"),
      createOption("WhatsApp", "whatsapp", "phone3"),
    ],
  });

  addState({
    key: "contactOptions4",
    messages: [
      {
        type: "text",
        value: "Куда мы можем направить вам финмодель?",
      },
    ],
    options: [
      createOption("Telegram", "telegram", "phone4"),
      createOption("WhatsApp", "whatsapp", "phone4"),
    ],
  });

  addState({
    key: "contactOptions5",
    messages: [
      {
        type: "text",
        value: "Куда мы можем направить вам финмодель?",
      },
    ],
    options: [
      createOption("Telegram", "telegram", "phone5"),
      createOption("WhatsApp", "whatsapp", "phone5"),
    ],
  });

  addState({
    key: "contactOptions6",
    messages: [
      {
        type: "text",
        value: "Куда мы можем направить вам план запуска?",
      },
    ],
    options: [
      createOption("Telegram", "telegram", "phone6"),
      createOption("WhatsApp", "whatsapp", "phone6"),
    ],
  });

  addState({
    key: "contactOptions7",
    messages: [
      {
        type: "text",
        value:
          "Мы передали ваш вопрос менеджеру и он уже готов связаться с вами, чтобы ответить на него лично. Где вам удобнее связаться?",
      },
    ],
    options: [
      createOption("Telegram", "telegram", "phone7"),
      createOption("WhatsApp", "whatsapp", "phone7"),
    ],
  });

  // --- PHONES ---

  addState({
    key: "phone",
    messages: [
      {
        type: "text",
        value: "Оставьте, пожалуйста, ваш номер телефона",
      },
    ],
    requiresInput: true,
    fields: ["phone"],
    next: "name",
  });

  addState({
    key: "phone2",
    messages: [
      {
        type: "text",
        value: "Оставьте, пожалуйста, ваш номер телефона",
      },
    ],
    requiresInput: true,
    fields: ["phone"],
    next: "name2",
  });

  addState({
    key: "phone3",
    messages: [
      {
        type: "text",
        value: "Оставьте, пожалуйста, ваш номер телефона",
      },
    ],
    requiresInput: true,
    fields: ["phone"],
    next: "name3",
  });

  addState({
    key: "phone4",
    messages: [
      {
        type: "text",
        value: "Оставьте, пожалуйста, ваш номер телефона",
      },
    ],
    requiresInput: true,
    fields: ["phone"],
    next: "name4",
  });

  addState({
    key: "phone5",
    messages: [
      {
        type: "text",
        value: "Оставьте, пожалуйста, ваш номер телефона",
      },
    ],
    requiresInput: true,
    fields: ["phone"],
    next: "name5",
  });

  addState({
    key: "phone6",
    messages: [
      {
        type: "text",
        value: "Оставьте, пожалуйста, ваш номер телефона",
      },
    ],
    requiresInput: true,
    fields: ["phone"],
    next: "name6",
  });

  addState({
    key: "phone7",
    messages: [
      {
        type: "text",
        value: "Оставьте, пожалуйста, ваш номер телефона",
      },
    ],
    requiresInput: true,
    fields: ["phone"],
    next: "name7",
  });

  // --- NAMES ---

  addState({
    key: "name",
    messages: [
      {
        type: "text",
        value: "Как мы можем к вам обращаться?",
      },
    ],
    requiresInput: true,
    fields: ["name"],
    next: "end",
  });

  addState({
    key: "name2",
    messages: [
      {
        type: "text",
        value: "Как мы можем к вам обращаться?",
      },
    ],
    requiresInput: true,
    fields: ["name"],
    next: "end2",
  });

  addState({
    key: "name3",
    messages: [
      {
        type: "text",
        value: "Как мы можем к вам обращаться?",
      },
    ],
    requiresInput: true,
    fields: ["name"],
    next: "end3",
  });

  addState({
    key: "name4",
    messages: [
      {
        type: "text",
        value: "Как мы можем к вам обращаться?",
      },
    ],
    requiresInput: true,
    fields: ["name"],
    next: "end4",
  });

  addState({
    key: "name5",
    messages: [
      {
        type: "text",
        value: "Как мы можем к вам обращаться?",
      },
    ],
    requiresInput: true,
    fields: ["name"],
    next: "end5",
  });

  addState({
    key: "name6",
    messages: [
      {
        type: "text",
        value: "Как мы можем к вам обращаться?",
      },
    ],
    requiresInput: true,
    fields: ["name"],
    next: "end6",
  });

  addState({
    key: "name7",
    messages: [
      {
        type: "text",
        value: "Как мы можем к вам обращаться?",
      },
    ],
    requiresInput: true,
    fields: ["name"],
    next: "end7",
  });

  // --- END STATES ---

  addState({
    key: "end",
    showStatus: true,
    messages: [
      {
        type: "text",
        value: "Спасибо! Наш менеджер скоро свяжется с вами!",
      },
    ],
    actionRedirect: true,
  });

  addState({
    key: "end2",
    showStatus: true,
    messages: [
      {
        type: "text",
        value: "Спасибо! Наш менеджер скоро свяжется с вами!",
      },
    ],
    actionRedirect: true,
  });

  addState({
    key: "end3",
    showStatus: true,
    messages: [
      {
        type: "text",
        value: "Спасибо! Наш менеджер скоро свяжется с вами!",
      },
    ],
    actionRedirect: true,
  });

  addState({
    key: "end4",
    showStatus: true,
    messages: [
      {
        type: "text",
        value: "Спасибо! Наш менеджер скоро свяжется с вами!",
      },
    ],
    actionRedirect: true,
  });

  addState({
    key: "end5",
    showStatus: true,
    messages: [
      {
        type: "text",
        value: "Спасибо! Наш менеджер скоро свяжется с вами!",
      },
    ],
    actionRedirect: true,
  });

  addState({
    key: "end6",
    showStatus: true,
    messages: [
      {
        type: "text",
        value: "Спасибо! Наш менеджер скоро свяжется с вами!",
      },
    ],
    actionRedirect: true,
  });

  addState({
    key: "end7",
    showStatus: true,
    messages: [
      {
        type: "text",
        value: "Спасибо! Наш менеджер скоро свяжется с вами и ответит на вопрос!",
      },
    ],
    actionRedirect: true,
  });

  // --- QUESTION FRANCHISE STATES (secondary menus after "Нет") ---

  // After "concept" → Нет
  addState({
    key: "questionFranchise",
    messages: [
      {
        type: "text",
        value: "Может вас заинтересуют другие вопросы о работе франшизы?",
      },
      {
        type: "options",
        value: [
          createOption(
            "Из каких этапов будет состоять открытие?",
            "stages",
            "stages",
            "start"
          ),
          createOption(
            "Чем вы отличаетесь от конкурентов?",
            "competitors",
            "competitors",
            "start"
          ),
          createOption(
            "Насколько актуально запускать бизнес в этой нише?",
            "relevance",
            "relevance",
            "start"
          ),
          createOption(
            "Какие инвестиции нужны для старта?",
            "invest",
            "invest",
            "start"
          ),
          createOption(
            "Сколько я буду зарабатывать?",
            "pay",
            "pay",
            "start"
          ),
          createOption(
            "Хочу задать свой вопрос",
            "question",
            "question",
            "start"
          ),
        ],
      },
    ],
    optionsClass: ".response-options--secondary",
  });

  // After "competitors" → Нет
  addState({
    key: "questionFranchise2",
    messages: [
      {
        type: "text",
        value: "Может вас заинтересуют другие вопросы о работе франшизы?",
      },
      {
        type: "options",
        value: [
          createOption(
            "Из каких этапов будет состоять открытие?",
            "stages",
            "stages",
            "start"
          ),
          createOption(
            "Какая у вас концепция и в чём уникальность?",
            "concept",
            "concept",
            "start"
          ),
          createOption(
            "Насколько актуально запускать бизнес в этой нише?",
            "relevance",
            "relevance",
            "start"
          ),
          createOption(
            "Какие инвестиции нужны для старта?",
            "invest",
            "invest",
            "start"
          ),
          createOption(
            "Сколько я буду зарабатывать?",
            "pay",
            "pay",
            "start"
          ),
          createOption(
            "Хочу задать свой вопрос",
            "question",
            "question",
            "start"
          ),
        ],
      },
    ],
    optionsClass: ".response-options--secondary",
  });

  // After "relevance" → Нет
  addState({
    key: "questionFranchise3",
    messages: [
      {
        type: "text",
        value: "Может вас заинтересуют другие вопросы о работе франшизы?",
      },
      {
        type: "options",
        value: [
          createOption(
            "Из каких этапов будет состоять открытие?",
            "stages",
            "stages",
            "start"
          ),
          createOption(
            "Какая у вас концепция и в чём уникальность?",
            "concept",
            "concept",
            "start"
          ),
          createOption(
            "Чем вы отличаетесь от конкурентов?",
            "competitors",
            "competitors",
            "start"
          ),
          createOption(
            "Какие инвестиции нужны для старта?",
            "invest",
            "invest",
            "start"
          ),
          createOption(
            "Сколько я буду зарабатывать?",
            "pay",
            "pay",
            "start"
          ),
          createOption(
            "Хочу задать свой вопрос",
            "question",
            "question",
            "start"
          ),
        ],
      },
    ],
    optionsClass: ".response-options--secondary",
  });

  // After "invest" → Нет
  addState({
    key: "questionFranchise4",
    messages: [
      {
        type: "text",
        value: "Может вас заинтересуют другие вопросы о работе франшизы?",
      },
      {
        type: "options",
        value: [
          createOption(
            "Из каких этапов будет состоять открытие?",
            "stages",
            "stages",
            "start"
          ),
          createOption(
            "Какая у вас концепция и в чём уникальность?",
            "concept",
            "concept",
            "start"
          ),
          createOption(
            "Чем вы отличаетесь от конкурентов?",
            "competitors",
            "competitors",
            "start"
          ),
          createOption(
            "Насколько актуально запускать бизнес в этой нише?",
            "relevance",
            "relevance",
            "start"
          ),
          createOption(
            "Сколько я буду зарабатывать?",
            "pay",
            "pay",
            "start"
          ),
          createOption(
            "Хочу задать свой вопрос",
            "question",
            "question",
            "start"
          ),
        ],
      },
    ],
    optionsClass: ".response-options--secondary",
  });

  // After "pay" → Нет
  addState({
    key: "questionFranchise5",
    messages: [
      {
        type: "text",
        value: "Может вас заинтересуют другие вопросы о работе франшизы?",
      },
      {
        type: "options",
        value: [
          createOption(
            "Из каких этапов будет состоять открытие?",
            "stages",
            "stages",
            "start"
          ),
          createOption(
            "Какая у вас концепция и в чём уникальность?",
            "concept",
            "concept",
            "start"
          ),
          createOption(
            "Чем вы отличаетесь от конкурентов?",
            "competitors",
            "competitors",
            "start"
          ),
          createOption(
            "Насколько актуально запускать бизнес в этой нише?",
            "relevance",
            "relevance",
            "start"
          ),
          createOption(
            "Какие инвестиции нужны для старта?",
            "invest",
            "invest",
            "start"
          ),
          createOption(
            "Хочу задать свой вопрос",
            "question",
            "question",
            "start"
          ),
        ],
      },
    ],
    optionsClass: ".response-options--secondary",
  });

  // After "stages" → Нет
  addState({
    key: "questionFranchise6",
    messages: [
      {
        type: "text",
        value: "Может вас заинтересуют другие вопросы о работе франшизы?",
      },
      {
        type: "options",
        value: [
          createOption(
            "Сколько я буду зарабатывать?",
            "pay",
            "pay",
            "start"
          ),
          createOption(
            "Какая у вас концепция и в чём уникальность?",
            "concept",
            "concept",
            "start"
          ),
          createOption(
            "Чем вы отличаетесь от конкурентов?",
            "competitors",
            "competitors",
            "start"
          ),
          createOption(
            "Насколько актуально запускать бизнес в этой нише?",
            "relevance",
            "relevance",
            "start"
          ),
          createOption(
            "Какие инвестиции нужны для старта?",
            "invest",
            "invest",
            "start"
          ),
          createOption(
            "Хочу задать свой вопрос",
            "question",
            "question",
            "start"
          ),
        ],
      },
    ],
    optionsClass: ".response-options--secondary",
  });

  return states;
})();