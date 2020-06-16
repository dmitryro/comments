import React, {useState} from 'react';
import Modal from 'react-modal';
import {TextareaAutosize} from "react-autosize-textarea/lib/TextareaAutosize";

interface Props {
  setModalState:(ModalState) => void
  addComment   :(string    ) => void

  modalState: ModalState
}

interface ModalState {
  isOpen: boolean
}

interface State {
  textarea: HTMLTextAreaElement;
}

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#app');

let textarea: HTMLTextAreaElement = document.createElement('textarea');
const initialState : State = {textarea};

const Reply = (props: Props) => {
  const [state, setState] = useState(initialState);

  const setModalOff = () => {
    props.setModalState({isOpen: false});
  };

  return (
    <Modal isOpen={true} style={customStyles}>
      <TextareaAutosize
        rows={10}
        style={{ maxHeight: 100, boxSizing: 'border-box', minWidth: '80%' }}
        innerRef={ref => setState({textarea: ref})}
        defaultValue={''}
      />

      <button onClick={() => {setModalOff()}} >close</button>
      <button onClick={() => {
        props.addComment(state.textarea.value);
        setModalOff();
      }}>addComment</button>
    </Modal>
  );
};

export default Reply;
