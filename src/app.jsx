import React from 'react';
import { render } from 'react-dom';

import './css/index.less';

let App = ({name}) => <h1 className="wrap">i am react, {name}</h1>

render (
    <App name={'challen03'}/>,
    document.getElementById('root')
)