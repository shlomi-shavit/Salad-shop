import classes from './App.module.scss';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from './routing/routes';
import Header from './components/header/header';
import Bowl from './components/bowl/bowl';

function App() {

    return (
        <div className={classes.salad_bg}>
            <Router>
                <Header />
                <div className={classes.page_container}>
                    <Routes />
                </div>
                <Bowl />
            </Router>
        </div>
    );
}

export default App;
