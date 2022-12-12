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

idx = stationsDF.query('StateCode > 56').index[0]
stations = stationsDF[:idx]

# for i in range(0, len(stationsDF)-1):
#     index = findStateIndex(stationsDF['StateCode'][i])
#     if index == None:
#         print(i)
#     count = statesDF['stationsCount'][index]
#     statesDF['stationsCount'][index] = count + 1

print(stationsDF[0])