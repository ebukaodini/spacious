import styled from 'styled-components'
import { Header, FlyoutMenu } from './'

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
`

export const Layout = ({ children, loading }) => {

  return (
    <DesktopLayout>
      <Wrapper>

        <Container>

          <Header loading={loading} />

          <Body>
            {children}
          </Body>

        </Container>

        {/* <FlyoutMenu /> */}

      </Wrapper>
    </DesktopLayout>
  )
}