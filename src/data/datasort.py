import numpy as np
import pandas as pd
stations = pd.read_csv ('C:/Users/Admin/OneDrive/Desktop/234/src/data/data.csv')
states = pd.read_csv('C:/Users/Admin/OneDrive/Desktop/234/src/data/us-state-capitals.csv', on_bad_lines='skip')

statesDF = pd.DataFrame(states)
statesDF['stationsCount'] = 0

stationsDF = pd.DataFrame(stations)

def findStateIndex(i):
    for j in range(0, len(statesDF)):
        code = statesDF['code'][j]
        if np.equal(code, i):
            return j

previousIndex = 0
for i in range(len(statesDF)):
    code = statesDF['code'][i]
    idex = stationsDF.query('StateCode > ' + str(code)).index[0]
    df = stationsDF[previousIndex:idex]
    length = len(df)
    count = statesDF['stationsCount'][i]
    statesDF['stationsCount'][i] = length
    previousIndex = idex

print(statesDF)
print(statesDF['stationsCount'].sum())