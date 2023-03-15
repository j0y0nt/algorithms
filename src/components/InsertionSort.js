import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

function InsertionSort() {
    // Original array
    const [arr, setArr] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [isError, setError] = useState(false);
    // Track changes in state of array
    const [sortSteps, setSortedSteps] =  useState([[]]);
    // Final sorted array
    const [sortedArr, setSortedArr] = useState([]);
    const [algo, setAlgo] = useState('');
    
    function updateArray(e) {
	if(e.target.value !== '') {
	    const inArr = e.target.value.split(",");
	    let nArr = [];
	    try {
		nArr = inArr.map(v => {
		    var x = Number(v);
		    if(isNaN(x)){
			throw new Error('Please enter valid integers only. ' + v);
		    } else {
			if(isError){
			    setError(false);
			}
		    }
		    return x;
		});
		setArr(nArr);
	    } catch (error){
		setError(true);
		setErrorMsg(error.message);
	    }
	}
    }

    function InsertionSort(arr) {
	if(!Array.isArray(arr)){
	    setError(true);
	    setErrorMsg('Invalid array: ' + arr);
	    return;
	}

	if(arr.length <= 0) {
	    setSortedArr(arr);
	    return;
	}

	let _marr = arr.slice();
	let ua = [];
	for(let j = 1; j < _marr.length; j++) {
	    const key = _marr[j];
	    let i = j - 1;

	    while( i >= 0 && _marr[i] > key) {
		_marr[i+1] = _marr[i];
		i = i - 1;
	    }
	    _marr[i+1] = key;
	    ua.push(_marr.slice());
	}
	
	setSortedSteps(state => ua);
	setSortedArr(_marr);
    }
    
    function sort() {
	if(arr.length !== 0) {

	    switch(algo) {
	    case 'INSERTION':
		InsertionSort(arr);
		break;
	    default:
		console.log('Please select an algorithm.');
	    }
	}
    }

    function selectAlgorithm(e) {
	console.log(e.target.value);
	setAlgo(algo => e.target.value);
    }
    
    return (
	    <div style={{flexDirection: 'column',
			 background: 'aliceblue',
			 padding: '10px'}}>
	    <Box sx={{paddingY: '10px'}}>
	    <Typography variant="h6" gutterBottom>
            How array changes while sorting ?
	    </Typography>
	    </Box>

	{/* Start: Textfield for Array */}
	    <Box sx={{
		width: 500,
		maxWidth: '100%',
	    }}
	    >
	    <TextField fullWidth label="Enter comma seperated value here"
	id="arrayField" size="small" defaultValue={arr} onChange={e => updateArray(e) }
	    />
	    </Box>
	    {/* End: Textfield for Array */}
	
	    { isError ? (<label style={{margin: '5px'}}> {errorMsg} </label>) : ''}

	    <div>
	    <Box sx={{ margin: 1, width: 500, justifyContent: 'flex-start'}}>
	    <Typography variant="body1" gutterBottom>
            Input Array: {arr.toString() }
      </Typography>
	    </Box>
	    
	</div>
	
	    <div>

	    <div>
	      <Typography variant="subtitle2" gutterBottom>
            Select Algorithm
      </Typography>
	    </div>
	    <div>
	    <FormControl sx={{ m: 1, minWidth: 240 }} size="small" >
	    <Select labelId="demo-select-small" id="demo-select-small" value={algo}
        label="Age"
        onChange={e => selectAlgorithm(e)}
	displayEmpty
	    >
            <MenuItem value="">
            <em>None</em>
            </MenuItem>
            <MenuItem value="INSERTION">Insertion Sort</MenuItem>
	    </Select>
	    </FormControl>
	    </div>
	    {/* Sort Button */}
	    <div>
	    <Button variant="outlined" onClick={e => sort()}>Sort</Button>
	    </div>
	    </div>
	    <div style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
	    <label> Sorted Array: </label>
	    {sortedArr.map(v => {return (
		    <label key={v}> {v} </label>
	    )}) }
	</div>
	    <div style={{flexDirection: 'column', width: '100%' }}>
	    <div style={{flexDirection: 'row', display: 'inline-flex',
			 justifyContent: 'space-between', margin: '20px',
			 width: '100%'}}>
	    <label> Iteration </label>
	    <label style={{width: '30%'}}> State </label>
	    </div>
	    {sortSteps.map((item, idx) => {return (
		    <div key={'div' + idx}
		style={{flexDirection: 'row', display: 'inline-flex',
			width: '100%', justifyContent: 'space-between'}}>
		    <label style={{width: '10%'}}> {idx} </label>
		    <div>
		    [
			{item.map((v, idx) => {return (
			    <label key={'item-' + idx} style={{margin: '5px'}}> {v} </label>
			)})}
			]
		    </div>
		    </div>
	    )})}
	</div>
	    </div>
    );
}

export default InsertionSort;
