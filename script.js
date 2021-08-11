var body = ''
async function getdata() {
  let data = await fetch('https://api.covid19india.org/v4/min/data.min.json')
  body = await data.json()
  let items = ''
  let zero = '0'
  Object.keys(body).forEach((ele) => {
    if (body[ele].hasOwnProperty('delta')) {
      items += `<tr><th class="state-name" data-state="${ele}">${ele}</th><td>${
        body[ele]['delta']['confirmed'] || zero
      }</td> <td>${body[ele]['delta']['deceased'] || zero}</td> <td>${
        body[ele]['delta']['recovered'] || zero
      }</td>
         <td>${body[ele]['total']['confirmed'] || zero}</td>
         <td>${body[ele]['total']['deceased'] || zero}</td>
         <td>${body[ele]['total']['recovered'] || zero}</td>
         <td>${body[ele]['total']['tested'] || zero}</td>
         <td>${
           body[ele]['total']['vaccinated1'] +
             body[ele]['total']['vaccinated1'] || zero
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
}
getdata()

function add(state) {
  document.querySelector('#back').style.display = 'block'
  let table = document.querySelector('#districts-table')
  let data1 = body[state]['districts']
  Object.keys(data1).forEach((ele) => {
    const zero = '0'
    if (data1[ele].hasOwnProperty('delta')) {
      let e = `<tr><th>${ele}</th><td>${
        data1[ele]['delta']['confirmed'] || zero
      }</td> <td>${data1[ele]['delta']['deceased'] || zero}</td> <td>${
        data1[ele]['delta']['recovered'] || zero
      }</td>
           <td>${data1[ele]['total']['confirmed'] || zero}</td>
           <td>${data1[ele]['total']['deceased'] || zero}</td>
           <td>${data1[ele]['total']['recovered'] || zero}</td>
           <td>${data1[ele]['total']['tested'] || zero}</td>
           <td>${
             data1[ele]['total']['vaccinated1'] +
               data1[ele]['total']['vaccinated1'] || zero
           }</td>
           <td>${data1[ele]['meta']['population'] || zero}</td>
           </tr>
           `
      document
        .querySelector('#districts-content')
        .insertAdjacentHTML('beforeend', e)
    }
  })
  table.style.display = 'table'
  document.querySelector('#states-table').style.display = 'none'
}

function back() {
  document.querySelector('#states-table').style.display = 'table'
  document.querySelector('#districts-table').style.display = 'none'
  document.querySelector('#back').style.display = 'none'
}
