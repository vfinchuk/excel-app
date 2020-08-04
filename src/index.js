import Store from '@core/createStore'
import {debounce, storage} from '@core/utils'
import {rootReducer} from '@/redux/rootReducer'
import {initialState} from '@/redux/initialState'
import Excel from '@/components/excel/Excel'
import Header from '@/components/header/Header'
import Formula from '@/components/formula/Formula'
import Table from '@/components/table/Table'
import Toolbar from '@/components/toolbar/Toolbar'
import './scss/index.scss'

const store = new Store(rootReducer, initialState)

const stateListener = debounce(state => {
  console.log('APP state', state.currentStyles)
  storage('excel-state', state)
}, 300)

store.subscribe(stateListener)

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
})

excel.render()

