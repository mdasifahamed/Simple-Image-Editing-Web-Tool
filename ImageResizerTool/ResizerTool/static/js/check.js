let btn = document.getElementById('s_bnt')


btn.addEventListener('click',function(e){
    e.preventDefault();

    let t1 = document.getElementById('t1').value
    let t2 = document.getElementById('t2').value

    console.log(t1);
    console.log(t2);

    axios({
        method:'get',
        url:'/check2/',
        responseType:'blob',
        params: {
                data1:t1,
                data2:t2
              }
        
        
    }) .then((result) => {
        
      
        
    }).catch((err) => {
        console.log(err);
        
    });
})