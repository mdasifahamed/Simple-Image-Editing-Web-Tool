let d_btn = document.getElementById('download');
let f_btn = document.getElementById('filter');
let r_btn = document.getElementById('reset');
let bright = document.getElementById('bri');
let con = document.getElementById('con');
let sharp = document.getElementById('sharp');
let img = document.getElementById('img');
let id = document.getElementById('id').value;
let old_pic = document.getElementById('pic_name').value;
let roting_btn = document.createElement('button')
roting_btn.id = "route"
roting_btn.hidden ="hidden"
document.body.appendChild(roting_btn)
let temp = document.getElementById('route');
let roting_btn2 = document.createElement('button')
roting_btn2.id = "route2"
roting_btn2.hidden ="hidden"
document.body.appendChild(roting_btn2)
let temp2 = document.getElementById('route2');
let image_name = img.src 
let filename = image_name.slice(28,)
let resize_btn = document.getElementById('resize')
let val1,val2


var sliders = [
    bright,con,sharp]


var [bri_v,con_v,sharp_v]=[0,0,0]


sliders.forEach(function(item){
    item.addEventListener("change",function(event){
        if(event.target.id==="bri"){
            console.log("brigthness values is :", item.value);
            console.log("con values is :",con_v);
            console.log("Sharp values is :", sharp_v);

            bri_v = item.value;
           
            let url = "/do_enhance/" + id + "/" + bri_v + "/" + con_v + "/" + sharp_v
            axios.get(url).then((result) => {
                console.log(result.data.id);
                let ima = result.data.img
                let img_url = result.data.img
                filename = ima.slice(7,)
                console.log(filename);
                img.src = img_url;

               
            }).catch((err) => {
            
                console.log(err);
            });
            
        }
        else if(event.target.id==="con"){
            console.log("brigthness values is :", bri_v);
            console.log("con values is :", item.value);
            console.log("Sharp values is :", sharp_v);
            
            con_v = item.value
            let url = "/do_enhance/" + id + "/" + bri_v + "/" + con_v + "/" + sharp_v
            axios.get(url).then((result) => {
                console.log(result.data.id);
                let ima = result.data.img
                let img_url = result.data.img
                filename = ima.slice(7,)
                console.log(filename);
                img.src = img_url;
                // window.location.href = "/check2/"+filename
            }).catch((err) => {
            
                console.log(err);
            });
            

        }
        else if(event.target.id==="sharp"){
            console.log("brigthness values is :", bri_v);
            console.log("con values is :",con_v);
            console.log("Sharp values is :", item.value);
            sharp_v = item.value

            let url = "/do_enhance/" + id + "/" + bri_v + "/" + con_v + "/" + sharp_v
            axios.get(url).then((result) => {
                let ima = result.data.img
                let img_url = result.data.img
                filename = ima.slice(7,)
                console.log(filename);
                img.src = img_url;
                // window.location.href = "/check2/"+filename
            }).catch((err) => {
            
                console.log(err);
            });
        }
        
        else{

            let url = "/do_enhance/" + id + "/" + bri_v + "/" + con_v + "/" + sharp_v
            axios.get(url).then((result) => {
                let ima = result.data.img
                let img_url = result.data.img
                filename = ima.slice(7,)
                console.log(filename);
                img.src = img_url;
                // window.location.href = "/check2/"+filename
            }).catch((err) => {
                
            });
            

           
        }



    })
})

r_btn.addEventListener('click',function(e){
    e.preventDefault();
    window.location.reload();
})


d_btn.addEventListener("click",function(e){
    if(filename != null){

        
        axios({
            method:'get',
            url:'/download_enhanced_pic/'+filename,
            responseType:'blob',
        }).then((result) => {
            const url = window.URL.createObjectURL(new Blob([result.data]));
            const down_link = document.createElement('a');
            down_link.href = url
            down_link.setAttribute('download',filename)
            down_link.click()
            window.location.href = "/clear_directory_after_download/"+ id
            
        }).catch((err) => {
            console.log(err);
        });
        
       
     
        
    }else{

        console.log(filename);
        console.log(old_pic);
        console.log(id);
        return false;


    }
    
    
})

f_btn.addEventListener('click',function(e){
    // To Get Url of of The For Server Side Operation This Url Will Be Sent to Server for Further Operations
    e.preventDefault()
    let url = "/update/"+id+"/"+filename
    console.log(filename);
    axios.get(url).then((result) => {
        console.log(result.data);
        if (result.data.status === "Updated") {
            temp.click(e)
        }
        else if(result.data.status === "Not_Updated"){
            let url = '/filter/' +id
            window.location.href = url
        }
           
             
        else{
            window.location.href ='/'
        }
    }).catch((err) => {
        console.log(err);
    });

    // End Block Creating File Url
})


temp.addEventListener('click',function(e){
    e.preventDefault();


    let url = "/clear/" + id
    axios.get(url).then((result) => {
        if (result.data.status==="Deleted") {
            let id2 = result.data.id;
           
            window.location.href = '/filter/' + id2
        }
        
    }).catch((err) => {
        console.log(err);

    });
    
})


temp2.addEventListener('click',function(e){
    e.preventDefault();
    val1 = r_btn.id
    val2 = resize_btn.id

    let url = "/clear/" + id
    axios.get(url).then((result) => {
        if (result.data.status==="Deleted") {
            let id2 = result.data.id;
            window.location.href = '/choose_resize_options/' + id2
        }
        
    }).catch((err) => {
        console.log(err);

    });
    
})


resize_btn.addEventListener('click',function(e){
    e.preventDefault();

    let url = '/update/'+id+"/"+filename
    axios.get(url).then((result) => {
        if(result.data.status==="Not_Updated"){
            let id2 = result.data.id
            let url2 = '/choose_resize_options/'+id2
            window.location.href = url2
        }else if(result.data.status === "Updated"){
            temp2.click(e)
        }else {
            window.location.redirect = '/'
        }
        
    }).catch((err) => {
        console.log(err);
    });
})