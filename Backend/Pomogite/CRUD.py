import sqlite3
path = ""
def readDB():
    connection = sqlite3.connect("C:\django\history.db")
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM history")
    frames = cursor.fetchall()
    connection.close()
    for frame in frames:
        print(f"id: {frame[0]}, latitude: {frame[1]}, longitude: {frame[2]}")

def createDB():
    connection = sqlite3.connect("history.db")
    cursor = connection.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS history (
        id INTEGER PRIMARY KEY,
        latitude REAL,
        longitute REAL
        )
    ''')
    connection.commit()
    connection.close()

def appendData(lat, lon):
    connection = sqlite3.connect("C:\django\history.db")
    cursor = connection.cursor()
    cursor.execute('INSERT INTO history (latitude, longitude) VALUES (?, ?)', (lat, lon))
    connection.commit()
    connection.close()

def deleteLine():
    connection = sqlite3.connect("history.db")
    cursor = connection.cursor()
    cursor.execute("DELETE from history where lattitude = 37.0123")
    connection.commit()

if __name__ == "__main__":
    readDB()
    lat = input("lat: ")
    lon = input("lon: ")
    appendData(lat, lon)
    readDB()