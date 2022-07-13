import React, {PropsWithChildren} from 'react';
import ReactDOM from 'react-dom';

import classes from "./Modal.module.css";

type BackdropProps = { onClose: () => void };

const Backdrop = (props: BackdropProps) => {
    return <div className={classes.backdrop} onClick={props.onClose}></div>
};

const ModalOverlay = (props: PropsWithChildren) => {
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}

const Modal = (props: PropsWithChildren<BackdropProps>) => {
    const portalElement = document.getElementById("overlays")!;
    
    return (
        <>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </>
    );
};

export default Modal;