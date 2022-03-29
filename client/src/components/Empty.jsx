import { Link, useRouteMatch } from "react-router-dom"
import styled from "styled-components"
import PlanetLoader from '../assets/planet-loader.svg'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: flex-start;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const EmptyImage = styled.div`
  height: 128px;
  margin-top: 72px;
  margin-bottom: 40px;
`
const EmptyText = styled.h3`
  height: 48px;
  margin-bottom: 24px;

  font-style: normal;
  font-weight: 800;
  font-size: 32px;
  line-height: 48px;

  text-align: center;

  color: #121C33;
`
const EmptyButton = styled(Link)`
  text-decoration: none;

  cursor: pointer;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 12px 24px;

  background: #121C33;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;

  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  display: flex;
  align-items: center;
  text-align: center;
  text-transform: uppercase;

  color: #FFFFFF;
`

export const Empty = () => {

  const { path } = useRouteMatch()
  const resource = path === '/' ? 'PLANET' : 'CHARACTER'

  return (
    <Wrapper>
      <Content>
        <EmptyImage>
          <img src={PlanetLoader} alt={`Empty ${resource}`} />
        </EmptyImage>
        <EmptyText>
          Space doesn't have to be so empty.
        </EmptyText>
        <EmptyButton to={`/${resource.toLowerCase()}s/create`}>
          CREATE {resource}
        </EmptyButton>
      </Content>
    </Wrapper>
  )
}