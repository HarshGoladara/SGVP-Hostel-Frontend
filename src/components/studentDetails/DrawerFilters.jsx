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
  students,
  setStudents,
  selectedOption,
  setSelectedOption,
  totalItems,
  setTotalItems,
  // currentPage,
  setCurrentPage,
  // totalPages,
  setTotalPages,
  // pageNumberList,
  // setPageNumberList,
  searchQuery,
  setSearchQuery,
  isLoading,
  filterStudents,
  searchStudents,
}) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = useState('');

  const options = ['All', 'Wing3', 'Dome', 'Vishvambharam'];

  const applyFilter = () => {
    setSearchQuery(search);
    searchStudents(search);
    setOpen(false);
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
                      applyFilter();
                    }
                  }}
                />
              </div>
            </div>

            <Typography level="title-md" sx={{ fontWeight: 'bold' }}>
              Room Category
            </Typography>
            <RadioGroup
              value={selectedOption || ''}
              onChange={(event) => {
                setSelectedOption(event.target.value);
                filterStudents(event.target.value);
              }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                  gap: 1.5,
                }}
              >
                {options.map((item) => (
                  <Card
                    key={item}
                    sx={{
                      boxShadow: 'none',
                      '&:hover': { bgcolor: 'background.level1' },
                    }}
                  >
                    <CardContent>
                      <Typography level="title-md">{item}</Typography>
                    </CardContent>
                    <Radio
                      disableIcon
                      overlay
                      checked={selectedOption === item}
                      variant="outlined"
                      color="neutral"
                      value={item}
                      sx={{ mt: -2 }}
                      slotProps={{
                        action: {
                          sx: {
                            ...(selectedOption === item && {
                              borderWidth: 2,
                              borderColor:
                                'var(--joy-palette-primary-outlinedBorder)',
                            }),
                            '&:hover': {
                              bgcolor: 'transparent',
                            },
                          },
                        },
                      }}
                    />
                  </Card>
                ))}
              </Box>
            </RadioGroup>
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
                setSelectedOption('All');
                filterStudents('All');
              }}
            >
              Clear
            </Button>
            <Button onClick={() => applyFilter()}>Filter</Button>
          </Stack>
        </Sheet>
      </Drawer>
    </React.Fragment>
  );
}
