let componentHeader = document.getElementById("header");
if (componentHeader) {
    fetch("./includes/templates/header.html")
        .then(response => response.text())
        .then(result => {
            componentHeader.innerHTML = result;

            let parentLinks = document.querySelectorAll(".parentLink>.link");
            let nestedParentLink = document.querySelectorAll(".parentLink .nestedParentLink>.link");
            let links = document.querySelectorAll(".links .link");

            if (parentLinks.length > 0) {
                parentLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        parentLinks.forEach(parent => {
                            const nestedList = parent.nextElementSibling;
                            nestedList.classList.remove("show");
                            const nestedSubList = nestedList.querySelector('.nestedList .parentLink2 .nestedList');
                            if (nestedSubList && nestedSubList.classList.contains("show")) {
                                nestedSubList.classList.remove("show");
                            }
                        });
                        link.nextElementSibling.classList.toggle("show");
                    });

                    document.addEventListener('click', (e) => {
                        if (!link.contains(e.target) && !link.nextElementSibling.contains(e.target)) {
                            const nestedList = link.nextElementSibling;
                            if (nestedList) nestedList.classList.remove("show");
                        }
                    });
                })
            }

            if (nestedParentLink.length > 0) {
                nestedParentLink.forEach(link => {
                    link.addEventListener('click', () => {
                        nestedParentLink.forEach(link => link.classList.remove("active"));
                        link.nextElementSibling.classList.toggle("show");
                    })
                })
            }

            if (links.length > 0) {
                links.forEach(link => {
                    link.addEventListener('click', () => {
                        links.forEach(link => link.classList.remove("active"));
                        link.classList.add("active");
                    })

                    if (window.location.href.split('/').pop() == link.dataset.page) {
                        links.forEach(link => link.classList.remove("active"));
                        link.classList.add("active");
                    }
                })
            }

            let menu = document.getElementById("menu");
            let routes = document.getElementById("routes");
            menu.addEventListener("click", () => {
                routes.classList.toggle("active");
            })

            let searchIcon = document.getElementById("searchIcon");
            if (searchIcon) {
                searchIcon.addEventListener("click", () => {
                    searchIcon.classList.toggle("active");
                    searchIcon.nextElementSibling.classList.toggle("show");
                });
            }

            document.addEventListener("click", (e) => {
                if (menu && !menu.contains(e.target) && componentHeader && !componentHeader.contains(e.target)) {
                    routes.classList.remove("active");
                    let nestedList = document.querySelectorAll(".nestedList");
                    nestedList.forEach(list => list.classList.remove("show"));
                }

                if (searchIcon && !searchIcon.contains(e.target)) {
                    searchIcon.classList.remove("active");
                    searchIcon.nextElementSibling.classList.remove("show");
                }
            })

            window.addEventListener("scroll", () => {
                if (routes) {
                    routes.classList.remove("active");
                    let nestedList = document.querySelectorAll(".nestedList");
                    nestedList.forEach(list => list.classList.remove("show"));
                }

                if (searchIcon) {
                    searchIcon.classList.remove("active");
                    searchIcon.nextElementSibling.classList.remove("show");
                }
            })
        }).catch(err => console.log(err));
}

let componentFooter = document.getElementById("footer");
if (componentFooter) {
    fetch("./includes/templates/footer.html").then(response => response.text())
        .then(result => {
            componentFooter.innerHTML = result;
        }).catch(err => console.log(err));
}

let toggleQuestions = document.querySelectorAll(".toggle-questions");
if (toggleQuestions.length > 0) {
    toggleQuestions.forEach(toggle => {
        toggle.addEventListener("click", () => {
            toggle.classList.toggle("fa-plus");
            toggle.classList.toggle("fa-minus");
            toggle.parentElement.nextElementSibling.classList.toggle("show");
        })
    })
}

let fasterServicesParentCards = document.getElementById("faster-services-cards");
if (fasterServicesParentCards) {
    fetch("./data/faster-services.json").then(response => response.json())
        .then(result => {
            result.forEach(card => {
                let cardHTML = `
                    <div class="card fadeUp" data-index="${card.id}">
                        <div class="image">
                        <img src="${card.image}" alt="${card.title}" />
                        </div>
                        <h2>${card.title}</h2>
                    </div>
                `;
                fasterServicesParentCards.innerHTML += cardHTML;
            })
            animationFadeUp();

        }).catch(err => console.log(err));
}

let elementLengths = document.querySelectorAll(".elementLength");
if (elementLengths.length > 0) {
    elementLengths.forEach(element => {
        let length = element.dataset.length;
        element.textContent = lengthText(length);
    })
}

function lengthText(text) {
    if (text.length > 100) {
        return text.substring(0, 100) + "...";
    }

    return text;
}

animationFadeUp();

function animationFadeUp() {
    let cards = Array.from(document.querySelectorAll(".fadeUp"));

    cards.forEach(card => {
        window.addEventListener("scroll", () => {
            if (window.scrollY + 400 >= card.offsetTop) {
                card.classList.add("show");
            }
        });
    });
}