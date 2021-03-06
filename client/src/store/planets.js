import { gql } from "@apollo/client";

const planets = (page, pageSize) => {
  return gql`
    query planets {
      planets(page: ${page ?? 1}, pageSize: ${pageSize ?? 12}) {
        pagination {
          page
          pageSize
          total
        }
        nodes {
          id
          name
          description
          code
          pictureUrl
          population
          characters(limit: 3) {
            id
          }
        }
      }
    }
  `
}

const createPlanet = () => {
  return gql`
    mutation createPlanet($name: String!, $description: String!, $pictureUrl: String!) {
      createPlanet(
        planetInfo: {
          name: $name
          description: $description
          pictureUrl: $pictureUrl
        }
      ) {
        id
        name
        description
        code
        pictureUrl
        population
        characters(limit: 3) {
          id
        }
      }
    }
  `
}



export { planets, createPlanet }