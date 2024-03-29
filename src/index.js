import React from 'react'
import ReactDOM from 'react-dom'

import App from './Components/app/app'
import {Provider} from 'react-redux'
import {store} from "./store/store"

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
