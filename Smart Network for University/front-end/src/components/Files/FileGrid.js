import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import '../../public/scooter.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import starred from '../../public/starred.svg';
import star from '../../public/star_white.svg';
import file from '../../public/file.svg';
import {UpdateShared} from '../../actions/files';
import * as CommunityAPI from '../../api/CommunityAPI';
import * as FilesAPI from '../../api/GetFilesAPI';
import * as DownloadAPI from '../../api/DownloadFileAPI';
import fileDownload from 'react-file-download';
import Axios from 'axios';
import SideNavBar from '../SideNavBar';
import RightMenu from './RightMenu';
import '../../CSS/homepagecss.css';
import '../../CSS/homePage.css';
import {LoadFiles, LoadShared,LoadUserDepartments} from '../../actions/files';

class FileGrid extends Component {

    constructor() {
        super();
        this.state = {
            files: []


        }
    }

    componentWillMount()
    {
        var userId = 1;
        FilesAPI.getFiles({userId})
            .then((obj) => {
                this.props.LoadFiles(obj);
            });
        FilesAPI.getSharedFiles({userId})
            .then((obj) => {
                this.props.LoadShared(obj);
            });
        CommunityAPI.getCommunties({userId})
            .then((obj) => {
                this.props.LoadUserDepartments(obj);
            });

    }

    handleClick(fileitem){

            DownloadAPI.downloadFile(fileitem)
            .then((res) => {
                Axios.get(res.url)
                .then((response) => {
                     fileDownload(response.data, 'download');
                });
            });
    }



    renderIcon(fileitem){
        return(
            <img type="image/svg+xml" src={file} height="30px" alt='logo'/>
        )}


    openShare(fileitem){
        var sharediv = document.getElementById("divShare");
        var sharefilelbl = document.getElementById("lblSharefile");
        if((sharefilelbl.innerHTML != "Share "+fileitem.filename+" with:") || sharediv.hidden){
            sharefilelbl.innerHTML = "Share "+fileitem.filename+" with:";
            sharediv.hidden = false;
        }
        else{
            sharediv.hidden = true;
        }
        this.props.UpdateShared(fileitem);
    }


    // createSharedList(){
    //     if(this.props.shared.sharedfiles && this.props.shared.sharedfiles.length == 0)
    //     {
    //         return(
    //                 <div class="c-banner c-banner--unpinned f4">
    //                     Nothing has been shared with you for now.
    //                 </div>
    //             );
    //         }
    //     else{
    //         return this.props.shared.sharedfiles.map((fileitem) => {
    //             return(
    //                     <tr>
    //                         <td width = "30">
    //                             {this.renderIcon(fileitem)}
    //                         </td>
    //                         <td>
    //                             <button
    //                                 className="c-btn c-btn--tertiary--3"
    //                                 type="button"
    //                                 onClick={() => this.handleClick(fileitem)}>
    //                                     {fileitem.Name}
    //                             </button>
    //                         </td>
    //                     </tr>
    //                 );
    //             });
    //         }
    // }



    render() {
        return (
            <div>
                <nav
                    className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
                    <button
                        className="navbar-toggler navbar-toggler-right hidden-lg-up"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarsExampleDefault"
                        aria-controls="navbarsExampleDefault"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" href="#">Dashboard</a>

                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Home
                                    <span className="sr-only">(current)</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Settings</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Profile</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Help</a>
                            </li>
                        </ul>
                        <form className="form-inline mt-2 mt-md-0">
                            <input className="form-control mr-sm-2" type="text" placeholder="Search"/>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav>

                <div className="container-fluid">
                    <div className="row sidemenu">
                    <SideNavBar/>
                        <main role="main" className="col-sm-10">
                            <h1 className="header col-sm-8">Files</h1>
                            <div className="col-sm-9">
                                <div>
                                    <h2 className="header category">My Files</h2>
                                    <ul className="list-group">
                                        {
                                            this.props.files.files.map(file => (
                                            <li className="list-group-item" key={file.filename}>
                                                <span className="ion-document-text"></span>
                                                <span className="listContent"   onClick={() => this.handleClick(file)}>{file.filename}</span>
                                                <div className="btn-group pull-right" role="group" aria-label="Basic example">
                                                    <button type="button" className="btn btn-secondary btnshare ion-share" onClick={() => this.openShare(file)}></button>
                                                    <button type="button" className="btn btn-secondary btnshare ion-ios-trash"></button>

                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-3 rightBlock">
                            <RightMenu/>
                            </div>
                        </main>
                    </div>
                </div>
            </div>






        );
    }  
}

function mapStateToProps(state){
    return {
        userdetail: state.userdetail,
        files: state.directory,
        shared: state.shared,
        departments: state.departments
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({UpdateShared: UpdateShared,LoadFiles : LoadFiles, LoadShared: LoadShared, LoadUserDepartments:LoadUserDepartments},dispatch);
  }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FileGrid));