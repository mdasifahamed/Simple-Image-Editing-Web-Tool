function changeText() {

    let area = document.getElementById('upload-text');
    area.innerHTML = "Click On Upload";
    
}

let btn = document.getElementById('u-btn');


btn.addEventListener("click",function(e){
    e.preventDefault()

    let pic = document.getElementById('img-upload').files[0];
    let efiled = document.getElementById('pic_erron');

    let fd = new FormData();

    if(!pic){
        efiled.innerHTML = "Please Choose A Picture First";
        return false;
    }

    else{
        efiled.innerHTML = "";
        fd.append("image",pic);
        fd.append("csrfmiddlewaretoken",'{csrf_token}');
       

        let upload_url = "/uploads/"

        axios.post(upload_url,fd).then((result) => {

            console.log(result.data.s);
            
            if (result.data.status=="done"){
                let id = result.data.id;
                
                console.log(result.data.status);
                window.location.href = "/decision/"+id

            }else if(result.data.status=="not done"){
                window.location.replace = "/";
            }
            else{
                window.location.replace = "/";
            }
            
            
        }).catch((err) => {

            console.log(err);
            
        });
    }
})