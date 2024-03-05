from tinydb import TinyDB
from tinydb import Query
from pathlib import Path

db = TinyDB("data.json")
Todo = Query()

directory = Path(__file__).parent
filename1 = directory.joinpath('team-information.txt')
with open(filename1.resolve(), "r") as file:
    namesDict = eval(file.read().split("\n")[0])


def getName(number):
    try:
        return (namesDict[number])
    except:
        return None


def prematchScouting(number, auto_notes, auto_preference, endgame_notes, height, teleop_notes):
    prematch_scoutingDict = {
        "auto_notes": auto_notes,
        "auto_preference": auto_preference,
        "endgame_notes": endgame_notes,
        "height": height,
        "teleop_notes": teleop_notes
    }
    if (db.contains(Todo.number == number)):
        db.update({"prematch_scouting": prematch_scoutingDict}, Todo.number == number)
    else:
        new_team = {
            "match": [],
            "name": getName(number),
            "number": number,
            "prematch_scouting": prematch_scoutingDict,
            "score": 0
        }
        db.insert(new_team)


def getPrematchScouting(number):
    return (db.get(Todo.number == number)["prematch_scouting"])


def matchScouting(number, match_data):  # Returns true if number exists, false otherwise
    try:
        matches = db.get(Todo.number == number)["match"]
        matches.append(match_data)
        db.update({"match": matches}, Todo.number == number)
        return True
    except:
        return False


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
