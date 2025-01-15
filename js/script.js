document.addEventListener("DOMContentLoaded", () => {
  const initSidebarToggle = () => {
    const sidebar = document.getElementById("sidebar");
    const sidebarIcon = document.getElementById("sidebarIcon");

    sidebarIcon.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed");
      sidebarIcon.classList.toggle("chevron-left");
    });
  };

  const initMenuToggle = () => {
    const menu = document.getElementById("menu");
    const aboutMenu = document.getElementById("aboutMenu");

    const headerIcon = document.getElementById("headerIcon");
    const closeIcons = document.querySelectorAll(".close-icon");
    const returnIcon = document.querySelector(".return-icon");

    const aboutLink = document.querySelector(".about-menu");

    headerIcon.addEventListener("click", () => {
      menu.classList.add("menu-collapsed");
    });

    closeIcons.forEach((closeIcon) => {
      closeIcon.addEventListener("click", () => {
        menu.classList.remove("menu-collapsed");
        aboutMenu.classList.remove("menu-collapsed");
      });
    });

    returnIcon.addEventListener("click", () => {
      aboutMenu.classList.remove("menu-collapsed");
    });

    aboutLink.addEventListener("click", () => {
      aboutMenu.classList.add("menu-collapsed");
    });
  };

  const initSearchSection = () => {
    let openButton = document.getElementById("openButton");
    let closeButton = document.getElementById("closeButton");
    let searchSection = document.getElementById("searchSection");
    let searchInput = document.querySelector("input");

    const openSearch = () => {
      searchSection.classList.add("active");
      searchInput.focus();
    };

    const closeSearch = () => searchSection.classList.remove("active");

    openButton.addEventListener("click", openSearch);
    closeButton.addEventListener("click", closeSearch);

    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        searchSection.classList.contains("active")
      ) {
        closeSearch();
      }
    });
  };

  const initSearchCategory = () => {
    const categoryChristianity = document.querySelector(
      ".category-christianity"
    );
    const categoryIslam = document.querySelector(".category-islam");
    const christianity = document.querySelector(".christianity");
    const islam = document.querySelector(".islam");

    const headerChristianity = document.querySelector("#headerChristianity");
    const headerIslam = document.querySelector("#headerIslam");

    categoryChristianity.addEventListener("click", () => {
      categoryIslam.classList.remove("active");
      categoryChristianity.classList.add("active");

      islam.classList.remove("active");
      christianity.classList.add("active");

      headerIslam.classList.remove("visible");
      headerChristianity.classList.add("visible");
    });

    categoryIslam.addEventListener("click", () => {
      categoryChristianity.classList.remove("active");
      categoryIslam.classList.add("active");

      christianity.classList.remove("active");
      islam.classList.add("active");
      headerChristianity.classList.remove("visible");
      headerIslam.classList.add("visible");
    });
  };

  const initCarousel = () => {
    const carousel = document.querySelector(".carousel");
    if (!carousel) return;

    const items = carousel.querySelectorAll(".item");
    let currentIndex = 0;

    const showNextItem = () => {
      const currentItem = items[currentIndex];

      const nextIndex = (currentIndex + 1) % items.length;
      const nextItem = items[nextIndex];

      currentItem.classList.remove("active");
      currentItem.classList.add("exit");

      currentItem.addEventListener(
        "transitionend",
        () => {
          currentItem.classList.remove("exit");
          currentItem.classList.add("reset");

          setTimeout(() => {
            currentItem.classList.remove("reset");
          }, 50);
        },
        { once: true }
      );

      nextItem.classList.add("active");

      currentIndex = nextIndex;
    };

    const startCarousel = (intervalTime) =>
      setInterval(showNextItem, intervalTime);

    startCarousel(10000);
  };

  const initDarkmode = () => {
    const darkModeButton = document.querySelector("[data-theme-toggle]");
    const localStorageTheme = localStorage.getItem("theme");
    const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

    const calculateTheme = ({ localStorageTheme, systemSettingDark }) => {
      if (localStorageTheme) {
        return localStorageTheme;
      }

      return systemSettingDark.matches ? "dark" : "light";
    };

    const updateHTMLTheme = ({ theme }) => {
      document.querySelector("html").setAttribute("data-theme", theme);
      updateIcon(theme);
    };

    const updateIcon = (theme) => {
      if (theme === "dark") {
        darkModeButton.classList.remove("fa-sun");
        darkModeButton.classList.add("fa-moon");
      } else if (theme === "light") {
        darkModeButton.classList.remove("fa-moon");
        darkModeButton.classList.add("fa-sun");
      }
    };

    let currentTheme = calculateTheme({ localStorageTheme, systemSettingDark });
    updateHTMLTheme({ theme: currentTheme });

    darkModeButton.addEventListener("click", () => {
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      updateHTMLTheme({ theme: newTheme });
      updateIcon(newTheme);
      currentTheme = newTheme;
    });

    systemSettingDark.addEventListener("change", (e) => {
      if (!localStorageTheme) {
        const newSystemTheme = e.matches ? "dark" : "light";
        updateHTMLTheme({ theme: newSystemTheme });
        updateIcon(newSystemTheme);
        currentTheme = newSystemTheme;
      }
    });
  };

  const initGoToTop = () => {
    const iconUp = document.querySelector(".iconUp");

    if (!iconUp) return;

    iconUp.addEventListener("click", () => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });
  };

  initSidebarToggle();
  initMenuToggle();
  initSearchSection();
  initSearchCategory();
  initCarousel();
  initDarkmode();
  initGoToTop();
});
