import styled from "styled-components"
import { Empty, Layout, Loading } from "../components"
import { useQuery } from "@apollo/client"
import { characters as charactersQuery } from '../store/index'
import { useEffect, useRef, useState } from "react"
import { X } from "react-feather"

const Wrapper = styled.div`
  /* width: 100%; */
  width: 1146px;
  height: 100%;
`
const Grid = styled.div`
  /* Grid Fallback */
  display: flex;
  flex-wrap: wrap;
  
  /* Supports Grid */
  display: grid;
  grid-template-columns: repeat(${props => props.showFlyout ? 3 : 4}, 272px);
  grid-auto-rows: 200px;
  grid-gap: 16px;
`
const ItemWrapper = styled.div`
  height: calc(100% - 4px);
  width: calc(100% - 4px);

  background: #FFFFFF;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  border: 2px solid rgba(0, 0, 0, 0.02);
  
  cursor: pointer;
  
  &.focus,
  :focus, 
  :hover {
    border-color: #121C33;
    transition: border-color 1s ease-in-out;
  }
`
const Item = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`
const CharacterImageWrapper = styled.div`
  height: calc(100% - 66px);
  width: 100%;
  overflow: hidden;
  
  display: flex;
  justify-content: center;
  align-items: flex-start;
`
const CharacterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`
const CharacterDetailsWrapper = styled.div`
  width: calc(100% - 32px);
  padding: 8px 16px 16px 16px;
`
const CharacterName = styled.h3`
  width: 240px;
  right: 16px;

  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  display: flex;
  align-items: center;

  color: #121C33;
`
const CharacterFriendsCount = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  display: flex;
  align-items: center;

  color: #121C33;

  opacity: 0.6;
`

const FlyoutWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`
const CloseFlyoutBtn = styled.button`
  height: 40px;
  width: 40px;
  border-radius: 8px;

  background: rgb(18, 28, 51, 0.1);
  border-radius: 8px;
  border: none;

  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;

  cursor: pointer;

  margin-bottom: 16px;
`
const CloseFlyoutIcon = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 32px;

  height: 40px;
  width: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #121C33;
`
const ItemTitle = styled.h3`
  height: 48px;

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 800;
  font-size: 32px;
  line-height: 48px;

  color: #121C33;

  margin-bottom: 8px;
`
const ItemDescription = styled.p`
  width: 344px;
  
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;

  color: #121C33;
  opacity: 0.6;

  margin-bottom: 16px;
`
const CharacterDescription = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`
const Title = styled.div`
  width: 168px;
  height: 24px;

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;

  color: #121C33;
`
const TitleValue = styled.div`
  width: 168px;
  height: 24px;

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  display: flex;
  align-items: center;

  color: #121C33;

  margin-bottom: 16px;
`
const FriendsHeader = styled.div`
  width: 100%;
  height: 40px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 8px;
`
const FriendsTitle = styled.h5`
  height: 24px;

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  text-transform: uppercase;

  color: #121C33;
  opacity: 0.6;
`
const FriendsWrapper = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
`

export const CharactersPage = () => {

  //#region 
  const { loading, error, data } = useQuery(charactersQuery());
  const [items, setItems] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [showFlyout, setShowFlyout] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})

  const fromCreatePage = useRef()
  fromCreatePage.current = localStorage.getItem('fromCreatePage') ?? false

  useEffect(() => {
    if (!error) {
      setItems(data?.characters?.nodes)
      setLoaded(true)
    }
  }, [data, error])

  //#endregion

  let flyout = (<></>)

  if (showFlyout) {
    flyout = (
      <FlyoutWrapper>

        <CloseFlyoutBtn onClick={() => setShowFlyout(false)}>
          <CloseFlyoutIcon>
            <X size={32} />
          </CloseFlyoutIcon>
        </CloseFlyoutBtn>

        <ItemTitle>
          {selectedItem?.name}
        </ItemTitle>

        <ItemDescription>
          {selectedItem?.description}
        </ItemDescription>

        <CharacterDescription>
          <div>
            <Title>Planet</Title>
            <TitleValue>{selectedItem?.planet?.name}</TitleValue>
          </div>

          <div>
            <Title>Friends</Title>
            <TitleValue>{selectedItem?.friendsCount ?? 0}</TitleValue>
          </div>

        </CharacterDescription>

        <FriendsHeader>

          <FriendsTitle>
            FRIENDS
          </FriendsTitle>

        </FriendsHeader>

        <FriendsWrapper>
          There are no friends.
        </FriendsWrapper>


      </FlyoutWrapper>
    )

  }

  return (
    <Layout loading={loading} showFlyout={showFlyout} flyout={flyout}>

      {
        loading === true ?
          <Loading />
          :
          loaded === true && items?.length === 0 ?
            <Empty />
            :
            <Wrapper>
              <Grid showFlyout={showFlyout}>
                {
                  items?.map((item, index) => (

                    <ItemWrapper className={selectedItem?.id === item?.id ? 'focus' : ''} id={`__character_${index}`} key={index}
                      onClick={async () => {
                        setShowFlyout(true)
                        setSelectedItem(item)
                      }}
                    >
                      <Item>

                        <CharacterImageWrapper>
                          <CharacterImage src={item.pictureUrl} alt={item.name} />
                        </CharacterImageWrapper>

                        <CharacterDetailsWrapper>
                          <CharacterName>{item.name}</CharacterName>
                          <CharacterFriendsCount>{item.friendsCount ?? 0} friends</CharacterFriendsCount>
                        </CharacterDetailsWrapper>

                      </Item>
                    </ItemWrapper>

                  ))
                }
              </Grid>
            </Wrapper>
      }

    </Layout>
  )
}