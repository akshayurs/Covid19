var body = ''
var covidData = {}
var sortedOption = ''
var states = {
  AP: 'Andra Pradesh',
  AN: 'Andaman and Nicobar Islands',
  AR: 'Arunanchal Pradesh',
  AS: 'Assam',
  BR: 'Bihar',
  CT: 'Chhattisgarh',
  CH: 'Chandigarh',
  DL: 'Delhi',
  DN: 'Dadra and Nagar Haveli',
  DD: 'Daman and Diu',
  GA: 'Goa',
  GJ: 'Gujarat',
  HR: 'Haryana',
  HP: 'Himachal Pradesh',
  JK: 'Jammu and Kashmir',
  JH: 'Jharkhand',
  KA: 'karnataka',
  KL: 'Kerala',
  LD: 'Lakshadweep',
  LA: 'Ladak',
  MP: 'Madhyapradesh',
  MH: 'Maharashtra',
  MN: 'Manipur',
  ML: 'Meghalaya',
  MZ: 'Mizoram',
  NL: 'Nagaland',
  OR: 'Orissa',
  PB: 'Punjab',
  PY: 'Pondicherry',
  RJ: 'Rajasthan',
  SK: 'Sikkim',
  TN: 'Tamilnadu',
  TG: 'Telangana',
  TR: 'Tripura',
  UK: 'Uttarakhand',
  UP: 'Uttar Pradesh',
  WB: 'West Bengal',
}
async function getdata() {
  let data = await fetch('https://data.covid19india.org/v4/min/data.min.json')
  body = await data.json()
  let zero = '0'
  Object.keys(body).forEach((ele) => {
    let deltaConfirmed = body[ele].delta?.confirmed ?? zero
    let deltaDeceased = body[ele]?.delta?.deceased ?? zero
    let deltaRecovered = body[ele]?.delta?.recovered ?? zero
    let totalConfirmed = body[ele]?.total?.confirmed ?? zero
    let totalDeceased = body[ele]?.total?.deceased ?? zero
    let totalRecovered = body[ele]?.total?.recovered ?? zero
    let totalTested = body[ele]?.total?.tested ?? zero
    let totalVaccinated =
      body[ele]?.total?.vaccinated1 + body[ele]?.total?.vaccinated1 ?? zero
    let metaPopulation = body[ele]?.meta?.population ?? zero

    if (states[ele]) {
      covidData[states[ele]] = {
        code: ele,
        deltaConfirmed,
        deltaDeceased,
        deltaRecovered,
        totalConfirmed,
        totalDeceased,
        totalRecovered,
        totalTested,
        totalVaccinated,
        metaPopulation,
      }
    }
  })
  let ele = 'TT'
  let item = `<tr><td>${body[ele]['delta']['confirmed'] || zero}</td>
  <td>${body[ele]['delta']['deceased'] || zero}</td>
  <td>${body[ele]['delta']['recovered'] || zero}</td>
  <td>${body[ele]['total']['confirmed'] || zero}</td>
  <td>${body[ele]['total']['deceased'] || zero}</td>
  <td>${body[ele]['total']['recovered'] || zero}</td>
  <td>${body[ele]['total']['tested'] || zero}</td>
  <td>${
    body[ele]['total']['vaccinated1'] + body[ele]['total']['vaccinated1'] ||
    zero
  }</td>
  <td>${body[ele]['meta']['population'] || zero}</td>
  </tr>
   `
  document.querySelector(
    '#india-updated'
  ).innerHTML = `updated on ${body[ele]['meta']['date']}`
  document.querySelector('#india-table').insertAdjacentHTML('beforeend', item)
  addStatesToDOM(Object.keys(covidData))
}
getdata()

function addStatesToDOM(keysArray) {
  document.querySelector('#states-content').innerHTML = ''
  let items = ''
  keysArray.forEach((ele) => {
    items += `<tr><th class='state state-name' data-state="${covidData[ele].code}">${ele}</th><td>${covidData[ele].deltaConfirmed}</td>
      <td>${covidData[ele].deltaDeceased}</td>
      <td>${covidData[ele].deltaRecovered}</td>
      <td>${covidData[ele].totalConfirmed}</td>
      <td>${covidData[ele].totalDeceased}</td>
      <td>${covidData[ele].totalRecovered}</td>
      <td>${covidData[ele].totalTested}</td>
      <td>${covidData[ele].totalVaccinated}</td>
      <td>${covidData[ele].metaPopulation}</td>
      </tr>
       `
  })
  document
    .querySelector('#states-content')
    .insertAdjacentHTML('beforeend', items)
  document.querySelectorAll('.state-name').forEach((ele) => {
    ele.addEventListener('click', (e) => {
      navigator.vibrate(20)
      add(e.target.getAttribute('data-state'))
    })
  })
}

function add(state) {
  document.querySelector('#back').style.display = 'block'
  let table = document.querySelector('#districts-table')
  let data1 = body[state]['districts']
  document.querySelector('#districts-content').innerHTML = ''
  document.querySelector('#state-selected').innerHTML = states[state]
  document.querySelector(
    '#state-updated'
  ).innerHTML = `updated on ${body[state]['meta']['date']}`
  Object.keys(data1).forEach((ele) => {
    const zero = '-'
    if (data1[ele].hasOwnProperty('delta')) {
      let e = `<tr><th>${ele}</th>
      <td>${data1[ele]['delta']['confirmed'] || zero}</td>
      <td>${data1[ele]['delta']['deceased'] || zero}</td> 
      <td>${data1[ele]['delta']['recovered'] || zero}</td>
      <td>${data1[ele]['total']['confirmed'] || zero}</td>
      <td>${data1[ele]['total']['deceased'] || zero}</td>
      <td>${data1[ele]['total']['recovered'] || zero}</td>
      <td>${data1[ele]['total']['tested'] || zero}</td>
      <td>${
        data1[ele]['total']['vaccinated1'] +
          data1[ele]['total']['vaccinated1'] || zero
      }</td>
      <td>${
        data1[ele].hasOwnProperty('meta')
          ? data1[ele]['meta']['population'] || zero
          : '-'
      }</td>
           </tr>
           `
      document
        .querySelector('#districts-content')
        .insertAdjacentHTML('beforeend', e)
    }
  })
  table.style.display = 'table'
  document.querySelector('#states-table').style.display = 'none'
  document.querySelector('#india-table').style.display = 'none'
  document.querySelector('#info-msg').style.display = 'none'
}

function back() {
  navigator.vibrate(20)
  document.querySelector('#states-table').style.display = 'table'
  document.querySelector('#india-table').style.display = 'table'
  document.querySelector('#info-msg').style.display = 'block'
  document.querySelector('#districts-table').style.display = 'none'
  document.querySelector('#back').style.display = 'none'
}
function sortData(option) {
  navigator.vibrate(20)
  let newCovidData = { ...covidData }
  if (sortedOption == option) {
    let sortedKeys = Object.keys(newCovidData).sort(function (a, b) {
      return newCovidData[a][option] - newCovidData[b][option]
    })
    addStatesToDOM(sortedKeys)
    sortedOption = ''
  } else {
    let sortedKeys = Object.keys(newCovidData).sort(function (a, b) {
      return newCovidData[b][option] - newCovidData[a][option]
    })
    addStatesToDOM(sortedKeys)
    sortedOption = option
  }
}
