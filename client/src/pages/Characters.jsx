import styled from "styled-components"
import { Empty, Layout, Loading } from "../components"
import { useQuery } from "@apollo/client"
import { characters as charactersQuery } from '../store/index'
import { useEffect, useState } from "react"

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
  grid-template-columns: repeat(4, 272px);
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

export const CharactersPage = () => {

  const { loading, error, data } = useQuery(charactersQuery());
  const [items, setItems] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!error) {
      setItems(data?.characters?.nodes)
      setLoaded(true)
    }
  }, [data, error])

  return (
    <Layout>

      {
        loading === true ?
          <Loading />
          :
          loaded === true && items?.length === 0 ?
            <Empty />
            :
            <Wrapper>
              <Grid>
                {
                  items?.map((item, index) => (

                    <ItemWrapper key={index}
                      onClick={() => { alert(item.name) }}
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