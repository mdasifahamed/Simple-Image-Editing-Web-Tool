
# Image Editing WebApp in Django

This is webapp where you can resize,adjust color property,apply filter on your photo.
It comes with some comon size preset which your use with knowing the actual size in whcih you want to convert your photo 

---

## How  To Run The App Locally

- At first clone the repository to your desired directory 
> - To clone the repo from terminal type `git clone https://github.com/mdasifahamed/Simple-Image-Editing-Web-Tool.git` and hit enter .
> - Then create a python virtual environment to create that from your terminal type `python -m venv venv`
> -  Then activate the virtual environment from your  for MacOS/Linux:  `source venv/bin/activate` For Windows: `venv\Scripts\activate`
> -  Then `cd into  cd Simple-Image-Editing-Web-Tool/ImageResizerTool`
> -  Then `python manage.py makemigrations`
> -  Then `python manage.py migrate`
> -  Then `python manage.py runserver`
- If you have followed steps correctly then from your terminal will get the web app url something like `http://127.0.0.1:8000`  or  `http://localhost:8000` which means the app is live now to use from your local machine.
Just copy the url and paste it into your browser the app is live now to use it. 

---

## App Features

- Resize your photo accordingly your desired size.
- Or you can use our predefined size presets which currently covers
 > - Passport Size
   - Visa 2x2
   - Stamp
   - Facebook Page Profile
   - Facebook page Cover
   - 2R
   - 3R
   - 4R
   - 5R
   - 6R
- You can adjust your image color byt adjusting hue, saturation and contrast.
- You can also Instragram filters on your photo.
- All the features can be used dynamically.
- You will be deleted from the server as after your download. 
- No picture will be stored on the server.

---

## Language And Used 
- Python
- Django
- Pillow
- Pilgram
- JS(Vanila)
- Axios
- Html
- CSS
