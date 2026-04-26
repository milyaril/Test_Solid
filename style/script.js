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