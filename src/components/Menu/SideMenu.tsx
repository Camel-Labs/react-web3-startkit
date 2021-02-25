import React, { useState } from 'react'
import styled from 'styled-components'
import { RowBetween, RowFixed } from '../Row'
import { TYPE, ExternalLink, BlankInternalLink } from '../../theme'
import { AutoColumn } from '../Column'
import { ButtonBasic } from '../Button'
import { GitHub, ChevronLeft } from 'react-feather'
import '../../theme/extraFonts.css'
import MenuBG from '../../assets/images/menu-bg.png'
import Logo from '../../assets/images/sybil_logo.png'

const Wrapper = styled.div<{ open: boolean }>`
  height: 100vh;
  position: relative;
  width: ${({ open }) => (open ? '350px' : '60px')};
  background-color: #f7f8fa;
  padding: ${({ open }) => (open ? '2rem 2rem' : '1rem 1.25rem')};
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: space-between;
  align-items: ${({ open }) => (open ? 'unset' : 'center')};
  background: url(${MenuBG});
  background-size: cover;
  border-right: 1px solid #efefef;
  transition: width 0.1s linear;

  overflow: auto;

  :hover {
    cursor: ${({ open }) => (open ? 'unset' : 'pointer')};
  }

  @media (max-width: 1080px) {
    display: none;
  }
`

const MobileHeader = styled.div`
  width: 100%;
  background-color: red;
  display: none;
  padding: 1rem;
  background: url(${MenuBG});

  @media (max-width: 1080px) {
    display: initial;
  }
`

const FlippedText = styled.div`
  -webkit-transform: rotate(90deg);
`

const SybilLogo = styled.div`
  width: 32px;
  height: 32px;
  mix-blend-mode: multiply;
  background-image: url(${Logo});
  background-size: contain;
  outline: none;
`

const SybilWorkmark = styled.div`
  font-weight: 600;
  font-size: 20px;
  font-style: italic;
`

const Haptik = styled(TYPE.black)`
  fontfamily: 'GT Haptik Medium';
`

export default function SideMenu() {
  const [open, setOpen] = useState(true)
  const [faqOpen, setfaqOpen] = useState(false)

  function closeBoth() {
    setOpen(!open)
    setfaqOpen(false)
  }

  return (
    <>
      <MobileHeader>
        <RowBetween>
          <BlankInternalLink to="/">
            <RowFixed style={{ gap: '8px' }}>
              <SybilLogo />
              <SybilWorkmark>web startkit</SybilWorkmark>
            </RowFixed>
          </BlankInternalLink>
          <ExternalLink href="https://github.com/Uniswap/sybil-list">
            <GitHub size={20} style={{ stroke: 'black' }} />
          </ExternalLink>
        </RowBetween>
      </MobileHeader>
      <Wrapper open={open} onClick={() => !open && setOpen(!open)}>
        {!open && (
          <span style={{ width: '30px' }}>
            <SybilLogo style={{ marginBottom: '8px' }} />
            <FlippedText>
              <SybilWorkmark>web3 startkit</SybilWorkmark>
            </FlippedText>
          </span>
        )}
        {open && !faqOpen && (
          <RowBetween>
            <BlankInternalLink style={{ color: '#08052C' }} to="/">
              <RowFixed style={{ gap: '8px' }}>
                <SybilLogo />
                <SybilWorkmark>web3 startkit</SybilWorkmark>
              </RowFixed>
            </BlankInternalLink>
            <ButtonBasic
              onClick={() => closeBoth()}
              style={{ cursor: 'pointer', backgroundColor: 'rgba(255,255,255,0.4)', color: '#000' }}
            >
              <ChevronLeft />
            </ButtonBasic>
          </RowBetween>
        )}
        {open && !faqOpen && (
          <AutoColumn gap="3rem">
            <AutoColumn gap="1rem">
              <Haptik fontSize="36px" style={{ marginBottom: '1rem', fontSize: '36px', lineHeight: '115%' }}>
                The Web3/dApp Startkit.
              </Haptik>
              <TYPE.black style={{ lineHeight: '125%', fontWeight: 400 }}>
                This is a startkit tool for quick starting a new dApp.
              </TYPE.black>
              <TYPE.black style={{ lineHeight: '125%', fontWeight: 400 }}>
                It can also support BSC/HECO. Feel free to
                <ExternalLink href="https://docs.binance.org/smart-chain/developer/rpc.html#mainnetchainid-56">
                  {' '}
                  try others
                </ExternalLink>
                .
              </TYPE.black>
            </AutoColumn>
          </AutoColumn>
        )}
        <AutoColumn gap="3rem"></AutoColumn>

      </Wrapper>
    </>
  )
}
