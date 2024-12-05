$(document).ready(async () => {

    let regions = {}
    let dashboardHtml = ''

    const getAllCountries = async () => {
        const response = await $.ajax('https://restcountries.com/v3.1/all')
        return response
    }

    const getSpecieficCountryName = async (countryName) => {
        const response = await $.ajax(`https://restcountries.com/v3.1/name/${countryName}`)
        return response
    }

    const displayCountriesData = async (countryName) => {
        // how many countries
        let totalCountries = []
        let totalCountriesPopulation = 0
        totalCountries = countryName.length

        let htmlNames = ''
        countryName.map(country => {
            // population
            totalCountriesPopulation += country.population
            htmlNames += `<tr><td class="rows">${country.name.common}</td>
            <td class="rows">${country.population}</td></tr>`

            //get region
            if (regions.hasOwnProperty(country.region))
                regions[country.region]++
            else
                regions[country.region] = 0


            // const reg = Object.keys(regions)
            // console.log(reg)
            // Object.keys(regions).map(item => {
            //     console.log(item)
            // })



        })
        console.log({ regions })
        $('.firstDataTable').append(htmlNames)


        let avaragePopulation = totalCountriesPopulation / totalCountries

        dashboardHtml += `
        <h3>Total Countries: ${totalCountries}</h3>
        <h3>Total Countries Population: ${totalCountriesPopulation}</h3>
        <h3>Avarage Population: ${avaragePopulation}</h3>
        `
        $('.dashboard').html(dashboardHtml)

    }

    const displayRegions = async(regions) => {
        let htmlRegion = ''

        Object.keys(regions).map(item => {
            if (regions[item] == 0) regions[item]++

            htmlRegion += `<tr><td class="rows">${[`${item}`]}</td>
                <td class="rows">${[`${regions[item]}`]}</td></tr>`
        })
        $('.secondDataTable').append(htmlRegion)
    }


    // all countries

    const allCountries = await getAllCountries()
    // console.log(allCountries)

    //speciefic Country
    // const specieaficCountryName = await getSpecieficCountryName('united')
    // console.log(specieaficCountryName)

    // Display Country Data
    // const countryData = await displayCountriesData(specieaficCountryName)

    // Display Country Region
    const countryRegion = displayRegions(regions)

    $('#searchByName').on('click', async () => {
        const countryNameInput = $('#searchCountry').val()
        const specieaficCountryName = await getSpecieficCountryName(countryNameInput)
        console.log(countryNameInput)
        await displayCountriesData(specieaficCountryName)
        await displayRegions(regions)
    })

    $('#allCountries').on('click', async () => {
        const allCountries = await getAllCountries()
        await displayCountriesData(allCountries)
        await displayRegions(regions)
    })

})  