import { Loader } from "@googlemaps/js-api-loader"

const mapLoader = (latitude, longitude) => {
  const loader = new Loader({
    apiKey: "AIzaSyAvSzdlCsuiYCRlIrDRskSX7mrndJURkXU"
  })

  loader.load().then(() => {
    const location = { lat: Number(latitude), lng: Number(longitude) }
    const map = new google.maps.Map(document.getElementById("map"), {
      center: location,
      zoom: 12,
      mapTypeId: "terrain"
    })
    
    new google.maps.Marker({
      position: location,
      map: map,
    })
  })
}

export default mapLoader