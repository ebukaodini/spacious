import { Link, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import { Header, FlyoutMenu } from './'
import { Plus } from 'react-feather'

const DesktopLayout = styled.div`
  background-color: #F5F5F5;
  width: 100vw;
  min-width: 1440px;
  height: 100vh;
`
const Wrapper = styled.div`
  width: 1440px;
  height: 100%;
  margin: auto;

  position: relative;
`
const Container = styled.div`
  width: 1140px;
  height: 100%;
  margin: auto;
`
const Body = styled.div`
  margin: 16px 0px;
  
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  height: calc(100% - (32px + 160px));
  width: 100%;

  overflow-y: auto;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 0px;
  }

  position: relative;
`
const Fab = styled(Link)`
  position: absolute;
  bottom: 24px;
  right: 24px;

  width: 56px;
  height: 56px;

  background: #121C33;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 40px;

  display: flex;
  align-items: center;
  justify-content: center;
  `
const FabIcon = styled.span`
  width: 32px;
  height: 32px;
  left: 1244px;
  top: 740px;

  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 32px;

  color: #FFFFFF;
`

export const Layout = ({ children, loading }) => {

  const { path } = useRouteMatch()
  const linkTo = path === '/' ? '/planets/create' : '/characters/create'

  return (
    <DesktopLayout>
      <Wrapper>

        <Container>

          <Header loading={loading} />

          <Body>
            {children}

            <Fab to={{
              pathname: linkTo,
              state: { modal: true }
            }}>
              <FabIcon>
                <Plus size={32} />
              </FabIcon>
            </Fab>
          </Body>

        </Container>

        {/* <FlyoutMenu /> */}

      </Wrapper>
    </DesktopLayout>
  )
}