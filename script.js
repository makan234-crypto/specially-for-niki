
const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");
const equalizer = document.getElementById("equalizer");

// Включение и пауза музыки
musicButton.addEventListener("click", async () => {
    if (music.paused) {
        try {
            await music.play();
            musicButton.textContent = "Ⅱ";
            equalizer.classList.add("playing");
        } catch (error) {
            alert(
                "Добавь файл music/spasibo-rodnaya.mp3 в папку сайта."
            );
        }
    } else {
        music.pause();
        musicButton.textContent = "▶";
        equalizer.classList.remove("playing");
    }
});

// Анимация появления при прокрутке
const elements = document.querySelectorAll(
    ".section, .letter, .photo-grid figure, .video-grid video, .final"
);

elements.forEach(element => element.classList.add("reveal"));

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

elements.forEach(element => observer.observe(element));

// Кнопка возврата наверх
const topButton = document.getElementById("topButton");

window.addEventListener("scroll", () => {
    topButton.classList.toggle("visible", window.scrollY > 400);
});

topButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Увеличение фотографий по клику
document.querySelectorAll(".photo-grid img").forEach(img => {
    img.addEventListener("click", () => {
        const overlay = document.createElement("div");

        Object.assign(overlay.style, {
            position: "fixed",
            inset: "0",
            zIndex: "1000",
            background: "rgba(8, 5, 10, 0.94)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "25px",
            cursor: "zoom-out"
        });

        const largeImage = document.createElement("img");
        largeImage.src = img.src;
        largeImage.alt = img.alt;

        Object.assign(largeImage.style, {
            maxWidth: "95%",
            maxHeight: "90%",
            objectFit: "contain",
            borderRadius: "12px"
        });

        overlay.appendChild(largeImage);
        document.body.appendChild(overlay);

        overlay.addEventListener("click", () => {
            overlay.remove();
        });
    });
    window.addEventListener("load", async () => {
    try {
        await document.getElementById("music").play();
    } catch (error) {
        console.log("Нажми кнопку, чтобы включить музыку");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const song = document.getElementById("loveSong");
    const button = document.getElementById("musicButton");

    if (!song || !button) return;

    song.volume = 0.7;

    async function playSong() {
        try {
            await song.play();
            button.textContent = "♫ Песня играет";
        } catch (error) {
            button.textContent = "♫ Нажми, чтобы включить песню";
        }
    }

    // Пробуем включить песню при открытии сайта
    playSong();

    // Запускаем после первого действия пользователя,
    // если браузер запретил автоматическое воспроизведение
    document.addEventListener("click", playSong, { once: true });
    document.addEventListener("touchstart", playSong, { once: true });

    button.addEventListener("click", async () => {
        if (song.paused) {
            await playSong();
        } else {
            song.pause();
            button.textContent = "♫ Продолжить песню";
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("floating-hearts");

    if (!container) return;

    const hearts = ["❤️", "💕", "💗", "💖", "♥"];
    const maxHearts = 22;

    function createHeart() {
        if (
            container.childElementCount >= maxHearts ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }

        const heart = document.createElement("span");

        heart.className = "floating-heart";
        heart.textContent = hearts[
            Math.floor(Math.random() * hearts.length)
        ];

        heart.style.left = Math.random() * 100 + "%";
        heart.style.fontSize = (14 + Math.random() * 20) + "px";
        heart.style.animationDuration = (7 + Math.random() * 7) + "s";

        container.appendChild(heart);

        heart.addEventListener("animationend", () => {
            heart.remove();
        }, { once: true });
    }

    for (let i = 0; i < 8; i++) {
        setTimeout(createHeart, i * 500);
    }

    setInterval(createHeart, 850);
});

document.addEventListener("DOMContentLoaded", () => {
    const sky = document.getElementById("star-background");

    if (!sky) return;

    // Создаём 100 мерцающих звёзд
    for (let i = 0; i < 100; i++) {
        const star = document.createElement("span");
        star.className = "twinkle-star";

        const size = Math.random() * 2.5 + 1;

        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";
        star.style.width = size + "px";
        star.style.height = size + "px";
        star.style.animationDelay = Math.random() * 4 + "s";
        star.style.animationDuration = (1 + Math.random() * 3) + "s";

        sky.appendChild(star);
    }

    // Иногда по небу пролетают падающие звёзды
    function createShootingStar() {
        if (
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) return;

        const star = document.createElement("span");
        star.className = "shooting-star";

        star.style.left = (20 + Math.random() * 100) + "%";
        star.style.animationDuration = (1 + Math.random() * 1.2) + "s";

        sky.appendChild(star);

        star.addEventListener("animationend", () => {
            star.remove();
        }, { once: true });
    }

    setTimeout(createShootingStar, 1000);

    setInterval(() => {
        if (Math.random() > 0.25) {
            createShootingStar();
        }
    }, 2200);
});

document.addEventListener("DOMContentLoaded", () => {
    const paragraphs = document.querySelectorAll(
        ".love-letter .letter-block, .love-letter p"
    );

    if (!paragraphs.length) return;

    // Если пользователь отключил анимации — показываем всё сразу
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        paragraphs.forEach(element => {
            element.classList.add("show-paragraph");
        });
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show-paragraph");

                // После появления больше не наблюдаем за элементом
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: "-35% 0px -35% 0px",
        threshold: 0
    });

    paragraphs.forEach(element => {
        observer.observe(element);
    });
});

});
