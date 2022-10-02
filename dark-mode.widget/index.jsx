import { css } from 'uebersicht';

const baseTransparency = 0.3;
const maxTransparency  = 0.9;
const nightShift       = true;
const nightStart       = 18;
const nightEnd         = 6;

const transparency     = (base) => {
  if (nightShift) {
    const integer = base * 10;
    const hours   = new Date().getHours();
    let   result  = base;
  
    if (23 >= hours && hours >= nightStart) {
      result = (integer + (hours - 17)) / 10;
    } else if (nightEnd >= hours && hours >= 0) {
      result = (integer + (7 - hours)) / 10;
    }

    return result > maxTransparency ? maxTransparency : result;
  }

  return base;
}

export let   refreshFrequency = (() => {
  const now     = new Date();
  const seconds = 60 - now.getSeconds();
  const minutes = 60 - now.getMinutes() - (0 !== seconds ? 1 : 0);

  return (minutes * 60 * 1000) + (seconds * 1000);
})();

export const Background       = () => {
  return css`
    height:     100vh;
    width:      100vw;
    background: rgba(0,0,0,${transparency(baseTransparency)});
  `;
}

export const command          = () => {
  refreshFrequency = 60 * 60 * 1000;
}

export const render           = () => {
  return (
    <div className = { Background() }/>
  );
}
