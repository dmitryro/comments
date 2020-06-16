import React, {useReducer, useState} from 'react';
import Reply from "@components/Reply";
import CommentObject from "@interfaces/CommentObject";
import {Button, Link, Box, Avatar} from '../../../node_modules/@material-ui/core';
import { Grid, Row, Col } from "react-styled-flexboxgrid";
import "@assets/css/comments.css";
interface Style {
  minWidth: string
}

interface CommentProps {
  commentText: string;
  children   : CommentObject[];
  style      : Style
}

interface State {
  commentText: string;
  children   : CommentObject[];
  level: number;
}

interface Action {
  type : string
  text : string
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'addComment':

      let comment : CommentObject = {commentText: action.text, children: []};
      let children                = state.children;
      children.push(comment);
      return {children: children, commentText: state.commentText};

    default:
      return state;
  }
};

export default function Comment({style, commentText, children, level}) {
  const [state       , dispatch     ] = useReducer(reducer, {commentText: commentText, children: children});
  const [modalState  , setModalState] = useState({isOpen: false});
  const [visibleState, setVisibility] = useState({visible: true});
  const commentBody = level===0 ? "commentBodyTop" : "commentBody";
  const commentPrefix1 = "commentPrefix1";
  const commentPrefix2 = "commentPrefix2";
  const wrap = level===0 ? "default" : "wrap";

  const addComment = (text: string) => {
    dispatch({type: 'addComment', text: text});
  };

  let modal;
  if (modalState.isOpen) {
    modal = <Reply addComment={addComment} modalState={modalState} setModalState={setModalState}/>;
  }

  if (visibleState.visible) {
    return (
      <React.Fragment>

        {modal}

        <div style={{width: style.minWidth}}>
        <div className={commentBody}>

                                              <Grid fluid>
                                                  <Row className={wrap}>
                                                        <Col xs={1}>
                                                            <Avatar alt="Default User" src="@assets/img/default-avatar.png"/>
                                                        </Col>
                                                        <Col xs={11}>
                                                            <p style={{paddingTop:10}}>{state.commentText}</p>
                                                        </Col>
                                                  </Row>
                                                  <Row className={wrap}>
                                                        <Col xs={1}>
                                                             <div className={commentPrefix1}>&nbsp;</div>
                                                             <div className={commentPrefix2}>&nbsp;</div>
                                                             <div className="clear"></div>
                                                        </Col>
                                                        <Col xs={1}>
                                                             <div onClick={()=> setModalState({isOpen: true})} className="commentLink">
                                                                  <Link className="controlLink">Reply
                                                                  </Link>
                                                             </div>
                                                        </Col>
                                                        <Col xs={10}>
                                                             <div onClick={()=> setVisibility({visible: false})} className="commentLink">
                                                                  <Link className="controlLink">Collapse
                                                                  </Link>
                                                             </div>
                                                        </Col>
                                                  </Row>
                                           </Grid>


        </div>

        <div>
        {
          state.children.map(comment => {
            return (
              <div style={{display:'flex', flexDirection:'row', margin: 0, padding: 0}}>
                <div style={{width:'4%'}} />
                <Comment style={style} commentText={comment.commentText} children={comment.children} level={level+1}/>
              </div>
            )
          })
        }
        </div>
        </div>
      </React.Fragment>

    );

  } else {
    return (

      <div onClick={() => setVisibility({visible: true})} >
         <Link className="commentLink">
           Show Comment 
         </Link>
      </div>
    );
  }

};
