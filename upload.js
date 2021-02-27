function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (!bytes) {
        return '0 Byte';
    } 
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
 }

export function upload(selector, options = {}) {
    const input = document.querySelector(selector);
    const preview = document.createElement('div');
          preview.classList.add('preview');

    if (options.multi) {
        input.setAttribute('multiple', true);
    }
    if(options.accept && Array.isArray(options.accept)) {
        input.setAttribute('accept', options.accept.join(','))
    }

    const openBtn = document.createElement('button');
    openBtn.classList.add('btn');
    openBtn.textContent = 'Открыть';

    input.insertAdjacentElement('afterend', preview);
    input.insertAdjacentElement('afterend', openBtn);

    const triggerInput = () => input.click();
    const changeHandler = (event) => {
        if(!event.target.files.length) {
            return;
        }

        const files = Array.from(event.target.files);

        preview.innerHTML = '';
        files.forEach((item) => {
            if(!item.type.match('image')) {
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (event) => {
                const src = event.target.result;
                const shortName = `${item.name.substr(0, 17)}...`;
                preview.insertAdjacentHTML('afterbegin', `
                    <div class="preview-image">
                    <div class="preview-remove"> &times; </div>
                        <img src="${src}" alt="${item.name}" />
                        <div class="preview-info">
                            <span>${shortName}</span>
                            <span>${bytesToSize(item.size)}</span>
                        </div>
                    </div>
                `);
            };
            reader.readAsDataURL(item);
        });
    };

    openBtn.addEventListener('click', triggerInput);
    input.addEventListener('change', changeHandler);
}