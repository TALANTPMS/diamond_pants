// РҐСЂР°РЅРµРЅРёРµ РґР°РЅРЅС‹С…
const chatHistory = [];

const chatContent = document.getElementById("chatContent");
const typingIndicator = document.getElementById("typingIndicator");
const botNotificationSound = new Audio("audio/ringtone.mp3");
let lastOptions = null;
let isBotBusy = false;
let allowedScroll = false;
let botMessageCount = 0;
let swiperInstance = null;

$(document).one("click", ".response-options button", function () {
  allowedScroll = true;
});

function animateFadeIn(element) {
  anime({
    targets: element,
    opacity: [0, 1],
    translateY: [-10, 0],
    duration: 600,
    easing: "easeOutQuad",
  });
}

function smoothScrollToBottom() {
  if (!allowedScroll) {
    return;
  }

  anime({
    targets: [document.documentElement, document.body],
    scrollTop: chatContent.scrollHeight + 140,
    duration: 800,
    easing: "easeInOutQuad",
  });
}

function displayStatus(status) {
  const statusContainer = document.querySelector("#status");

  if (statusContainer) {
    if (status) {
      statusContainer.style.display = "block";
      anime({
        targets: statusContainer,
        opacity: [0, 1],
        translateY: [8, 0],
        duration: 800,
        easing: "easeOutQuad",
      });
    } else {
      statusContainer.style.display = "none";
    }
  }
}

function clearOptions() {
  if (lastOptions) {
    lastOptions.remove();
    lastOptions = null;
  }
}

function appendMessage({ text, value, key, isUser, skipScroll }) {
  const message = document.createElement("div");
  message.className = `message ${isUser ? "user-message" : "bot-message"}`;
  message.innerHTML = `<p>${text}</p>`;
  chatContent.appendChild(message);

  chatHistory.push({
    sender: isUser ? "user" : "bot",
    key: key,
    message: value || text,
    timestamp: new Date().toISOString(),
  });

  animateFadeIn(message);
  if (!isUser) {
    lastBotMessage = message;
  }
  if (!skipScroll) smoothScrollToBottom();

  return message;
}

function showTypingIndicator(delay) {
  anime({
    targets: typingIndicator,
    opacity: 1,
    duration: 400,
    translateX: [-2, 0],
    easing: "easeInOutQuad",
    begin: () => {
      if (typingIndicator) {
        typingIndicator.style.display = "block";
      }
    },
  });

  return new Promise((resolve) => {
    setTimeout(() => {
      anime({
        targets: typingIndicator,
        opacity: 0,
        duration: 200,
        translateX: [0, 0],
        easing: "easeInOutQuad",
        complete: () => {
          if (typingIndicator) {
            typingIndicator.style.display = "none";
          }
          resolve();
        },
      });
    }, delay);
  });
}

async function appendBotMessageWithDelay(message, key) {
  const delayMap = {
    text: Math.min(message.value.length * 18, 4000),
    swiper: 2000,
  };

  isBotBusy = true;

  await showTypingIndicator(delayMap[message.type] || 0);

  botNotificationSound.play();

  switch (message.type) {
    case "text":
      appendMessage({ text: message.value, key: key });
      break;
    case "swiper":
      renderSwiper(message.value);
      break;
    case "options":
      renderOptions(key, message.value);
      break;
  }

  isBotBusy = false;
}

function renderOptions(key, options, optionsClass) {
  clearOptions();

  const responseContainer = document.createElement("div");
  responseContainer.className = "response-options";
  optionsClass ? (responseContainer.className = optionsClass) : "";

  options.forEach(({ label, value, next, optionsClass }) => {
    const button = document.createElement("button");
    button.type = "button";
    button.innerHTML = label;
    //button.className = optionsClass;
    optionsClass ? (button.className = optionsClass) : "";
    button.onclick = () => {
      if (isBotBusy) return;
      appendMessage({ text: label, value: value, key: key, isUser: true });

      if (/^questionFranchise\d*$/.test(key) && lastBotMessage) {
        lastBotMessage.remove();
        lastBotMessage = null;
      }

      clearOptions();
      processChatState(next);
    };
    responseContainer.appendChild(button);
  });

  chatContent.appendChild(responseContainer);
  animateFadeIn(responseContainer);
  smoothScrollToBottom();
  lastOptions = responseContainer;
}

function renderSwiper(swiperItems) {
  const itemsTemplate = swiperItems.map(
    ({ src }) => `
    <div class="swiper-slide">
      <div>
        <img class="tap-color" src="${src}" alt="${src.split("/").pop()}" />
      </div>
    </div>
  `
  );

  const template = `
    <div class="swiper-container swiper-chat">
      <div class="swiper-wrapper">
        ${itemsTemplate.join("")}
      </div>
      <div class="gallery-pagination swiper-bullets"></div>
    </div>
  `;

  const element = new DOMParser().parseFromString(template, "text/html").body
    .firstElementChild;

  chatContent.appendChild(element);
  animateFadeIn(element);
  smoothScrollToBottom();

  new Swiper(element, {
    speed: 450,
    effect: "slide",
    rewind: true,
    grabCursor: true,
    pagination: {
      el: ".gallery-pagination",
      clickable: true,
    },
    breakpoints: {
      200: {
        spaceBetween: 10,
        slidesPerView: 1,
      },
      768: {
        spaceBetween: 14,
        slidesPerView: 3,
      },
      1400: {
        spaceBetween: 22,
        slidesPerView: 3,
      },
    },
  });
}

function renderTextInput(key, callback) {
  const inputContainer = document.createElement("div");
  inputContainer.className = "textarea-container";

  const inputWrapper = document.createElement("div");
  inputWrapper.className = "input";

  const textarea = document.createElement("textarea");
  textarea.className = "input__field input__field--textarea";
  textarea.placeholder = "Ваш вопрос...";

  inputWrapper.appendChild(textarea);

  const submitButton = document.createElement("button");
  submitButton.type = "button";
  submitButton.className = "btn";
  submitButton.textContent = "отправить";
  submitButton.onclick = () => {
    const userInput = textarea.value.trim();
    if (!userInput) return;

    appendMessage({ text: userInput, key: key, isUser: true });
    inputContainer.remove();
    if (callback) callback(userInput);
  };

  inputContainer.appendChild(inputWrapper);
  inputContainer.appendChild(submitButton);

  chatContent.appendChild(inputContainer);

  animateFadeIn(inputContainer);
  smoothScrollToBottom();
  lastOptions = inputContainer;
}

function renderPhoneInput(key, callback) {
  const inputContainer = document.createElement("div");
  inputContainer.className = "textarea-container";

  const form = document.createElement("form");
  form.className = "dynamic-form";

  const inputField = document.createElement("input");
  inputField.type = "tel";
  inputField.name = "phone";
  inputField.placeholder = "Ваш телефон";
  inputField.className = "input__field";
  inputField.autocomplete = "off";

  Inputmask({ mask: "+7 (999) 999 9999", showMaskOnHover: false }).mask(
    inputField
  );

  const submitButton = document.createElement("button");
  submitButton.className = "btn";
  submitButton.type = "submit";
  submitButton.textContent = "Отправить";

  form.appendChild(inputField);
  form.appendChild(submitButton);
  inputContainer.appendChild(form);

  chatContent.appendChild(inputContainer);

  animateFadeIn(inputContainer);
  smoothScrollToBottom();
  lastOptions = inputContainer;

  $(form).validate({
    errorPlacement: function () {},
    rules: {
      phone: {
        required: true,
        phone: true,
      },
    },
    submitHandler: function () {
      const phoneNumber = inputField.value.trim();
      appendMessage({ text: phoneNumber, key: key, isUser: true });
      inputContainer.remove();
      if (callback) callback(phoneNumber);
    },
  });
}

function renderCityInput(key, callback) {
  const inputContainer = document.createElement("div");
  inputContainer.className = "textarea-container";

  const form = document.createElement("form");
  form.className = "dynamic-form";

  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.name = "city";
  inputField.placeholder = "Ваш город";
  inputField.className = "input__field";
  inputField.autocomplete = "off";

  const submitButton = document.createElement("button");
  submitButton.className = "btn";
  submitButton.type = "submit";
  submitButton.textContent = "Отправить";

  form.appendChild(inputField);
  form.appendChild(submitButton);
  inputContainer.appendChild(form);

  chatContent.appendChild(inputContainer);

  animateFadeIn(inputContainer);
  smoothScrollToBottom();
  lastOptions = inputContainer;

  $(form).validate({
    errorPlacement: function () {},
    rules: {
      city: {
        required: true,
      },
    },
    submitHandler: function () {
      const userCity = inputField.value.trim();
      appendMessage({ text: userCity, key: key, isUser: true });
      inputContainer.remove();
      if (callback) callback(userCity);
    },
  });
}

function renderNameInput(key, callback) {
  const inputContainer = document.createElement("div");
  inputContainer.className = "textarea-container";

  const form = document.createElement("form");
  form.className = "dynamic-form";

  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.name = "name";
  inputField.placeholder = "Ваше имя";
  inputField.className = "input__field";
  inputField.autocomplete = "off";

  $(inputField).on("input", function () {
    let value = $(this).val();
    $(this).val(value.replace(/[^a-zA-Zа-яёА-ЯЁ\s-]/g, ""));
  });

  const submitButton = document.createElement("button");
  submitButton.className = "btn";
  submitButton.type = "submit";
  submitButton.textContent = "Отправить";

  form.appendChild(inputField);
  form.appendChild(submitButton);
  inputContainer.appendChild(form);

  chatContent.appendChild(inputContainer);

  animateFadeIn(inputContainer);
  smoothScrollToBottom();
  lastOptions = inputContainer;

  $(form).validate({
    errorPlacement: function () {},
    rules: {
      name: {
        required: true,
      },
    },
    submitHandler: function () {
      const userName = inputField.value.trim();
      appendMessage({ text: userName, key: key, isUser: true });
      inputContainer.remove();
      if (callback) callback(userName);
    },
  });
}

async function processChatState(stateKey) {
  const state = chatScenario[stateKey];
  if (!state) return;

  const {
    messages,
    showStatus,
    options,
    requiresInput,
    autoNext,
    actionRedirect,
    action,
    optionsClass,
  } = state;

  if (showStatus) {
    setTimeout(() => {
      displayStatus(true);
    }, 3000);
  } else {
    displayStatus(false);
  }

  let accumulatedDelay = 0;

  for (let index = 0; index < messages.length; index++) {
    await appendBotMessageWithDelay(messages[index], stateKey);

    if (index === messages.length - 1) {
      const phoneKeys = ["phone", "questionFranchise"];
      if (requiresInput) {
        if (phoneKeys.includes(stateKey.replace(/\d/g, ""))) {
          renderPhoneInput(stateKey, (phoneNumber) => {
            processChatState(state.next);
          });
        } else if (stateKey.includes("name")) {
          renderNameInput(stateKey, (userName) => {
            processChatState(state.next);
          });
        } else if (stateKey.includes("city")) {
          renderCityInput(stateKey, (userName) => {
            processChatState(state.next);
          });
        } else {
          renderTextInput(stateKey, (userInput) => {
            processChatState(state.next);
          });
        }
      } else if (options && options.length > 0) {
        renderOptions(stateKey, options, optionsClass);
      } else if (action) {
        action();
      }

      if (actionRedirect) {
        sendChatHistory();

        setTimeout(() => {
          window.location.href = "thanks.html";
        }, 6000);
      }
    }
  }

  if (!options || options.length === 0) {
    setTimeout(() => {
      isBotBusy = false;
    }, accumulatedDelay + 1000);
  }
}

function getUTMData() {
  return {
    phone: "",
    email: "",
    name: "",
    city: "",
    question: "",
    timezone: (-1 * new Date().getTimezoneOffset()) / 60,
    utm_medium: $.query.get("utm_medium") || "",
    utm_placement: $.query.get("utm_placement") || "",
    utm_source: $.query.get("utm_source") || "",
    utm_term: $.query.get("utm_term") || "",
    utm_content: $.query.get("utm_content") || "",
    utm_campaign: $.query.get("utm_campaign") || "",
    utm_campaign_name: $.query.get("utm_campaign_name") || "",
    device_type: $.query.get("device_type") || "",
    utm_region_name: $.query.get("utm_region_name") || "",
    utm_placement: $.query.get("utm_placement") || "",
    utm_description: $.query.get("utm_description") || "",
    utm_device: $.query.get("utm_device") || "",
    page_url: window.location.href,
    user_location_ip: "",
    yclid: $.query.get("yclid") || "",
  };
}

function getPayload(history) {
  const payloadMap = {
    questionFranchise: "phone",
  };

  function filterHistory(item) {
    return item.sender === "user";
  }

  function reduceHistory(acc, item) {
    if (!item.key || !item.message) {
      return acc;
    }

    const normalizedKey = item.key.replace(/\d+$/, "");
    const payloadKey = payloadMap[normalizedKey] || normalizedKey;

    return { ...acc, [payloadKey]: item.message };
  }

  const chatData = history.filter(filterHistory).reduce(reduceHistory, {});
  const payload = {
    ...getUTMData(),
    ...chatData,
  };

  console.log(
    "РЎС„РѕСЂРјРёСЂРѕРІР°РЅРЅС‹Рµ РґР°РЅРЅС‹Рµ РґР»СЏ РѕС‚РїСЂР°РІРєРё:",
    payload
  );
  return payload;
}

function sendChatHistory() {
  const payload = getPayload(chatHistory);
  const formData = createFormData(payload);
  // const dataToSend = JSON.stringify({ chatHistory });

  function createFormData(data) {
    var formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    return formData;
  }

  $.ajax({
    url: "php/formProcessor.php",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    dataType: "json",
  });
}

function setCurrentYear() {
  $("[data-current-year]").text(new Date().getFullYear());
}

function initAnchorBtn() {
  $("[data-scroll-top]").on("click", function () {
    $(".modal-scrollable").animate(
      {
        scrollTop: 0,
      },
      1000
    );
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setInitialFeedbackStore();
  processChatState("start");

  setCurrentYear();
  initAnchorBtn();
});
