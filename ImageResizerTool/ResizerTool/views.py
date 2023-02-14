from django.shortcuts import render,redirect
from django.http import HttpResponse,JsonResponse,FileResponse,Http404
from django.template import loader
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage ,default_storage
from ResizerTool.models import Upload
from PIL import Image, ImageEnhance
from ImageResizerTool.settings import BASE_DIR
import os
import re
import pilgram

def home(request):
    h_temp = loader.get_template("home.html")

    context = {
        'name':"Asif",
    }
    return HttpResponse(h_temp.render(context,request))

@csrf_exempt
def uploads(request):
    if request.method == "POST":
        resp = None
        img = request.FILES.get('image')
        filename = str(img)
        pic_data = Upload.objects.create(pic=img, filename=filename)
        

        if pic_data:
            file_id = pic_data.id
            
            # print(file_url)
            resp = {
                "status": "done",
                "id":file_id,
            }
            print(filename)

            return JsonResponse(resp)
        else:
            resp = {
                'status': "not done",
                
            }
            return JsonResponse(resp)



def decision(request,id):


    af_temp = loader.get_template('after_upload.html')
    # url = '/media/'+file_url
    # print(url)
    try:

        pictures = Upload.objects.get(id =id)
    except:
        return redirect('/')
    print(pictures.id)
    print(pictures.pic.url)
    print(pictures.pic.name)
 
    context = {
        'img':pictures.pic.url,
        'id':pictures.id,
        
    }
    return HttpResponse(af_temp.render(context,request))
      

def resize(request,id):

    
    picture = Upload.objects.get(id=id)
    resize_temp = loader.get_template('on_resize.html')
    context = {
        'img':picture.pic.url,
        'id':picture.id,
        'old_pic_name':picture.pic.name
    }

    return HttpResponse(resize_temp.render(context,request))
    


def enhancement_adjust(request,id):
    pictures=None
    try:

        pictures = Upload.objects.get(id =id)
        
    except:
        return redirect('/')
    
    e_adjust_temp = loader.get_template('e_adjustment.html')
    context = {
        'img':pictures.pic.url,
        'id':pictures.id,
        'old_pic_name':pictures.pic.name,
    }
    return HttpResponse(e_adjust_temp.render(context,request))


def filter(request,id):
    picture = None
 
    fil_temp = loader.get_template('on_filter.html')
    try:

        picture = Upload.objects.get(id =id)
      
        
    except:
        return redirect('/')
   
    

    
    
    context = {
        'img':picture.pic.url,
        'id':id,
    }
    return HttpResponse(fil_temp.render(context,request))


def choose_resize_options(request,id):
    try:
        datas = Upload.objects.get(id=id)
    except:
        return redirect('/')
    pic = datas.pic.url
    arc_temp  = loader.get_template('after_resize_choose.html')

    context = {
        'image':pic,
        'id':id,
    }

    return HttpResponse(arc_temp.render(context,request))


def resize_from_preset(request,id):
    try:
        data = Upload.objects.get(id=id)
    except:
        return redirect('/')
    
    pic = data.pic.url
    resize_from_preset_temp = loader.get_template("resize_from_preset.html")
    context = {
        'image':pic,
        'id':id,
    }

    return HttpResponse(resize_from_preset_temp.render(context,request))

@csrf_exempt
def do_preset_resize(request,id):
    width= None
    height=None
    img = None
    new_image_temp  = None
    new_image = None
    check = None
    resp = {}
    image_handler = FileSystemStorage()
    save_path =  os.path.join(BASE_DIR/'uploads/','nme'+str(id)+"resized.jpg")
    new_image_name = 'nme'+str(id)+'result_resized.jpg'  
    try:  
        data = Upload.objects.get(id=id)
    except:
        return redirect('/')
    pic = data.pic.path
    pic_to_del = data.pic.path   
    if request.method=="POST":
        size = request.POST.get('size')
        c_width = request.POST.get('width')
        c_height = request.POST.get('height')
        quality = int(request.POST.get('quality'))
        if c_width== None and c_height== None:
        
            if size =='passport':
                width = 144
                height = 183
            elif size == 'visa':
                width = 192
                height = 192
            elif size == 'stamp':
                width = 76
                height = 94
            elif size == 'facebookp':
                width = 176
                height =176
            elif size == 'facebookc':
                width = 851
                height = 315
            elif size == '2r':
                width = 240
                height = 336
            elif size == '3r':
                width = 336
                height = 480

            elif size == '4r':
                width = 384
                height = 576
            elif size == '5r':
                width = 480
                height = 672

            elif size == '6r':
                width = 576
                height = 768
            else:
                return Http404("Not Found")

            check = re.findall(".png",pic,re.IGNORECASE)
            if check:
                img = Image.open(pic)
                img = img.convert('RGB')
                resized_img = img.resize((width,height))
                resized_img.save(save_path,quality=quality)
            else:
                
                img = Image.open(pic)
                resized_img = img.resize((width,height))
                resized_img.save(save_path,quality=quality)
            
            new_image_temp = image_handler.open(save_path)
            new_image = image_handler.save(new_image_name,new_image_temp)
        else:
            check = re.findall(".png",pic,re.IGNORECASE)
            c_width = int(round(float(c_width),2))
            c_height = int(round(float(c_height),2))
            if check:
                img = Image.open(pic)
                img = img.convert('RGB')
                resized_img = img.resize((c_width,c_height))
                resized_img.save(save_path,quality=quality)
            else:
                
                img = Image.open(pic)
                resized_img = img.resize((c_height,c_height))
                resized_img.save(save_path,quality=quality)
            
            new_image_temp = image_handler.open(save_path)
            new_image = image_handler.save(new_image_name,new_image_temp)


        data.pic = new_image
        data.save()

        os.remove(pic_to_del)

        
        

 
        resp = {
            "id":id,
            
        }

        return JsonResponse(resp)
    if request.method=='GET':
        size = request.GET.get('size')
        c_width = request.GET.get('width')
        c_height = request.GET.get('height')
        quality = int(request.GET.get('quality'))
        if c_width== None and c_height == None:
            if size =='passport':
                width = 144
                height = 183
            elif size == 'visa':
                width = 192
                height = 192
            elif size == 'stamp':
                width = 76
                height = 94
            elif size == 'facebookp':
                width = 176
                height =176
            elif size == 'facebookc':
                width = 851
                height = 315
            elif size == '2r':
                width = 240
                height = 336
            elif size == '3r':
                width = 336
                height = 480

            elif size == '4r':
                width = 384
                height = 576
            elif size == '5r':
                width = 480
                height = 672

            elif size == '6r':
                width = 576
                height = 768
            else:
                return Http404("Not Found")
        

            check = re.findall(".png",pic,re.IGNORECASE)
            if check:
                img = Image.open(pic)
                img = img.convert('RGB')
                resized_img = img.resize((width,height))
                resized_img.save(save_path,quality=quality)
            else:
                img = Image.open(pic)
                resized_img = img.resize((width,height))
                resized_img.save(save_path,quality=quality)
        else:
            check = re.findall(".png",pic,re.IGNORECASE)
            c_width = int(round(float(c_width),2))
            c_height = int(round(float(c_height),2))
            print(c_height)
            print(c_width)
          
            if check:
                img = Image.open(pic)
                img = img.convert('RGB')
                resized_img = img.resize((c_width,c_height))
                resized_img.save(save_path,quality=quality)
            else:
                
                img = Image.open(pic)
                resized_img = img.resize((c_width,c_height))
                resized_img.save(save_path,quality=quality)


        new_image_temp = image_handler.open(save_path)
        new_image = image_handler.save(new_image_name,new_image_temp)
        d_image = image_handler.open(new_image)
        response = FileResponse(d_image)
        response['Content-Disposition'] = 'attachment; filename=' + new_image_name 
        pic_to_del = data.pic.path
        os.remove(pic_to_del)
        

        return response

        




def decision_2(request,id):
    d2_temp = loader.get_template('decesion2.html')
    try:
        picture = Upload.objects.get(id=id)
    except:
        return redirect('/')
    context={
        'img':picture.pic.url,
        'id':picture.id,
        
    }

    return HttpResponse(d2_temp.render(context,request))
    
def do_enhance(request,id,bri,con,sharp):
    path_to_edit =None
    img = None
    img2 = None
    img3 = None
    img4 = None
    img5=None
    file = FileSystemStorage()
    imgb    =None
    imgc    = None
    imgs    = None
    imgbc   = None
    imgbs   = None
    imgbcs  = None
    resp    = None
    image       = None
    Temp_imag   = None    
    image_url   = None
    first_path = os.path.join(BASE_DIR/'uploads/',"nme"+str(id)+"enhaced.jpg")
    new_path =  "nme"+str(id)+"result.jpg"  


    bri= round(float(bri),2)
    con = round(float(con),2)
    sharp = round(float(sharp),2)


    try:
        picture  = Upload.objects.get(id=id)
    except:
        return redirect('/')
    
    path_to_edit = picture.pic.path


    start = True
    while start:

        if bri !=0 and con ==0 and sharp==0:
            
            img = Image.open(path_to_edit)
            img2 = ImageEnhance.Brightness(img)
            imgb = img2.enhance(bri)
            # imgb.show()
            imgb.save(first_path)
            image = file.open(first_path)
            Temp_imag = file.save(new_path,image)
            image_url = file.url(Temp_imag)
          

            resp = {
                "img":image_url,
                "id":10,
            }
            
            start = False
        elif  bri==0 and con!=0 and sharp==0:
            img = Image.open(path_to_edit)
            img3 = ImageEnhance.Contrast(img)
            imgc = img3.enhance(con)
            imgc.save(first_path)
            image = file.open(first_path)
            Temp_imag = file.save(new_path,image)
            image_url = file.url(Temp_imag)
          

            resp = {
                "img":image_url,
                "id":10,
            }
            start = False
            print("only con")
            


        elif  bri==0 and con==0 and sharp!=0:
            img = Image.open(path_to_edit)
            img4 = ImageEnhance.Sharpness(img)
            imgs = img4.enhance(sharp)
            imgs.save(first_path)
            image = file.open(first_path)
            Temp_imag = file.save(new_path,image)
            image_url = file.url(Temp_imag)
          

            resp = {
                "img":image_url,
                "id":10,
            }
            start = False

            print("only sharp")


        elif  bri!=0 and con!=0 and sharp==0:
            img = Image.open(path_to_edit)
            img2 = ImageEnhance.Brightness(img)
            img3 = img2.enhance(bri)
            img4 = ImageEnhance.Contrast(img3)
            imgbc = img4.enhance(con)

            imgbc.save(first_path)
            image = file.open(first_path)
            Temp_imag = file.save(new_path,image)
            image_url = file.url(Temp_imag)
            
            resp = {
                "img":image_url,
                "id":10,
            }
            
            start = False

        
            print("bri and Con")

        elif bri!=0 and sharp!=0 and con==0 :
            img = Image.open(path_to_edit)
            img2 = ImageEnhance.Brightness(img)
            img3 = img2.enhance(bri)
            img4 = ImageEnhance.Sharpness(img3)
            imgbs = img4.enhance(sharp)

            imgbs.save(first_path)
            image = file.open(first_path)
            Temp_imag = file.save(new_path,image)
            image_url = file.url(Temp_imag)

            resp = {
                "img":image_url,
                "id":10,
            }
            

            start = False
        
            print("bri and sharp")

        elif   sharp!=0 and con!=0 and bri==0:
            img = Image.open(path_to_edit)
            img2 = ImageEnhance.Contrast(img)
            img3 = img2.enhance(con)
            img4 = ImageEnhance.Sharpness(img3)
            imgsc = img4.enhance(sharp)
            imgsc.save(first_path)
            image = file.open(first_path)
            Temp_imag = file.save(new_path,image)
            image_url = file.url(Temp_imag)

            resp = {
                "img":image_url,
                "id":10,
            }
            

  
        
            start = False
            
            print("con,sharp")
        elif bri!=0 and sharp!=0 and con!=0:
            img = Image.open(path_to_edit)
            img2 = ImageEnhance.Brightness(img)
            img3 = img2.enhance(bri)
            img4 = ImageEnhance.Contrast(img3)
            img5 = img4.enhance(con)
            img6 = ImageEnhance.Sharpness(img5)
            imgbcs = img6.enhance(sharp)
            imgbcs.save(first_path)
            image = file.open(first_path)
            Temp_imag = file.save(new_path,image)
            image_url = file.url(Temp_imag)

            resp = {
                "img":image_url,
                "id":10,
            }
            start = False


    data = Upload.objects.get(id=id)
    resp['id'] = data.id

    return JsonResponse(resp)
        








def download_enhanced_pic(request,img):
    print(img)
    file = default_storage.open(img)
    response = FileResponse(file)
    response['Content-Disposition']='attachment; filename = ' + img
    return response

def after_enhanced_or_filter_download(request,id,img):
    print(img)
    img_name_of_during_filter = BASE_DIR/'uploads'
    search = "nme"+str(id)
    com_temp = loader.get_template('complete.html')
    data = Upload.objects.get(id=id)
    old_pic = data.pic.path
    data.delete()
    files = os.listdir(img_name_of_during_filter)
    file_handle = FileSystemStorage()

    for file in files:
        x = re.findall(search,file,re.IGNORECASE)
        if x:
            file_handle.delete(file)
        else:
            os.remove(old_pic)
    return HttpResponse(com_temp.render())
    
def do_filter(request,id,filter):
    data = Upload.objects.get(id=id)
    pic = data.pic.path
    img_name_of_during_filter  =os.path.join(BASE_DIR/'uploads/',"nme"+str(id)+ filter + '.jpg')
    image_hanlder = FileSystemStorage()
    new_image_name = "nme"+str(id)+"filtered.jpg"
    img = Image.open(pic)
    new_image_temp = None
    new_image = None
    new_image_url = None
    print(pic)
    

    
    if filter != 'orginal':
        
        getattr(pilgram,filter)(img).save(img_name_of_during_filter)
        new_image_temp = image_hanlder.open(img_name_of_during_filter)
        new_image = image_hanlder.save(new_image_name,new_image_temp)
        new_image_url = image_hanlder.url(new_image)
        

    else:
        new_image_url = data.pic.url

    print(img)
    print(new_image)
    print(new_image_url)

    resp ={
        'status':"check Console",
        "img":new_image_url,
        "img_name":new_image 
    }
  
    
    return JsonResponse(resp)


  


# Fucntion to all unwanted files
def clear_directory_during_filter(request,id,img):
    data = Upload.objects.get(id=id)
    main_pic = data.pic.name
    directory = BASE_DIR/'uploads'
    files = os.listdir(directory)
    store = img
    d_file = FileSystemStorage()
    search = 'nme'+str(id)
    
    for file in files:
        x = re.findall(search,file,re.IGNORECASE)
        if file == store:
            print(file)
        elif file == main_pic:
            print(file)
        elif x:
            d_file.delete(file)
        else:
            print("Cleraed")
           
    resp = {
        'status': "Cleared",
        'id':id,
    }
    print(main_pic)
    print(store) 
    return JsonResponse(resp)


def download_filtered_img(request,id,img):
    print(id)
    print(img)
    image = default_storage.open(img)
    response = FileResponse(image)
    response['Content-Disposition'] = 'attachment; filename' + img
    return response



    

def update_before_routing(request,id,img):
    resp = {}
    data = Upload.objects.get(id=id)
    old_pic = data.pic.path
    old_pic_name = data.pic.name

    if str(old_pic_name) == str(img):
        resp = {
        'status':"Not_Updated",
        'id':id,
        'new_img':img
    }
    else:

        data.pic = img
        data.save()
        os.remove(old_pic)
        resp = {
        'status':"Updated",
        'id':id,
        'new_img':img
    }

    
    
    

    return JsonResponse(resp)

def clear_directory(request,id):
    data = Upload.objects.get(id=id)
    store = data.pic.name
    directory = BASE_DIR/'uploads'
    files = os.listdir(directory)
    search = 'nme' + str(id)
    file_handle = FileSystemStorage()
    for file in files:
        x = re.findall(search,file,re.IGNORECASE)
        if file == store:
            print(file)
        elif x:
            file_handle.delete(file)
        else:
            print("directory cleaned")
    
    resp = {
        'status':'Deleted',
        'id':id,
    }

    return JsonResponse(resp)

def clear_directory_after_every_download(request,id):
    comp_temp = loader.get_template('complete.html')
    name = 'nme'+str(id)
    try:
        directory = BASE_DIR/'uploads'
        files = os.listdir(directory)
        data = Upload.objects.get(id=id)
        image_handle = FileSystemStorage()
        
        for file in files:
            x = re.findall(name, file,re.IGNORECASE)
            if x:
                image_handle.delete(file)
            else:
                print("okay")
        data.delete()
        return HttpResponse(comp_temp.render())
    except:
        return redirect('/')

    