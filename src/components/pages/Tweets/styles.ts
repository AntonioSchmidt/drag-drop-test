import styled from 'styled-components';
import { Column, Row } from './../../shared/Flexbox/index';

export const DroppableArea = styled(Column)`
    max-width: 600px;
    min-width: 300px;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 10px;
    height: 500px;
    overflow-y: scroll;
`

export const SpacedRow = styled(Row)`
    justify-content: space-between;
`
export const Container = styled(Column)`
    margin: 30px 10%;
`

export const CardHolder = styled(Column)`
    margin-bottom: 20px;
`

export const InputControl = styled(Row)`
    width: 300px;
    margin: 20px 0;
`
export const SelfCenteredColumn = styled(Column)`
    align-self: center;
    justify-content: center;
    text-align: center;
`