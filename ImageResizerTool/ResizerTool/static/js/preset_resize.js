let id = document.getElementById('id').value;
let err = document.getElementById('op_error');
let r_e_btn = document.getElementById('re-btn');
let dn_btn = document.getElementById('rd-btn');


function get_size(){
    let size = document.getElementById('size').value;
   
    return size;
}


function get_quality(){
    let quality = document.getElementById('quality').value;
    
    return quality;
}



r_e_btn.addEventListener('click',function(e){
    e.preventDefault();
    let size = get_size()
    let quality = get_quality()
    let fd = new FormData();
    let url = "/do_preset_resize/" + id
    if(size==='Choose Preset' || quality==='Choose Picture Quality'){
        err.innerHTML= "Please Choose A Preset Size And Picture Quality Both";
        return false;
    }else{
        err.innerHTML="";
        console.log(size);
        console.log(quality);
        fd.append('size',size);
        fd.append('quality',quality)
        fd.append('csrfmiddlewaretoken','{csrf_token}')
        axios.post(url,fd).then((result) => {
            let id2 = result.data.id;
            let url = "/decision_2/"+id2;
            window.location.href = url;
            
        }).catch((err) => {
            console.log(err);
        });

    }
})

dn_btn.addEventListener('click',function(e){
    e.preventDefault(e);
    let size = get_size()
    let quality = get_quality()
    let d_filename = size + "resized.jpg"
    let url = "/do_preset_resize/" + id
    if(size==='Choose Preset' || quality==='Choose Picture Quality'){
            err.innerHTML= "Please Choose A Preset Size And Picture Quality Both";
            return false;
        }
    else
    {
        axios({
            method:'get',
            url: url,
            params:{
                'size':size,
                'quality':quality,
                
            },
            responseType:'blob'
        }).then((result) => {

            const url = window.URL.createObjectURL(new Blob([result.data]))
            const download = document.createElement('a')
            download.href = url
            download.setAttribute('download',d_filename)
            document.body.appendChild(download)
            download.click()
            let url2 = '/clear_directory_after_download/'+id
            window.location.href = url2;
        }).catch((err) => {
            
        });
    }

})