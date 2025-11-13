;(() => {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init)
  } else {
    init()
  }

  function init() {
    const header = document.getElementById("main-header")
    const menuToggle = document.querySelector(".menu-toggle")
    const nav = document.querySelector("header nav")

    if (!header) return

    const placeholder = document.createElement("div")
    placeholder.id = "header-placeholder"
    placeholder.style.display = "none"
    placeholder.style.width = "100%"
    placeholder.style.transition = "height 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
    header.parentNode.insertBefore(placeholder, header)

    let isSticky = false
    let ticking = false
    let headerHeight = 0

    function updateHeaderHeight() {
      headerHeight = header.offsetHeight
    }

    function handleScroll() {
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop
      const activateAt = 220
      const deactivateAt = 100

      if (scrollPosition > activateAt && !isSticky) {
        isSticky = true
        updateHeaderHeight()

        placeholder.style.height = headerHeight + "px"
        placeholder.style.display = "block"

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            header.classList.add("sticky")
            document.body.classList.add("header-sticky-active")
          })
        })
      } else if (scrollPosition <= deactivateAt && isSticky) {
        isSticky = false

        header.classList.remove("sticky")
        document.body.classList.remove("header-sticky-active")

        requestAnimationFrame(() => {
          placeholder.style.height = "0px"
          setTimeout(() => {
            placeholder.style.display = "none"
          }, 300)
        })
      }

      ticking = false
    }

    // Menú hamburguesa
    if (menuToggle && nav) {
      menuToggle.addEventListener("click", (e) => {
        e.stopPropagation()
        menuToggle.classList.toggle("active")
        nav.classList.toggle("active")

        if (nav.classList.contains("active")) {
          document.body.style.overflow = "hidden"
        } else {
          document.body.style.overflow = ""
        }
      })

      const navLinks = nav.querySelectorAll("a")
      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          menuToggle.classList.remove("active")
          nav.classList.remove("active")
          document.body.style.overflow = ""
        })
      })

      document.addEventListener("click", (event) => {
        const isClickInsideNav = nav.contains(event.target)
        const isClickOnToggle = menuToggle.contains(event.target)
        if (!isClickInsideNav && !isClickOnToggle && nav.classList.contains("active")) {
          menuToggle.classList.remove("active")
          nav.classList.remove("active")
          document.body.style.overflow = ""
        }
      })
    }

    window.addEventListener("resize", () => {
      if (isSticky) {
        updateHeaderHeight()
        placeholder.style.height = headerHeight + "px"
      }
    })

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          window.requestAnimationFrame(handleScroll)
          ticking = true
        }
      },
      { passive: true },
    )

    handleScroll()
  }
})()
