import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Drawer from '@mui/joy/Drawer';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Checkbox from '@mui/joy/Checkbox';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import ModalClose from '@mui/joy/ModalClose';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Stack from '@mui/joy/Stack';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import Sheet from '@mui/joy/Sheet';
import Switch from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';
import TuneIcon from '@mui/icons-material/TuneRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import HotelRoundedIcon from '@mui/icons-material/HotelRounded';
import Done from '@mui/icons-material/Done';
import { useState, useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export default function DrawerFilters({
  gatepasses,
  setGatepasses,
  totalItems,
  setTotalItems,
  // currentPage,
  setCurrentPage,
  // totalPages,
  setTotalPages,
  // pageNumberList,
  // setPageNumberList,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  isLoading,
  searchQuery,
  setSearchQuery,
  filterGatepasses,
}) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = useState('');

  const applyFilter = (search, startDate, endDate) => {
    setSearchQuery(search);
    filterGatepasses(search, startDate, endDate);
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<TuneIcon />}
        onClick={() => setOpen(true)}
      >
        Change filters
      </Button>
      <Drawer
        size="md"
        variant="plain"
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          content: {
            sx: {
              bgcolor: 'transparent',
              p: { md: 3, sm: 0 },
              boxShadow: 'none',
            },
          },
        }}
      >
        <Sheet
          sx={{
            borderRadius: 'md',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
          <DialogTitle>Filters</DialogTitle>
          <ModalClose />
          <Divider sx={{ mt: 'auto' }} />
          <DialogContent sx={{ gap: 2 }}>
            {/* Search Input */}
            <div className="flex justify-center ml-3 mt-1">
              <div className="search-container">
                <span className="search-icon">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  placeholder="Search something..."
                  className="search-input"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={(e) => {
                    e.target.placeholder = 'Search Pin / Name ';
                    e.target.classList.add('focused');
                  }}
                  onBlur={(e) => {
                    e.target.placeholder = 'Search something...';
                    e.target.classList.remove('focused');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      applyFilter(search, startDate, endDate);
                    }
                  }}
                />
              </div>
            </div>

            <FormControl>
              <FormLabel sx={{ typography: 'title-md', fontWeight: 'bold' }}>
                Date Filtering
              </FormLabel>
              <div className="mt-2 ml-auto mr-auto">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                      applyFilter(search, date, endDate);
                    }}
                    renderInput={(params) => (
                      <input
                        {...params.inputProps}
                        className="datepicker-input"
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div className="mt-2 ml-auto mr-auto">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={(date) => {
                      setEndDate(date);
                      applyFilter(search, startDate, date);
                    }}
                    renderInput={(params) => (
                      <input
                        {...params.inputProps}
                        className="datepicker-input"
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </FormControl>
          </DialogContent>

          <Divider sx={{ mt: 'auto' }} />
          <Stack
            direction="row"
            useFlexGap
            spacing={1}
            sx={{ justifyContent: 'space-between' }}
          >
            <Button
              color="neutral"
              onClick={() => {
                setSearch('');
                setStartDate(null);
                setEndDate(null);
                applyFilter('', null, null);
              }}
            >
              Clear
            </Button>
            <Button
              onClick={() => {
                applyFilter(search, startDate, endDate);
                setOpen(false);
              }}
            >
              Filter
            </Button>
          </Stack>
        </Sheet>
      </Drawer>
    </React.Fragment>
  );
}
