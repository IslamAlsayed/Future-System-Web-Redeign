let componentHeader = document.getElementById("header");
if (header) {
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
                        link.classList.add("active");
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
                        nestedParentLink.forEach(link => link.classList.remove("show"));
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
                })
            }
        })
        .catch(err => console.log(err));
}

let componentFooter = document.getElementById("footer");
if (footer) {
    fetch("./includes/templates/footer.html").then(response => response.text())
        .then(result => {
            componentFooter.innerHTML = result;
        }).catch(err => console.log(err));
}

fetch("./data/logs/previews.json").then(response => response.json()).then(result => {
    let sectionPreviews = document.getElementById("previews");
    if (sectionPreviews) {
        if (result.length > 0) {
            createSlide(result, "previews", sectionPreviews);
            moveSlide(sectionPreviews, result.length, 36, 'previews-section');
        }
    }
}).catch(err => console.log(err));

fetch("./data/logs/services.json").then(response => response.json()).then(result => {
    let sectionServices = document.getElementById("services");
    if (sectionServices) {
        if (result.length > 0) {
            createSlide(result, "services", sectionServices);
            moveSlide(sectionServices, result.length - 1, 64, 'services-section');
        }
    }
}).catch(err => console.log(err));

fetch("./data/logs/features.json").then(response => response.json()).then(result => {
    let sectionFeatures = document.getElementById("features");
    if (sectionFeatures) {
        if (result.length > 0) {
            createSlide(result, "features", sectionFeatures);
            moveSlide(sectionFeatures, result.length - 1, 64, 'features-section');
        }
    }
}).catch(err => console.log(err));

fetch("./data/logs/projects.json").then(response => response.json()).then(result => {
    let sectionProjects = document.getElementById("projects");
    if (sectionProjects) {
        if (result.length > 0) {
            createSlide(result, "projects", sectionProjects);
            autoMoveSlide(sectionProjects, result, 70, 'projects-section');
        }
    }
}).catch(err => console.log(err));

fetch("./data/logs/clients.json").then(response => response.json()).then(result => {
    let sectionClients = document.getElementById("clients");

    if (sectionClients) {
        if (result.length > 0) {
            createSlide(result, "clients", sectionClients);
            autoMoveSlide(sectionClients, result, 70, 'clients-section');
        }
    }

}).catch(err => console.log(err));

fetch("./data/logs/clients-reviews.json")
    .then(response => response.json()).then(result => {
        let sectionClientsReviews = document.getElementById("clients-reviews");

        if (sectionClientsReviews) {
            createSlide(result, "clients-reviews", sectionClientsReviews);
            autoMoveSlide(sectionClientsReviews, result, 90, 'clients-reviews-section');
        }
    }).catch(err => console.log(err));

function createSlide(array, type, parentElement) {
    array.forEach((item, index) => {
        let slide = document.createElement("div");
        slide.className = "slide";
        if (index === 0 && type != "projects" && type != "clients") slide.classList.add("active");
        slide.dataset.key = index;

        if (type == "previews" || type == "services" || type == "features" || type == "projects" || type == "clients") {
            let image = document.createElement("div");
            image.className = "image";

            let img = document.createElement("img");
            img.src = item.image;
            img.alt = item.title;
            image.appendChild(img);
            slide.appendChild(image);
        }

        if (type === "clients-reviews") {
            let stars = document.createElement("div");
            stars.className = "stars";

            for (let i = 0; i < item.rate; i++) {
                let i = document.createElement("i");
                i.className = "fas fa-star";
                stars.appendChild(i);
            }

            let b = document.createElement("b");
            b.innerHTML = item.name;

            let rate = document.createElement("div");
            rate.className = "rate";
            rate.innerHTML = item.rate;

            let review = document.createElement("div");
            review.className = "review";
            review.innerHTML = item.review;

            slide.appendChild(stars);
            slide.appendChild(b);
            slide.appendChild(review);
        }

        if (type == "services" || type == "features") {
            let text = document.createElement("div");
            text.className = "text";

            let h2 = document.createElement("h2");
            h2.innerHTML = item.title;

            let p = document.createElement("p");
            p.innerHTML = item.description;
            text.appendChild(h2);
            text.appendChild(p);

            let action = document.createElement("div");
            action.className = "action";

            let link = document.createElement("a");
            link.className = "link";
            link.href = "#";

            let span = document.createElement("span");
            span.innerHTML = "المزيد";

            let i = document.createElement("i");
            i.className = "fas fa-arrow-left-long";
            link.appendChild(span);
            link.appendChild(i);
            action.appendChild(link);

            slide.appendChild(text);
            slide.appendChild(action);
        }
        parentElement.appendChild(slide);
    });
}

function moveSlide(sectionId, length, margin, sliderClass) {
    const sliderControls = document.querySelector(`.${sliderClass} .slider-control`);
    const slides = document.querySelectorAll(`.${sliderClass} .slider-slides .slide`);

    for (let i = 0; i < length; i++) {
        let span = document.createElement("span");
        if (i === 0) span.className = "active";
        sliderControls.appendChild(span);
    }

    const controls = document.querySelectorAll(`.${sliderClass} .slider-control span`);
    let currentIndex = 0;

    function updateSlider() {
        const slideWidth = (slides[0].offsetWidth + margin) * -1;
        sectionId.scrollTo({ left: currentIndex * slideWidth, behavior: 'smooth' });

        controls.forEach((control, index) => {
            control.classList.remove("active");
            if (index === currentIndex) {
                control.classList.add("active");
            }
        });
    }

    controls.forEach((control, index) => {
        control.addEventListener("click", () => {
            currentIndex = index;
            updateSlider();
        });
    });

    updateSlider();
}
function autoMoveSlide(sectionId, data, margin, sliderClass) {
    let slides = document.querySelectorAll(`.${sliderClass} .slider-slides .slide`);
    let currentIndex = 0;

    let slideWidth = (slides[0].offsetWidth + margin) * -1;

    setInterval(() => {
        sectionId.scrollTo({ left: currentIndex * slideWidth, behavior: 'smooth' });
        currentIndex < data.length ? currentIndex++ : currentIndex = 0;
    }, 2000);
}
