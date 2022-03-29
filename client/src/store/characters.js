import { gql } from "@apollo/client";

const characters = (page, pageSize) => {
  return gql`
    query characters {
      characters(page: ${page ?? 1}, pageSize: ${pageSize ?? 12}) {
        pagination {
          total
          page
          pageSize
        }
        nodes {
          id
          name
          description
          pictureUrl
          planet {
            name
          }
          friendsCount
          friends
        }
      }
    }
  `
}

const character = (id) => {
  return gql`
    query character {
      character (id: ${id}) {
        id
        name
        description
        pictureUrl
        planet {
          name
        }
        friendsCount
        friends
      }
    }
  `
}

const createCharacter = (name, description, planet, pictureUrl, friends) => {
  return gql`
    mutation createCharacter {
      createCharacter(characterInfo: {
        name: ${name},
        description: ${description},
        planet: ${planet},
        pictureUrl: ${pictureUrl},
        friends: ${friends}
      }) {
        id
        name
        description
        pictureUrl
        planet {
          name
        }
        friendsCount
        friends
      }
    }
  `
}

export { characters, character, createCharacter }