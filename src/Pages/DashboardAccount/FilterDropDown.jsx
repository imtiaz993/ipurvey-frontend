import { useState, useEffect, useRef } from 'react';
import { CircularProgress, TextField } from '@material-ui/core';
import { useAuthContext } from '../../Context/authContext';
import { Autocomplete } from '@material-ui/lab';
import { API_URL } from '../../Utils/constants';
import axios from 'axios';
import date from '../../Assets/Icon awesome-calendar-alt.png';
import Datetime from 'react-datetime';
import moment from 'moment';
import './Style/filterDropdown.css';

const FilterDropDown = ({ updateContent, airport, isLoading }) => {
  const inputElement = useRef(null);
  const { user } = useAuthContext();
  const [cursorPosition, setCursorPosition] = useState(0);
  const [loading, setLoading] = useState(false);
  const [operator, setOperator] = useState();
  const [mode, setMode] = useState('All');
  const [type, setType] = useState();
  const [delay, setDelay] = useState();
  const [status, setStatus] = useState();
  const [details, setDetails] = useState({
    from: undefined,
    to: undefined,
  });
  const [travelDate, setTravelDate] = useState({
    from: undefined,
    to: undefined,
  });
  const [time, setTime] = useState({
    from: undefined,
    to: undefined,
  });

  const travelFromDateRef = useRef(null);
  const travelToDateRef = useRef(null);

  const onInput = () => {
    setCursorPosition(inputElement.current.selectionStart);
  };
  const handleMode = (event) => {
    if (mode === event.id) setMode(undefined);
    else setMode(event.id);
  };
  const handleType = (event) => {
    if (type === event.id) setType(undefined);
    else setType(event.id);
  };
  const handleDelay = (event) => {
    if (delay === event.id) setDelay(undefined);
    else setDelay(event.id);
  };
  const handleStatus = (event) => {
    if (status === event.id) setStatus(undefined);
    else setStatus(event.id);
  };
  const validDateFrom = function (current) {
    if (travelDate.to) {
      return moment(current).isBefore(travelDate.to);
    } else return true;
  };
  const validDateTo = function (current) {
    if (travelDate.from) {
      return moment(current).isAfter(travelDate.from);
    } else return true;
  };

  const onSearch = async () => {
    let time_from = '';
    let time_to = '';
    if (time.from) {
      if (time.from < 10) {
        time_from = '0' + time.from + ':00';
      } else {
        time_from = time.from + ':00';
      }
    }
    if (time.to) {
      if (time.to < 10) {
        time_to = '0' + time.to + ':00';
      } else {
        time_to = time.to + ':00';
      }
    }
    setLoading(true);
    const response = await axios.get(`${API_URL.DCR}/api/travel-bookings`, {
      headers: {
        Authorization: user.customerNumber,
        'Content-Type': 'application/json',
      },
      params: {
        arrivalDelay: delay,
        travelDateFrom: travelDate.from
          ? moment(travelDate.from.toDate()).format('YYYY-MM-DD')
          : '',
        travelDateTo: travelDate.to
          ? moment(travelDate.to.toDate()).format('YYYY-MM-DD')
          : '',
        disruptionType: type !== 'All' ? type : '',
        travelDetailsFrom: details.from ? details.from.airport : '',
        travelDetailsTo: details.to ? details.to.airport : '',
        travelTimeFrom: time_from,
        travelTimeTo: time_to,
        carrierName: operator,
        travelMode: mode === 'All' ? '' : (mode === 'Flight' ? 'F' : 'R'),
      },
    });
    setLoading(false);
    updateContent(response.data);
  };

  const resetFilters = () => {
    setLoading(false);
    setMode(undefined);
    setOperator('');
    setType(undefined);
    setDelay(undefined);
    setStatus(undefined);
    setDetails({
      from: undefined,
      to: undefined,
    });
    setTravelDate({
      from: undefined,
      to: undefined,
    });
    setTime({
      from: '',
      to: '',
    });
    setCursorPosition(0);
  };
  useEffect(() => {
    inputElement.current.setSelectionRange(cursorPosition, cursorPosition);
  }, [travelDate, cursorPosition]);
  useEffect(() => {
    if (time.from && time.to && Number(time).to < Number(time.from))
      setTime({ from: time.from, to: '' });
  }, [time]);

  return (
    <div className='filter_dd_container'>
      <div className='filter_dd_md'>
        <div className='filters_sections'>
          <div className='filter_secOne'>
            <h6>Travel Date</h6>
            <div className='filter_inp'>
              <div className='date_inp'>
                <Datetime
                  key={Math.random()}
                  ref={travelFromDateRef}
                  timeFormat={false}
                  isValidDate={validDateFrom}
                  closeOnSelect={true}
                  dateFormat='DD-MM-YYYY'
                  value={travelDate.from}
                  inputProps={{
                    onInput,
                    ref: inputElement,
                    placeholder: 'Date From',
                  }}
                  onChange={(date) => {
                    setTravelDate({ from: date, to: travelDate.to });
                  }}
                />
                <img
                  className='date_img'
                  src={date}
                  alt='calendar'
                  onClick={() =>
                    travelFromDateRef.current && travelFromDateRef.current._openCalendar()
                  }
                />
              </div>
              <div className='date_inp'>
                <Datetime
                  key={Math.random()}
                  ref={travelToDateRef}
                  timeFormat={false}
                  isValidDate={validDateTo}
                  closeOnSelect={true}
                  dateFormat='DD-MM-YYYY'
                  value={travelDate.to}
                  inputProps={{
                    onInput,
                    ref: inputElement,
                    placeholder: 'Date To',
                  }}
                  onChange={(date) => {
                    setTravelDate({ from: travelDate.from, to: date });
                  }}
                />
                <img
                  className='date_img'
                  src={date}
                  alt='calendar'
                  onClick={() =>
                    travelToDateRef.current && travelToDateRef.current._openCalendar()
                  }
                />
              </div>
            </div>
            <h6 className='filtr_head2'>Travel Time</h6>
            <div className='filter_inp'>
              <select
                name=''
                id=''
                value={time.from}
                onChange={(e) => setTime({ from: e.target.value, to: time.to })}
              >
                <option value=''>Time From</option>
                {[...Array(24)].map((_, i) => (
                  <option value={i}>{i < 10 ? `0${i}:00` : `${i}:00`}</option>
                ))}
              </select>
              <select
                name=''
                id=''
                value={time.to}
                onChange={(e) => setTime({ from: time.from, to: e.target.value })}
              >
                <option value=''>Time To</option>
                {Array.from({ length: 24 }, (v, k) => k).map((v) => {
                  if (time.from && time.from >= v) return null;
                  return <option value={v}>{v < 10 ? `0${v}:00` : `${v}:00`}</option>;
                })}
              </select>
            </div>
          </div>
          <div className='filter_secOne travel_filter'>
            <h6>Airport Details</h6>
            <div className='filter_inp'>
              <Autocomplete
                id='gotW'
                key={Math.random()}
                options={airport}
                getOptionLabel={(option) => option.airport}
                disabled={isLoading}
                value={details?.from}
                onChange={(_, newValue) =>
                  setDetails({ to: details.to, from: newValue })
                }
                renderInput={(params) => (
                  <TextField type='text' placeholder='From' {...params} />
                )}
              />
              <Autocomplete
                id='gotW'
                key={Math.random()}
                options={airport}
                getOptionLabel={(option) => option.airport}
                disabled={isLoading}
                value={details?.to}
                onChange={(_, newValue) =>
                  setDetails({ to: newValue, from: details.from })
                }
                renderInput={(params) => (
                  <TextField type='text' placeholder='To' {...params} />
                )}
              />
            </div>
            <h6 className='filtr_head2'>Transport Operator</h6>
            <div className='filter_inp'>
              <input
                type='text'
                placeholder='Search for an operator'
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
              />
            </div>
          </div>
          <div className='filter_secTwo filter_two_section_One'>
            <h6>Transport Mode</h6>
            <div>
              <label htmlFor='All'>
                <input
                  type='checkbox'
                  name='All'
                  id='All'
                  checked={mode === 'All'}
                  onClick={(e) => handleMode(e.target)}
                />
                <p>All</p>
              </label>
              <label htmlFor='Flight'>
                <input
                  type='checkbox'
                  name='Flight'
                  id='Flight'
                  checked={mode === 'Flight'}
                  onClick={(e) => handleMode(e.target)}
                />
                <p>Flight</p>
              </label>
              <label htmlFor='Rail'>
                <input
                  type='checkbox'
                  name='Rail'
                  id='Rail'
                  checked={mode === 'Rail'}
                  onClick={(e) => handleMode(e.target)}
                />
                <p>Rail</p>
              </label>
            </div>
          </div>
          <div className='filter_secTwo filter_subSec_2'>
            <h6>Disruption Type</h6>
            <div>
              <label htmlFor='all'>
                <input
                  type='checkbox'
                  name='All'
                  id='All'
                  checked={type === 'All'}
                  onClick={(e) => handleType(e.target)}
                />
                <p>All</p>
              </label>
              <label htmlFor='Delayed'>
                <input
                  type='checkbox'
                  name='Delayed'
                  id='Delayed'
                  checked={type === 'Delayed'}
                  onClick={(e) => handleType(e.target)}
                />
                <p>Delayed</p>
              </label>
              <label htmlFor='Cancelled'>
                <input
                  type='checkbox'
                  name='Cancelled'
                  id='Cancelled'
                  checked={type === 'Cancelled'}
                  onClick={(e) => handleType(e.target)}
                />
                <p>Cancelled</p>
              </label>
              <label htmlFor='Postponed'>
                <input
                  type='checkbox'
                  name='Postponed'
                  id='Postponed'
                  checked={type === 'Postponed'}
                  onClick={(e) => handleType(e.target)}
                />
                <p>Postponed</p>
              </label>
            </div>
            <h6 className='filtr_head2'>Delay Time</h6>
            <div>
              <label htmlFor='all'>
                <input
                  type='checkbox'
                  name='all'
                  id='all'
                  checked={delay === 'all'}
                  onClick={(e) => handleDelay(e.target)}
                />
                <p>All</p>
              </label>
              <label htmlFor='30'>
                <input
                  type='checkbox'
                  name='30'
                  id='30'
                  checked={delay === '30'}
                  onClick={(e) => handleDelay(e.target)}
                />
                <p>{' < '} 30 mins</p>
              </label>
              <label htmlFor='2'>
                <input
                  type='checkbox'
                  name='2'
                  id='2'
                  checked={delay === '2'}
                  onClick={(e) => handleDelay(e.target)}
                />
                <p>{' < '} 2 hours</p>
              </label>
              <label htmlFor='24'>
                <input
                  type='checkbox'
                  name='24'
                  id='24'
                  checked={delay === '24'}
                  onClick={(e) => handleDelay(e.target)}
                />
                <p>{' > '} 24 hours</p>
              </label>
            </div>
          </div>
          <div className='filter_secTwo'>
            <h6>Status</h6>
            <div>
              <label htmlFor='all'>
                <input
                  type='checkbox'
                  name='all'
                  id='all'
                  checked={status === 'all'}
                  onClick={(e) => handleStatus(e.target)}
                />
                <p>All</p>
              </label>
              <label htmlFor='new'>
                <input
                  type='checkbox'
                  name='new'
                  id='new'
                  checked={status === 'new'}
                  onClick={(e) => handleStatus(e.target)}
                />
                <p>New</p>
              </label>
              <label htmlFor='info'>
                <input
                  type='checkbox'
                  name='info'
                  id='info'
                  checked={status === 'info'}
                  onClick={(e) => handleStatus(e.target)}
                />
                <p>Info Required</p>
              </label>
              <label htmlFor='claim'>
                <input
                  type='checkbox'
                  name='claim'
                  id='claim'
                  checked={status === 'claim'}
                  onClick={(e) => handleStatus(e.target)}
                />
                <p>Claim Requested</p>
              </label>
              <label htmlFor='expired'>
                <input
                  type='checkbox'
                  name='expired'
                  id='expired'
                  checked={status === 'expired'}
                  onClick={(e) => handleStatus(e.target)}
                />
                <p>Expired</p>
              </label>
              <label htmlFor='closed'>
                <input
                  type='checkbox'
                  name='closed'
                  id='closed'
                  checked={status === 'closed'}
                  onClick={(e) => handleStatus(e.target)}
                />
                <p>Closed</p>
              </label>
            </div>
          </div>
        </div>
        <div className='cntr_btn'>
          <button className='cus_blue_btn' onClick={onSearch} disabled={loading}>
            {!loading ? 'Search' : <CircularProgress size={18} color='white' />}
          </button>
          <br />
          <button className='link_btn' onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterDropDown;
