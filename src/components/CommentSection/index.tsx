import React, {useReducer} from 'react';
import {Button, SwipeableDrawer, Link, Avatar} from '../../../node_modules/@material-ui/core';
import { Grid, Row, Col } from "react-styled-flexboxgrid";
import CommentObject from "interfaces/CommentObject";
import {TextareaAutosize} from "react-autosize-textarea/lib/TextareaAutosize";
import Comment from '@components/Comment';
import "@assets/css/comments.css";

interface State {
  comments: CommentObject[];
  textarea: HTMLTextAreaElement;
}

interface Action {
  type    : string
  textarea: HTMLTextAreaElement;
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'setTextarea':
      return {comments: state.comments, textarea: action.textarea};

    case 'addComment':

      if (state.textarea.value.length > 0) {

        const comment: CommentObject = {commentText: state.textarea.value, children: []};
        state.textarea.value = "";
        return {comments: state.comments.concat([comment]), textarea: state.textarea};

      } else {
        return state;
      }

    case 'updateText':
      return state;
    default:
      return state;
  }
};

let textarea: HTMLTextAreaElement = document.createElement('textarea');

let comment3: CommentObject = {commentText: "three", children: []        };
let comment2: CommentObject = {commentText: "two" , children: [comment3]};
let comment1: CommentObject = {commentText: "one" , children: [comment2]};

const initialState : State = {comments: [comment1], textarea: textarea};

export default function CommentSection() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addComment = () => {
    dispatch({type: 'addComment', textarea: state.textarea});
  };

  return (
    <React.Fragment>
      <Grid fluid>
        <Row>
          <Col xs={12}>

                <Row start="xs">
                    <Col xs={2}>
                    </Col>
                    <Col xs={10}>
                          <TextareaAutosize
                           rows={10}
                           style={{ maxHeight: 100, boxSizing: 'border-box', minWidth: '80%',
                           borderColor: '#DBDFE4', color: '#003365',
                           background:'#FFFFFF', borderStyle: 'solid 2px' }}
                           innerRef={ref => dispatch({type: 'setTextarea', textarea:ref})}
                           defaultValue={''}
                          />
                    </Col>
                </Row>

          </Col>
       </Row>
      </Grid>

      <Grid fluid>
        <Row>
          <Col xsOffset={9} xs={3}>
              <div onClick={addComment}>
                  <Button variant="contained" color="primary" style={{color:"#FFFFFF", background:"#A5A8AA"}}>
                  Post
                  </Button>
              </div>
          </Col>
        </Row>
      </Grid>

      <Grid fluid>
        <Row>
          <Col xsOffset={2} xs={7}>
 
              <div style={{minWidth: '100%'}}>
                {state.comments.map(comment => {
                   return <Comment style={{minWidth: '100%'}} commentText={comment.commentText} children={comment.children} level={0}/>
                 })}
              </div>
          </Col>
        </Row>
    </Grid>

    </React.Fragment>
  );
};

