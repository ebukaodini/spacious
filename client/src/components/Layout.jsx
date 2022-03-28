import styled from 'styled-components'
import { Header, FlyoutMenu } from './'

const DesktopLayout = styled.div`
  background-color: #F5F5F5;
  width: 100vw;
  height: 100vh;  
`
const Wrapper = styled.div`
  width: 1440px;
  height: 100%;
  margin: auto;

  position: relative;
`
const Container = styled.div`
  width: 992px;
  height: auto;
  margin: auto;
`
const Body = styled.div`
  margin-top: 16px;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  height: 100%;
  width: 100%;
`

export const Layout = ({ children }) => {

  return (
    <DesktopLayout>
      <Wrapper>
        
        <Container>

          <Header />

          <Body>
            {children}
          </Body>

        </Container>

        <FlyoutMenu />

      </Wrapper>
    </DesktopLayout>
  )
}