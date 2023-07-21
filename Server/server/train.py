import pandas as pd
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingRegressor, RandomForestRegressor

import pickle

path = 'merged_players_df_reborn.csv'
df = pd.read_csv(path)
merged_players_df1 = df.copy()
merged_players_df1_fillnan = merged_players_df1.copy()
merged_players_df1_fillnan = merged_players_df1_fillnan.fillna(merged_players_df1_fillnan.median(numeric_only=True))

#model_1_accuracy -> 0.9145775045379362
model_1_columns= ['games_2022', 'minutes_played_2022', 'goals_2022', 'assists_2022', 'goals_against_2022', 
                  'goals_for_2022', 'clean_sheet_2022', 'last_season', 'squad_size', 'highest_market_value_in_eur', 
                  'yellow_cards_2022', 'red_cards_2022', 'current_club_domestic_competition_id_ES1', 
                  'current_club_domestic_competition_id_FR1', 'current_club_domestic_competition_id_GB1', 'current_club_domestic_competition_id_IT1', 
                  'current_club_domestic_competition_id_L1', 'position_Attack', 'position_Midfield', 'sub_position_Attacking Midfield', 
                  'sub_position_Central Midfield', 'sub_position_Centre-Forward', 'sub_position_Defensive Midfield', 'sub_position_Left Winger',
                    'sub_position_Right Winger', 'sub_position_Second Striker', 'foot_left', 'foot_right', 'height_in_cm', 'age', 
                    'current_club_domestic_competition_id_BE1', 'current_club_domestic_competition_id_DK1', 'current_club_domestic_competition_id_GR1',
                      'current_club_domestic_competition_id_NL1', 'current_club_domestic_competition_id_PO1', 'current_club_domestic_competition_id_RU1', 
                      'current_club_domestic_competition_id_SC1', 'current_club_domestic_competition_id_TR1', 'current_club_domestic_competition_id_UKR1',
                        'position_Defender', 'position_Goalkeeper', 'position_Missing', 'sub_position_Centre-Back', 'sub_position_Goalkeeper', 
                        'sub_position_Left Midfield', 'sub_position_Left-Back', 'sub_position_Right Midfield', 'sub_position_Right-Back', 'foot_both']

copy_model_1 = model_1_columns= ['games_2022', 'minutes_played_2022', 'goals_2022', 'assists_2022', 'goals_against_2022', 
                  'goals_for_2022', 'clean_sheet_2022', 'last_season', 'squad_size', 'highest_market_value_in_eur', 
                  'yellow_cards_2022', 'red_cards_2022',  'height_in_cm', 'age', 
            ]


model_1_new_columns = [
    'current_club_domestic_competition_id_ES1',
    'current_club_domestic_competition_id_FR1',
    'current_club_domestic_competition_id_GB1',
    'current_club_domestic_competition_id_IT1',
    'current_club_domestic_competition_id_L1',
    'current_club_domestic_competition_id_BE1',
    'current_club_domestic_competition_id_DK1',
    'current_club_domestic_competition_id_GR1',
    'current_club_domestic_competition_id_NL1',
    'current_club_domestic_competition_id_PO1',
    'current_club_domestic_competition_id_RU1',
    'current_club_domestic_competition_id_SC1',
    'current_club_domestic_competition_id_TR1',
    'current_club_domestic_competition_id_UKR1',
    
    'position_Attack',
    'position_Midfield',
    'position_Defender',
    'position_Goalkeeper',
    'position_Missing',

    'sub_position_Attacking Midfield',
    'sub_position_Central Midfield',
    'sub_position_Centre-Forward',
    'sub_position_Defensive Midfield',
    'sub_position_Left Winger',
    'sub_position_Right Winger',
    'sub_position_Second Striker',
    'sub_position_Centre-Back',
    'sub_position_Goalkeeper',
    'sub_position_Left Midfield',
    'sub_position_Left-Back',
    'sub_position_Right Midfield',
    'sub_position_Right-Back',

    'foot_left', 'foot_right', 'foot_both',

    'games_2022', 'minutes_played_2022', 'goals_2022', 'assists_2022', 'goals_against_2022', 
                  'goals_for_2022', 'clean_sheet_2022', 'last_season', 'squad_size', 'highest_market_value_in_eur', 
                  'yellow_cards_2022', 'red_cards_2022',  'height_in_cm', 'age', 

    ]
#model_1_columns_sort
initialLeagues = [
    'current_club_domestic_competition_id_ES1',
    'current_club_domestic_competition_id_FR1',
    'current_club_domestic_competition_id_GB1',
    'current_club_domestic_competition_id_IT1',
    'current_club_domestic_competition_id_L1',
    'current_club_domestic_competition_id_BE1',
    'current_club_domestic_competition_id_DK1',
    'current_club_domestic_competition_id_GR1',
    'current_club_domestic_competition_id_NL1',
    'current_club_domestic_competition_id_PO1',
    'current_club_domestic_competition_id_RU1',
    'current_club_domestic_competition_id_SC1',
    'current_club_domestic_competition_id_TR1',
    'current_club_domestic_competition_id_UKR1'
  ];














y = merged_players_df1_fillnan['market_value_in_eur']
X = merged_players_df1_fillnan[model_1_new_columns]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3,random_state=31)

model_1 = GradientBoostingRegressor(random_state=0)
# Export Model

model_1.fit(X_train, y_train)
with open('model_complicated.pkl', 'wb') as file:
    pickle.dump(model_1, file)


#model_2_accuracy -> 0.7902370536576423
model_2_columns = ['games_2022', 'minutes_played_2022', 'goals_2022', 'assists_2022', 'goals_against_2022', 'goals_for_2022', 'clean_sheet_2022', 'last_season', 'highest_market_value_in_eur', 'yellow_cards_2022', 'current_club_domestic_competition_id_GB1']
y = merged_players_df1_fillnan['market_value_in_eur']
X = merged_players_df1_fillnan[model_2_columns]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3,random_state=31)


model_2 = RandomForestRegressor(random_state=0)
# Export Model
model_2.fit(X_train, y_train)

with open('model_vanilla.pkl', 'wb') as file:
    pickle.dump(model_2, file)