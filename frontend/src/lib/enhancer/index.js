import {
  compose,
  withState,
  withHandlers,
  renameProps,
} from 'recompose'

export const visibilityEnhancer = (initialState = false, isSelect = false) => compose(
  withState('isVisible', 'setVisibility', initialState),

  // if select
  renameProps(isSelect && {
    isVisible: 'value',
    setVisibility: 'setValue',
  })
)

export const PaginationEnhancer = (
  initialState, 
  condition1 = null, 
  condition2 = null,
  isCounter = false,
) => compose(
  withState('page', 'setPage', initialState),

  // nextPage and prevPage
  withHandlers({
    nextPage: condition1,
    prevPage: condition2,
  }),

  // used as QuantityEnhancer
  renameProps(isCounter && {
    page: 'quantity',
    setPage: 'setQuantity',
    nextPage: 'addQuantity',
    prevPage: 'reduceQuantity',
  }),
)