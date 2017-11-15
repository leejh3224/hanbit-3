import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import SwipeableViews from 'react-swipeable-views'
import MobileStepper from 'material-ui/MobileStepper'
import Button from 'material-ui/Button'
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft'
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'

import Image from 'shared/Image'

import { PaginationEnhancer } from 'lib/enhancer'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${({ height }) => height}px;
`

const StyledStepper = styled(MobileStepper)`
  && {
    position: absolute;
    bottom: 0;
    left: ${({ steps }) => `calc(50% - ${104 + steps * 8}px)`};
    background: RGBA(255,255,255,0);

    // non active dots
    [class^='MuiMobileStepper-dot-'] {
        width: 12px;
        height: 12px;
        margin: 0 2px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.8);
    }

    // active dots
    [class^='MuiMobileStepper-dotActive-'] {
      width: 12px;
      height: 12px;
      margin: 0 2px;
      border-radius: 50%;
      background-color: ${({ theme }) => theme.color.primary};
    }
  }
`

const Carousel = ({
  images,
  height,
  children,
  page,
  setPage,
  nextPage,
  prevPage,
}) => {
  const steps = (images || children).length
  return (
    <Wrapper>
      <SwipeableViews
        enableMouseEvents
        index={page}
        onChangeIndex={page => setPage(page)}
      >
        {
          images ? (
            images.map((image, i) => 
              <Image
                src={image}
                height={height}
                key={i}
                lazy
              />
            )
          ) : children
        }
      </SwipeableViews>
      <StyledStepper
        type="dots"
        steps={steps}
        position="static"
        activeStep={page}
        nextButton={
          <Button
            disabled={page === steps - 1}
            onClick={nextPage}
          >
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button
            disabled={page === 0}
            onClick={prevPage}
          >
            <KeyboardArrowLeft />
          </Button>
        }
      />
    </Wrapper>
  )
}

Carousel.propTypes = {
  image: PropTypes.arrayOf(PropTypes.string),
  height: PropTypes.number,
}

export default PaginationEnhancer(
  // @params: initial state, cond1, cond2
  0,
  ({ images, children, page, setPage }) => 
  () => page < (images || children).length - 1 &&
  setPage(page + 1),
  ({ page, setPage }) => 
  () => page > 0 && setPage(page - 1),
)(Carousel)