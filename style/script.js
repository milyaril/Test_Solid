function moveSlider(button, direction) {
    const visualBlock = button.closest('.car-card__visual');
    const slider = visualBlock.querySelector('.car-card__slider');
    const slides = slider.querySelectorAll('.car-card__slide');
    const prevBtn = visualBlock.querySelector('.slider-btn--prev');
    const nextBtn = visualBlock.querySelector('.slider-btn--next');

    let currentIndex = parseInt(slider.dataset.current || '0');
    const nextIndex = currentIndex + direction;

    if (nextIndex < 0 || nextIndex >= slides.length) return;
    slider.style.transform = `translateX(-${nextIndex * 100}%)`;
    slider.dataset.current = nextIndex;

    if (prevBtn) prevBtn.classList.toggle('slider-btn--hidden', nextIndex === 0);
    if (nextBtn) nextBtn.classList.toggle('slider-btn--hidden', nextIndex === slides.length - 1);
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.car-item').forEach(item => {
        item.addEventListener('touchstart', () => {

            document.querySelectorAll('.car-item').forEach(el => el.classList.remove('is-touched'));
            item.classList.add('is-touched');
        }, { passive: true });
    });

    document.addEventListener('touchstart', e => {
        if (!e.target.closest('.car-item')) {
            document.querySelectorAll('.car-item').forEach(el => el.classList.remove('is-touched'));
        }
    }, { passive: true });
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.car-card__visual').forEach(visual => {
        const slider = visual.querySelector('.car-card__slider');
        const slides = slider.querySelectorAll('.car-card__slide');
        const prevBtn = visual.querySelector('.slider-btn--prev');
        const nextBtn = visual.querySelector('.slider-btn--next');
        let startX = 0;
        let isDragging = false;

        [prevBtn, nextBtn].forEach(btn => {
            if (!btn) return;
            btn.addEventListener('touchend', function(e) {
                e.preventDefault();
                const dir = btn.classList.contains('slider-btn--prev') ? -1 : 1;
                moveSlider(btn, dir);
            }, { passive: false });
        });

        visual.addEventListener('touchstart', e => {
            startX = e.touches[0].clientX;
            isDragging = true;
        }, { passive: true });

        visual.addEventListener('touchend', e => {
            if (!isDragging) return;
            isDragging = false;
            const diff = startX - e.changedTouches[0].clientX;
            if (Math.abs(diff) < 40) return; 
            const dir = diff > 0 ? 1 : -1;
            const currentIndex = parseInt(slider.dataset.current || '0');
            const nextIndex = currentIndex + dir;
            if (nextIndex < 0 || nextIndex >= slides.length) return;
            slider.style.transform = `translateX(-${nextIndex * 100}%)`;
            slider.dataset.current = nextIndex;
            if (prevBtn) prevBtn.classList.toggle('slider-btn--hidden', nextIndex === 0);
            if (nextBtn) nextBtn.classList.toggle('slider-btn--hidden', nextIndex === slides.length - 1);
        }, { passive: true });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger-icon');
    const mobileMenu = document.getElementById('mobileMenu');

    
    if (burger) {
        burger.addEventListener('click', () => {
            if (mobileMenu) {
                mobileMenu.classList.toggle('active');
                burger.classList.toggle('open');
            }
        });
    }

    
    if (mobileMenu) {
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                if (burger) burger.classList.remove('open');
            });
        });
    }

    const toggleBtn = document.querySelector('.car-selection__toggle');
    const showAllBtn = document.querySelector('.cars-show-all');
    const contentToHide = [
        document.querySelector('.car-filters'),
        document.querySelector('.car-offers'),
        document.querySelector('.cars-catalog')
    ];

    if (toggleBtn) {
        toggleBtn.addEventListener('click', function(){
            let isHiddenNow = false;
            contentToHide.forEach(el => {
                if (el) {
                    isHiddenNow = el.classList.toggle('is-hidden');
                }
            });
            toggleBtn.classList.toggle('car-selection__toggle--active', isHiddenNow);

            if (showAllBtn) {
                showAllBtn.classList.toggle('cars-show-all--force-hidden', isHiddenNow);
            }

            const img = toggleBtn.querySelector('img');
            if (isHiddenNow) {
                toggleBtn.childNodes[0].textContent = 'Показать список машин';
                if (img) img.src = '../image/icons/arrow_down.svg';
            } else {
                toggleBtn.childNodes[0].textContent = 'Свернуть список машин';
                if(img) img.src = '../image/icons/arrow_up.svg';
            }
        });
    }
});

function toggleAllCars(btn) {
    var grid = document.querySelector('.cars-grid');
    var isExpanded = grid.classList.toggle('is-expanded');
    var arrow = btn.querySelector('img');
    if (isExpanded) {
        btn.childNodes[0].textContent = 'Свернуть список машин ';
        if (arrow) arrow.style.transform = 'rotate(180deg)';
    } else {
        btn.childNodes[0].textContent = 'Показать все машины ';
        if (arrow) arrow.style.transform = 'rotate(0deg)';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.footer-nav').forEach(nav => {
        const title = nav.querySelector('.footer-nav__title');
        if (!title) return;
        title.addEventListener('click', () => {
            if (window.matchMedia('(max-width: 768px)').matches) {
                nav.classList.toggle('is-open');
            }
        });
    });
});