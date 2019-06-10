import React from 'react';
import { render } from 'react-dom';
import { App } from 'src/app';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { PopoContainer } from 'src/model';

render(
    <LocaleProvider locale={zh_CN}>
        <PopoContainer>
            <App />
        </PopoContainer>
    </LocaleProvider> ,
    document.getElementById('root')
);

module.hot && module.hot.accept();
