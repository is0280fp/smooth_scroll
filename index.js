// イージング関数（easeOutExpo）
function scrollToPos(position) {
    const startPos = window.scrollY;
    const distance = Math.min(position - startPos, document.documentElement.scrollHeight - window.innerHeight - startPos);
    const duration = 800; // スクロールにかかる時間（ミリ秒）

    let startTime;

    function easeOutExpo(t, b, c, d) {
        return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
    }

    function animation(currentTime) {
        if (startTime === undefined) {
            startTime = currentTime;
        }
        const timeElapsed = currentTime - startTime;
        const scrollPos = easeOutExpo(timeElapsed, startPos, distance, duration);
        window.scrollTo(0, scrollPos);
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        } else {
            window.scrollTo(0, position);
        }
    }
    
    requestAnimationFrame(animation);
}

for (const link of document.querySelectorAll('a[href*="#"]')) {
    link.addEventListener("click", (e) => {
        const hash = e.currentTarget.hash
        const target = document.getElementById(hash)

        // go to top
        if (!hash || hash === "#top") {
            e.preventDefault()
            // window.scrollTo({
            //     top: 0,
            //     behavior: "smooth"
            // })
            scrollToPos(1);
        }
        // go to section
        else if (target) {
            e.preventDefault()
            // window.scrollTo({
            //     top: target.getBoundingClientRect().top + window.scrollY,
            //     behavior: "smooth"
            // })
            const position = target.getBoundingClientRect().top + window.scrollY
            scrollToPos(position)
        }

        // URLにハッシュを含める
        history.pushState(null, '', hash);
    })
}

const urlHash = window.location.hash
if (urlHash) {
    const target = document.getElementById(urlHash.slice(1))
    if (target) {
        history.replaceState(null, '', window.location.pathname)
        window.scrollTo(0, 0)

        window.addEventListener("load", () => {
            const position = target.getBoundingClientRect.top + window.scrollY
            // window.scrollTo({
            //     top: position,
            //     behavior: "smooth"
            // })
            scrollToPos(position);
            history.replaceState(null, '', window.location.pathname + urlHash)
        })
    }
}