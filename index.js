for (const link of document.querySelectorAll('a[href*="#"]')) {
    link.addEventListener("click", (e) => {
        const hash = e.currentTarget.hash
        const target = document.getElementById(hash)

        // go to top
        if (!hash || hash === "#top") {
            e.preventDefault()
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        }
        // go to section
        else if (target) {
            e.preventDefault()
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.scrollY,
                behavior: "smooth"
            })
        }

        // URLにハッシュを含める
        history.pushState(null, '', hash);
    })
}

const urlHash = window.location.hash
if (urlHash) {
    console.log(urlHash)
    const target = document.getElementById(urlHash.slice(1))
    if (target) {
        history.replaceState(null, '', window.location.pathname)
        window.scrollTo(0, 0)

        window.addEventListener("load", () => {
            const position = target.getBoundingClientRect.top + window.scrollY
            window.scrollTo({
                top: position,
                behavior: "smooth"
            })
            history.replaceState(null, '', window.location.pathname + urlHash)
        })
    }
}