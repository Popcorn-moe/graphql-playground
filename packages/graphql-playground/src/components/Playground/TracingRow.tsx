import * as React from 'react'
import * as theme from 'styled-theming'
import styled from '../../styled/styled'

const textColor = theme('mode', {
  light: p => p.theme.colours.darkBlue60,
  dark: p => p.theme.colours.white,
})

const durationColor = theme('mode', {
  light: p => p.theme.colours.darkBlue50,
  dark: p => p.theme.colours.white60,
})

const Row = styled.div`
  position: relative;
  font-size: 12px;
  display: table;
  padding-right: 25px;

  color: ${textColor};
`

const Bar = styled.span`
  display: inline-block;
  position: relative;
  margin: 0 10px;
  height: 1.5px;
  bottom: 4px;

  background: ${textColor};
`

const Duration = styled.span`
  font-size: 10px;
  color: ${durationColor};
`

const NameWrapper = styled.span`
  position: absolute;
  left: 0;
  transform: translateX(-100%);
  display: inline-flex;
  align-items: center;

  text-align: right;
`

const Name = styled.span`
  margin-left: 10px;
`

export interface TracingRowProps {
  path: Array<string | number>
  startOffset: number
  duration: number
}

export interface TracingRowState {
  collapsed: boolean
}

export default class TracingRow extends React.Component<
  TracingRowProps,
  TracingRowState
> {
  state = {
    collapsed: false,
  }
  render() {
    const { path, startOffset, duration } = this.props
    const factor = 1000 * 1000
    const offsetLeft = startOffset / factor
    const barWidth = duration / factor
    return (
      <Row style={{ transform: `translateX(${offsetLeft}px)` }}>
        <NameWrapper>
          {/*
          <Icon
            width={8}
            height={8}
            color="white"
            src={require('../../assets/icons/smallArrowBottom.svg')}
          />
          */}
          <Name>
            {path.slice(-2).map((p, index) => (
              <span
                style={{
                  opacity: index === path.slice(-2).length - 1 ? 1 : 0.6,
                }}
                key={p}
              >
                {`${index > 0 ? '.' : ''}${p}`}
              </span>
            ))}
          </Name>
        </NameWrapper>
        <Bar style={{ width: Math.max(barWidth, 3) }} />
        <Duration>{this.printDuration(duration)}</Duration>
      </Row>
    )
  }
  private printDuration(nanoSeconds) {
    const microSeconds = Math.round(nanoSeconds / 1000)
    if (microSeconds > 1000) {
      const ms = Math.round(microSeconds / 1000)
      return `${ms} ms`
    }

    return `${microSeconds} µs`
  }
}
