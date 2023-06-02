import COLLECT_INFOS from '../@types/COLLECT_INFOS';

function getCurrentYear(): number {
  if (
    new Date() <
    new Date(new Date().getFullYear(), 1, COLLECT_INFOS.COLLECT_DATE)
  ) {
    return new Date().getFullYear() - 1;
  }
  return new Date().getFullYear();
}

export { getCurrentYear };
