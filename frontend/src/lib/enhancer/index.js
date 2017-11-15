import { compose, withState, withHandlers } from 'recompose'

export const visibilityEnhancer = (initialState) => compose(
  withState('isVisible', 'setVisibility', initialState),
)

export const PaginationEnhancer = (initialState, condition1, condition2) => compose(
  withState('page', 'setPage', initialState),

  // nextPage and prevPage
  withHandlers({
    nextPage: condition1,
    prevPage: condition2,
  }),
)