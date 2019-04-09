import requests
from pprint import pprint

# cool links
'''
https://satisfactory.gamepedia.com/Category:Buildings
https://www.mediawiki.org/wiki/API:Properties
https://www.mediawiki.org/wiki/API:Images
'''

def getCats():
    PARAMS = {
        "action": "query",
        "format": "json",
        "list": "allcategories",
    }

    R = S.get(url=URL, params=PARAMS)
    DATA = R.json()

    pprint(DATA)
    continueVar = DATA["continue"]["accontinue"]

    while continueVar:
        PARAMS = {
            "action": "query",
            "format": "json",
            "list": "allcategories",
            "acfrom": continueVar

        }

        R = S.get(url=URL, params=PARAMS)
        DATA = R.json()

        pprint(DATA)
        continueVar = DATA["continue"]["accontinue"]


def getBuildings():
    PARAMS = {
        "action": "query",
        "format": "json",
        "list": "categorymembers",
        "cmlimit": 100,
        "cmtitle": "Category:Buildings"
    }

    R = S.get(url=URL, params=PARAMS)
    DATA = R.json()

    members = DATA["query"]["categorymembers"]
    pprint(members)

def getPropsFromPage(pageTitle):
    PARAMS = {
        "action": "query",
        "format": "json",
        "titles": pageTitle,
        "prop" : "pageprops"
    }

    R = S.get(url=URL, params=PARAMS)
    DATA = R.json()

    pprint(DATA)

def getParseFromPage(pageTitle):
    PARAMS = {
        "action": "parse",
        "format": "json",
        "page":pageTitle,
    }

    PARAMS2 = {
        "action": "parse",
        "format": "json",
        "page":pageTitle,
        "sectiontitle":"Smelting"
    }

    R = S.get(url=URL, params=PARAMS)
    DATA = R.json()

    pprint(DATA["parse"]["properties"])
    #pprint(DATA["parse"]["text"])


S = requests.Session()

URL = "https://satisfactory.gamepedia.com/api.php"
getParseFromPage("Smelter")
