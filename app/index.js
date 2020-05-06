import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {ThemeProvider} from'./context/theme'
import Nav from './components/nav'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Loading from './components/loading'

const Popular = React.lazy(() => import('./components/popular'))
const Battle = React.lazy(() => import('./components/battle'))
const Results = React.lazy(() => import('./components/results'))

class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            theme: 'light',
            toggleTheme: () => {this.setState(({theme}) => ({
                theme: theme ==='light' ?' dark' : 'light'
            }))
        }}
    }
    render() {
        return (
            <Router>
                <ThemeProvider value = {this.state}>
                    <div className={this.state.theme}>
                        <div className='container'>
                            <Nav />
                            <React.Suspense fallback = {<Loading/>}>
                                <Switch>
                                <Route exact path ='/' component={Popular} />
                                <Route exact path='/battle' component = {Battle}/>
                                <Route path='/battle/results' component={Results} />
                                <Route render={() => <h1>Error 404</h1>} />
                                </Switch>
                            </React.Suspense>
                        </div>
                    </div>
                </ThemeProvider>
            </Router>
        )
    }}

ReactDOM.render(
    //React Element
    // Where to render Element to
    <App />,
    document.getElementById('app')
)