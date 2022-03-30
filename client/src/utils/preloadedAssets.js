import PlanetLoader from '../assets/planet-loader.svg'

const preloadedAssets = {}

const assets = {
  planetLoader: PlanetLoader
}

Object.entries(assets).forEach(asset => {

  const img = new Image();
  img.src = asset[1];

  preloadedAssets[asset[0]] = img

  console.log(preloadedAssets)

})

export default preloadedAssets