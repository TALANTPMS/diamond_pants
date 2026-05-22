$(document).ready(function () {
  let coockeBtn = document.querySelector(".coocke-btn");
  let modalCoocke = document.querySelector("#modalcoocke");

  if (coockeBtn) {
    coockeBtn.addEventListener("click", function () {
      modalCoocke.style.display = "none";
    });
  }

  let formAll = document.querySelectorAll(".sectionForm");

  formAll.forEach((el) => {
    let formBtn = el.querySelector(".btn");
    let formCheckbox = el.querySelector("input[type=checkbox]");
    ///let formBottom =  el.querySelector(".form-info__bottom");
    let formAllert = el.querySelector(".form-allert");
    let formLabel = el.querySelector(".form-bottom");

    formBtn.addEventListener("click", function () {
      if (formCheckbox.checked) {
      } else {
        //formBottom.classList.add('error');
        formAllert.classList.add("error");
        formLabel.classList.add("error");
      }
    });

    if (formCheckbox) {
      formCheckbox.addEventListener("click", function () {
        if (formCheckbox.checked) {
          //formBottom.classList.remove('error');
          formAllert.classList.remove("error");
          formLabel.classList.remove("error");
        }
      });
    }
  });

  let AllInputs = document.querySelectorAll("input");
  let AllFormBottom = document.querySelectorAll(".form-bottom");
  let AllFormAllert = document.querySelectorAll(".form-allert");
  let AllFormChek = document.querySelectorAll("input[type=checkbox]");

  // $('[data-fancybox=""]').fancybox({
  //   beforeClose: function () {
  //     AllInputs.forEach((el) => {
  //       el.classList.remove("error");
  //     });

  //     AllFormBottom.forEach((el) => {
  //       el.classList.remove("error");
  //     });

  //     AllFormAllert.forEach((el) => {
  //       el.classList.remove("error");
  //     });

  //     AllFormChek.forEach((el) => {
  //       el.checked = false;
  //     });
  //   },
  // });

  // // валидация ============================

  $(".sectionForm input[name=phone]").inputmask({
    mask: "+ 7 (999) 999-99-99",
    showMaskOnHover: false,
    oncomplete: function () {
      var value = $(this).val();
      //   $(this).val(value.replace(/(\+)(\s|)(8)/g, "$1$1" + 7))
    },
  });

  jQuery.validator.addMethod("re", function (value, element) {
    return this.optional(element) || /^[a-zA-ZA-Яа-яЁё]+$/.test(value);
    //return /\+ \d{1} \(\d{3}\) \d{3}-\d{2}-\d{2}/g.test(value);
  });

  jQuery.validator.addMethod("NumberMap", function (value, element) {
    let x = 0;
    let duplicatedArray = [...value];
    let results = [];
    let newArr = [];

    duplicatedArray.forEach((el) => {
      if (el !== "-" && el !== "(" && el !== ")" && el !== "+" && el !== " ") {
        newArr.push(el);
      }
    });

    for (let i = 0; i < newArr.length - 1; i++) {
      if (x < 7) {
        if (newArr[i + 1] == newArr[i]) {
          results.push(newArr[i]);
          x++;
        } else {
          x = 0;
        }
      } else {
        return false;
      }
    }

    return true;
  });

  const inputField = document.querySelectorAll("input[name=name]");

  inputField.forEach((el) => {
    el.addEventListener("keypress", function (event) {
      let forbiddenCharacters = [
        "!",
        "@",
        "#",
        "$",
        "%",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "?",
        "&",
        "`",
        "^",
        "'",
        '"',
        ":",
        ";",
        "-",
        "=",
        "+",
        "-",
        "*",
        "0",
      ];

      let inputValue = event.target.value;
      let inputChar = String.fromCharCode(event.keyCode);

      if (forbiddenCharacters.includes(inputChar)) {
        event.preventDefault();
      }
    });

    inputField.forEach((el) => {
      el.addEventListener("keypress", function (event) {
        let prevVal = "";

        el.addEventListener("beforeinput", (e) => {
          prevVal = el.value;
        });
      });
    });
  });

  $(".sectionForm").each(function () {
    $(this).validate({
      rules: {
        name: {
          required: true,
          //re: true
        },
        phone: {
          required: true,
          checkMask: true,
          NumberMap: true,
        },
        email: {
          required: true,
          email: true,
        },
        town: {
          required: true,
        },
      },
    });
  });

  //Modal buttons
  $("a[data-fancybox]").click(function () {
    var title = $(this).attr("title");
    $("#modalTitle2").val(title);

    var btntext = $(this).data("bttitle");
    $("#send-check").text(btntext);

    $("#modalsubmit2").val(title);
    $("#modalTitle").text(title);

    if (title != undefined) {
      $("#modaltitle").text(title);
      $("#modaltitle2").val(title);
      $("#modalsubmit2").val(btntext);
    }

    if (btntext != undefined) {
      $("#modalsubmit").text(btntext);
      $("#modaltitle2").val(title);
      $("#modalsubmit2").val(btntext);
    }
  });

  // // //---------------ANIMATION============================
  const animItems = document.querySelectorAll("._anim-items");

  if (animItems.length > 0 || animItems) {
    window.addEventListener("scroll", animOnScroll);
    function animOnScroll(params) {
      for (let index = 0; index < animItems.length; index++) {
        const animItem = animItems[index];
        const animItemHeight = animItem.offsetHeight;
        const animItemOffset = offset(animItem).top;
        const animStart = 4;

        let animItemPoint = window.innerHeight - animItemHeight / animStart;
        if (animItemHeight > window.innerHeight) {
          animItemPoint = window.innerHeight - window.innerHeight / animStart;
        }

        if (
          pageYOffset > animItemOffset - animItemPoint &&
          pageYOffset < animItemOffset + animItemHeight
        ) {
          animItem.classList.add("_active");
        } else {
          if (!animItem.classList.contains("_no-anim")) {
            animItem.classList.remove("_active");
          }
        }
      }
    }
    animOnScroll();
  }
  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }

  // //---------------STOP ANIMATION============================
});
