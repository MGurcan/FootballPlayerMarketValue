import pickle
import json
import sys
import pandas as pd

#return players
path = 'merged_players_df_final.csv'
df = pd.read_csv(path)

# Load the model
model_1 = pickle.load(open('model_1.pkl','rb'))
model_2 = pickle.load(open('model_2.pkl', 'rb'))

# Function to make predictions
def predict(input_data, model_no):
    if model_no == 0:
        predictions = model_2.predict(input_data)
    elif model_no == 1:
        predictions = model_1.predict(input_data)
    return predictions.tolist()  # Convert NumPy array to a list

# Read input data from command line arguments
model_no = int(sys.argv[2])

input_data = json.loads(sys.argv[1])[0]

results = predict([input_data], model_no)
print(json.dumps(results))  # Print the results as a JSON string
