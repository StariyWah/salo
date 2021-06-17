/*Works__hide__arrows*/
const hide__block = document.querySelector('.work__hidden');
const hide__work = document.querySelector('.hide__works');
const open__work = document.querySelector('.open__works');
const hide__open = document.querySelector('.hide__open');
const promptt = document.querySelector('.prompt');
const less = document.querySelector('.less');
$(hide__work).click(function () {
    hide__block.classList.toggle('_close__works');
    hide__work.classList.toggle('_close__works');
    open__work.classList.remove('_close__works');
    less.classList.remove('active');
});

$(open__work).click(function () {
    hide__block.classList.remove('_close__works');
    hide__work.classList.remove('_close__works');
    open__work.classList.toggle('_close__works');
    promptt.classList.remove('active');
});
if ($(window).width() <= 351) {
    hide__open.classList.toggle('_close__works');
    hide__block.classList.remove('_close__works');
}
$(open__work).mouseover(function (event) {
    promptt.classList.toggle('active');
});
$(open__work).mouseout(function (event) {
    promptt.classList.remove('active');
});
$(hide__work).mouseover(function (event) {
    less.classList.toggle('active');
});
$(hide__work).mouseout(function (event) {
    less.classList.remove('active');
});
/*Works__hide__arrows*/

/*burger__menu*/
const open__menu = document.querySelector('.open__menu__background');
const menu__closes = document.querySelectorAll('.menu__close');
const body = document.querySelector('body');
$(menu__closes).click(function (event) {
    open__menu.classList.toggle('active');
    header__menu.classList.remove('_navbar__active');
    if (popupLinks.length > 0) {
        for (let index = 0; index < menu__closes.length; index++) {
            var menu__close = menu__closes[index];
            menu__close.classList.toggle('-active__burger');
            menu__close.classList.toggle('-active__burger__close');
        }
        body.classList.toggle('_lock');
    }
});
/*burger__menu*/

/*nav__bar*/
const header__menu = document.querySelector('.nav__bar');
const menu__height = document.querySelector('.menu__flag');
var scrollp = 0;
var height__to__menu = $(menu__height).offset().top + menu__height.offsetHeight - $(window).scrollTop();
$(window).scroll(function () {
    if ($(window).scrollTop() > height__to__menu) {
        var active = header__menu.classList.contains('_navbar__active');
        if (active == false) {
            var scrollt = $(this).scrollTop();
            if (scrollt < scrollp) {
                header__menu.classList.toggle('_navbar__active');
            }
            scrollp = scrollt;
        }
        if (active == true) {
            var scrollt = $(this).scrollTop();
            if (scrollt > scrollp) {
                header__menu.classList.remove('_navbar__active');
            }
            scrollp = scrollt;
        }
    } else {
        header__menu.classList.remove('_navbar__active');
    }
});
/*nav__bar*/

/*pop-up*/
const popupLinks = document.querySelectorAll('.popup-link');
const lockPadding = document.querySelectorAll('.lock-padding');
let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener("click", function (e) {
            for (let index = 0; index < menu__closes.length; index++) {
                var menu__close = menu__closes[index];
                menu__close.classList.remove('-active__burger');
                menu__close.classList.remove('-active__burger__close');
            }
            header__menu.classList.remove('_navbar__active');
            open__menu.classList.remove('active');
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        });
    }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener("click", function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        curentPopup.classList.add('open');
        curentPopup.addEventListener("click", function (e) {
            if (!e.target.closest('.main__form')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnLock();
        }
    }
}

function bodyLock() {
    body.classList.add('_lock');

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, (timeout));
}

function bodyUnLock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('_lock');
    }, timeout);
    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});
/*pop-up*/

/*goto*/
const Links__goto = document.querySelectorAll('.link__goto[data-goto]');
if (Links__goto.length > 0) {
    Links__goto.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });
    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            open__menu.classList.remove('active');
            if (popupLinks.length > 0) {
                for (let index = 0; index < menu__closes.length; index++) {
                    var menu__close = menu__closes[index];
                    menu__close.classList.remove('-active__burger');
                    menu__close.classList.remove('-active__burger__close');
                }
                body.classList.remove('_lock');
            }
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;
            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
        }
    }
}
/*goto*/
$(document).ready(function () {

    var elem = $('.container__par'),         //    Контейнер, в котором будем проводить анимацию
        pos = elem.offset(),            //    Позиция элемента
        elem_left = pos.left,           //    Слева
        elem_top = pos.top,             //    Сверху
        elem_width = elem.width(),      //    Ширина элемента
        elem_height = elem.height(),    //    Высота элемента
        x_center,    //    Координаты центра по оси X
        y_center;    //    Координаты центра по оси Y

    //    Обрабатываем событие перемещения курсора мыши
    $('.container__par').mousemove(function (e) {

        //    Определяем центр элемента (формула легко гуглится)
        x_center = (elem_width / 2) - (e.pageX - elem_left);
        y_center = (elem_height / 2) - (e.pageY - elem_top);

        //    Проходим по всем блокам с изображениями)
        $('.parallax').each(function () {

            var speed = $(this).attr('data-speed'),     //    Определяем скорость 
                xPos = Math.round(-1 * x_center / 40 * speed),//    Высчитываем позицию по оси X, движения будут инвертированы (-1). Формула подбиралась на глаз
                yPos = Math.round(y_center / 50 * speed);   //    Высчитываем позицию по оси Y

            //    Перемещение по оси Y делаем до определенной точки, потом перемещение останавливаем
            if (yPos < 0)
                yPos = -1 * speed;

            //    Непосредственно перенос      
            $(this).css('transform', 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0px)');

        });
    });
});
