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
  height: calc(100% - 64px);

  margin: 32px 0px;
  
  background: #FFFFFF;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 32px;
`

export const FlyoutMenu = () => {

  return (
    <FlyoutMenuWrapper>
      <Menu> <br /> </Menu>
    </FlyoutMenuWrapper>
  )
}