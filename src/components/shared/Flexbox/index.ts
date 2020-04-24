import styled from 'styled-components'

const Flexbox = styled.div`
    display: flex;
    flex: ${({ flex }: any) => flex || '1'};
    justify-content: ${({ justifyContent }: any) => justifyContent || 'flex-start'};
`

export const Column = styled(Flexbox)`
    flex-direction: column;
`

export const Row = styled(Flexbox)`
    flex-direction: row;
`