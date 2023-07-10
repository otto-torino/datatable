import { useContext, useState } from 'react'

import { DataTableContext } from './DataTableProvider'
import { Box, Button, FormControl, InputLabel, ListItemIcon, ListItemText, MenuItem, Select } from './Styled'
import { getBulkActions, withEventValue } from './Utils'

const BulkActionsFullTextSearchBar = () => {
  const { t, size, actions, onAction, fullTextSearchFields, selected } = useContext(DataTableContext)
  const [selectedAction, setSelectedAction] = useState('')

  const bulkActions = getBulkActions(actions)

  const handleAction = () => {
    onAction({ id: selectedAction, record: null, records: selected })
  }

  return bulkActions.length === 0 && fullTextSearchFields.length === 0 ? null : (
    <Box margin="1rem 0">
      {bulkActions.length > 0 && (
        <Box direction='row' gap='.5rem'>
          <FormControl style={{ width: '300px' }}>
            <InputLabel size={size}>{t('common:dataTable.Actions')}</InputLabel>
            <Select
              size={size}
              value={selectedAction}
              label={t('common:dataTable.Actions')}
              onChange={withEventValue(setSelectedAction)}
              renderValue={(value) => <Box direction='row'>{value}</Box>}
            >
              {bulkActions.map((action) => (
                <MenuItem key={action.id} value={action.id}>
                  {action.icon && <ListItemIcon>{action.icon}</ListItemIcon>}
                  <ListItemText>{action.label}</ListItemText>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button onClick={handleAction} disabled={!selected.length || !selectedAction}>{t('common:dataTable.Go')}</Button>
        </Box>
      )}
    </Box>
  )
}

BulkActionsFullTextSearchBar.propTypes = {}

export default BulkActionsFullTextSearchBar
