document.addEventListener('DOMContentLoaded', () => {
    // 调试日志
    console.log('Script loaded');
    
    const textBlocks = document.querySelectorAll('.text-block');
    console.log('Found text blocks:', textBlocks.length);
    
    const images = {
        origin: document.querySelector('.origin-image'),
        experience: document.querySelector('.experience-image'),
        promise: document.querySelector('.promise-image')
    };
    
    // 检查是否找到所有图片
    console.log('Images found:', {
        origin: !!images.origin,
        experience: !!images.experience,
        promise: !!images.promise
    });
    
    // 当前显示的图片
    let currentImage = null;
    
    textBlocks.forEach(block => {
        const storyType = block.dataset.story;
        console.log('Block story type:', storyType);
        
        block.addEventListener('mouseenter', (e) => {
            console.log('Mouse entered block:', storyType);
            
            if (images[storyType]) {
                console.log('Showing image for:', storyType);
                // 隐藏当前图片
                if (currentImage) {
                    currentImage.style.opacity = '0';
                }
                // 显示新图片
                images[storyType].style.opacity = '1';
                currentImage = images[storyType];
            } else {
                console.log('No image found for:', storyType);
            }
        });
    });
    
    // 当鼠标离开整个关于我们区域时隐藏所有图片
    const aboutSection = document.querySelector('.about-us');
    aboutSection.addEventListener('mouseleave', () => {
        console.log('Mouse left about section');
        if (currentImage) {
            currentImage.style.opacity = '0';
            currentImage = null;
        }
    });
});

// 添加性能优化
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 使用防抖优化鼠标移动事件
const debouncedMouseMove = debounce((e) => {
    const mouseMoveEvent = new MouseEvent('mousemove', {
        clientX: e.clientX,
        clientY: e.clientY
    });
    document.dispatchEvent(mouseMoveEvent);
}, 10);

document.addEventListener('mousemove', debouncedMouseMove);