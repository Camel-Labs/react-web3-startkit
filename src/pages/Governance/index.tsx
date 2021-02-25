import React, { useMemo } from 'react'
import { BodyWrapper } from '../AppBody'
import { AutoColumn } from '../../components/Column'
import styled from 'styled-components'
import { useToggleModal } from '../../state/application/hooks'
import useENS from '../../hooks/useENS'
import { useActiveWeb3React, useTheme } from '../../hooks'
import { ApplicationModal } from '../../state/application/actions'
import { GreyCard } from '../../components/Card'
import { RowFixed, RowBetween } from '../../components/Row'
import { TYPE, ExternalLink } from '../../theme'
import { ButtonBasic } from '../../components/Button'
import { shortenAddress, getEtherscanLink } from '../../utils'
import { Settings } from 'react-feather'
import Loader from '../../components/Loader'
import { useAllTransactions, isTransactionRecent } from '../../state/transactions/hooks'
import { newTransactionsFirst } from '../../components/Web3Status'
import { LoadingFlag } from '../../theme/components'

const SectionWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1.5em;
  margin-bottom: 1rem;
`
const EmptyCircle = styled.div`
  height: 48px;
  width: 48px;
  background: ${({ theme }) => theme.bg3};
  border-radius: 50%;
  margin-right: 1rem;

  ${({ theme }) => theme.mediaWidth.upToSmall`
  display: none;
`};
`

const AccountCard = styled(GreyCard)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  z-index: 2;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 12px;
  `};
`

const StyledSettings = styled(Settings)`
  stroke: ${({ theme }) => theme.text3};
  height: 18px;
  width: 18px;

  :hover {
    cursor: pointer;
    stroke: ${({ theme }) => theme.text2};
  }
`

const FixedWidthAtSmall = styled(AutoColumn)`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 160px;
  `};
`

const ButtonText = styled(TYPE.white)`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 12px;
  `};
`

export default function Overview() {
  const theme = useTheme()

  // account details
  const { chainId, account } = useActiveWeb3React()
  const { name: ensName } = useENS(account)

  // UI views
  const toggleWalletModal = useToggleModal(ApplicationModal.WALLET)

  // show pending txns if needed
  const allTransactions = useAllTransactions()
  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])
  const pending = sortedRecentTransactions.filter(tx => !tx.receipt).map(tx => tx.hash)
  const hasPendingTransactions = !!pending.length

  return (
    <BodyWrapper>
      <SectionWrapper>
        {!account && (
          <GreyCard>
            <RowBetween>
              <RowFixed>
                <EmptyCircle />
                <FixedWidthAtSmall gap="10px">
                  <TYPE.main fontSize="20px">Your Address</TYPE.main>
                  <TYPE.main fontSize="12px">Connect wallet to sign in .</TYPE.main>
                </FixedWidthAtSmall>
              </RowFixed>
              <ButtonBasic width="fit-content" onClick={toggleWalletModal}>
                <ButtonText>Connect wallet</ButtonText>
              </ButtonBasic>
            </RowBetween>
          </GreyCard>
        )}
        {account && (
          <>
            <AccountCard>
              {account && chainId && (
                <RowFixed style={{ width: 'fit-content' }}>
                  <AutoColumn gap="sm">
                    <TYPE.subHeader>Your address</TYPE.subHeader>
                    <RowFixed>
                      <ExternalLink href={getEtherscanLink(chainId, account, 'address')}>
                        <TYPE.mediumHeader mr="10px" color={theme.text1}>
                          {ensName ?? shortenAddress(account)}
                        </TYPE.mediumHeader>
                      </ExternalLink>
                      <StyledSettings onClick={toggleWalletModal} stroke="black" />
                      {hasPendingTransactions && (
                        <LoadingFlag style={{ marginLeft: '10px' }} onClick={toggleWalletModal}>
                          {pending?.length} pending <Loader style={{ marginLeft: '4px', height: '12px' }} />
                        </LoadingFlag>
                      )}
                    </RowFixed>
                  </AutoColumn>
                </RowFixed>
              )}
            </AccountCard>
          </>
        )}
      </SectionWrapper>
    </BodyWrapper>
  )
}
