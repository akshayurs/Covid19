var data = ''
    var body = ''
    async function getdata() {
      data = await fetch('https://api.covid19india.org/v4/min/data.min.json')
      body = await data.json()
      let items = ''
      Object.keys(body).forEach((ele) => {
        items += `<li data-state=${ele}>${ele}</li>`
      })
      document.querySelector('ul').innerHTML = items
      document.querySelectorAll('li').forEach((ele) => {
        ele.addEventListener('click', (e) => {
          add(e.target.getAttribute('data-state'))
        })
      })
    }
    getdata()
    function add(state) {
      let table = document.querySelector('table')
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
          table.insertAdjacentHTML('beforeend', e)
          console.log(data1[ele])
        }
      })
      table.style.display = 'table'
    }