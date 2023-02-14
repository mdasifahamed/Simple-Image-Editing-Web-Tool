let buttons = document.getElementsByClassName('imgc');
let down_btn =document.getElementById('d-btn');
let e_btn =document.getElementById('e-btn');
let r_btn = document.getElementById('r-btn')
let id = document.getElementById('id').value;
let img = document.getElementById('current_image')
let delbtn = document.createElement('button');
delbtn.id = "del";
delbtn.hidden = "hidden"
document.body.appendChild(delbtn)
let d_btn = document.getElementById('del')
let rounte_btn = document.createElement('button')
rounte_btn.id = 'route';
rounte_btn.hidden = 'hidden';
document.body.appendChild(rounte_btn)
let rout = document.getElementById('route');



let array_of_filters = [];
let image_url = img.src

let filename = image_url.slice(28,)




for(let i=0; i<buttons.length; i++){
    array_of_filters.push(buttons[i].id);
}
console.log(array_of_filters);

array_of_filters.forEach(function(items){

    let val = items;
    // console.log(val);
    let btn = document.getElementById(val);
    
    btn.addEventListener('click',function(event){
        
        
        if(event.target.id===val){
            // console.log(val);
            let url = "/do_filter/" + id + "/" + val
            axios.get(url).then((result) => {
                console.log(result.data.status);
                let img_url = result.data.img
                let img_name = result.data.img
                filename= img_name.slice(7,)
                console.log(filename);
                img.src=img_url
                d_btn.click();
                
             


            }).catch((err) => {
                console.log(err);
            });

        
        }
        

    })
})

down_btn.addEventListener('click',function(e){
    e.preventDefault();


    let url = "/download_filter/"+id+"/"+filename
    axios({
        method:'get',
        url:url,
        responseType:'blob',
    }).then((result) => {
        const fileurl = window.URL.createObjectURL(new Blob([result.data]))
        const donwload_btn = document.createElement('a')
        donwload_btn.href = fileurl
        donwload_btn.setAttribute('download',filename)
        document.body.appendChild(donwload_btn)
        donwload_btn.click()
        window.location.href = "/clear_directory_after_download/" + id
    }).catch((err) => {
        console.log(err);
    });
})


d_btn.addEventListener('click',function(e){
    e.preventDefault()
    let url = "/clear_during_filter/" + id + "/" + filename

    axios.get(url).then((result) => {
        console.log(result.data.status);
        
    }).catch((err) => {
        console.log(err);
    });
    
})
e_btn.addEventListener('click',function(e){
    e.preventDefault();

    console.log(filename);
    console.log(id);
    let url = "/update/" + id + "/" + filename

    axios.get(url).then((result) => {
        if(result.data.status==="Updated"){
            let id2  = result.data.id
            let url = '/enhancement_adjust/' + id2
            window.location.href = url;
            
        }
        else if(result.data.status==="Not_Updated"){
            let id2  = result.data.id
            let url = '/enhancement_adjust/' + id2
            window.location.href = url;
            
        }          
    }).catch((err) => {
        console.log(err);
    });
})


r_btn.addEventListener('click',function(e){
    e.preventDefault()
    let url = "/update/" + id + "/" + filename
    axios.get(url).then((result) => {

        if(result.data.status==="Updated"){
            let id2  = result.data.id
            let url = '/choose_resize_options/' + id2
            window.location.href = url;
            
        }
        else if(result.data.status==="Not_Updated"){
            let id2  = result.data.id
            let url = '/choose_resize_options/' + id2
            window.location.href = url;
            
        }          
        
    }).catch((err) => {
        
    });
})
