import React from 'react'
import {Box, InputLabel, MenuItem, FormControl, Select, Typography, FormLabel, Radio, RadioGroup, FormControlLabel} from '@mui/material';

const DrPolicy = ({preferredMode, open}) => {
  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{margin:open? "4rem 0 0 15rem": "4rem 0 0 4rem", 
      transition: "margin 0.3s ease-in-out", width: open? "89.5rem":"100rem"
      }}>
    <Box display="flex" justifyContent="space-between">
      <Box width="50%" padding="0 2rem">
        <Typography align='center' paddingBottom="1.5rem" fontSize="1.5rem">
          Source Cluster
        </Typography>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Frequency</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Cluster</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Resources</FormLabel>
        <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        row
        >
        <FormControlLabel value="female" control={<Radio />} label="All" />
        <FormControlLabel value="male" control={<Radio />} label="Selective" />
         </RadioGroup>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Resources</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Kind</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <Box width="50%">
        <Typography align='center' paddingBottom="1.5rem" fontSize="1.5rem">
          Destination Cluster
        </Typography>
      </Box>
    </Box>
    </Box>
  )
}

export default DrPolicy
