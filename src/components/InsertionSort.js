import {useState} from 'react';

function InsertionSort() {
    // Original array
    const [arr, setArr] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [isError, setError] = useState(false);
    // Track changes in state of array
    const [sortSteps, setSortedSteps] =  useState([[]]);
    // Final sorted array
    const [sortedArr, setSortedArr] = useState([]);
    
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
	    InsertionSort(arr);
	}
    }
    return (
	    <div style={{flexDirection: 'column'}}>
	    <label style={{margin: '5px'}}> Enter Comma separated values </label>
	    <input style={{margin: '5px', height: 20, width: 400}} type="text" defaultValue={arr} onChange={e => updateArray(e) }/>
	    { isError ? (<label style={{margin: '5px'}}> {errorMsg} </label>) : ''}
	    <div style={{flexDirection: 'row', justifyContent: 'space-around'}}>
	    <label> Input Array: </label>
	    <label> {arr.toString() } </label>
	    </div>
	    <div>
	    <button style={{height: '30px', width: '100px', border: '0px', borderRadius: '4px', margin: '10px'}} onClick={e => sort()}>Sort</button>
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
