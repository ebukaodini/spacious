import { Link, useRouteMatch } from "react-router-dom"
import styled from "styled-components"

const Wrapper = styled.div`
  width: 100%;
  padding-top: 32px;
`
const Title = styled.h1`
  height: 64px;
  width: 492px;
  
  font-size: 48px;
  font-style: normal;
  font-weight: 900;
  line-height: 72px;
  letter-spacing: 1px;
  text-align: left;
`
const Menu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;

  width: 279px;
  height: 40px;

  margin-top: 24px;
`
const Tab = styled(Link)`
  text-decoration: none;
  color: #121C33;
  opacity: 0.6;
  
  border-radius: 8px;
  border: none;
  padding: 8px 24px;
  
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: center;

  cursor: pointer;
  
  :nth-child(2) {
    margin: 0px 8px;
  }

  :hover,
  &.active {
    opacity: 1;
    background: rgba(18, 28, 51, 0.05);
  }
`

export const Header = ({ loading }) => {

  const { path } = useRouteMatch()

  return (
    <Wrapper>
      <Title>Spacious</Title>

      {
        !loading &&
        <Menu>
          <Tab to='/' className={path === '/' && 'active'}>PLANETS</Tab>
          <Tab to='/characters' className={path === '/characters' && 'active'}>CHARACTERS</Tab>
        </Menu>
      }
    </Wrapper>
  )
}