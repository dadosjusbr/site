/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { useRouter } from 'next/router';
import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import STATE_AGENCIES from '../@types/STATE_AGENCIES';

// import { Container } from './styles';
export interface DropDownGroupSelectorProps
  extends Omit<HTMLAttributes<HTMLSelectElement>, 'onChange'> {
  value?: STATE_AGENCIES;
}

const DropDownGroupSelector: React.FC<DropDownGroupSelectorProps> = ({
  value,
  ...rest
}) => {
  const router = useRouter();
  function handleNavigateBetweenSummaryOptions(option: string) {
    router.push(`/grupo/${option}`);
  }
  return (
    <SelectContainer>
      <SumarySelectorComboBox
        value={value}
        onChange={a => {
          handleNavigateBetweenSummaryOptions(a.currentTarget.value);
        }}
        {...rest}
      >
        {/* this option is used as a placeholder */}
        <option value="" disabled selected hidden>
          Acessar dados
        </option>
        <option value="Federal">Órgãos Federais</option>
        <optgroup label="Órgãos Estaduais">
          {(() => {
            const list = [];
            for (const i in STATE_AGENCIES) {
              list.push(i);
            }
            return list.map(i => (
              <option key={STATE_AGENCIES[i]} value={STATE_AGENCIES[i]}>
                {formatToAgency(i)}
              </option>
            ));
          })()}
        </optgroup>
      </SumarySelectorComboBox>
    </SelectContainer>
  );
};

export default DropDownGroupSelector;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 3rem 0;
  width: 100%;
  justify-content: center;
`;
const SumarySelectorComboBox = styled.select`
  padding: 3rem 2rem;
  border-radius: 5px;
  width: 30%;
  min-width: 25rem;
  border: solid 2px #fff;
  background: #3e5363
    url("data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' width='4' height='5'><path fill='white' d='M2 0L0 2h4zm0 5L0 3h4z'/></svg>")
    no-repeat right 3rem center/8px 10px;
  font-size: 2rem;
  font-family: 'Roboto Condensed', sans-serif;
  display: flex;
  color: #fff;
  font-weight: bold;
  transition: border 0.2 ease;
  appearance: none;
  option {
    font-size: 2rem;
    font-weight: bold;
  }
  optgroup {
    font-size: 2rem;
    option {
      font-weight: 400;
    }
  }
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  &:focus {
    border: 2px solid #3f51b5;
  }
  &:focus-visible {
    border: 2px solid #3f51b5;
  }
`;
function formatToAgency(agency: string) {
  const sub = agency.split('_');
  const formatedSubs = sub.map(s => {
    const a = s.toLowerCase();
    const newString = a.split('');
    newString[0] = a[0].toLocaleUpperCase();
    return newString.join('');
  });
  const a = formatedSubs.join(' ');
  return a;
}
