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
import {LoadFiles, LoadShared,LoadUserDepartments,LoadUserOnlyDepartments} from '../../actions/files';
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
        var userId = localStorage.getItem("UserId");
        FilesAPI.getFiles({userId})
            .then((obj) => {
                this.props.LoadFiles(obj);
            });
        FilesAPI.getSharedFiles({userId})
            .then((obj) => {
                this.props.LoadShared(obj);
            });
        CommunityAPI.getUserCommunity({userId})
            .then((obj) => {
                this.props.LoadUserOnlyDepartments(obj);
            });

    }
    componentDidMount()
    {

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
        var userId = localStorage.getItem("UserId");
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

                <tr>

                    <td>
                        Nothing has been shared with you for now.
                    </td>
                    <td></td>
                </tr>

                );
            }
        else{
            if (this.props.shared.sharedfiles) {
                return this.props.shared.sharedfiles.map((file) => {
                    return (
                        <tr>
                            <td width="30">
                                <span className="ion-document-text col-sm-0.1"></span>
                            </td>
                            <td className="listContent">
                                <span   onClick={() => this.handleClick(file)}>{file.filename}</span>
                            </td>
                        </tr>
                    );
                });
            }
            }
    }


    createMyFilesList(){
        if(this.props.files.files && this.props.files.files.length == 0)
        {
            return(
                <tr>

                    <td>
                        Nothing has been Uploaded by you.
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            );
        }
        else{

            if (this.props.files.files) {
                return this.props.files.files.map((file) => {
                        return (
                            <tr>
                                <td width="30">
                                    <span className="ion-document-text"></span>
                                </td>
                                <td className="listContent" >
                                    <span   onClick={() => this.handleClick(file)}>{file.filename}</span>
                                </td>
                                <td width="20">
                                    <button type="button" className="btn btn-secondary btnshare ion-share" onClick={() => this.openShare(file)}></button>
                                </td>
                                <td width="20">
                                    <button type="button" className="btn btn-secondary btnshare ion-ios-trash" onClick = {() => this.handleDelete(file)}></button>
                                </td>
                            </tr>
                        );
                    });
            }
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
                        <div className="row col-sm-7 col-md-7 pt-3">
                            <h4 className="header col-sm-12">Files</h4>

                            <div className="col-sm-12">
                                <h4 className="header">Shared with me</h4>
                                <div class="table-responsive">
                                    <table class="table table-striped">
                                        <thead>
                                        <tr>
                                            <th> </th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.createSharedList()}
                                        </tbody>
                                    </table>
                                </div>

                            </div>

                            <div className="col-sm-12">


                                <h4 className="header">My Files</h4>
                                <div class="table-responsive">
                                <table class="table table-striped">
                                <thead>
                                <tr>
                                <th> </th>
                                <th></th>
                                <th> </th>
                                <th> </th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.createMyFilesList()}
                                </tbody>
                                </table>
                                </div>
                            </div>


                        </div>
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
    return bindActionCreators({UpdateShared: UpdateShared,LoadFiles : LoadFiles, LoadShared: LoadShared, LoadUserDepartments:LoadUserDepartments, LoadUserOnlyDepartments:LoadUserOnlyDepartments},dispatch);
  }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FileGrid));

{/*<ul className="list-group">*/}
{/*{*/}
{/*this.props.files.files.map(file => (*/}
{/*<li className="list-group-item" key={file.filename}>*/}
{/*<span className="ion-document-text col-sm-0.1"></span>*/}
{/*<span className="listContent col-sm-10"   onClick={() => this.handleClick(file)}>{file.filename}</span>*/}
{/*<div className="btn-group pull-right col-sm-1" role="group" aria-label="Basic example">*/}
{/*<button type="button" className="btn btn-secondary btnshare ion-share" onClick={() => this.openShare(file)}></button>*/}
{/*<button type="button" className="btn btn-secondary btnshare ion-ios-trash" onClick = {() => this.handleDelete(file)}></button>*/}

{/*</div>*/}
{/*</li>*/}
{/*))}*/}
{/*</ul>*/}