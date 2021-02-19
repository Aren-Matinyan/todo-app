import React from 'react'
import ReactDOM from 'react-dom'

import {Provider} from 'react-redux'
import Counter from "./counter/counter"
import {store} from "./counter/store"
// import App from './Components/app/app'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Counter/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
