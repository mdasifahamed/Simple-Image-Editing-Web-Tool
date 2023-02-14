

let rd_btn = document.getElementById('rd-btn');

let op_error = document.getElementById('op_error');

let re_btn = document.getElementById('re-btn')

let id = document.getElementById('id').value




function get_unit() {
    
    let unit = document.getElementById('unit').value;
    return unit;
    
}

function get_quality() {
    let quality = document.getElementById('quality').value
    return quality;
    
}





rd_btn.addEventListener("click",function(e){
    e.preventDefault()

    let width = document.getElementById('width').value;

    let height = document.getElementById('height').value;
    let unit = get_unit();
    let quality = get_quality();

   

    // Block of Validation Of Numeric Value Input And Empty Field
    if (unit==="Choose Unit Type"){
        op_error.innerHTML = "Please Choose A Unit Type First!";
        return false;
    }
    else if(width===""){
        op_error.innerHTML = "Width Cannot Be Empty!";
        return false
    }
    else if(isNaN(width)){
        op_error.innerHTML = "Width Must Be In Number!";
        return false
    }
    else if(height===""){
        op_error.innerHTML = "Height Cannot Be Empty!";
        return false
    }
    else if(isNaN(height)){
        op_error.innerHTML = "Height Must Be In Number!";
        return false
    }
    else if(quality==="Choose Picture Quality"){

        op_error.innerHTML = "Please Choose A Picture Quality!";
        return false
    }

    // End Of First Validation

    // Validation of The Selected Unit Measurement
    else if(unit==="pixel" && (isNaN(width)===false && isNaN(height)===false)){

        width = parseFloat(width);
        height = parseFloat(height);
        
        // Nested Condidtion for Selection Of Pixel

        if((width > 2000) || (height > 2000)){

            op_error.innerHTML = "Maximum Width And Heigh Is Allowed 2000 Pixel";

            return false;
        }

        else{

            op_error.innerHTML = "";
            console.log("measurment type is", unit);
            console.log("Width is", width);
            console.log("Height is", height);
            console.log("Height is", id);

            
            let url = "/do_preset_resize/"+id;
            
            axios({
                method:'get',
                url:url,
                params:{
                    'width':width,
                    'height':height,
                    'quality':quality,
                },
                responseType:'blob',
            }).then((result) => {
                const url = window.URL.createObjectURL(new Blob([result.data]));
                const download_link = document.createElement('a')
                download_link.href=url
                download_link.setAttribute('download','new_resize.jpg');
                document.body.appendChild(download_link);
                download_link.click()
                let n_url ='/clear_directory_after_download/'+id
                window.location.href = n_url 
                
            }).catch((err) => {
                console.log(err);
                
            });


        }
    }



    else if(unit==="inch" && (isNaN(width)===false && isNaN(height)===false)){

        width = parseFloat(width);
        height = parseFloat(height);

        // Nested Condidtion for Selection Of Pixel

        if((width > 20.84) || (height > 20.83)){

            op_error.innerHTML = "Maximum Width And Heigh Is Allowed 20.83 Inch";

            return false;

        }

        else{

            // Conversion Of Inch To Pixel
            width = width * 96;
            height = height * 96;

            op_error.innerHTML = "";


            console.log("measurment type is", unit);
            console.log("Width is Which is Inputed As Inch Is Converted To Pixel Is", width);
            console.log("Height is Which is Inputed As Inch Is Converted To Pixel Is", height);
            console.log("Height is", id);


            
            let url = "/do_preset_resize/"+id;
            axios({
                method:'get',
                url:url,
                params:{
                    'width':width,
                    'height':height,
                    'quality':quality,
                },
                responseType:'blob'
            }).then((result) => {

                const url = window.URL.createObjectURL(new Blob([result.data]))
                const download_link= document.createElement('a')
                download_link.href = url
                download_link.setAttribute('download','resized.jpg')
                document.body.appendChild(download_link)
                download_link.click()

                let n_url ='/clear_directory_after_download/'+id
                window.location.href = n_url 

            }).catch((err) => {

                console.log(err);
                
            });
           
            
            

        }
    }

    else if(unit==="cm" && (isNaN(width)===false && isNaN(height)===false)){

        width = parseFloat(width);
        height = parseFloat(height);

        // Nested Conditon For The Selelction Of Centimeter

        if((width > 52.92) || (height > 52.92)){
            
            op_error.innerHTML = "Maximum Width And Heigh Is Allowed 52.92 Centimeter";
            
            return false;
        }

        else{

            // Converison of Centimeter To Pixel

            width = width * 37.8;
            height = height * 37.8;

            op_error.innerHTML = "";

            console.log("measurment type is", unit);
            console.log("Width is Which is Inputed As Centimeter Is Converted To Pixel Is", width);
            console.log("Height is Which is Inputed As Centimeter Is Converted To Pixel Is", height);
            console.log("Height is", id);


        
            let url = "/do_preset_resize/"+id;
           axios({
                method:'get',
                url:url,
                params:{
                    'width':width,
                    'height':height,
                    'quality':quality,
                },
                responseType:'blob'

           }).then((result) => {

                const url = window.URL.createObjectURL(new Blob([result.data])) 
                const download_link = document.createElement('a');
                download_link.href = url
                download_link.setAttribute('download','resized.jpg')
                document.body.appendChild(download_link)
                download_link.click()
                let n_url ='/clear_directory_after_download/'+id
                window.location.href = n_url 
            
           }).catch((err) => {

                console.log(err);
            
           });

        }
    }

    else if(unit==="mm" && (isNaN(width)===false && isNaN(height)===false)){

        width = parseFloat(width);
        height = parseFloat(height);


        // Nested Condition For slelection of MiliMeter
        if((width > 529.20) || (height > 529.20)){

            op_error.innerHTML = "Maximum Width And Heigh Is Allowed 529.20 Milimeter";

            return false;
        }


        else{

            // Conversion of Milimeter To Pixel

            op_error.innerHTML = "";

            width = width * 3.78 ;
            height = height * 3.78

            console.log("measurment type is", unit);
            console.log("Width is Which is Inputed As Milimeter Is Converted To Pixel Is", width);
            console.log("Height is Which is Inputed As Milimeter Is Converted To Pixel Is", height);
            console.log("Height is", id);


       
            let url = "/do_preset_resize/"+id;
            axios({
                method:'get',
                url:url,
                params:{
                    'width':width,
                    'height':height,
                    'quality':quality
                },
                responseType:'blob'
            }).then((result) => {
                const url = window.URL.createObjectURL(new Blob([result.data]))
                const download_link = document.createElement('a');
                download_link.href = url;
                download_link.setAttribute('download','resized.jpg')
                document.body.appendChild(download_link);
                download_link.click()
                
                let n_url ='/clear_directory_after_download/'+id
                window.location.href = n_url 


            }).catch((err) => {
                
            });

        }
    }




    else{

        op_error.innerHTML = "";

        console.log("measurment type is", unit);
        console.log("Width is", width);
        console.log("Height is", height);
        console.log("Height is", id);
    }
})





re_btn.addEventListener('click',function(e){

    e.preventDefault();


    let width = document.getElementById('width').value;

    let height = document.getElementById('height').value;
    let unit = get_unit();
    let quality = get_quality();

   

    // Block of Validation Of Numeric Value Input And Empty Field
    if (unit==="Choose Unit Type"){
        op_error.innerHTML = "Please Choose A Unit Type First!";
        return false;
    }
    else if(width===""){
        op_error.innerHTML = "Width Cannot Be Empty!";
        return false
    }
    else if(isNaN(width)){
        op_error.innerHTML = "Width Must Be In Number!";
        return false
    }
    else if(height===""){
        op_error.innerHTML = "Height Cannot Be Empty!";
        return false
    }
    else if(isNaN(height)){
        op_error.innerHTML = "Height Must Be In Number!";
        return false
    }
    else if(quality==="Choose Picture Quality"){

        op_error.innerHTML = "Please Choose A Picture Quality!";
        return false
    }

    // End Of First Validation

    // Validation of The Selected Unit Measurement
    else if(unit==="pixel" && (isNaN(width)===false && isNaN(height)===false)){

        width = parseFloat(width);
        height = parseFloat(height);
        
        // Nested Condidtion for Selection Of Pixel

        if((width > 2000) || (height > 2000)){

            op_error.innerHTML = "Maximum Width And Heigh Is Allowed 1500 Pixel";

            return false;
        }

        else{

            op_error.innerHTML = "";
            console.log("measurment type is", unit);
            console.log("Width is", width);
            console.log("Height is", height);
            console.log("Height is", id);

            let fd = new FormData();
            let url = "/do_preset_resize/"+id;
            fd.append("width",width);
            fd.append("height",height);
            fd.append("quality",quality);
            fd.append("csrfmiddlewaretoken",'{csrf_token}');
            axios.post(url,fd).then((result) => {
                let id2 = result.data.id
                let n_url = "/decision_2/"+id2 
                window.location.href=n_url;
                
            }).catch((err) => {
                console.log(err);
            });


        }
    }



    else if(unit==="inch" && (isNaN(width)===false && isNaN(height)===false)){

        width = parseFloat(width);
        height = parseFloat(height);

        // Nested Condidtion for Selection Of Pixel

        if((width > 20.84 ) || (height > 20.84)){

            op_error.innerHTML = "Maximum Width And Heigh Is Allowed 20.84 Inch";

            return false;

        }

        else{

            // Conversion Of Inch To Pixel
            width = width * 96;
            height = height * 96;

            op_error.innerHTML = "";


            console.log("measurment type is", unit);
            console.log("Width is Which is Inputed As Inch Is Converted To Pixel Is", width);
            console.log("Height is Which is Inputed As Inch Is Converted To Pixel Is", height);
            console.log("Height is", id);


            let fd = new FormData();
            let url = "/do_preset_resize/"+id;
            fd.append("width",width);
            fd.append("height",height);
            fd.append("quality",quality);
            fd.append("csrfmiddlewaretoken",'{csrf_token}');
            axios.post(url,fd).then((result) => {
                let id2 = result.data.id
                let n_url = "/decision_2/"+id2 
                window.location.href=n_url;
                
            }).catch((err) => {
                console.log(err);
            });
            
            

        }
    }

    else if(unit==="cm" && (isNaN(width)===false && isNaN(height)===false)){

        width = parseFloat(width);
        height = parseFloat(height);

        // Nested Conditon For The Selelction Of Centimeter

        if((width > 52.92) || (height > 52.29)){
            
            op_error.innerHTML = "Maximum Width And Heigh Is Allowed 52.29 Centimeter";
            
            return false;
        }

        else{

            // Converison of Centimeter To Pixel

            width = width * 37.8;
            height = height * 37.8;

            op_error.innerHTML = "";

            console.log("measurment type is", unit);
            console.log("Width is Which is Inputed As Centimeter Is Converted To Pixel Is", width);
            console.log("Height is Which is Inputed As Centimeter Is Converted To Pixel Is", height);
            console.log("Height is", id);


            let fd = new FormData();
            let url = "/do_preset_resize/"+id;
            fd.append("width",width);
            fd.append("height",height);
            fd.append("quality",quality);
            fd.append("csrfmiddlewaretoken",'{csrf_token}');
            axios.post(url,fd).then((result) => {
                let id2 = result.data.id
                let n_url = "/decision_2/"+ id2 
                window.location.href=n_url;
                
            }).catch((err) => {
                console.log(err);
            });

        }
    }

    else if(unit==="mm" && (isNaN(width)===false && isNaN(height)===false)){

        width = parseFloat(width);
        height = parseFloat(height);


        // Nested Condition For slelection of MiliMeter
        if((width > 529.20) || (height > 529.20)){

            op_error.innerHTML = "Maximum Width And Heigh Is Allowed 529.20 Milimeter";

            return false;
        }


        else{

            // Conversion of Milimeter To Pixel

            op_error.innerHTML = "";

            width = width * 3.78 ;
            height = height * 3.78

            console.log("measurment type is", unit);
            console.log("Width is Which is Inputed As Milimeter Is Converted To Pixel Is", width);
            console.log("Height is Which is Inputed As Milimeter Is Converted To Pixel Is", height);
            console.log("Height is", id);


            let fd = new FormData();
            let url = "/do_preset_resize/"+id;
            fd.append("width",width);
            fd.append("height",height);
            fd.append("quality",quality);
            fd.append("csrfmiddlewaretoken",'{csrf_token}');
            axios.post(url,fd).then((result) => {
                let id2 = result.data.id
                let n_url = "/decision_2/"+id2 
                window.location.href=n_url;
                
                
            }).catch((err) => {
                console.log(err);
            });

        }
    }




    else{

        op_error.innerHTML = "";

        console.log("measurment type is", unit);
        console.log("Width is", width);
        console.log("Height is", height);
        console.log("Height is", id);
    }
})
