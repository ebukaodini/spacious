import styled from 'styled-components'
import { Layout } from '../components'

import PlanetLoader from '../assets/planet-loader.svg'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

export const PlanetsPage = () => {

  return (
    <Layout>

      <Wrapper>

        <img src={PlanetLoader} alt="" />

      </Wrapper>

    </Layout>
  )
}