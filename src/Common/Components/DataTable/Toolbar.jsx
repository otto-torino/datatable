import { Cached, FilterAlt, FilterAltOff, Settings } from '@mui/icons-material'
import { useContext, useState } from 'react'

import { DataTableContext } from './DataTableProvider'
import ExportAction from './ExportAction'
import Loader from './Loader'
import {
  Box,
  ToolbarActions,
  ToolbarSelection,
  ToolbarContainer,
  SelectAll,
  Button,
  Tooltip,
  IconButton,
  Typography,
} from './Styled'

const Toolbar = () => {
  const {
    noToolbar,
    t,
    selectable,
    selected,
    noBulkSelection,
    noAllSelection,
    displayData,
    data,
    isLoading,
    handleSelectAll,
    onRefetch,
    noSettings,
    handleOpenSettings,
    handleClearSelection,
    noExport,
    onFilter,
    isFilterFormActive,
  } = useContext(DataTableContext)

  // filter form
  const [filterFormIsOpen, setFilterFormIsOpen] = useState(false)
  const handleOpenFilterForm = () => setFilterFormIsOpen(true)
  const handleCloseFilterForm = () => setFilterFormIsOpen(false)
  const FilterIcon = isFilterFormActive ? FilterAlt : FilterAltOff

  return noToolbar ? null : (
    <ToolbarContainer>
      {selectable && (
        <Box direction="row" align="center" gap="0">
          <ToolbarSelection direction='row' align='center' gap='.3rem'>
            {selected.length} <Typography sx={{ fontWeight: 700 }}>{t('common:dataTable.selected')}</Typography>
          </ToolbarSelection>
          {selectable &&
            !noBulkSelection &&
            !noAllSelection &&
            selected.length === displayData.length &&
            selected.length !== data.length && (
              <SelectAll component="div">
                <Button onClick={handleSelectAll(data)} size="small">
                  {t('common:dataTable.SelectAll')}
                </Button>
              </SelectAll>
            )}
          {selectable && !!selected.length && (
            <SelectAll component="div">
              <Button onClick={handleClearSelection} size="small">
                {t('common:dataTable.ClearSelection')}
              </Button>
            </SelectAll>
          )}
        </Box>
      )}
      <ToolbarActions direction="row" align="center" gap="0">
        {isLoading && <Loader display="inline-flex" size={18} />}
        {!!onRefetch && (
          <Tooltip title={t('common:dataTable.Refresh')}>
            <IconButton size="small" onClick={onRefetch}>
              <Cached color='primary' />
            </IconButton>
          </Tooltip>
        )}
        {onFilter && (
          <Tooltip title={t('common:dataTable.Filter')}>
            <IconButton size="small" onClick={handleOpenFilterForm}>
              <FilterIcon style={{ cursor: 'pointer' }} color={isFilterFormActive ? 'secondary' : 'primary'} />
            </IconButton>
          </Tooltip>
        )}
        {!noExport && <ExportAction />}
        {!noSettings && (
          <Tooltip title={t('common:dataTable.Settings')}>
            <IconButton size="small" onClick={handleOpenSettings}>
              <Settings color='primary' />
            </IconButton>
          </Tooltip>
        )}
      </ToolbarActions>
      {filterFormIsOpen && onFilter(handleCloseFilterForm)}
    </ToolbarContainer>
  )
}

Toolbar.propTypes = {}

export default Toolbar
