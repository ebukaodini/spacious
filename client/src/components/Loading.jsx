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
  height: 240px;
  width: 240px;
  border-radius: 32px;

  margin-top: 176px;

  background: #FFFFFF;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);

  display: flex;
  justify-content: center;
  align-items: center;
`
const Loader = styled.div`
  height: 128px;

  @media (prefers-reduced-motion: no-preference) {
    animation: Spin-loader infinite 5s linear;
  }

  @keyframes Spin-loader {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

export const Loading = () => {

  return (
    <Wrapper>
      <Content>
        <Loader>
          <img src={PlanetLoader} alt="Loading" />
        </Loader>
      </Content>
    </Wrapper>
  )
}