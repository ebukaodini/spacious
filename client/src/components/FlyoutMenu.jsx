import styled from "styled-components"

const FlyoutMenuWrapper = styled.div`
  height: 100%;
  width: 408px;

  position: absolute;
  top: 0px;
  right: 0px;
`
const Menu = styled.div`
  border-radius: 32px;
  height: calc(100% - 96px);

  margin-top: 32px;
  margin-bottom: 16px;

  padding: 24px;
  
  background: #FFFFFF;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 32px;
`

export const FlyoutMenu = ({ children }) => {

  return (
    <FlyoutMenuWrapper>
      <Menu>

        {children}

      </Menu>
    </FlyoutMenuWrapper>
  )
}