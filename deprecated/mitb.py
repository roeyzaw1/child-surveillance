import win32com.client
import time
import urlparse
import urllib

clsid = '{9BA05972-F6A8-11CF-A442-00A0C90A8F39}'

windows = win32com.client.Dispatch(clsid)

while True:
    for browser in windows:
        url = urlparse.urlparse(browser.LocationUrl)
        print "[DEBUG] URL :" + kjbrowser.LocationUrl
        full_doc = browser.Document.all

        print fulldoc
        

