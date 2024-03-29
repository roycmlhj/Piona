import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, TableCell, Typography, Stack, MenuItem } from '@mui/material';
// utils

// components
import Label from '../../../../components/Label';
import Avatar from '../../../../components/Avatar';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';


// ----------------------------------------------------------------------

ReviewTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  onIsbanRow: PropTypes.func,
  onOpenCompose: PropTypes.func,
  onOpenReview: PropTypes.func,
};

export default function ReviewTableRow({ row, selected, onIsbanRow, onOpenCompose, onOpenReview}) {
  const theme = useTheme();

  const { review_id, is_ban, nickname, content, comment} = row;

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const handleOpenCompose = () => {
    onOpenCompose();
    onOpenReview();
  };

  return (
    <TableRow 
      hover selected={selected}
    >
      <TableCell >
          <Typography variant="subtitle2" noWrap>
            {nickname}
          </Typography>
      </TableCell>
      <TableCell align="center" onClick={handleOpenCompose} >{content}</TableCell>

      <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
        <Iconify
            icon={comment ? 'eva:checkmark-circle-fill' : 'eva:clock-outline'}
            sx={{
              width: 20,
              height: 20,
              color: 'success.main',
              ...(!comment && { color: 'warning.main' }),
            }}
          />
      </TableCell>

      <TableCell align="right">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (is_ban === 'Y' && 'success') ||
            (is_ban === 'N' && 'warning') ||
            'default'
          }
          sx={{ textTransform: 'capitalize' }}
        >
          {is_ban}
        </Label>
      </TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onIsbanRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                신고하기
              </MenuItem>
            </>
          }
        />
      </TableCell>

    </TableRow>
  );
}
