async function pageLoaded() {
  let response = await fetch('https://kiei451.com/api/rides.json')
  let json = await response.json()

  // writes the returned JSON to the console
  console.dir(json)

  // 🔥 start here: write code to loop through the rides

  // assign rename variable for code clarity
  let ridesArray = json

  // loop through all rides
  for (let i = 0; i < ridesArray.length; i++) {

    // assign variable representing the ride on each iteration of the loop
    let ride = ridesArray[i]

    // logic from hw3 determining level of service for each ride
    let levelOfService
    if (ride.length > 1) {
      levelOfService = 'Noober Pool'
    } else if (ride[0].purpleRequested) {
      levelOfService = 'Noober Purple'
    } else if (ride[0].numberOfPassengers > 3) {
      levelOfService = 'Noober XL'
    } else {
      levelOfService = 'Noober X'
    }

    // insert HTML with the level of service header for each ride
    document.querySelector('.rides').insertAdjacentHTML('beforeend', `
      <h1 class="inline-block mt-8 px-4 py-2 rounded-xl text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
        <i class="fas fa-car-side"></i>
        <span>${levelOfService}</span>
      </h1>
    `)

    // loop through all legs of each individual ride, using j since i is already used
    for (let j = 0; j < ride.length; j++) {

      // assign variable representing the leg on each iteration of the loop
      let leg = ride[j]

      // NOTE: this was not necessary/graded, just including if you were wondering how to:
      // modify the color styles for Noober Purple rides
      let borderClass
      let backgroundClass
      if (levelOfService == 'Noober Purple') {
        borderClass = 'border-purple-500'
        backgroundClass = 'bg-purple-600'
      } else {
        borderClass = 'border-gray-900'
        backgroundClass = 'bg-gray-600'
      }

      // insert HTML with the leg/passenger data for each leg
      document.querySelector('.rides').insertAdjacentHTML('beforeend', `
        <div class="border-4 ${borderClass} p-4 my-4 text-left">
          <div class="flex">
            <div class="w-1/2">
              <h2 class="text-2xl py-1">${leg.passengerDetails.first} ${leg.passengerDetails.last}</h2>
              <p class="font-bold text-gray-600">${leg.passengerDetails.phoneNumber}</p>
            </div>
            <div class="w-1/2 text-right">
              <span class="rounded-xl ${backgroundClass} text-white p-2">
                ${leg.numberOfPassengers} passengers
              </span>
            </div>
          </div>
          <div class="mt-4 flex">
            <div class="w-1/2">
              <div class="text-sm font-bold text-gray-600">PICKUP</div>
              <p>${leg.pickupLocation.address}</p>
              <p>${leg.pickupLocation.city}, ${leg.pickupLocation.state} ${leg.pickupLocation.zip}</p>
            </div>
            <div class="w-1/2">
              <div class="text-sm font-bold text-gray-600">DROPOFF</div>
              <p>${leg.dropoffLocation.address}</p>
              <p>${leg.dropoffLocation.city}, ${leg.dropoffLocation.state} ${leg.dropoffLocation.zip}</p>
            </div>
          </div>
        </div>
      `)
    }
  }

}

window.addEventListener('DOMContentLoaded', pageLoaded)

