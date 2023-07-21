import pickle
import json
import sys
import pandas as pd

#return players
path = 'merged_players_df_reborn.csv'
df = pd.read_csv(path)

# Load the model
model_complicated = pickle.load(open('model_complicated.pkl','rb'))
model_vanilla = pickle.load(open('model_vanilla.pkl', 'rb'))

#model_1_accuracy -> 0.9145775045379362
model_1_columns= ['games_2022', 'minutes_played_2022', 'goals_2022', 'assists_2022', 'goals_against_2022', 'goals_for_2022', 'clean_sheet_2022', 'last_season', 'squad_size', 'highest_market_value_in_eur', 'yellow_cards_2022', 'red_cards_2022', 'current_club_domestic_competition_id_ES1', 'current_club_domestic_competition_id_FR1', 'current_club_domestic_competition_id_GB1', 'current_club_domestic_competition_id_IT1', 'current_club_domestic_competition_id_L1', 'position_Attack', 'position_Midfield', 'sub_position_Attacking Midfield', 'sub_position_Central Midfield', 'sub_position_Centre-Forward', 'sub_position_Defensive Midfield', 'sub_position_Left Winger', 'sub_position_Right Winger', 'sub_position_Second Striker', 'foot_left', 'foot_right', 'height_in_cm', 'age', 'current_club_domestic_competition_id_BE1', 'current_club_domestic_competition_id_DK1', 'current_club_domestic_competition_id_GR1', 'current_club_domestic_competition_id_NL1', 'current_club_domestic_competition_id_PO1', 'current_club_domestic_competition_id_RU1', 'current_club_domestic_competition_id_SC1', 'current_club_domestic_competition_id_TR1', 'current_club_domestic_competition_id_UKR1', 'position_Defender', 'position_Goalkeeper', 'position_Missing', 'sub_position_Centre-Back', 'sub_position_Goalkeeper', 'sub_position_Left Midfield', 'sub_position_Left-Back', 'sub_position_Right Midfield', 'sub_position_Right-Back', 'foot_both']
#model_2_accuracy -> 0.7902370536576423
model_2_columns = ['games_2022', 'minutes_played_2022', 'goals_2022', 'assists_2022', 'goals_against_2022', 'goals_for_2022', 'clean_sheet_2022', 'last_season', 'highest_market_value_in_eur', 'yellow_cards_2022', 'current_club_domestic_competition_id_GB1']



# Function to make predictions
def predict(input_data, model_no):
    if model_no == 0:
        predictions = model_vanilla.predict(input_data)
    elif model_no == 1:
        predictions = model_complicated.predict(input_data)
    return predictions.tolist()  # Convert NumPy array to a list

# Read input data from command line arguments

model_no = int(sys.argv[2])

#input_data = json.loads(sys.argv[1])["inputData"][0]
input_data = json.loads(sys.argv[1])[0]
#print("sys.argv[1]: ", input_data)

results = predict([input_data], model_no)
print(json.dumps(results))  # Print the results as a JSON string
