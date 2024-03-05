const headerHeight = document.querySelector("header").offsetHeight

for (const link of document.querySelectorAll('a[href*="#"]')) {
    link.addEventListener("click", (e) => {
        const hash = e.currentTarget.hash
        const target = document.getElementById(hash.slice(1))
        console.log(target)

        // go to top
        if (!hash || hash === "#top") {
            e.preventDefault()
            window.scrollTo({
                top: headerHeight,
                behavior: "smooth"
            })
        }
        // go to section
        else if (target) {
            e.preventDefault()
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.scrollY - headerHeight,
                behavior: "smooth"
            })
        }

        // URLにハッシュを含める
        history.pushState(null, '', hash);
    })
}