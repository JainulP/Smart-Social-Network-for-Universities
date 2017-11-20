import React, { Component } from 'react';
import '../../public/scooter.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as UploadFileAPI from '../../api/UploadFileAPI';
import * as FilesAPI from '../../api/GetFilesAPI';
import * as CommunityAPI from '../../api/CommunityAPI';
import {LoadFiles} from '../../actions/files';
import {LoadUserDepartments} from '../../actions/files';

class RightMenu extends Component {
    state = {
        departments: ''
    }

    componentWillMount()
    {
        var userId = 1;
        CommunityAPI.getCommunties({userId})
            .then((obj) => {
                this.props.LoadUserDepartments(obj);
                console.log(obj);
            });



    }


    handleShared(){

        console.log("Handle shared called");
        var e = document.getElementById("shareWithGroup");
        var selectedGroup = e.options[e.selectedIndex].value;
        console.log("Selected group");
        console.log(selectedGroup);


        var file = this.props.shared.fileshared;
        //var members = this.state.members;
        var departments = selectedGroup;
        FilesAPI.ShareFile({file, departments})
        .then((status) => {
            if(status == 200){
                var sharediv = document.getElementById("divShare");
                sharediv.hidden = true;
            }
        });
    }


    uploadRequest( infile ) {
        var file = infile[0];  
        let data = new FormData();
        data.append('file',file);
        data.append('userId', localStorage.UserId);
        data.append('name', file.name);


        UploadFileAPI.uploadFile(data)
        .then((status) => {
            if(status == 200){
                console.log("Upload Success");
                //var userDetail = this.props.userdetail;
                var userId = localStorage.UserId;
                var parentId = this.props.files.parentId;
                FilesAPI.getFiles({userId, parentId})
                    .then((obj) => {       
                    this.props.LoadFiles(obj);
                });
            }    
            else{
                console.log("Error Occured while updating file.");
            }   
        });
      }

    render() {return (
        <div id="divRightMenu">
            <form enctype="multipart/form-data">
            <div className="form-group">
                <p id="uploadFile" className="f4">Choose a file to upload</p>
                <input name='inputFile' type="file"  className='c-input' onChange={(event) => this.uploadRequest(event.target.files)}/>
            </div>
            </form>
            <br/>
            <br/>
            <div id = "divShare" class="c-banner c-banner--unpinned" hidden>
                <form>
                    <div className="form-group">
                        <p id="lblSharefile" className="f4"></p>
                        {/*<input name='inputFile' type="text"  className='c-input' onChange={(event) => */}
                            {/*this.setState({*/}
                                {/*members: event.target.value*/}
                            {/*})*/}
                        {/*}/>*/}
                        <select id= 'shareWithGroup' className='c-input'
                        >
                            {
                                this.props.departments.departments.map(department => (

                             <option value={department.departmentid}>{department.departmentid}</option>
                                ))}
                        </select>
                        <button className = "c-btn c-btn--primary c-btn--full" onClick={()=>this.handleShared()}>Share</button>
                    </div>
                    {/***Comma separate multiple members    */}
                </form>
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
    return bindActionCreators({LoadFiles : LoadFiles,LoadUserDepartments:LoadUserDepartments},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RightMenu);