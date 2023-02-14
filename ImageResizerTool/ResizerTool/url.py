from django.urls import path
from ResizerTool import views
urlpatterns = [
    path("",views.home,name = "home"),
    # path("1/<int:id>/<int:id2>/<int:id3>",views.check, name = "check"),
    path("uploads/",views.uploads, name="uploads"),
         
    path("decision/<int:id>",views.decision, name="decision"),
    path("decision_2/<int:id>",views.decision_2,name='decision_2'),

    path('choose_resize_options/<int:id>',views.choose_resize_options, name='choose_resize_options'),
    path("resize/<int:id>",views.resize, name="resize"),
    path('resize_prom_preset/<int:id>',views.resize_from_preset, name="resize_from_preset"),
    path("do_preset_resize/<int:id>",views.do_preset_resize, name="do_preset_resize"),
       

    path("enhancement_adjust/<int:id>",views.enhancement_adjust, name="enhancement_adjust"),
    path("do_enhance/<int:id>/<str:bri>/<str:con>/<str:sharp>",views.do_enhance,name='do_enhance'),
    path("download_enhanced_pic/<str:img>",views.download_enhanced_pic, name='download_enhanced_pic'),
    

    path("filter/<int:id>",views.filter, name="filter"),
    path("do_filter/<int:id>/<str:filter>",views.do_filter, name="do_filter"),
    path("download_filter/<int:id>/<str:img>",views.download_filtered_img, name="download_filtered_img"),

    
    path('after_downlaod_enhanced_or_filterd_completed/<int:id>/<str:img>',views.after_enhanced_or_filter_download,name='after_enhanced_or_filter_download'),
    
    
    
    path('update/<int:id>/<str:img>',views.update_before_routing,name='update_before_routing'),
    
    # path('check3/<str:filename>/<int:id>',views.check3, name="check"),
    path('clear_during_filter/<int:id>/<str:img>',views.clear_directory_during_filter, name='clear_directory_during_filter'), 
    path('clear_directory_after_download/<int:id>',views.clear_directory_after_every_download,name='clear_directory_after_every_download'),
    path('clear/<int:id>',views.clear_directory, name='clear_directory'),
    

]