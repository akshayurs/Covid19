var body = ''
var states = {
  AP: 'Andra Pradesh',
  AN: 'Andaman and Nicobar Islands',
  AR: 'Arunanchal Pradesh',
  AS: 'Assam',
  BR: 'Bihar',
  CG: 'Chhattisgarh',
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
  let data = await fetch('https://api.covid19india.org/v4/min/data.min.json')
  body = await data.json()
  let items = ''
  let zero = '0'
  Object.keys(body).forEach((ele) => {
    if (body[ele].hasOwnProperty('delta') && ele != 'TT' && ele != 'UT') {
      items += `<tr><th class=${
        body[ele].hasOwnProperty('districts') ? 'state-name' : ''
      } data-state="${ele}">${states[ele]}</th><td>${
        body[ele]['delta']['confirmed'] || zero
      }</td>
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
    }
  })

  document.querySelector('#states-table').insertAdjacentHTML('beforeend', items)
  document.querySelectorAll('.state-name').forEach((ele) => {
    ele.addEventListener('click', (e) => {
      add(e.target.getAttribute('data-state'))
    })
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
  document.querySelector('#india-table').insertAdjacentHTML('beforeend', item)
}
getdata()

function add(state) {
  document.querySelector('#back').style.display = 'block'
  let table = document.querySelector('#districts-table')
  let data1 = body[state]['districts']
  document.querySelector('#districts-content').innerHTML = ''
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
  document.querySelector('#states-table').style.display = 'table'
  document.querySelector('#india-table').style.display = 'table'
  document.querySelector('#info-msg').style.display = 'block'
  document.querySelector('#districts-table').style.display = 'none'
  document.querySelector('#back').style.display = 'none'
}
