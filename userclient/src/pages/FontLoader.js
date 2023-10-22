import React, { useEffect } from 'react';
import WebFont from 'webfontloader';

function FontLoader() {
    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Pixelify Sans:500', 'Ubuntu'],
            },
            // После успешной загрузки шрифтов, вы можете выполнить дополнительные действия
            // Например, обновить состояние компонента или выполнить другие действия.
            active: () => {
                console.log('Шрифты успешно загружены.');
            },
        });
    }, []);

    return null;
}

export default FontLoader;
