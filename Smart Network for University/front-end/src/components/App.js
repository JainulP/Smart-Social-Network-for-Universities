import React, {Component} from 'react';
import {withRouter, Route, Link, Switch} from 'react-router-dom';
import { BrowserRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Requests from './Requests/Requests';
import Home from './Home';
import SideNavBar from './SideNavBar';
import Header from './Header';
import '../public/style.css'

class App extends Component {

    render() {
        return (
            <div>
                <Header/>
                <div>
                    <div className="row">
                        <div className="col-sm-3 col-md-2">
                            <SideNavBar/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// function mapDispatchToProps(dispatch){
//     return bindActionCreators({LoadFiles : LoadFiles, LoadShared: LoadShared}, dispatch);
// }
//
// function mapStateToProps(state){
//     return {
//         userdetail: state.userdetail,
//         files: state.directory
//     }
// }
export default withRouter(App);
//export default connect(mapStateToProps, mapDispatchToProps)(App);

