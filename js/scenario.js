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
          "<strong> Привет! Меня зовут Алина,</strong>  я ваш виртуальный консультант франшизы <strong>«Diamond Paints» 🙂 С радостью расскажу, как открыть прибыльный магазин красок и покрытий с поддержкой ведущего бренда 🎉</strong> ",
      },
      {
        type: "text",
        value: `<strong>Став нашим франчайзи, </strong> вы запускаете бизнес по принципу фирменной розничной точки, которая продаёт продукцию <strong>Diamond Paints</strong>  и работает по проверенным стандартам <br><br>
          <strong>Вы получаете полный пакет для старта:</strong>  готовую модель магазина, пошаговые инструкции, обучение команды и настройки маркетинга — так, чтобы продажи начали расти сразу после открытия <br><br>
          ✅ <strong>Работа по понятной модели:</strong>  мы обеспечиваем поставки и поддержку, вы управляете магазином и зарабатываете на продажах <br> 
          ✅ <strong>Более 30 лет исследований и разработок</strong>  сделали нашу продукцию выбором № 1  <br>
          ✅ <strong>Крупнейшее в Пакистане интегрированное производство 32 500 м²:</strong>  до 13 млн литров краски и 850 т порошковых покрытий в месяц  <br>
          ✅ <strong>Широкий ассортимент:</strong>  декоративные, промышленные, порошковые, авто — и защитные покрытия  <br>
          ✅ <strong>Минимум рисков:</strong>  на старте нет вложений в склад — всё отгружается со склада Управляющей компании в Алматы, что ускоряет доставку и снижает издержки <br><br>
          <strong> Готовы рассказать подробнее о франшизе 🤝</strong>`,
      },
      {
        type: "text",
        value: `<strong>Выберите, что вас интересует?</strong>`,
      },
    ],
    options: [
      createOption("В чем идея франшизы?", "support", "support", "start"),
      createOption(
        "В чем уникальность вашего бренда?",
        "format",
        "format",
        "start"
      ),
      createOption(
        "Какие инвестиции нужны для старта?",
        "invest",
        "invest",
        "start"
      ),
      createOption(
        "Кто ваша целевая аудитория?",
        "bisenes",
        "bisenes",
        "start start2"
      ),
      createOption(
        "Сколько можно зарабатывать на этом бизнесе?",
        "pay",
        "pay",
        "start start2"
      ),
      createOption("Как искать клиентов?", "open", "open", "start start2"),
      createOption("Хочу задать свой вопрос", "question", "question", "start start2"),
    ],
    optionsClass: "response-options response-options--main",
    video: "videos/start.mp4",
  });

  addState({
    key: "support",
    messages: [
      {
        type: "text",
        value: `
          <strong>Идея франшизы Diamond Paints — </strong> предоставить предпринимателю готовую, проверенную модель бизнеса по продаже лакокрасочных материалов. <strong>Вы открываете Brand Shop (Color Studio) с колеровочным оборудованием или Corner Diamond Paints</strong>  без оборудования, а мы обеспечиваем:<br>
          <span class="chat-list-item noMargin">поставку качественного ассортимента и оборудования по конкурентной цене;</span> 
          <span class="chat-list-item noMargin">обучение и подбор сотрудников;</span> 
          <span class="chat-list-item noMargin">запуск магазина по проверенной модели с таргетированной рекламой;</span> 
          <span class="chat-list-item noMargin">полный пакет документов и пошаговые инструкции по продажам;</span> 
          <span class="chat-list-item noMargin">контроль и поддержку Управляющей компании на всех этапах работы.</span>   <br> 
          Франшиза построена так, чтобы магазин уже <strong>в первый месяц выходил на безубыточность и позволял получать стабильный доход</strong> 
        `,
      },
      {
        type: "text",
        value: `
          Хотите получить пример партнерского договора, где описаны все детали сотрудничества?
        `,
      },
    ],
    options: [
      createOption("Да", "yes", "contactOptions"),
      createOption("Нет", "no", "questionFranchise"),
    ],
  });
  //----------------------------
  addState({
    key: "format",
    messages: [
      {
        type: "text",
        value: `
            Уникальность бренда <strong>«Diamond Paints»</strong>  заключается в сочетании <strong>качества, инноваций и эксклюзивности:</strong> <br><br>
            <span class="chat-list-item noMargin"> <strong>Высокое качество продукции — </strong> краски создаются с использованием современных технологий и тщательно отобранного сырья, что обеспечивает отличную адгезию, долговечность и стойкость к внешним воздействиям. </span> 

            <span class="chat-list-item noMargin"><strong>Инновации и исследования (R&D) — </strong> мы постоянно развиваем новые продукты и технологии, чтобы соответствовать меняющимся потребностям клиентов и создавать решения, которые выгодны бизнесу.</span> 


            <span class="chat-list-item noMargin"><strong>Эксклюзивность и доступность — </strong> Diamond Paints имеет эксклюзивные права на дистрибуцию в Казахстане и предлагает продукцию по конкурентным ценам, часто дешевле аналогичных брендов премиум-сегмента.</span> 


            <span class="chat-list-item noMargin"><strong> Поддержка партнеров — </strong>обучение и развитие персонала, помощь в организации бизнес-процессов и маркетинга позволяют франчайзи быстро выйти на безубыточность и стабильный доход.</span> 


            <span class="chat-list-item noMargin"><strong>Надежность и репутация — </strong> бренд известен в Казахстане благодаря активной работе с дистрибьюторами, строительными компаниями и дизайнерскими студиями, семинарам и мастер-классам, что укрепляет доверие клиентов и партнеров.</span> 
        `,
      },
      {
        type: "text",
        value: `
          <strong>Хотите получить подробную презентацию франшизы с реальными кейсами и примерами?</strong> 
        `,
      },
    ],
    options: [
      createOption("Да", "yes", "contactOptions2"),
      createOption("Нет", "no", "responseChoice"),
    ],
  });

  //----------------------------

  addState({
    key: "invest",
    messages: [
      {
        type: "text",
        value: `
          <strong>Продажа лакокрасочных материалов для внутренних и наружных работ с полным колеровочным оборудованием.</strong>  <br><br>
          <span class="chat-list-item noMargin">Площадь торгового зала: от 40 м² (рекомендуемая — 60–100 м²)</span> 
          <span class="chat-list-item noMargin">Тип помещения: строительный комплекс или отдельно стоящий магазин с высокой проходимостью</span> 
          <span class="chat-list-item noMargin">Инвестиции: от 20 600 000 тенге</span> 
          <span class="chat-list-item noMargin">Паушальный взнос: 4 500 000 тенге</span> 
          <span class="chat-list-item noMargin">Роялти: отсутствует</span> 
          <span class="chat-list-item noMargin">Чистая прибыль: от 1 700 000 тенге в месяц после 6 месяцев работы</span> 
          <span class="chat-list-item noMargin">Окупаемость: около 15 месяцев</span> 

        `,
      },
      {
        type: "text",
        value: `
          <strong>Продажа лакокрасочных материалов для внутренних и наружных работ в существующем магазине, с выставочной продукцией. </strong>  <br>
          <span class="chat-list-item noMargin">Площадь торгового зала: не менее 40 м² (рекомендуемая — 60–100 м²) </span> 
          <span class="chat-list-item noMargin">Инвестиции: 7 800 000 тенге</span>  
          <span class="chat-list-item noMargin">Паушальный взнос: отсутствует</span>  
          <span class="chat-list-item noMargin">Роялти: отсутствует</span>  
          <span class="chat-list-item noMargin">Чистая прибыль: от 600 000 тенге в месяц</span> 
          <span class="chat-list-item noMargin">Окупаемость: около 22 месяцев</span>   
        `,
      },
      {
        type: "text",
        value: `
          <strong>Оба формата включают полное сопровождение франчайзи: подбор ассортимента и оборудования, обучение персонала, настройку маркетинга и контроль эффективности работы торговой точки.</strong> 
        `,
      },
      {
        type: "text",
        value: `
          <strong>Хотите получить подробную финансовую модель, где будут подробно расписаны ваши инвестиционные затраты?</strong> 
        `,
      },
    ],
    options: [
      createOption("Да", "yes", "contactOptions3"),
      createOption("Нет", "no", "responseChoice3"),
    ],
  });

  //----------------------------

  addState({
    key: "bisenes",
    messages: [
      {
        type: "text",
        value: `
          Целевая аудитория <strong>«Diamond Paints»</strong>  включает следующие группы:<br><br>

          <strong>1. Владельцы домов и квартир —</strong>  планируют ремонт или обновление интерьеров и экстерьеров, ищут советы по выбору цвета и типа покрытия, а также информацию о правильном применении материалов.  <br><br>

          <strong>2. Дизайнеры интерьеров — </strong> профессионалы, заинтересованные в эксклюзивных и стильных решениях для своих клиентов, новинках и образцах для презентаций.  <br><br>

          <strong>3. Малые предприятия и организации —</strong>  кафе, рестораны, магазины, офисы, агенты по недвижимости, мастера-маляры, которые хотят обновить свои помещения, создавая привлекательный внешний вид для клиентов. Их интересуют доступные решения с хорошим соотношением цены и качества.  <br><br>

          <strong>4. Хоббисты и любители DIY —</strong>  люди, увлекающиеся ремонтом и созданием проектов своими руками, ищут доступные и простые в использовании материалы, обучающие рекомендации и советы по выбору.
        `,
      },
      {
        type: "text",
        value: `
          <strong>Хотите получить пример маркетинговой стратегии, которая поможет вам выйти на первых покупателей и быстро прийти к первым продажам?</strong> 
        `,
      },
    ],
    options: [
      createOption("Да", "yes", "contactOptions4"),
      createOption("Нет", "no", "responseChoice4"),
    ],
  });

  //----------------------------

  addState({
    key: "pay",
    messages: [
      {
        type: "text",
        value: `
            ПС франшизой <strong>Diamond Paints</strong>  вы можете зарабатывать <strong>от 1 700 000 тенге чистой прибыли в месяц.</strong> <br>
            Уже в первый месяц работы магазин выходит  на <strong>точку безубыточности,</strong>  а дальнейшее развитие принесет стабильный доход и неизбежный рост.
        `,
      },
      {
        type: "text",
        value: `
           <strong>Хотите получить подробную финансовую модель, где подробно расписан прогноз роста вашей прибыли?</strong> 
        `,
      },
    ],
    options: [
      createOption("Да", "yes", "contactOptions5"),
      createOption("Нет", "no", "questionFranchise5"),
    ],
  });

  //----------------------------

  addState({
    key: "open",
    messages: [
      {
        type: "text",
        value: `
            Для привлечения и удержания клиентов мы предлагаем использовать сочетание <strong>офлайн- и  онлайн-стратегий:</strong> <br><br> 
            <strong>Офлайн-стратегии:</strong>  <br><br>
            <span class="chat-list-item noMargin"><strong>Физический магазин (брендшоп):</strong>  создаём привлекательный дизайн и атмосферу, в которой клиентам приятно находиться. </span> 
            <span class="chat-list-item noMargin"><strong>Профессиональные консультанты:</strong>  обучение персонала колористике, свойствам продукции и техникам нанесения для качественного обслуживания. </span> 
            <span class="chat-list-item noMargin"><strong>Зона для тестирования:</strong>   предоставление клиентам возможности попробовать продукцию на небольших образцах. </span>
            <span class="chat-list-item noMargin"><strong>Сотрудничество с профессионалами:</strong>   дизайнеры интерьеров и архитекторы получают специальные условия, образцы и обучение — они рекомендуют ваши материалы своим клиентам.</span>
            <span class="chat-list-item noMargin"><strong>Строительные бригады и маляры: </strong>  создаём партнерские программы, скидки и программы лояльности для постоянных клиентов. </span>
            <span class="chat-list-item noMargin"><strong>Участие в выставках и мероприятиях: </strong>  строительные и интерьерные выставки позволяют показать продукцию, заявить о бренде и привлечь новых клиентов.  </span>
        `,
      },
      {
        type: "text",
        value: `
          <strong>Онлайн-стратегии:</strong> <br><br>
          <span class="chat-list-item noMargin"> <strong>Таргетированная реклама в Instagram</strong>  по интересам (ремонт, дизайн интерьера, строительство) и демографическим данным.</span> 
          <span class="chat-list-item noMargin"> <strong>Email-маркетинг </strong> для удержания и информирования клиентов.</span> 
          <span class="chat-list-item noMargin"> <strong>Геолокационные площадки</strong>  для привлечения локальной аудитории.</span> 
        `,
      },
      {
        type: "text",
        value: `
          <strong>Мы можем провести для вас бесплатную онлайн-консультацию и более подробно рассказать о нашем бренде, клиентах и прочем. Хотите?</strong> 
        `,
      },
    ],
    options: [
      createOption("Да", "yes", "contactOptions6"),
      createOption("Нет", "no", "questionFranchise6"),
    ],
  });

  //----------------------------

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

  //social========================================================================================

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
        value: "Где мы можем с вами связаться?",
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
        value: "Где мы можем с вами связаться?",
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
        value: "Где мы можем с вами связаться?",
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
        value: "Где мы можем с вами связаться?",
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
        value: "Где мы можем с вами связаться?",
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

  //phones========================================================================================

  addState({
    key: "phone",
    messages: [
      {
        type: "text",
        value: "Оставьте ваш номер телефона 😉",
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
        value: "Оставьте ваш номер телефона 😉",
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
        value: "Оставьте ваш номер телефона 😉",
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
        value: "Оставьте ваш номер телефона 😉",
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
        value: "Оставьте ваш номер телефона 😉",
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
        value: "Оставьте ваш номер телефона 😉",
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
        value: "Оставьте ваш номер телефона 😉",
      },
    ],
    requiresInput: true,
    fields: ["phone"],
    next: "responseChoice2",
  });

  //names========================================================================================

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

  //========================================================================================

  addState({
    key: "city",
    messages: [
      {
        type: "text",
        value: "В каком городе вы проживаете?",
      },
    ],
    requiresInput: true,
    fields: ["city"],
    next: "investments",
  });

  //end========================================================================================

  addState({
    key: "end",
    showStatus: true,
    messages: [
      {
        type: "text",
        value: "Спасибо! Наш менеджер скоро свяжется с вами!🤝",
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
        value: "Наш менеджер направит вам информацию в ближайшее время 🤝",
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
        value: "Наш менеджер скоро свяжется с вами😉",
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
        value: "Наш менеджер скоро свяжется с вами😉",
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
        value: "Наш менеджер скоро свяжется с вами😉",
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
        value: "Наш менеджер скоро свяжется с вами😉",
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
        value: "Спасибо! Скоро мы свяжемся с вами😉",
      },
    ],
    actionRedirect: true,
  });

  //========================================================================================

  addState({
    key: "responseChoice",
    messages: [
      {
        type: "text",
        value: " Может вы хотите получить подробный план запуска бизнеса?",
      },
    ],
    options: [
      createOption("Да", "yes", "contactOptions2"),
      createOption("Нет", "no", "questionFranchise2"),
    ],
  });

  addState({
    key: "responseChoice2",
    messages: [
      {
        type: "text",
        value: "Вам лучше позвонить или написать?",
      },
    ],
    options: [
      createOption("Позвонить", "call", "name7"),
      createOption("Написать", "write", "name7"),
    ],
  });

  addState({
    key: "responseChoice3",
    messages: [
      {
        type: "text",
        value: "Может вы хотите получить подробную презентацию нашего бизнеса?",
      },
    ],
    options: [
      createOption("Да", "yes", "contactOptions3"),
      createOption("Нет", "no", "questionFranchise3"),
    ],
  });

  addState({
    key: "responseChoice4",
    messages: [
      {
        type: "text",
        value: "Может вы хотите получить подробный план запуска бизнеса?",
      },
    ],
    options: [
      createOption("Да", "yes", "contactOptions4"),
      createOption("Нет", "no", "questionFranchise4"),
    ],
  });

  //questionFranchise========================================================================================

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
            "В чем уникальность вашего бренда?",
            "format",
            "format",
            "start"
          ),
          createOption(
            "Какие инвестиции нужны для старта?",
            "invest",
            "invest",
            "start"
          ),
          createOption(
            "Кто ваша целевая аудитория?",
            "bisenes",
            "bisenes",
            "start"
          ),
          createOption(
            "Сколько можно зарабатывать на этом бизнесе?",
            "pay",
            "pay",
            "start"
          ),
          createOption("Как искать клиентов?", "open", "open", "start"),
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
          createOption("В чем идея франшизы?", "support", "support", "start"),
          createOption(
            "Какие инвестиции нужны для старта?",
            "invest",
            "invest",
            "start"
          ),
          createOption(
            "Кто ваша целевая аудитория?",
            "bisenes",
            "bisenes",
            "start"
          ),
          createOption(
            "Сколько можно зарабатывать на этом бизнесе?",
            "pay",
            "pay",
            "start"
          ),
          createOption("Как искать клиентов?", "open", "open", "start"),
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
          createOption("В чем идея франшизы?", "support", "support", "start"),
          createOption(
            "В чем уникальность вашего бренда?",
            "format",
            "format",
            "start"
          ),
          createOption(
            "Кто ваша целевая аудитория?",
            "bisenes",
            "bisenes",
            "start"
          ),
          createOption(
            "Сколько можно зарабатывать на этом бизнесе?",
            "pay",
            "pay",
            "start"
          ),
          createOption("Как искать клиентов?", "open", "open", "start"),
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
          createOption("В чем идея франшизы?", "support", "support", "start"),
          createOption(
            "В чем уникальность вашего бренда?",
            "format",
            "format",
            "start"
          ),
          createOption(
            "Какие инвестиции нужны для старта?",
            "invest",
            "invest",
            "start"
          ),
          createOption(
            "Сколько можно зарабатывать на этом бизнесе?",
            "pay",
            "pay",
            "start"
          ),
          createOption("Как искать клиентов?", "open", "open", "start"),
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
          createOption("В чем идея франшизы?", "support", "support", "start"),
          createOption(
            "В чем уникальность вашего бренда?",
            "format",
            "format",
            "start"
          ),
          createOption(
            "Какие инвестиции нужны для старта?",
            "invest",
            "invest",
            "start"
          ),
          createOption(
            "Кто ваша целевая аудитория?",
            "bisenes",
            "bisenes",
            "start"
          ),
          createOption("Как искать клиентов?", "open", "open", "start"),
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
          createOption("В чем идея франшизы?", "support", "support", "start"),
          createOption(
            "В чем уникальность вашего бренда?",
            "format",
            "format",
            "start"
          ),
          createOption(
            "Какие инвестиции нужны для старта?",
            "invest",
            "invest",
            "start"
          ),
          createOption(
            "Кто ваша целевая аудитория?",
            "bisenes",
            "bisenes",
            "start"
          ),
          createOption(
            "Сколько можно зарабатывать на этом бизнесе?",
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

  addState({
    key: "questionFranchise7",
    messages: [
      {
        type: "text",
        value: "Может вас заинтересуют другие вопросы о работе франшизы?",
      },
      {
        type: "options",
        value: [
          createOption("В чем идея франшизы?", "support", "support", "start"),
          createOption(
            "В чем уникальность вашего бренда?",
            "format",
            "format",
            "start"
          ),
          createOption(
            "Какие инвестиции нужны для старта?",
            "invest",
            "invest",
            "start"
          ),
          createOption(
            "Кто ваша целевая аудитория?",
            "bisenes",
            "bisenes",
            "start"
          ),
          createOption(
            "Сколько можно зарабатывать на этом бизнесе?",
            "pay",
            "pay",
            "start"
          ),
          createOption("Как искать клиентов?", "open", "open", "start"),
        ],
      },
    ],
    optionsClass: ".response-options--secondary",
  });

  return states;
})();
