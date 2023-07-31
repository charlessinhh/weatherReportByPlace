function fetchData() {
    const mapApiKey = '';
    const googleApiKey = '';

    const address = document.getElementById("place").value;
    const mapUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?&access_token=${mapApiKey}`;
    const GoogleMapUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleApiKey}`;


    let tempDegree = document.querySelector(".temperature-degree");
    let locationTimeZone = document.querySelector(".location-timezone");
    let tempDesc = document.querySelector(".temperature-decription");

    let location;
    let lat;
    let long;
    fetch(GoogleMapUrl)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            // location = data.features[0].geometry.coordinates;
            // console.log(location[0], location[1]);
            // lat = location[1];
            fullAddress = data.results[0].formatted_address;
            coOrdinate = data.results[0].geometry.location;
            console.log(coOrdinate.lat, coOrdinate.lng);
            lat = coOrdinate.lat;
            long = coOrdinate.lng;
            const weatherApiKey = 'd93b50b94d2b44d386c155801231602';
            const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${lat},${long}&aqi=yes`;
            fetch(weatherUrl)
                .then(response => response.json())
                .then(data => {
                    // console.log(data);
                    const tempC = data.current.temp_c;
                    const tempF = data.current.temp_f;
                    const time = data.location.localtime;
                    console.log('temp and time of', fullAddress);
                    console.log('tempC:', tempC);
                    console.log('tempF:', tempF);
                    console.log('time:', time);
                    tempDegree.textContent = tempC;
                    locationTimeZone.textContent = time;
                    tempDesc.textContent = fullAddress;
                })
                .catch(error => {
                    console.log('error: ', error);
                });
        })
        .catch(error => {
            console.log('error: ', error);
        });


}
