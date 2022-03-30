import { createPortal } from "react-dom";
import styled from "styled-components";

const ModalWrapper = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  bottom: 0px;
  right: 0px;

  background-color: rgba(0, 0, 0, 0.1);
  color: #FFFFFF;
  font-size: 40px;
`
const Content = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  overflow-y: auto;
`

export const Modal = ({ children }) => {

  return createPortal(
    <ModalWrapper>
      <Content>
        {children}
      </Content>
    </ModalWrapper>,
    document.getElementById("modal_root")
  )

}
