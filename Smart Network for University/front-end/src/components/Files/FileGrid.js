import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import '../../public/scooter.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import file from '../../public/file.svg';
import {UpdateShared} from '../../actions/files';
import * as CommunityAPI from '../../api/CommunityAPI';
import * as FilesAPI from '../../api/GetFilesAPI';
import * as UpdateFilesAPI from '../../api/UpdateFileAPI';
import * as DownloadAPI from '../../api/DownloadFileAPI';
import fileDownload from 'react-file-download';
import Axios from 'axios';
import SideNavBar from '../SideNavBar';
import RightMenu from './RightMenu';
import '../../CSS/homepagecss.css';
import '../../CSS/homePage.css';
import {LoadFiles, LoadShared,LoadUserDepartments} from '../../actions/files';
import Header from '../Header';

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

    handleDelete(fileitem){
        var userId = 1;
        console.log(fileitem);
        UpdateFilesAPI.deleteFile(fileitem)
            .then((res) =>
            { FilesAPI.getFiles({userId})
            .then((obj) => {
                this.props.LoadFiles(obj);
            });

        });

    }


    createSharedList(){
        if(this.props.shared.sharedfiles && this.props.shared.sharedfiles.length == 0)
        {
            return(
                <div>
                <h2 className="header category">Shared with me</h2>
                    <div className="c-banner">
                        Nothing has been shared with you for now.
                    </div>
                </div>
                );
            }
        else{
                return(
                    <div>
                        <h2 className="header category">Shared with me</h2>
                        <ul className="list-group">
                            {
                                this.props.shared.sharedfiles.map(file => (
                                    <li className="list-group-item" key={file.filename}>
                                        <span className="ion-document-text"></span>
                                        <span className="listContent"   onClick={() => this.handleClick(file)}>{file.filename}</span>
                                    </li>
                                ))}
                        </ul>
                    </div>
                    );
            }
    }


    createMyFilesList(){
        if(this.props.files.files && this.props.files.files.length == 0)
        {
            return(
                <div>
                    <h2 className="header category">My Files</h2>
                    <div className="c-banner">
                        Nothing has been uploaded by you.
                    </div>
                </div>
            );
        }
        else{
            return(
                <div>
                    <h2 className="header category">My Files</h2>
                    <ul className="list-group">
                        {
                            this.props.files.files.map(file => (
                                <li className="list-group-item" key={file.filename}>
                                    <span className="ion-document-text col-sm-0.1"></span>
                                    <span className="listContent col-sm-10"   onClick={() => this.handleClick(file)}>{file.filename}</span>
                                    <div className="btn-group pull-right col-sm-1" role="group" aria-label="Basic example">
                                        <button type="button" className="btn btn-secondary btnshare ion-share" onClick={() => this.openShare(file)}></button>
                                        <button type="button" className="btn btn-secondary btnshare ion-ios-trash" onClick = {() => this.handleDelete(file)}></button>

                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>
            );
        }
    }


    render() {
        return (
            <div>
                <Header/>


                <div>
                        <div className="row">
                            <div className="col-sm-3 col-md-2">
                                <SideNavBar/>
                            </div>
                            {/*<div className="row col-sm-9 col-md-10 pt-3">*/}
                        <main role="main" className="row col-sm-7 col-md-7 pt-3">
                            <h1 className="header col-sm-12">Files</h1>
                            <div className="col-sm-12">
                                {this.createSharedList()}
                            </div>

                            <div className="col-sm-12">
                                {this.createMyFilesList()}
                                {/*<div>*/}
                                    {/*<h2 className="header category">My Files</h2>*/}
                                    {/*<ul className="list-group">*/}
                                        {/*{*/}
                                            {/*this.props.files.files.map(file => (*/}
                                            {/*<li className="list-group-item" key={file.filename}>*/}
                                                {/*<span className="ion-document-text col-sm-0.1"></span>*/}
                                                {/*<span className="listContent col-sm-10"   onClick={() => this.handleClick(file)}>{file.filename}</span>*/}
                                                {/*<div className="btn-group pull-right col-sm-1" role="group" aria-label="Basic example">*/}
                                                    {/*<button type="button" className="btn btn-secondary btnshare ion-share" onClick={() => this.openShare(file)}></button>*/}
                                                    {/*<button type="button" className="btn btn-secondary btnshare ion-ios-trash"></button>*/}

                                                {/*</div>*/}
                                            {/*</li>*/}
                                        {/*))}*/}
                                    {/*</ul>*/}
                                {/*</div>*/}
                            </div>


                        </main>
                            <div className="col-sm-3 rightBlock">
                                <RightMenu/>
                            </div>
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