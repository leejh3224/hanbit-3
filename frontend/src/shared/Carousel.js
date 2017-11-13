import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose, withState, withHandlers } from 'recompose'

import SwipeableViews from 'react-swipeable-views'
import MobileStepper from 'material-ui/MobileStepper'
import Button from 'material-ui/Button'
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft'
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'

import Image from 'shared/Image'

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
      background-color: #fb6542;
    }
  }
`

const enhance = compose(
  withState('index', 'setIndex', 0),
  withHandlers({
    onIncrease: ({ image, children, index, setIndex }) => () => index < (image || children).length - 1 && setIndex(index + 1),
    onDecrease: ({ index, setIndex }) => () => index > 0 && setIndex(index - 1),
  })
)

const Carousel = enhance(({
  images,
  height,
  index,
  setIndex,
  onIncrease,
  onDecrease,
  children,
  stepper,
}) => {
  const steps = (images || children).length
  return (
    <Wrapper>
      <SwipeableViews
        enableMouseEvents
        index={index}
        onChangeIndex={index => setIndex(index)}
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
        activeStep={index}
        nextButton={
          <Button
            disabled={index === steps - 1}
            onClick={onIncrease}
          >
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button
            disabled={index === 0}
            onClick={onDecrease}
          >
            <KeyboardArrowLeft />
          </Button>
        }
      />
    </Wrapper>
  )
})

Carousel.propTypes = {
  image: PropTypes.arrayOf(PropTypes.string),
  height: PropTypes.number,
}

export default Carousel