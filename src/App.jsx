import { Delete, Edit, MoveUp } from '@mui/icons-material'
import { ThemeProvider } from '@mui/material'
import { useCallback, useMemo, useState } from 'react'

import DataTable from '@Common/Components/DataTable'
import { BULK_ACTION_TYPE, RECORD_ACTION_TYPE } from '@Common/Components/DataTable/Constants'
import { useRtkQuery } from '@Common/Components/DataTable/Variants/Rtk/Hooks'
import { useCampaignsQuery } from '@Core/Services/Api/Campaigns'
import Vehicles from '@Fixtures/Vehicles.json'
import getTheme from '@Theme'
import Vehicle from '@Vehicles/Models/Vehicle'
import Campaign from './Campaigns/Model/Campaign'
import { defaultTo } from 'ramda'
import { apiQueryString } from './Core/Services/Api'

const LIST_DISPLAY = ['id', 'name', 'maxSpeed']
const SEARCH_FIELDS = ['name', 'status.code']

function App() {
  const mode = 'light'
  const theme = useMemo(() => getTheme(mode), [mode])
  const [selected, setSelected] = useState([])
  const [selectedRtk, setSelectedRtk] = useState([])
  const [isVisible, setIsVisible] = useState(true)

  const qsAdditions = {}
  const { data, isFetching, refetch, refreshData, count } = useRtkQuery(
    'campaigns', // dataTableId
    useCampaignsQuery, // rtk endpoint
    qsAdditions, // qs additions
    { field: 'id', direction: 'asc' }, // default sorting
  )

  const actions = [
    {
      id: 'EDIT',
      label: 'Edit',
      icon: <Edit />,
      type: RECORD_ACTION_TYPE,
    },
    {
      id: 'DELETE',
      label: 'Delete',
      icon: <Delete />,
    },
    {
      id: 'MOVE',
      label: 'Move',
      icon: <MoveUp />,
      type: BULK_ACTION_TYPE,
    },
  ]

  const handleAction = useCallback((actionId, record) => {
    console.log(actionId, record)
  }, [])
  const onFilter = useCallback(() => {
    console.log('FILTER')
  }, [])
  const onExpandRow = useCallback(() => {
    return (
      <div style={{ height: '100px', background: 'red' }}>Hello</div>
    )
  }, [])
  const onExpandRowCondition = useCallback(({ id }) => id % 2 === 0, [])

  return (
    <ThemeProvider theme={theme}>
      <div>
        {isVisible && (
          <DataTable
            variant="rtk"
            selectable
            id="campaigns"
            data={defaultTo([], data?.results)}
            count={count}
            qsAdditions={qsAdditions}
            refreshData={refreshData}
            model={Campaign}
            selected={selectedRtk}
            onSelect={setSelectedRtk}
            onRefetch={refetch}
            listDisplay={['id', 'name']}
            onFilter={() => {}}
            isFilterFormActive={false}
            fullTextSearchFields={['name']}
            isLoading={isFetching}
            exportApi={(qs) => fetch(`https://www.tazebao.email/api/v1/newsletter/campaign/${apiQueryString(qs)}`)}
          />
        )}
      </div>
      <div>
        {isVisible && (
          <DataTable
            variant="client"
            selectable
            id="vehicles"
            data={Vehicles}
            model={Vehicle}
            selected={selected}
            onSelect={setSelected}
            storePageAndSortInSession
            listDisplay={LIST_DISPLAY}
            onFilter={onFilter}
            isFilterFormActive={false}
            actions={actions}
            onAction={handleAction}
            fullTextSearchFields={SEARCH_FIELDS}
            onExpandRow={onExpandRow}
            onExpandRowCondition={onExpandRowCondition}
          />
        )}
      </div>
      <button onClick={() => setIsVisible(!isVisible)}>Switch</button>
    </ThemeProvider>
  )
}

export default App
