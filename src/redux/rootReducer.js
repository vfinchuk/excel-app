import * as types from '../redux/types'

export function rootReducer(state, action) {
  let field
  let val
  switch (action.type) {
    case types.TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState'
      return {
        ...state,
        [field]: value(state, field, action),
      }

    case types.CHANGE_TEXT:
      field = 'dataState'
      return {
        ...state,
        currentText: action.data.value,
        [field]: value(state, field, action)}

    case types.CURRENT_STYLES:
      return {
        ...state,
        currentStyles: action.data
      }

    case types.APPLY_STYLE:
      field = 'stylesState'
      val = state[field] || {}
      action.data.ids.forEach(id => {
        val[id] = {...val[id], ...action.data.value}
      })
      return {
        ...state,
        [field]: val,
        currentStyles: {...state.currentStyles, ...action.data.value}
      }

    case types.CHANGE_TITLE:
      field = 'title'
      return {
        ...state,
        [field]: action.data
      }

    case types.UPDATE_DATE:
      return {
        ...state,
        openedDate: new Date().toJSON()
      }

    default: return state
  }
}

function value(state, field, action) {
  const val = state[field] || {}
  val[action.data.id] = action.data.value
  return val
}
