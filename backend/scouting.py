from tinydb import TinyDB, Query
from pathlib import Path
'''
Format:
PreMatch
Nearside -> 0
Farside -> 1
No Preference -> -1

Too tall -> 0
Under 14 -> 1
Under 12 -> 2

Regular Match
closeSide -> 0
farSide -> 1
'''

db = TinyDB("data.json")
Todo = Query()

directory = Path(__file__).parent
filename1 = directory.joinpath('team-information.txt')
with open(filename1.resolve(), "r") as file:
    namesDict = eval(file.read().split("\n")[0])


def getName(number):
    try:
        return (namesDict[str(number)])
    except:
        return None


def prematchScouting(number, prematch_data):
    try:
        if (db.contains(Todo.number == str(number))):
            db.update({"prematch_scouting": prematch_data}, Todo.number == str(number))
        else:
            new_team = {
                "match": [],
                "name": getName(number),
                "number": str(number),
                "prematchScouting": prematch_data,
                "score": 0
            }
            db.insert(new_team)
        return True
    except:
        return False


def getPrematchScouting(number):
    return (db.get(Todo.number == number)["prematchScouting"])


def matchScouting(number, match_data):  # Returns true if number exists, false otherwise
    try:
        if (not db.contains(Todo.number == number)):
            new_team = {
                "match": [match_data],
                "name": getName(number),
                "number": number,
                "prematchScouting": {},
                "score": 0
            }
            db.insert(new_team)
        matches = db.get(Todo.number == number)["match"]
        matches.append(match_data)
        db.update({"match": matches}, Todo.number == number)
        return True
    except:
        return False
    
"""
{
          "backdropAuto": "1",
          "backdropTele": "5",
          "backstageAuto": "0",
          "backstageParking": null, x
          "backstageTele": "0",
          "coneStackTele": "0",
          "date": "3/2/2024",
          "lines": "0",
          "mosaics": "0",
          "notes": "Parked, dropped",
          "plane": "0",
          "purplePixel": "0", x
          "rigging": null,
          "teamElement": null, x
          "yellowPixel": "1", x
          "autoStart":"close"
          "alliance":"red"
        }
"""


def getMatchScouting(number, filter=False, date="1/1/2024"):
    matches = []
    raw_data = db.get(Todo.number == number)["match"]
    for match in raw_data:
        if (not filter):
            matches.append(match)
        else:
            if (match["date"] == date):
                matches.append(match)
    return matches
