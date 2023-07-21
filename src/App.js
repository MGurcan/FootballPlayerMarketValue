import React, { useEffect, useState } from 'react'
import axios from "axios";
import './App.css'
import { CSSTransition } from 'react-transition-group';
import './Bar.css';
function App() {

  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => setBackendData(data)
    )
  }, [])

  const [predictionResult, setPredictionResult] = useState("");

  const [inputData, setInputData] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Replace these initial values with your desired default values
  ]);
  const handleInputChange = (rowIndex, columnIndex, value) => {
    const newData = [...inputData];
    newData[rowIndex][columnIndex] = parseFloat(value);


    if (modelNo === 1) {
      const subNewData = newData[0].slice(35);

      const combinedPositions = [leagueValues, positionValues, subPositionValues, footValues].reduce((result, obj) => {
        for (const key in obj) {
          if (result[key] === undefined) {
            result[key] = obj[key];
          } else {
            result[key] += obj[key];
          }
        }
        return result;
      }, {});

      // Oluşturulan tek obje üzerinden 0-1 değerlerini içeren bir array oluşturma
      const categoric_values = Object.values(combinedPositions);


      //setInputData(newData);
      setInputData([categoric_values.concat(subNewData)]);
    }
    else {
      setInputData(newData);
    }

  };

  const [loadingPredict, setLoadingPredict] = useState(false);
  const handlePrediction = () => {
    // Axios ile Express.js API'sine istek gönderme
    setLoadingPredict(true);
    axios
      .post("/api/predict", { inputData: inputData, modelNo: modelNo })
      .then((response) => {
        // API'den dönen tahmin sonucunu al
        const prediction = response.data.prediction;
        setPredictionResult(prediction);
        setLoadingPredict(false);
      })
      .catch((error) => {
        console.error("API request error:", error);
        setLoadingPredict(false);
      });
  };


  const [csvData, setCsvData] = useState([]);

  const [modelNo, setModelNo] = useState(0);
  const handleChangeModel = () => {
    setModelNo(prevModelNo => (prevModelNo === 0 ? 1 : 0));

    if (modelNo === 1) {
      setInputData([[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]])
    }
    else if (modelNo === 0) {
      setInputData([[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]])
    }
  };
  useEffect(() => {
    // Fetch the JSON data from the server's API endpoint
    axios.get('/api/data')
      .then((response) => {
        setCsvData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);



  const model_1_columns = [
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
    'yellow_cards_2022', 'red_cards_2022', 'height_in_cm', 'age'

  ]

  const extra_columns = ['games_2022', 'minutes_played_2022', 'goals_2022', 'assists_2022', 'goals_against_2022',
    'goals_for_2022', 'clean_sheet_2022', 'last_season', 'squad_size', 'highest_market_value_in_eur',
    'yellow_cards_2022', 'red_cards_2022', 'height_in_cm', 'age']
  const model_2_columns = ['games_2022', 'minutes_played_2022', 'goals_2022', 'assists_2022', 'goals_against_2022', 'goals_for_2022', 'clean_sheet_2022', 'last_season', 'highest_market_value_in_eur', 'yellow_cards_2022', 'current_club_domestic_competition_id_GB1']

  const maxPercentage = 50000000;
  const barPercentage = (predictionResult / maxPercentage) * 100;
  const initialLeagues = [
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

  const initialPositions = [
    'position_Attack',
    'position_Midfield',
    'position_Defender',
    'position_Goalkeeper',
    'position_Missing'
  ];

  const initialSubPositions = [
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
    'sub_position_Right-Back'
  ];

  const initialFoots = ['foot_left', 'foot_right', 'foot_both']


  //handle league changes into binary values
  const [selectedLeague, setSelectedLeague] = useState(initialLeagues[0]);
  const [leagueValues, setLeagueValues] = useState(
    initialLeagues.reduce((acc, league) => {
      acc[league] = league === initialLeagues[0] ? 1 : 0;
      return acc;
    }, {})
  );

  const handleSelectChange = (e) => {
    const selectedLeague = e.target.value;
    const updatedValues = {
      ...leagueValues,
      [selectedLeague]: 1
    };

    for (const league in updatedValues) {
      if (league !== selectedLeague) {
        updatedValues[league] = 0;
      }
    }

    setSelectedLeague(selectedLeague);
    setLeagueValues(updatedValues);
  };

  //handle positions changes into binary values
  const [selectedPosition, setSelectedPosition] = useState(initialPositions[0]);
  const [positionValues, setPositionValues] = useState(
    initialPositions.reduce((acc, position) => {
      acc[position] = position === initialPositions[0] ? 1 : 0;
      return acc;
    }, {})
  );

  const handlePositionChange = (e) => {
    const selectedPosition = e.target.value;
    const updatedValues = {
      ...positionValues,
      [selectedPosition]: 1
    };

    for (const position in updatedValues) {
      if (position !== selectedPosition) {
        updatedValues[position] = 0;
      }
    }

    setSelectedPosition(selectedPosition);
    setPositionValues(updatedValues);
  };

  //handle sub positions changes into binary values
  const [selectedSubPosition, setSelectedSubPosition] = useState(initialSubPositions[0]);
  const [subPositionValues, setSubPositionValues] = useState(
    initialSubPositions.reduce((acc, subPosition) => {
      acc[subPosition] = subPosition === initialSubPositions[0] ? 1 : 0;
      return acc;
    }, {})
  );

  const handleSubPositionChange = (e) => {
    const selectedSubPosition = e.target.value;
    const updatedValues = {
      ...subPositionValues,
      [selectedSubPosition]: 1
    };

    for (const subPosition in updatedValues) {
      if (subPosition !== selectedSubPosition) {
        updatedValues[subPosition] = 0;
      }
    }

    setSelectedSubPosition(selectedSubPosition);
    setSubPositionValues(updatedValues);
  };


  //handle foot changes into binary values
  const [selectedFoot, setSelectedFoot] = useState(initialFoots[0]);
  const [footValues, setFootValues] = useState(
    initialFoots.reduce((acc, foot) => {
      acc[foot] = foot === initialFoots[0] ? 1 : 0;
      return acc;
    }, {})
  );

  const handleFootChange = (e) => {
    const selectedFoot = e.target.value;
    const updatedValues = {
      ...footValues,
      [selectedFoot]: 1
    };

    for (const foot in updatedValues) {
      if (foot !== selectedFoot) {
        updatedValues[foot] = 0;
      }
    }

    setSelectedFoot(selectedFoot);
    setFootValues(updatedValues);
  };


  const input_selectionLeague =
    <select value={selectedLeague} onChange={handleSelectChange}>
      {initialLeagues.map((league) => (
        <option key={league} value={league}>
          {league}
        </option>
      ))}
    </select>

  const input_selectionPosition =
    <select value={selectedPosition} onChange={handlePositionChange}>
      {initialPositions.map((position) => (
        <option key={position} value={position}>
          {position}
        </option>
      ))}
    </select>

  const input_selectionSubPosition =
    <select value={selectedSubPosition} onChange={handleSubPositionChange}>
      {initialSubPositions.map((subPosition) => (
        <option key={subPosition} value={subPosition}>
          {subPosition}
        </option>
      ))}
    </select>

  const input_selectionFoot =
    <select value={selectedFoot} onChange={handleFootChange}>
      {initialFoots.map((foot) => (
        <option key={foot} value={foot}>
          {foot}
        </option>
      ))}
    </select>

  const selection_inputs = <div className='selection-inputs'>
    <span>{input_selectionLeague}</span>
    <span>{input_selectionPosition}</span>
    <span>{input_selectionSubPosition}</span>
    <span>{input_selectionFoot}</span>
  </div>
  return (
    <div className='container'>

      <button onClick={handleChangeModel} className='attractive-button'>Change Model</button>
      <div className='model-type-header'>{modelNo === 0 ? 'Vanilla Model' : 'Complicated Model'}</div>
      <div className='input-container'>
        {inputData.map((row, rowIndex) => (
          <div key={rowIndex} className='input-row'>
            {row.map((value, columnIndex) => (

              (modelNo === 0 || (modelNo === 1 && columnIndex >= 35)) && <label key={columnIndex} className='flex-item'>

                {modelNo === 0 ? model_2_columns[columnIndex] : model_1_columns[columnIndex]}
                {modelNo === 0 ? (columnIndex === 10 ?
                  (
                    <input className='my-checkbox'
                      type="checkbox"
                      checked={value}
                      onChange={(e) => handleInputChange(rowIndex, columnIndex, e.target.checked ? 1 : 0)}
                    />) : <input
                    type="number"
                    value={value}
                    onChange={(e) => handleInputChange(rowIndex, columnIndex, e.target.value)}
                  />) : (columnIndex >= 35 && <input
                    type="number"
                    value={value}
                    onChange={(e) => handleInputChange(rowIndex, columnIndex, e.target.value)}
                  />)}
              </label>
            ))}
            <br />
          </div>
        ))}
      </div>
      {
        modelNo === 1 && selection_inputs
      }
      {/*       {modelNo === 1 && input_selectionLeague}
      {modelNo === 1 && input_selectionFoot}
      {modelNo === 1 && input_selectionPosition}
      {modelNo === 1 && input_selectionSubPosition} */}


      <button onClick={handlePrediction} className={loadingPredict ? 'basic-button' : 'attractive-button'} >Predict Value</button>
      <div className='prediction-result-container'>
        {predictionResult && <div>Predicted Value: {predictionResult}£</div>}
        <div className="bar-container">
          <CSSTransition
            in={predictionResult > 0}
            timeout={500}
            classNames="bar"
            unmountOnExit
          >
            <div
              className="bar"
              style={{ width: `${barPercentage}%` }}
            />
          </CSSTransition>
        </div>
      </div>
      <div>
        {/* Display the data */}
        <h1>CSV Data:</h1>
        <pre>{JSON.stringify(csvData, null, 2)}</pre>
      </div>

    </div>

  )
}

export default App