import { withRouter } from "react-router-dom";
import styled from "styled-components";

const ModalWrapper = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  bottom: 0px;
  right: 0px;

  background-color: rgba(0, 0, 0, 0.2);
  color: #FFFFFF;
  font-size: 40px;
`

const Modal = ({ children, onClick }) => {

  return (
    <ModalWrapper onClick={() => onClick()}>
      {children}
    </ModalWrapper>
  )
}

export default withRouter(Modal)