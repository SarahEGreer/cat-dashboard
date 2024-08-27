try {
    const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=cat")
    const data = await res.json()
    document.body.style.backgroundImage = `linear-gradient(to right, rgba(248, 173, 157, .4), rgba(248, 173, 157, .4)), url(${data.urls.regular})`
    document.getElementById("author").textContent = `Photo by: ${data.user.name}`
} catch (err) {
    document.body.style.backgroundImage = `linear-gradient(to right, rgba(248, 173, 157, .4), rgba(248, 173, 157, .4)), url(https://images.unsplash.com/photo-1557246565-8a3d3ab5d7f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDgxMjc3ODh8&ixlib=rb-4.0.3&q=80&w=1080)`
    document.getElementById("author").textContent = `Photo by:: Tran Mau Tri Tam ✪`
}



function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", { timeStyle: "short" })
}

setInterval(getCurrentTime, 1000)

navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `
        })
        .catch(err => console.error(err))

    fetch(`http://api.weatherapi.com/v1/astronomy.json?key=1406e2e964d24ec5bc5192620241602&q=${position.coords.latitude},${position.coords.longitude}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("moon-phase").innerHTML += `
            ${moonIcons[data.astronomy.astro.moon_phase]}
            <p class="moon-text">${data.astronomy.astro.moon_phase}</p>
            `
        })
        .catch(err => console.error(err))
});



const moonIcons = {
    "New Moon": '<i class="qi-800"></i>',
    "Waxing Crescent": '<i class="qi-801"></i>',
    "First Quarter": '<i class="qi-802"></i>',
    "Waxing Gibbous": '<i class="qi-803"></i>',
    "Full Moon": '<i class="qi-804"></i>',
    "Waning Gibbous": '<i class="qi-805"></i>',
    "Last Quarter": '<i class="qi-806"></i>',
    "Waning Crescent": '<i class="qi-807"></i>'
}